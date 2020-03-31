import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import { DoLogOut } from '../../../../../store/actions/authAction';
import NtfListRightSide from './NotificationList/NtfListRightSide/NtfListRightSide';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import NtfListDropDown  from '../NavRight/NotificationList/NtfListDropDown';
import { toogleNotificationList, getNewNotification }  from '../../../../../store/actions/ntfAction'

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import { useHistory } from 'react-router-dom';

function NavRight() {

    const contentWidth = document.getElementById('root').clientWidth;

    let ulClass = ['navbar-nav', 'mbl-mode'];
    if (contentWidth >= 575) {
        ulClass = ['navbar-nav', 'dsk-mode', 'ml-auto'];
    }
    
    const dispatch = useDispatch();
    const history = useHistory();

    const rtlLayout = useSelector(state => state.layout.rtlLayout);
    const userName = useSelector(state=> state.auth.authenticatedUser.name);
    const userMail = useSelector(state => state.auth.authenticatedUser.email);
    const listOpen = useSelector(state => state.ntf.toogleList);
    const selectedDB = localStorage.getItem('_agno');
    var toDay = new Date();
    const selectedDBY = toDay.getFullYear().toString().substring(0, 2) + localStorage.getItem('_dby');
    const onLogout = () =>{ dispatch(DoLogOut(history)); }

    const dsTopNotification = useSelector(state => state.ntf.dsTopNotification);
    useEffect(() => {
        dispatch(getNewNotification());
    }, [])
    return (
        <Aux>
        <ul className={ulClass.join(' ')}>
            <li>
                <Dropdown alignRight={!rtlLayout} className="drp-notify">
                    <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                        <span className="p1 fa-stack fa-1x has-badge" data-count={dsTopNotification.length}>
                            <i className="icon feather icon-bell"></i>
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu alignRight className="notification">
                        <NtfListDropDown dsList={dsTopNotification}/>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
            <li>
                <Dropdown alignRight={!rtlLayout} className="drp-user">
                    <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                        <i className="icon feather icon-user"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu alignRight className="profile-notification">
                        <div className="pro-head">
                            <img src={Avatar1} className="img-radius" alt="User Profile"/>
                            <span>{userName}</span>
                            <a href={DEMO.BLANK_LINK} className="dud-logout" onClick={onLogout} title="Logout">
                                <i className="feather icon-log-out"/>
                            </a>
                        </div>
                        <ul className="pro-body">
                            <li>
                                <a href={DEMO.BLANK_LINK} className="dropdown-item">
                                <i className="feather icon-mail"/> {userMail} </a>
                            </li>
                            <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="fa fa-database"/> { selectedDB } </a></li>
                            <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-calendar"/> { selectedDBY }</a></li>
                            {/* <li><a href={DEMO.BLANK_LINK} className="dropdown-item displayChatbox" onClick={() => {setListOpen(true);}} ><i className="feather icon-mail"/> My Messages</a></li> */}

                        </ul>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        </ul>
        <NtfListRightSide listOpen={listOpen} closed={() => { dispatch(toogleNotificationList()) }} />
    </Aux>
    )
}
export default React.memo(NavRight);




