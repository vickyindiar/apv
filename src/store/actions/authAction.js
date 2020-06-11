import * as actionType from '../types/authType';
import isEmpty from '../helper/isEmpty';
import Axios from 'axios';
import config from '../../config';
import Cookies from 'js-cookie';


const setDefaultAuthToken = (token) =>{
    if(token){
        Axios.defaults.headers.common['Authorization'] = token;
    }else{
        delete Axios.defaults.headers.common['Authorization'];
    }
}

export const SetFirstLoad = (value) => dispatch => {
    dispatch({ type: actionType.SET_FIRST_LOAD, payload: value})
}

export const GetUserByToken = () => dispatch =>{
    let sid = Cookies.get('_sid'); 
    let axiosConfig = {
        withCredentials: true,
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sid}`, 
          }
    }
    let url = `${config.apiURL}users/token/${ Cookies.get('_uid')}`;
    return Axios.get(url, axiosConfig)
    .then(res =>{
        if(res.status === 200){  
            SetupTokenData()
        }
        else{
           
        }
    })
    .catch((err) => {  
        if(isEmpty(err.response)){ console.log('server offline, contact your provider !'); return false;  }
        if(err.response.data.message.includes('Username')){
            dispatch({ type: actionType.CHANGE_USERNAME_VALID, payload: { isUserValid: false, errorUserMsg: err.response.data.message.replace('[EMVCException] ', '')  } } )
        }
        else if(err.response.data.message.includes('Password')){
            dispatch({ type: actionType.CHANGE_PASSWORD_VALID, payload: { isPassValid: false, errorPassMsg: err.response.data.message.replace('[EMVCException] ', '') } } )
        }
        return false;
    });
}

export const AuthorizationCheck = (history, location) => dispatch => {
    let uid    = Cookies.get('_uid');
    let sid    = Cookies.get('_sid');
    let dby    = Cookies.get('_dby');
    let agno   = Cookies.get('_agno');
    let divno  = Cookies.get('_divno');
    let isValid = (!isEmpty(uid) && !isEmpty(sid) && !isEmpty(dby) && !isEmpty(agno) && !isEmpty(divno));
    
    if (isValid) {
        let axiosConfig = {
            headers: { Authorization: `Bearer ${sid}`, agno, divno, dby }
           // headers: { Authorization: `Bearer ${sid}` }
        }
        Axios.get(`${config.apiURL}users/${uid}`, axiosConfig)
            .then((response) => {
                if(response.data.stat){
                    dispatch({ 
                        type:actionType.SET_AUTH_USER, 
                        payload:{ 
                            status: true,
                             user: { 
                                  idnum: response.data.idnum,
                                  name: response.data.name, 
                                  email: response.data.email,
                                  agn: response.data.agno,
                                  divn: response.data.divno,
                                  dby: response.data.dby  
                                 }
                            }
                    });
                    dispatch({ type: actionType.SET_FIRST_LOAD, payload: false});
                    history.push(location);
                }
                else{
                    dispatch({ type:actionType.SET_AUTH_USER, payload:{ status: false, user: { }} });
                    dispatch({ type: actionType.SET_FIRST_LOAD, payload: false});
                    dispatch({ type:actionType.TOOGLE_NOTIF, payload:{ showNotif: true, notifMsg: response.data.description, notifType: 'error' }});
                    history.push('/login');
                }

            })
            .catch(err => {
                if(isEmpty(err.response)){ console.log('server offline, contact your provider !'); return false;  }
                else if(err.response.data.classname === "EMVCJWTException"){
                    dispatch({ type:actionType.SET_AUTH_USER, payload:{ status: false, user: { }} });
                    dispatch({ type: actionType.SET_FIRST_LOAD, payload: false});
                    dispatch({ type:actionType.TOOGLE_NOTIF, payload:{ showNotif: true, notifMsg: err.response.data.message, notifType: 'error' }});
                    history.push('/login');
                }
            })
    }
    else{
        dispatch({ type:actionType.SET_AUTH_USER, payload:{ status: false, user: { }} });
        dispatch({ type: actionType.SET_FIRST_LOAD, payload: false});
    }

}

export const DoLogin = (data) => dispatch => {
    let axiosConfig = {
        withCredentials: true,
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
          }
    }
    let paramaters = {
        "username": data.username,
        "password": data.password,
    }
    let url = `${config.baseURL}login`;
    return Axios.post(url, paramaters, axiosConfig)
    .then(res =>{
        if(res.status === 200){  
            setDefaultAuthToken(` Bearer ${res.data.token}`);
            return true;
        }
        else{
           
        }
    })
    .catch((err) => {  
        if(isEmpty(err.response)){ console.log('server offline, contact your provider !'); return false;  }
        if(err.response.data.message.includes('Username')){
            dispatch({ type: actionType.CHANGE_USERNAME_VALID, payload: { isUserValid: false, errorUserMsg: err.response.data.message.replace('[EMVCException] ', '')  } } )
        }
        else if(err.response.data.message.includes('Password')){
            dispatch({ type: actionType.CHANGE_PASSWORD_VALID, payload: { isPassValid: false, errorPassMsg: err.response.data.message.replace('[EMVCException] ', '') } } )
        }
        return false;
    });
}

export const DoLogOut = (history) => dispatch => {
    localStorage.clear();
    Cookies.remove('_uid');
    Cookies.remove('_sid');
    Cookies.remove('_dby');
    Cookies.remove('_agno');
    Cookies.remove('_divno');
    setDefaultAuthToken(null);

    dispatch({ type:actionType.SET_AUTH_USER, payload:{ status: false, user: { }} });
    history.push('/login');
}

export const SetupTokenData = (tokenid) => dispatch => {
    let uid    = Cookies.get('_uid');
    let sid    = Cookies.get('_sid');
    let axiosConfig = { withCredentials: true, headers: { 'Accept' : 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${sid}` }, }
    return Axios.get(`${config.apiURL}users/token/${tokenid}`, axiosConfig)
    .then(response => {
        axiosConfig.headers.agno = response.data.agno;     
        axiosConfig.headers.divno = response.data.divno;     
        axiosConfig.headers.dby = response.data.year;     

        return Axios.get(`${config.apiURL}users/mail/${uid}`, axiosConfig)
        .then(employee => {
            dispatch({ 
                type:actionType.SET_AUTH_USER, 
                payload:{ 
                    status: true, 
                    user: { 
                        idnum: employee.data.idnum, 
                        name: employee.data.name, 
                        email: employee.data.email,
                        agn: employee.data.agno,
                        divn: employee.data.divno,
                        dby: employee.data.dby   
                    }
                }
            });
            return true;    
        })
        .catch((err) => {  
            console.log(err);
            return false;
        });
    });
}

export const ChangeBDYear = (ptoken) => dispatch => {
    let sid    = Cookies.get('_sid');
    let dby    = Cookies.get('_dby');
    let agno   = Cookies.get('_agno');
    let divno  = Cookies.get('_divno');
    let axiosConfig = {
        withCredentials: true,
        headers: { Authorization: `Bearer ${sid}`, agno, divno, dby }
       // headers: { Authorization: `Bearer ${sid}` }
    }
    return Axios.post(`${config.apiURL}users/changedby`, {tid: ptoken}, axiosConfig)
        .then(r => {
            return r;
        })
}

export const changeUserValue = (value) => ({
    type:actionType.CHANGE_USERNAME,
    payload: value
});

export const changePassValue = (value) => ({
    type:actionType.CHANGE_PASS,
    payload: value
});

//select db

export const getDBList = () => dispatch => {
    let sid    = Cookies.get('_sid');
    let axiosConfig = { headers: { 'Accept' : 'application/json', 'Content-Type': 'application/json',   Authorization: `Bearer ${sid}` } }
    return Axios.get(`${config.apiURL}users/getdb`, axiosConfig)
            .then((response) => {
                dispatch({type: actionType.FETCH_DBLIST, payload: response.data });
                dispatch({type: actionType.CHANGE_SELECTED_DB, payload: response.data[0] });
                return true;
            })
            .catch((err)=> {

            })
}

export const DoSubmitDB = ({agno, divno, dby}) => dispatch => {
    let sid    = Cookies.get('_sid');
    let uid    = Cookies.get('_uid');
    let axiosConfig = {
        withCredentials: true,
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sid}`,
            agno,
            divno,
            dby
          },
    }
    return Axios.get(`${config.apiURL}users/mail/${uid}`, axiosConfig)
    .then(employee => {
        dispatch({
            type:actionType.SET_AUTH_USER,
            payload:{ 
                status: true, 
                user: { 
                        idnum: employee.data.idnum, 
                        name: employee.data.name,
                        email: employee.data.email,
                        agn: employee.data.agno,
                        divn: employee.data.divno,
                        dby: employee.data.dby  
                }
            }
        });
        return true;    
    })
    .catch((err) => {  
        return false;
    });
}

export const changeDb = (value) => ({
    type: actionType.CHANGE_SELECTED_DB,
    payload: value
});

export const changeDby = (value) => ({
    type: actionType.CHANGE_SELECTED_DBY,
    payload: value
});