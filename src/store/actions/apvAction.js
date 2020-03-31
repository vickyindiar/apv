import Axios from 'axios';
import * as actionTypes from '../types/apvType';
import config from '../../config';


let axiosConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('_sid')}`,
        agno: localStorage.getItem('_agno'),
        divno: localStorage.getItem('_divno'),
        dby: localStorage.getItem('_dby'),
    }
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
