import * as actionTypes from '../types/ntfType';

const initialState = {
    dsNotification: [],
    dsTopNotification: [],
    toogleList: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.CHANGE_NTF:
            return{
                ...state,
                dsNotification: payload
            }
        case actionTypes.CHANGE_TOP_NTF:
                return{
                    ...state,
                    dsTopNotification: payload
                }
        case actionTypes.TOOGLE_LIST:
            return{ ...state, toogleList: !state.toogleList }
        default:
            return{
                ...state
            }
    }
}