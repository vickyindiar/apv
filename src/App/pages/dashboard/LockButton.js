import React from 'react'
import SpeedDialAction from 'devextreme-react/speed-dial-action';
import {useSelector, useDispatch} from 'react-redux';
import { saveToLS, getFromLS } from '../../../store/helper/localStorage';
import { setLockedDash, updateDashLayout } from '../../../store/actions/dashAction';
import config from 'devextreme/core/config';
function LockButton() {
    const dispatch = useDispatch();
    const dashLocked = useSelector(state => state.dash.dashLocked);
    config({
        floatingActionButtonConfig: {
          //  icon: 'check',
           // closeIcon: 'close',
            position: {
                of: '.react-grid-layout',
                my: "right bottom",  
                at: "right bottom",  
                offset: "-16 -16"  
            }
        }
    });

    
    const changeLockedInStorage = (layouts, value) => {
        let result = {...layouts}
        for (let index = 0; index < Object.keys(layouts).length; index++) {
            let key = Object.keys(layouts)[index];
            result[key].forEach(element => {
                element.static = value;
            });
        }
        saveToLS('rgl-8', 'layouts', result);
    }

    const changeValueLock = (e) => {
        let layouts = getFromLS('rgl-8', 'layouts');
        changeLockedInStorage(layouts, e.value);
        dispatch(setLockedDash(e.value));
        layouts = getFromLS('rgl-8', 'layouts');
        dispatch(updateDashLayout(layouts));
        saveToLS('rgl-8', 'dashLock', e.value);
}
    return (
        <>
            <SpeedDialAction
                label={ dashLocked === true ? 'Unlock Layout' : 'Lock Layout'}
                hint={ dashLocked  === true ? 'Unlock' : 'Lock'} 
                icon= { dashLocked === true ? 'feather icon-unlock' : 'feather icon-lock'} 
                onClick={(e) => { changeValueLock(e) }}
            /> 
        </>
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(LockButton, areEqual)
