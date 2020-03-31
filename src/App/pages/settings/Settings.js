import React from 'react';
import {Row, Col} from 'react-bootstrap';
import SettingTheme from './SettingTheme'
import SettingDashboard from './SettingDashboard';

function Setting() {

    return (
        <>
            <Row>
                <Col md={12} >          
                    <SettingTheme />
                </Col>
            </Row>
            <Row>
                <Col md={12} >   
                    <SettingDashboard />

                </Col>
            </Row>
        </>
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(Setting, areEqual)
