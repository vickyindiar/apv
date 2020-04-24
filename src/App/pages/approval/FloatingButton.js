import React from 'react'
import SpeedDialAction from 'devextreme-react/speed-dial-action';
import config from 'devextreme/core/config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataByToken, fetchDataByUser, updateDetail } from '../../../store/actions/apvAction';
import * as actionTypes from '../../../store/types/apvType';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function FloatingButton() {
    const MySwal = withReactContent(Swal);

     const dispatch = useDispatch();
     const token = useSelector(state => state.apv.tokenGrid);
     const modeValue = useSelector(state => state.apv.toolModeValue);
     const dtHeader = useSelector(state => state.apv.dsHeader);
     const sDetail = useSelector(state => state.apv.selectedDetail);
     
    const dataResponse = () =>{
        let result = [];
        let opr = [...new Set(sDetail.map(v => v.opr))];

        opr.map(v => {
            let record = {};
            let detail = {};
            detail = sDetail.filter(d => d.opr === v);
            record.opr = v;
            record.detail = detail;
            result.push(record);
        })
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
              dataResponse();
              Swal.fire(
                '',
                'Your mail has been sent.',
                'success'
              )
            }
         });

    }




    const updateGrid = (appaction) =>{
            //  dispatch(updateDetail(sDetail, appaction))
            // .then(r => {
            //   if(r.data === true){
                    let msg = appaction.status ===  actionTypes.APPROVE_STATUS ? 'APPROVED' : 'UNAPPROVED';
                    let title = appaction.status ===  actionTypes.APPROVE_STATUS ? 'Approved' : 'Unapproved';
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
                                AskMail();
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
             //   } 
   //        })
    }

    const onBtnApproveClicked = () => {
        if (sDetail.length < 1) {
            MySwal.fire({
                icon: 'info',
                // title: '<div style="color:rgb(252, 3, 78)">REJECTED</div>',
                html: 'No Records Selected !',
                timer: 2000,
                timerProgressBar: false,
                showConfirmButton: false,
            });
        }  
        else{
            let appaction = {};
            let field = Object.keys(dtHeader[0])
                        .find(key => {
                            if((key === 'spv1' || key === 'spv2') && dtHeader[0][key] === localStorage.getItem('_uid')) {
                                return true;
                            }
                        });  
            appaction.status = modeValue === actionTypes.SUBMIT_STATUS ? actionTypes.APPROVE_STATUS : actionTypes.SUBMIT_STATUS;
            appaction.field = field.toUpperCase();
            appaction.by =  localStorage.getItem('_uid'); 
            updateGrid(appaction);
        }
    }




    const onBtnRejectClicked = () => {
        if (sDetail.length < 1) {
            MySwal.fire({
                icon: 'info',
                // title: '<div style="color:rgb(252, 3, 78)">REJECTED</div>',
                html: 'No Records Selected !',
                timer: 2000,
                timerProgressBar: false,
                showConfirmButton: false,
            });
        }  
        else{
            let appaction = {};
            let field = Object.keys(dtHeader[0])
                        .find(key => {
                            if((key === 'spv1' || key === 'spv2') && dtHeader[0][key] === localStorage.getItem('_uid')) {
                                return true;
                            }
                        });  
            appaction.status = actionTypes.REJECT_STATUS;
            appaction.field = field.toUpperCase();
            appaction.by =  localStorage.getItem('_uid'); 
            updateGrid(appaction);
        }
    }
    
    config({
        floatingActionButtonConfig: {
            icon: 'check',
            closeIcon: 'close',
            position: {
                of: '#grid-card-body',
                my: 'right bottom',
                at: 'right bottom',
               // offset: '-16 -16'
            }
        }
    });


    return (
        <div>
            <SpeedDialAction
                hint="REJECT"
                icon="feather icon-user-x"
                visible = { modeValue === actionTypes.SUBMIT_STATUS }
                label={'Reject'}
               // disabled={ modeValue === '1' ? false : true }
                onClick={(e) => { onBtnRejectClicked(e) }}
            />
            <SpeedDialAction
                label={ modeValue === actionTypes.SUBMIT_STATUS ? 'Approve' : 'Unapprove'}
                hint={ modeValue === actionTypes.SUBMIT_STATUS ? 'APPROVE' : 'UNAPPROVE'} 
                icon= { modeValue === actionTypes.SUBMIT_STATUS ? 'feather icon-user-check' : 'feather icon-refresh-ccw'} 
                onClick={(e) => { onBtnApproveClicked(e) }}
            /> 
        </div>
    )
}

export default React.memo(FloatingButton);
