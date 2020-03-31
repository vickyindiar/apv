import React, {useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import notify from 'devextreme/ui/notify';
import Login from './Login';
import SelectDB from './SelectDB';
import '../../../assets/scss/style.scss';

function Auth() {
    const location = useLocation();
    const history = useHistory();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const showNotif = useSelector(state => state.auth.showNotif);
    const notifMsg = useSelector(state => state.auth.notifMsg);
    const notifType = useSelector(state => state.auth.notifType);
    
    useEffect(() => {
        if(showNotif && location.pathname === '/login'){
            notify(notifMsg, notifType, 5000);
        }
        
        if(isAuthenticated){
            history.push('/');
        }
    }, [])

    const content = () =>{
        if (location.pathname === '/login') {
            return (<Login location={location}/>)        
        }
        else if(location.pathname === '/selectdb') {
            return ( <SelectDB />)
        }
        else{ return (<Login />) }
    }

    return (
        <>
         <div className="auth-wrapper">
            <div className="auth-content">
                <div className="auth-bg">
                    <span className="r"/>
                    <span className="r s"/>
                    <span className="r s"/>
                    <span className="r"/>
                </div>
                {
                    content()
                }
            </div>
         </div>   
        </>
    )
}

export default React.memo(Auth);