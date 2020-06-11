import React, { useEffect } from 'react'
import {List, Lookup} from 'devextreme-react';
import { useSelector, useDispatch } from 'react-redux';
import { getDBList, changeDb, changeDby, DoSubmitDB} from '../../../store/actions/authAction'
import isEmpty from '../../../store/helper/isEmpty';
import { Button } from 'devextreme-react/button';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { askForPermissioToReceiveNotifications } from '../../../store/actions/ntfAction';

function SelectDB() {
    const history = useHistory();
    const dispatch = useDispatch();

    const dsDB = useSelector(state => state.auth.dsDB);
    const selectedDB = useSelector(state => state.auth.selectedDB);
    const dsDBY = useSelector(state => state.auth.dsDBY);
    const selectedDBY = useSelector(state => state.auth.selectedDBY);

    const onChangeDBY = (e) => { dispatch(changeDby({...e.addedItems[0]})); }
    const onChangeDB = (e) => { dispatch(changeDb(e.selectedItem)); } 

    useEffect(() => {
        if(isEmpty(Cookies.get('_uid'))){
            history.push('/login');
        }
        else{
            dispatch(getDBList());
        }
    }, []);

    const onSubmitSelectDB = () => {
        let prm = {
            agno: selectedDB.agencyno,
            divno: selectedDB.division,
            dby: selectedDBY[0].id
        };
        dispatch(DoSubmitDB(prm))
        .then((result) => {
            if (result) {
                if(!localStorage.getItem('ntfc-token')){
                    // askForPermissioToReceiveNotifications(localStorage.getItem('_uid')); 
                }
                history.push('/');
            }
        });
    }

    return (
        <>
            <div className="card auth-card">
                <div className="card-body text-center">
                    <div className="mb-4">
                        <i className="feather icon-unlock auth-icon"/>
                    </div>
                    <h3 className="mb-4 title-card-auth" >Select Data</h3>
                    <div className="mb-4">
                         <Lookup
                             dataSource={dsDB} 
                             keyExpr={'agencyno'}
                             displayExpr={'agencyno'}
                             selectedItem={selectedDB}
                             defaultSelectedItems={selectedDB}
                             closeOnOutsideClick={true}
                             showPopupTitle={false} 
                             onSelectionChanged={onChangeDB}
                             stylingMode='outlined'  
                          //   placeholder="Select Database" 
                         />
                    </div>
                    <div className="mb-4">
                        <List
                            dataSource={dsDBY}
                            id={'dbyList'}
                            keyExpr={'id'}
                            displayExpr={'text'}
                            height={150}
                            defaultSelectedItems={selectedDBY}
                            selectionMode={'single'}
                            onSelectionChanged={onChangeDBY}

                        />
                    </div>
                 
                    <Button 
                            elementAttr={{'id':'btnEnterDB', 'class':'theme-bg mb-4 shadow-2' }}
                            width={100}
                            height={40}
                            text={'Enter'} 
                            type={'default'}
                            onClick={ onSubmitSelectDB }
                        />   
                </div>
            </div>
        </>
    )
}
export default React.memo(SelectDB)
