import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {DoLogOut} from '../../../store/actions/authAction';
import {useHistory} from 'react-router-dom';
import Loader from '../../layout/Loader'

function Logout() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        dispatch(DoLogOut(history));
    })
    return (
        <>
           <Loader /> 
        </>
    )
}

export default React.memo(Logout)
