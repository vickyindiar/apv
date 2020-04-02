import * as actionTypes from '../types/dashType';
import isEmpty from '../helper/isEmpty';

function getFromLS(name, key) {
    let result;
    let ls = {};
    if (global.localStorage) {
      try { ls = JSON.parse(global.localStorage.getItem(name)) || {}; } 
      catch (e) { }
    }
    result = key ? ls[key] : ls;
    return result;
  }

const originalLayouts = getFromLS("rgl-8", "layouts") || {};
const originalItems = getFromLS("rgl-9", "items") || [
    {keyComponent:1, isShow:true},
    {keyComponent:2, isShow:true},
    {keyComponent:3, isShow:true},
    {keyComponent:4, isShow:true},
    {keyComponent:5, isShow:true}
];

const cD = new Date();
const originalMmbPeriod = getFromLS('rgl-8', 'mmbPeriod', 'start') ? new Date(getFromLS('rgl-8', 'mmbPeriod', 'start').start) : 
                                                                     new Date('20' + localStorage.getItem('_dby'), cD.getMonth(), 1);

const originaldashLocked = getFromLS('rgl-8', 'dashLock') ? false :  getFromLS('rgl-8', 'dashLock');

const initialState = {
    dashLayout: JSON.parse(JSON.stringify(originalLayouts)),
    dashItems: originalItems,
    dashLocked: originaldashLocked,
    dsMmb: [],
    dsMb: [],
    dsSxP: [],
    dsSbM: [],

    mmbPeriod:originalMmbPeriod
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.UPDATE_LAYOUT_DASH:
            return{
                ...state,
                dashLayout: payload
            }
        case actionTypes.UPDATE_ITEMS_DASH:
            let index = state.dashItems.findIndex(e => e.keyComponent === payload.keyComponent);
            let items = [...state.dashItems];
            items[index] = { keyComponent:payload.keyComponent, isShow: payload.isShow };
            return {
                ...state,
                dashItems: [...items]
            }
        case actionTypes.IS_LOCKED_DASH:
            return{
                ...state,
                dashLocked: payload
            }
        case actionTypes.CHANGE_DATA_MMB:
            return{
                ...state,
                dsMmb: payload
            }
        case actionTypes.CHANGE_DATA_MB:
            return{
                ...state,
                dsMb: payload
            }
        case actionTypes.CHANGE_DATA_SXP:
            return{
                ...state,
                dsSxp: payload
            }
        case actionTypes.CHANGE_DATA_SBM:
            return{
                ...state,
                dsSbM: payload
            }
        default:
            return { ...state }
    }
}