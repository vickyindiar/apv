import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Card } from 'react-bootstrap';
import { Switch } from 'devextreme-react/switch';
import { updateDashItems, setLockedDash, updateDashLayout } from '../../../store/actions/dashAction';
import { saveToLS, getFromLS } from '../../../store/helper/localStorage'

function SettingDashboard() {

    const dispatch = useDispatch();
    const dashItems = useSelector(state => state.dash.dashItems);
    const dashLocked = useSelector(state => state.dash.dashLocked);

    const changeValue = (e) => {
        dispatch(updateDashItems({keyComponent : parseInt(e.element.attributes.key.value), isShow: e.value}))
    }

    const changeLockedInStorage = (layouts, value) => {
        let result = {...layouts}
        for (let index = 0; index < Object.keys(layouts).length; index++) {
            let key = Object.keys(layouts)[index];
            result[key].forEach(element => {
                element.static = value;
            });
        }
        saveToLS('rgl-8', 'layouts', result);
    }

    const changeValueLock = (e) => {
            let layouts = getFromLS('rgl-8', 'layouts');
            changeLockedInStorage(layouts, e.value);
            dispatch(setLockedDash(e.value));
            layouts = getFromLS('rgl-8', 'layouts');
            dispatch(updateDashLayout(layouts));
            saveToLS('rgl-8', 'dashLock', e.value);
    }

    return (
            <Card className='card-setting-dashboard'>
                <Card.Header>
                    <Card.Title as='h5'>Dashboard</Card.Title>
                </Card.Header>
                <Card.Body className='px-10 py-2'>
                <div className="dx-fieldset">
                    <div className="dx-field">
                        <div className="dx-field-label">Lock Dashboard</div>
                        <div className="dx-field-value">
                               <Switch defaultValue={dashLocked}  onValueChanged={changeValueLock}  />
                        </div>
                    </div>
                 </div>
                <div className="dx-fieldset">
                    <div className="dx-field">
                        <div className="dx-field-label">Monthly Media Billing</div>
                        <div className="dx-field-value">
                               <Switch defaultValue={dashItems[0].isShow} elementAttr={{id:'mmb', key:1} }  onValueChanged={changeValue}  />
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-label">Monthly Billing</div>
                        <div className="dx-field-value">
                                 <Switch defaultValue={dashItems[1].isShow} elementAttr={{id:'mb', key:2} }  onValueChanged={changeValue} />
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-label">Yearly Billing</div>
                        <div className="dx-field-value">
                                 <Switch  defaultValue={dashItems[2].isShow} elementAttr={{id:'yb', key:3} }  onValueChanged={changeValue} />
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-label">Sales VS Payment</div>
                        <div className="dx-field-value">
                                 <Switch defaultValue={dashItems[3].isShow} elementAttr={{id:'sxp', key:4} } onValueChanged={changeValue}/>
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-label">Sales By Media</div>
                        <div className="dx-field-value">
                                 <Switch defaultValue={dashItems[4].isShow} elementAttr={{id:'sbm', key:5} }  onValueChanged={changeValue} />
                        </div>
                    </div>

                </div>
                </Card.Body>
            </Card>

    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(SettingDashboard, areEqual)
