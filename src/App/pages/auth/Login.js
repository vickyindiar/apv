import React, {useState } from 'react';
import './../../../assets/scss/custom/_auth.scss';
import { Button } from 'devextreme-react/button';
import { TextBox, Button as TextBoxButton } from 'devextreme-react/text-box';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Validator, RequiredRule, CustomRule } from 'devextreme-react/validator'; 
import ValidationGroup from 'devextreme-react/validation-group';
import { Card } from 'react-bootstrap';
import * as actionType from '../../../store/types/authType';
import isEmpty from '../../../store/helper/isEmpty';
import { DoLogin, SetupTokenData } from '../../../store/actions/authAction';
// import { askForPermissioToReceiveNotifications } from '../../../store/actions/ntfAction';

function Login({location}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const lsrc = isEmpty(location.state) ? location.search : location.state.from.search;
    const UrlParam = new URLSearchParams(lsrc);
    const pToken = UrlParam.get('tid');
    const isUserValid = useSelector(state => state.auth.isUserValid);
    const errorUserMsg = useSelector(state => state.auth.errorUserMsg);
    const isPassValid = useSelector(state => state.auth.isPassValid);
    const errorPassMsg = useSelector(state => state.auth.errorPassMsg);

    const [userName, setUserName] = useState('epsylon@epsylonhome.com');
    const [pass, setPassword] = useState('Epsylon/2013');
    const [passMode, setPassMode] = useState('password');
    
    const valueNameChanged = (e) => {
       if(!isUserValid){
        dispatch({ type: actionType.CHANGE_USERNAME_VALID, payload: { isUserValid: true, errorUserMsg: '' } } )
       }
       setUserName(e.value)
    }

    const valuePassChanged = (e) => {
        if(!isPassValid){
            dispatch({ type: actionType.CHANGE_PASSWORD_VALID, payload: { isPassValid: true, errorPassMsg: '' } } )
        }
       setPassword(e.value);
    }

    const onSubmitLogin = (e) => {
       const checkValid =  e.validationGroup.validate();
       if(checkValid.isValid){
        dispatch(DoLogin({username: userName, password: pass} ))
        .then(result => {
           if(result){
            if(!isEmpty(pToken)){
                dispatch(SetupTokenData(pToken))
                .then(res =>{
                    if(!localStorage.getItem('ntfc-token')){
                        // askForPermissioToReceiveNotifications(localStorage.getItem('_uid')); 
                    }
                    if(res) history.push(`/approval?tid=${pToken}`);
                });
            }
            else{
                history.push('/selectdb');
            }
           } 
        });
       }
    }

    const passwordButton = {
        icon:  passMode === 'password' ? 'feather icon-eye' : 'feather icon-eye-off',
        type: 'default',
        onClick: () => {
            let mode = passMode === 'password' ? 'text' : 'password';
            setPassMode(mode);
        }
    }

    const userValidationCallback = (e) => { return isUserValid; }
    const passValidationCallback = (e) => { return isPassValid; }

    return (
        <>
          <ValidationGroup>
          <Card className="auth-card">
                <Card.Body className="text-center">
                    <div className="mb-4">
                        <i className="feather icon-unlock auth-icon"/>
                    </div>
                    <h3 className="mb-4 title-card-auth">Login</h3>
                    <div className="mb-3">
                      <TextBox 
                            name="username"
                            defaultValue={userName}
                            showClearButton={true}
                            stylingMode='outlined'
                            placeholder="Username"
                            valueChangeEvent="keyup"
                            onValueChanged={valueNameChanged} >
                            <Validator >
                            
                                <RequiredRule message="Username is required" />
                                <CustomRule 
                                   message={errorUserMsg} 
                                   validationCallback={userValidationCallback}
                                />
                            </Validator>

                        </TextBox>
                    </div>
                    <div className="mb-4">
                        <TextBox 
                           name="password"
                            mode={passMode}
                            defaultValue={pass}
                            showClearButton={true}
                            stylingMode='outlined'
                            placeholder="Password"
                            valueChangeEvent="keyup"
                            onValueChanged={valuePassChanged} >
                                   <TextBoxButton
                                     name="password-button"
                                     location="after"
                                     options={passwordButton}
                                    />
                                    <Validator>
                                        <RequiredRule message="Password is required" />
                                        <CustomRule 
                                            message={errorPassMsg} 
                                            validationCallback={passValidationCallback}
                                        />
                                    </Validator>
                        </TextBox>
                  
                    </div>
                    <div className="form-group text-left">
                        <div className="checkbox checkbox-fill d-inline">
                            <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials </label>
                        </div>
                    </div>
                        <Button 
                            elementAttr={{'id':'btnLogin', 'class':'theme-bg mb-4 shadow-2' }}
                           // width={120}
                            height={40}
                            text={'Login'} 
                            type={'default'}
                            onClick={ onSubmitLogin }
                        />   
                </Card.Body>
            </Card>
            </ValidationGroup>
        </>
    )
}

export default React.memo(Login);