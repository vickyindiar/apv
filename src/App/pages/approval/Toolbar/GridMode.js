
import React from 'react';
import { SelectBox } from 'devextreme-react/select-box';
import {  changeTools } from '../../../../store/actions/apvAction';
import { useDispatch, useSelector } from "react-redux";
import config from '../../../../config';


 function GridMode() {
    
    const dispatch = useDispatch();
    const toolModeValue= useSelector(state => state.apv.toolModeValue);

    return (
        <>
            <SelectBox dataSource={config.dsToolMode}
                displayExpr="text"
                valueExpr="value"
                width={'70%'}
                defaultValue={toolModeValue}
                onValueChanged={
                    (e) => { 
                        dispatch(changeTools({ toolModeValue : e.value }));
                    }
                }
                searchEnabled={false}
            />    
        </>
    )
}
export default React.memo(GridMode)
