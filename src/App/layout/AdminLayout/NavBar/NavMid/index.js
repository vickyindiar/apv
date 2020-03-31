import React from 'react';


const MobileBtnAppr = React.lazy(() => import(/* webpackChunkName: "grid-show" */'../../../../pages/approval/Toolbar/MobileBtnAppr'));


function NavMid() {
    // const contentWidth = document.getElementById('root').clientWidth;
    let MobileBtnAction = ['nav-item'];
    // if (contentWidth >= 575) {
    //     MobileBtnAction = [...MobileBtnAction, 'd-none'];
    // }
    return (
        <ul className='navbar-nav ml-auto'>
            <li className={MobileBtnAction.join(' ')}>
                <MobileBtnAppr />
            </li>
        </ul>
    )
}

export default React.memo(NavMid)


