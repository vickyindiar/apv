import React from 'react'
import { useDispatch } from 'react-redux';
import DEMO from "../../../../../../store/constant";
import Avatar1 from '../../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../../assets/images/user/avatar-2.jpg';
import Avatar3 from '../../../../../../assets/images/user/avatar-3.jpg';
import Avatar4 from '../../../../../../assets/images/user/avatar-4.jpg';
import Avatar5 from '../../../../../../assets/images/user/avatar-5.jpg';

import Moment from 'react-moment';
import { toogleNotificationList } from '../../../../../../store/actions/ntfAction'

function NtfListDropDown({dsList}) {
    const dispatch = useDispatch();
    const CalTime = (created) =>{
        return (<Moment fromNow>{created}</Moment>)
    }
    const limitViewDsList = dsList.slice(0, 4);
    const GetAvatar = (opr) => {
        if (opr === '180001') return Avatar1
        else if(opr === '180002') return Avatar2
        else if(opr === '180004') return Avatar3
        else if(opr === '180005') return Avatar4
        else if(opr === '180006') return Avatar3
        else if(opr === '180007') return Avatar5
        else if(opr === '180008') return Avatar2
        else return Avatar1
    }

    const list = () => {
        const result = [];
        let titleFirst, titleSecond;
        if (!dsList) {
            return null
        }
        else{
            limitViewDsList.map((v, i) => {
                let item = (
                    <li className="notification" key={i}>
                    <div className="media">
                        <img className="img-radius" src={GetAvatar(v.opr)} alt="Generic placeholder"/>
                        <div className="media-body">
                            <p><strong>{v.oprname}</strong>
                             <span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"/>{CalTime(v.createdat)}</span></p>
                            <p>New approval submit </p>
                            <p> { v.apvno } </p>
                        </div>
                    </div>
                  </li>
                )

                if(i === 0){
                    titleFirst = (<li className="n-title" key={`title ${i}`}> <p className="m-b-0">NEW</p> </li>)
                    result.push(titleFirst, item);
                }
                else if(i === 1){
                    titleSecond = (<li className="n-title" key={`title ${i}`}> <p className="m-b-0">EARLIER</p> </li>);
                    result.push( titleSecond, item );
                }
                else{
                    result.push( item );
                }

            })
        }
        return result;
    }


    return (
        <>
         <div className="noti-head">
            <h6 className="d-inline-block m-b-0">Notifications</h6>
            <div className="float-right">
                <a href={DEMO.BLANK_LINK} className="m-r-10">mark as read</a>
                <a href={DEMO.BLANK_LINK}>clear all</a>
            </div>
        </div>
        <ul className="noti-body">
            { list() }
        </ul>
        <div className="noti-footer">
            <a href={DEMO.BLANK_LINK} onClick={() => { dispatch(toogleNotificationList()) }}>show all</a>
        </div>
        </>
    )
}

export default React.memo(NtfListDropDown)
