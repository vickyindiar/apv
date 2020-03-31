import * as actionType from "../types/authType";

const initialState = {
    userName:'',
    pass:'',
    
    isUserValid: true,
    errorUserMsg: '',
    isPassValid: true,
    errorPassMsg: '',

    isAuthenticated: false,
    authenticatedUser: {},
    firstLoad: true,

    dsDB: [],
    selectedDB:[],
    dsDBY: [
        {id: '19', text:'2019'},
        {id: '20', text:'2020'},
    ],
    selectedDBY: [{id:'19', text:'2019'}],

    showNotif: false,
    notifMsg: '',
    notifType: 'success'
    
}


export default (state = initialState, {type, payload}) => {
    switch (type) {
        case actionType.CHANGE_USERNAME:
            return{
                ...state,
                userName: payload
            } 
        case actionType.CHANGE_PASS:
            return{
                ...state,
                pass: payload
            } 
        case actionType.CHANGE_USERNAME_VALID:
            return{
                ...state,
                isUserValid: payload.isUserValid,
                errorUserMsg: payload.errorUserMsg
            }
        case actionType.CHANGE_PASSWORD_VALID:
            return{
                ...state,
                isPassValid: payload.isPassValid,
                errorPassMsg: payload.errorPassMsg
            }
        case actionType.SET_FIRST_LOAD:
            return{
                ...state,
                firstLoad: payload
            }
        case actionType.SET_AUTH_USER:
            return{
                ...state,
                userName: '',
                pass: '',
                isAuthenticated: payload.status,
                authenticatedUser: {...payload.user}
            }
        case actionType.FETCH_DBLIST:
            return{
                ...state,
                
               dsDB : [...payload] 
            }
        case actionType.CHANGE_SELECTED_DB: 
        return{
                ...state,
                selectedDB:{...payload}
            }
        case actionType.CHANGE_SELECTED_DBY:
            return{
                ...state, 
                selectedDBY: [{...payload}]
            }  
        case actionType.TOOGLE_NOTIF:
            return{
                ...state,
                showNotif: payload.showNotif,
                notifMsg: payload.notifMsg,
                notifType: payload.notifType
            }
        default:
        return {...state}
    }
}