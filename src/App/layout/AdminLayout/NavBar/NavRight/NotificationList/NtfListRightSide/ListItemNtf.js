import React from 'react'
import DEMO from "../../../../../../../store/constant";
import Moment from 'react-moment';
import Avatar1 from '../../../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../../../assets/images/user/avatar-2.jpg';
import Avatar3 from '../../../../../../../assets/images/user/avatar-3.jpg';
import Avatar4 from '../../../../../../../assets/images/user/avatar-4.jpg';
import Avatar5 from '../../../../../../../assets/images/user/avatar-5.jpg';

function ListItemNtf({ds}) {
    const CalTime = (created) =>{
        return (<Moment fromNow>{created}</Moment>)
    }
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
    
    return (
        <div className={'media userlist-box ripple'} >
            <a className="media-left" href={DEMO.BLANK_LINK}>
                    <img className="media-object img-radius" src={GetAvatar(ds.opr)} alt={ds.oprname}/>
               
            </a>
            <div className="media-body">
                <h6 className="chat-header"> {ds.oprname} </h6>
                <small className="n-time text-muted float-right"><i className="icon feather icon-clock m-r-10"/>{CalTime(ds.createdat)}</small> 
                 <p className="listntf-detail p-0 m-0"> { ds.title } </p>
                 <p className="listntf-detail p-0 m-0"> { ds.apvno } </p>
            </div>
        </div>
    )
}

export default React.memo(ListItemNtf);
