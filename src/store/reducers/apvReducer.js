import * as ActionTypes from '../types/apvType';


const initialState = {
    showToolMode: false,
    toolModeValue: ActionTypes.SUBMIT_STATUS,
    showToolShow: false,
    toolShowValue: '2',
    tokenGrid: null,
    isLoad: true,    
    imgCellPreview: null,
    pdfCellPreview: null,   
    dsHeader: [],
    selectedHeader: [],
    dsDetail: null,
    selectedDetail: [],
    customSelectionFlag: false, //for grouping selection
    isDiffDBYear: false

}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case ActionTypes.FETCH_HEADER :
        return  { ...state, 
                    dsHeader: payload.dsHeader 
                }  
    case ActionTypes.FETCH_DETAIL:
        return  { ...state, 
                    dsDetail: payload.dsDetail,
                    showLoadPanel: false    
                 }
    case ActionTypes.CHANGE_SELECTED_DETAIL:
        return {  ...state, selectedDetail : payload.selectedDetail }
    case ActionTypes.CHANGE_CUSTOM_FLAG:
        return { ...state, customSelectionFlag: payload}
    case ActionTypes.CHANGE_CELL_PREVIEW:
        return {  ...state, ...payload }
    case ActionTypes.CHANGE_TOKEN:
        return {  ...state, ...payload }
    case ActionTypes.CHANGE_TOOLS:
        return {  ...state, ...payload }
    case ActionTypes.SHOW_LOADPANEL:
        return {  ...state, showLoadPanel: payload.value }
    case ActionTypes.DIFF_DBYEAR:
        return { ...state, isDiffDBYear: !state.isDiffDBYear }
    case ActionTypes.CLEAR_APV:
        state = initialState
    // eslint-disable-next-line no-fallthrough
    default:
        return state
    }
}
