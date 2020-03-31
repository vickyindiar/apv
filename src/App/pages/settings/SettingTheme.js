import React from 'react'
import { RadioGroup } from 'devextreme-react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import { CHANGE_THEME } from '../../../store/types/layoutType';

function SettingTheme() {
    const themeData = ['Default', 'Dark'];
    const dispatch = useDispatch();
    const curTheme = useSelector(state => state.layout.layoutType);
    const selectedTheme = curTheme[0].toUpperCase() + curTheme.substr(1);
    const changeTheme = (e) => {
        localStorage.setItem('theme', e.value.toLowerCase());
          dispatch({type: CHANGE_THEME, theme: e.value.toLowerCase() });
    }
    return (
        <>
            <Card className='card-setting-theme'>
                <Card.Header>
                    <Card.Title as='h5'>Theme</Card.Title>
                </Card.Header>
                <Card.Body className='px-10 py-2'>
                    <div className="dx-field">
                        <div className="dx-field-label">Select Theme</div>
                        <div className="dx-field-value">
                            <RadioGroup layout="horizontal" items={themeData} defaultValue={selectedTheme} onValueChanged={changeTheme}/>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo( SettingTheme, areEqual );
