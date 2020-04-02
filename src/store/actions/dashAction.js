import Axios from 'axios';
import * as actionTypes from '../types/dashType';
import config from '../../config';
import {groupBy} from 'underscore';
import moment from 'moment';


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
            Authorization: `Bearer ${localStorage.getItem('_sid')}`,
            agno: localStorage.getItem('_agno'),
            divno: localStorage.getItem('_divno'),
            dby: localStorage.getItem('_dby'),
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
            Authorization: `Bearer ${localStorage.getItem('_sid')}`,
            agno: localStorage.getItem('_agno'),
            divno: localStorage.getItem('_divno'),
            dby: localStorage.getItem('_dby'),
        }
     }


     const getProfit = (data) => {
        let bill = data.reduce((s, f) => s + f.bill, 0);
        let cob = data.reduce((s, f) => s + f.cob, 0);
        let profit = bill - cob;
        return profit; 
     }

    const reGroup = (data) => {
        const monthname = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September' , 'October', 'November', 'December'];
        let result = [];
        for (let index = 0; index < monthname.length; index++) {
           let media = data.filter(e => e.ctype === 'MEDIA' && new Date(e.date).getMonth() === index); 
           let production = data.filter(e => e.ctype === 'PRODUCTION' && new Date(e.date).getMonth() === index); 
           let others = data.filter(e => e.ctype === 'OTHERS' && new Date(e.date).getMonth() === index);  
           
            let items = {
                month: monthname[index],
                'media': getProfit(media),
                'production': getProfit(production),
                'others': getProfit(others)
            }
            result.push(items);
        
        }
        return result;
    }
    return Axios.post(`${config.apiURL}dash/mb`, {begin:start, end:end }, axiosConfig)
                .then(result => {
                 let ds = reGroup(result.data);
                 dispatch({type: actionTypes.CHANGE_DATA_MB, payload: ds});
                })
                .catch(err => {
                    console.error(err);
                });
}

export const fetchDataSxP = () => dispatch => { //Sales vs Payment
    let axiosConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('_sid')}`,
            agno: localStorage.getItem('_agno'),
            divno: localStorage.getItem('_divno'),
            dby: localStorage.getItem('_dby'),
        }
     }
    return Axios.get(`${config.apiURL}dash/sxp`, axiosConfig)
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
            Authorization: `Bearer ${localStorage.getItem('_sid')}`,
            agno: localStorage.getItem('_agno'),
            divno: localStorage.getItem('_divno'),
            dby: localStorage.getItem('_dby'),
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