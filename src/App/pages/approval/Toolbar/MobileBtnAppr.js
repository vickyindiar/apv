import React from 'react';
import {Button} from 'devextreme-react/button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataByToken, fetchDataByUser, updateDetail } from '../../../../store/actions/apvAction';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as actionTypes from '../../../../store/types/apvType';



function MobileBtnAppr() {

    const MySwal = withReactContent(Swal);

    const dispatch = useDispatch();
    const token = useSelector(state => state.apv.tokenGrid);
    const modeValue = useSelector(state => state.apv.toolModeValue);
    const dtHeader = useSelector(state => state.apv.dsHeader);
    const sDetail = useSelector(state => state.apv.selectedDetail);
    const user =  useSelector(state => state.auth.authenticatedUser);

    const updateGrid = (appaction) =>{
             dispatch(updateDetail(sDetail, appaction))
            .then(r => {
              if(r.data === true){
                    let msg = appaction.status === actionTypes.APPROVE_STATUS? 'APPROVED' : 'UNAPPROVED';
                    let title = appaction.status === actionTypes.APPROVE_STATUS ? 'Approved' : 'Unapproved';
                    if(appaction.status === actionTypes.SUBMIT_STATUS || appaction.status ===  actionTypes.APPROVE_STATUS){
         
                        MySwal.fire({
                            icon: 'success',
                            title: '<div style="color:rgb(3, 252, 181)">'+title+'</div>',
                            html: 'Data Has Been '+msg+' !',
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            onOpen: () =>{
                                if(token !== null) dispatch(fetchDataByToken(token, modeValue));
                                else dispatch(fetchDataByUser(modeValue));
                            },
                            onClose: () =>{ 
                                dispatch({ type: actionTypes.CHANGE_SELECTED_DETAIL, payload :{ selectedDetail: []}});
                             }
                        });
                    }
                    else{
                        MySwal.fire({
                            icon: 'success',
                            title: '<div style="color:rgb(252, 3, 78)">REJECTED</div>',
                            html: 'Data Has Been Rejected !',
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            onOpen: () =>{
                                if(token !== null) dispatch(fetchDataByToken(token, modeValue));
                                else dispatch(fetchDataByUser(modeValue));
                            },
                            onClose: () => {
                                dispatch({ type: actionTypes.CHANGE_SELECTED_DETAIL, payload :{ selectedDetail: []}});
                            }
                        });
                    }
                } 
            })
    }

    const onBtnApproveClicked = () => {
        let appaction = {};
        let field = Object.keys(dtHeader[0])
                    // eslint-disable-next-line array-callback-return
                    .find(key => {
                        if((key === 'spv1' || key === 'spv2') && dtHeader[0][key] === user.idnum) {
                            return true;
                        }
                    });  
        appaction.status = modeValue === actionTypes.SUBMIT_STATUS ? actionTypes.APPROVE_STATUS : actionTypes.SUBMIT_STATUS;
        appaction.field = field.toUpperCase();
        appaction.by =   user.idnum;
        updateGrid(appaction);
    }

    const onBtnRejectClicked = () => {
        let appaction = {};
        let field = Object.keys(dtHeader[0])
                    // eslint-disable-next-line array-callback-return
                    .find(key => {
                        if((key === 'spv1' || key === 'spv2') && dtHeader[0][key] ===  user.idnum) {
                            return true;
                        }
                    });  
        appaction.status = actionTypes.REJECT_STATUS;
        appaction.field = field.toUpperCase();
        appaction.by =   user.idnum; 
        updateGrid(appaction);
    }

    const ButtonsReject = () => {
        if(modeValue === actionTypes.SUBMIT_STATUS){
            return(
                <Button 
                    elementAttr={{'id':'MBtnReject', 'class':'theme-bg2' }}
                    width={35}
                    height={35}
                    hint={ 'REJECT'} 
                    disabled={sDetail.length < 1}
                    icon='feather icon-user-x'
                    onClick={(e) => { onBtnRejectClicked(e) }}
                /> 
            )
        }
        else{
            return null;
        }
    }


    return (
        <>
            <Button 
                elementAttr={{'id':'MBtnApprove', 'class':'theme-bg mr-1' }}
                width={35}
                height={35}
                hint={ modeValue === actionTypes.SUBMIT_STATUS ? 'APPROVE' : 'UNAPPROVE'} 
                disabled={sDetail.length < 1}
                icon='feather icon-user-check'
                onClick={(e) => { onBtnApproveClicked(e) }}
            />   
           {ButtonsReject()}        
        </>
    )
}

export default React.memo(MobileBtnAppr)
