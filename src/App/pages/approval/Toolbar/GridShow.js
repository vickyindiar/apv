import React from 'react'
import { SelectBox } from 'devextreme-react/select-box'
import { useDispatch, useSelector  } from "react-redux";
import {  changeTools } from '../../../../store/actions/apvAction'
import config from '../../../../config';


const GridShow = () => {
    const dispatch = useDispatch();
    const toolShow = useSelector(state => state.apv.toolShowValue);
    return (
        <>
        <SelectBox dataSource={config.dsToolShow}
            displayExpr="text"
            valueExpr="value"
            width={'70%'}
            defaultValue={toolShow }
            onValueChanged={
                (e) => { 
                    dispatch(changeTools({ toolShowValue : e.value }));
                }
            }
            searchEnabled={false}
        />
            
        </>
    )
}

export default React.memo(GridShow);
