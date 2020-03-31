import Axios from 'axios';
import * as actionTypes from '../types/dashType';
import config from '../../config';


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