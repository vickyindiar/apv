import React from 'react';
import { Button } from 'devextreme-react/button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataByToken, fetchDataByUser, updateDetail, sendMail } from '../../../store/actions/apvAction';
import * as actionTypes from '../../../store/types/apvType';
import Swal from 'sweetalert2';
import moment from 'moment';
import withReactContent from 'sweetalert2-react-content';

function ButtonAction() {
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
                    let msg = appaction.status === actionTypes.APPROVE_STATUS ? 'APPROVED' : 'UNAPPROVED';
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
                              //  AskMail();
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
                              //  AskMail();
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
        appaction.by =  user.idnum;
        updateGrid(appaction);
    }

    const onBtnRejectClicked = () => {
        let appaction = {};
        let field = Object.keys(dtHeader[0])
                    // eslint-disable-next-line array-callback-return
                    .find(key => {
                        if((key === 'spv1' || key === 'spv2') && dtHeader[0][key] === user.idnum) {
                            return true;
                        }
                    });  
        appaction.status = actionTypes.REJECT_STATUS;
        appaction.field = field.toUpperCase();
        appaction.by =  user.idnum;
        updateGrid(appaction);
    }


    const ButtonsReject = () => {
        if(modeValue === actionTypes.SUBMIT_STATUS){
            return(
                <Button 
                    elementAttr={{'id':'btnReject', 'class':'theme-bg2' }}
                    width={120}
                    height={40}
                    text={'REJECT'} 
                    type={'default'}
                    disabled={sDetail.length < 1}
                    onClick={(e) => { onBtnRejectClicked(e) }}
                /> 
            )
        }
        else{
            return null;
        }
    }


const AskMail = () => {
    MySwal.fire({
        icon:'question',
        title:'Test Only !!',
        html: 'Are you sure want to send email to submitter ?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            let by = user.name;
            let at = moment().format('MMMM Do YYYY');
            dispatch(sendMail(sDetail, by, at)).then( e => {
                Swal.fire( '', 'Your mail has been sent.', 'success' );
            })
        }
     });
}

    return (
        <>
            <Button 
                elementAttr={{'id':'btnApprove', 'class':'theme-bg mr-4' }}
                width={120}
                height={40}
                text={ modeValue === actionTypes.SUBMIT_STATUS ? 'APPROVE' : 'UNAPPROVE'} 
                type={'default'}
                disabled={sDetail.length < 1}
                onClick={(e) => { onBtnApproveClicked(e) }}
            />   
            {ButtonsReject()}
      
        </>
    )
}
export default React.memo(ButtonAction);
