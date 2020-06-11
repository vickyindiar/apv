import Axios from 'axios';
import * as actionTypes from '../types/dashType';
import config from '../../config';
import isEmpty from '../helper/isEmpty';
import Cookies from 'js-cookie';


export const updateDashLayout = ({layouts}) => dispatch => {
    dispatch({type:actionTypes.UPDATE_LAYOUT_DASH, payload: layouts})
}

export const updateDashItems = (value) => dispatch => {
    dispatch({type:actionTypes.UPDATE_ITEMS_DASH, payload: value});
}

export const setLockedDash = (value) => dispatch => {
    dispatch({type:actionTypes.IS_LOCKED_DASH, payload: value});
}

export const updatePeriodMMB = (value) => dispatch => {
    dispatch({type:actionTypes.CHANGE_PERIOD_MMB, payload:value});
}

export const fetchDataMMB = (start, end) => dispatch => { // Monthly media billing
    let axiosConfig = {
        headers: {
            Authorization: `Bearer ${Cookies.get('_sid')}`,
            agno: Cookies.get('_agno'),
            divno: Cookies.get('_divno'),
            dby: Cookies.get('_dby'),
        }
     }
    return Axios.post(`${config.apiURL}dash/mmb`,{begin:start, end:end }, axiosConfig)
                .then(result => {
                  dispatch({type: actionTypes.CHANGE_DATA_MMB, payload: result.data});
                })
                .catch(err => {
                    console.error(err);
                });
}

export const fetchDataMb = (start, end) => dispatch => { //Sales vs Payment
    let axiosConfig = {
        headers: {
            Authorization: `Bearer ${Cookies.get('_sid')}`,
            agno: Cookies.get('_agno'),
            divno: Cookies.get('_divno'),
            dby: Cookies.get('_dby'),
        }
     }


     const getProfit = (data) => {
       // let bill = data.reduce((s, f) => s + f.bill, 0);
      //  let cob = data.reduce((s, f) => s + f.cob, 0);
      //  let profit = bill - cob;
      //  return profit; 

        if(!isEmpty(data)){
            return data[0].bill - data[0].cob
        }
        else{
            return 0;
        }
     }

    const generateMB = (data) => {
        const monthname = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September' , 'October', 'November', 'December'];
        let result = [];
        for (let index = 0; index < monthname.length; index++) {
        //    let media = data.filter(e => e.ctype === 'MEDIA' && new Date(e.date).getMonth() === index); 
        //    let production = data.filter(e => e.ctype === 'PRODUCTION' && new Date(e.date).getMonth() === index); 
        //    let others = data.filter(e => e.ctype === 'OTHERS' && new Date(e.date).getMonth() === index); 

            let media = data.filter(e => e.ctype === 'MEDIA' && e.month === index+1); 
            let production = data.filter(e => e.ctype === 'PRODUCTION' && e.month === index+1); 
            let others = data.filter(e => e.ctype === 'OTHERS' && e.month === index+1);  
            let items = {
                month: monthname[index],
                'media': getProfit(media),
                'production': getProfit(production),
                'others': getProfit(others)
            }
            // let bill =  media[0].bill + production[0].bill + others[0].bill;
            // let cob = media[0].cob + production[0].cob + others[0].cob;
            // console.log(monthname[index]);
            // console.log('bill :' + bill );
            // console.log('cob :' + cob );
            result.push(items);
        }
        return result;
    }


    const generateYB = (data) => {
        let result = [];
        let media = 0, production = 0, others = 0;

        data.forEach(element => {
            media = media + element.media;
            production = production + element.production;
            others = others + element.others;
        });

        result = [
            {el:'media', data: media},
            {el:'producton', data: production},
            {el:'other', data:others}
        ]
        return result;
    }
    // { begin:start, end:end }
    //{ begin:'2019-01-01', end:'2019-01-31' 
    return Axios.post(`${config.apiURL}dash/mb`, { begin:start, end:end }, axiosConfig)
                .then(result => {
                    let ds = generateMB(result.data);
                    dispatch({type: actionTypes.CHANGE_DATA_MB, payload: ds});

                    let dy = generateYB(ds);
                    dispatch({type: actionTypes.CHANGE_DATA_YB, payload: dy });

                })
                .catch(err => {
                    console.error(err);
                });
}

export const fetchDataSxP = (start, end) => dispatch => { //Sales vs Payment
    let axiosConfig = {
        headers: {
            Authorization: `Bearer ${Cookies.get('_sid')}`,
            agno: Cookies.get('_agno'),
            divno: Cookies.get('_divno'),
            dby: Cookies.get('_dby'),
        }
     }
    return Axios.post(`${config.apiURL}dash/sxp`, { begin:start, end:end }, axiosConfig)
                .then(result => {
                  dispatch({type: actionTypes.CHANGE_DATA_SXP, payload: result.data});
                })
                .catch(err => {
                    console.error(err);
                });
}

export const fetchDataSbM = () => dispatch => { //Sales by Media
    let axiosConfig = {
        headers: {
            Authorization: `Bearer ${Cookies.get('_sid')}`,
            agno: Cookies.get('_agno'),
            divno: Cookies.get('_divno'),
            dby: Cookies.get('_dby'),
        }
     }
    return Axios.get(`${config.apiURL}dash/sbm`, axiosConfig)
                .then(result => {
                  dispatch({type: actionTypes.CHANGE_DATA_SBM, payload: result.data});
                })
                .catch(err => {
                    console.error(err);
                });
}