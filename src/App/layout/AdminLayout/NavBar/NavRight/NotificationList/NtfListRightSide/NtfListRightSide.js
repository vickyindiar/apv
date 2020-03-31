import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useSelector, useDispatch} from 'react-redux';

// import Friends from './Friends';

import DEMO from "../../../../../../../store/constant";
import {getAllNotification} from '../../../../../../../store/actions/ntfAction';

import ListItemNtf from './ListItemNtf';


const NtfListRightSide = ({listOpen, closed}) => {
    const dispatch = useDispatch();
    const dsNtf = useSelector(state => state.ntf.dsNotification);
    let listClass = ['header-user-list'];
    if (listOpen) {
        listClass = [...listClass, 'open'];
    }

    useEffect(() => {
        dispatch(getAllNotification());
    }, [dsNtf]);

    const list = (dsNtf).map((f, i) => {
        return (<ListItemNtf ds={f} key={i} />)
    })  


    return (
            <div className={listClass.join(' ')}>
                <div className="h-list-header">
                    <div className="input-group">
                        <input type="text" id="search-friends" className="form-control" placeholder="Search Friend . . ." />
                    </div>
                </div>
                <div className="h-list-body">
                    <a href={DEMO.BLANK_LINK} className="h-close-text" onClick={closed}><i className="feather icon-chevrons-right" /></a>
                    <div className="main-friend-cont scroll-div">
                        <div className="main-friend-list" style={{height: 'calc(100vh - 85px)'}}>
                            <PerfectScrollbar>
                                { list }
                            </PerfectScrollbar>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default React.memo(NtfListRightSide);