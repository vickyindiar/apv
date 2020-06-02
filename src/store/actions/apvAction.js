import Axios from 'axios';
import * as actionTypes from '../types/apvType';
import config from '../../config';
import { mailTemplate } from '../../App/pages/approval/EmailTemplate'


let axiosConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('_sid')}`,
        agno: localStorage.getItem('_agno'),
        divno: localStorage.getItem('_divno'),
        dby: localStorage.getItem('_dby'),
    }
 }

 export const SetTrigger = () => dispatch => {
     let  axiosConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('_sid')}`,
            agno: localStorage.getItem('_agno'),
            divno: localStorage.getItem('_divno'),
            dby: localStorage.getItem('_dby'),
        }
     }

    Axios.get(`${config.apiURL}appdetails/triggers/checking`, axiosConfig)
     .then((header) => { 
     })
     .catch(e =>{
         console.log(e);
     }); 
 }

export const fetchDataByToken = (pToken, mode) =>  dispatch => {
 axiosConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('_sid')}`,
        agno: localStorage.getItem('_agno'),
        divno: localStorage.getItem('_divno'),
        dby: localStorage.getItem('_dby'),
    }
 }
  return Axios.post(`${config.apiURL}appheaders/getbytoken`, { idnum :  localStorage.getItem('_uid') , tid : pToken }, axiosConfig)
    .then((header) => { 
        let body = { apvno: header.data[0].apvno ,  status: mode, type: header.data[0].type  };
        dispatch({type: actionTypes.FETCH_HEADER, payload: { dsHeader: header.data } });

     return  Axios.post(`${config.apiURL}appdetails/getrp`, body , axiosConfig)
        .then((detail) => {
            if(detail.data.length > 0){
                  dispatch({type: actionTypes.FETCH_DETAIL, payload: { dsDetail: detail.data } });
             }  
             else{
                dispatch({type: actionTypes.FETCH_DETAIL, payload: { dsDetail: [] } });
            }
        })
        .catch((e) => {
                console.log(e);
        }); 
    })
    .catch(e =>{
        console.log(e);
    }); 
}

export const fetchDataByUser = (mode) => (dispatch) => {
    axiosConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('_sid')}`,
            agno: localStorage.getItem('_agno'),
            divno: localStorage.getItem('_divno'),
            dby: localStorage.getItem('_dby'),
        }
    }
  return Axios.post(`${config.apiURL}appheaders/getbyspv`, { id : localStorage.getItem('_uid') }, axiosConfig)
            .then((header) => {
                let apvno = [];
                header.data.map(e => { apvno.push(e.apvno) });
                let body = { apvno,  status: mode, id: localStorage.getItem('_uid') };
                dispatch({type: actionTypes.FETCH_HEADER, payload: { dsHeader: header.data } });

              return  Axios.post(`${config.apiURL}appdetails/getrpmultiple`, body , axiosConfig)
                .then((detail) => {
                    if(detail.data.length > 0){
                      dispatch({type: actionTypes.FETCH_DETAIL, payload: { dsDetail: detail.data } });
                    }
                    else{
                        dispatch({type: actionTypes.FETCH_DETAIL, payload: { dsDetail: [] } });
                    }
                })
                .catch((e) => {
                    console.log(e);
            }); 
            })
            .catch(e =>{
                console.log(e);
            }); 
}


export const updateDetail = (detail, action) => (dispatch, getstate) => {
        axiosConfig = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('_sid')}`,
                agno: localStorage.getItem('_agno'),
                divno: localStorage.getItem('_divno'),
                dby: localStorage.getItem('_dby'),
            }
        }
        return Axios.post(`${config.apiURL}appdetails/updatemultiple`, {detail, action} , axiosConfig)
        .then((response) => {
            return response;
        })
        .catch(e =>{
            console.log(e);
        }); 
}

export const sendMail = (detail, by, at ) => {


    const createHeader = (column) =>{
        let container = document.createElement("div");
        for (let key of column) {
            let td = document.createElement("td");
            let text = document.createTextNode(key);
            td.appendChild(text);
            container.appendChild(td);
        }
        return container;
    }

    const createDetail = (data, column) => {
        let container = document.createElement("div");
        for (let element of data) {
            let row = document.createElement('tr')
            row.className = 'item';
            for (var key in column) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[column[key].toLocaleLowerCase()]);
                cell.appendChild(text);
            }
            container.appendChild(row);
        }
        return container;
    }

    const generateFullTable = (data, approvedby, approveddate) => {
        let defaultTemplate = mailTemplate;
        let column = ["EVDTYPE", "APVNO", "EVDNO"];
        let header = createHeader(column);
        let detail = createDetail(data, column);

        defaultTemplate = defaultTemplate.replace('$header', header.innerHTML);
        defaultTemplate = defaultTemplate.replace('$body', detail.innerHTML);
        defaultTemplate = defaultTemplate.replace('$apvBy', approvedby);
        defaultTemplate = defaultTemplate.replace('$apvDate', approveddate);
        defaultTemplate = defaultTemplate.replace('$totalColumnt', column.length);
        return defaultTemplate;

    }


    // const generateFullTable = (detail) => {
    //     const generateTableHead = (table, header) => {
    //         let thead = table.createTHead();
    //         let row = thead.insertRow();
    //         for (let key of header) {
    //             let th = document.createElement("th");
    //             let text = document.createTextNode(key);
    //             th.appendChild(text);
    //             row.appendChild(th);
    //         }
    //     }
        
    //     const generateTable = (table, data, header) => {
    //         for (let element of data) {
    //             let row = table.insertRow();
    //             for (var key in header) {
    //                 let cell = row.insertCell();
    //                 let text = document.createTextNode(element[header[key].toLocaleLowerCase()]);
    //                 cell.appendChild(text);
    //             }
    //         }
    //     }
        
    //     let table = document.createElement("table");
    //     let header = ["EVDTYPE", "APVNO", "EVDNO"]
    //     generateTable(table, detail, header);
    //     generateTableHead(table, header);
    //     return table;
    // }
    


    const generateData = (detail, approvedby, approveddate) => {
        let result = [];
        let opr = [...new Set(detail.map(v => v.opr))]; //v.opremail

        opr.map(v => {
            let record = {};
            let filtered = {};
            filtered = detail.filter(d => d.opr === v);
            record.approvedby = approvedby;
            record.to = 'vickynewonline@gmail.com';
            record.detail = generateFullTable(filtered, approvedby, approveddate);
            result.push(record);
        })
        return result;
    }

    axiosConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('_sid')}`,
            agno: localStorage.getItem('_agno'),
            divno: localStorage.getItem('_divno'),
            dby: localStorage.getItem('_dby'),
        }
    }
    let body = {'detail' : generateData(detail, by, at)}
    return Axios.post(`${config.apiURL}mail/send`, body , axiosConfig)
    .then((response) => {
        return response;
    })
    .catch(e =>{
        console.log(e);
    });

}


export const changePreview = (type, value) => ({
    type: actionTypes.CHANGE_CELL_PREVIEW,
    payload: type === 'img' ? {imgCellPreview : value} : { pdfCellPreview: value }
});

export const changeTools = (value) => ({
    type: actionTypes.CHANGE_TOOLS,
    payload: { ...value }
});

export const showLoadPanel = (value) =>({
    type: actionTypes.SHOW_LOADPANEL,
    payload: { value }
})
