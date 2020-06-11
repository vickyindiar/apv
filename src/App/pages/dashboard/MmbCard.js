import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import { SelectBox } from 'devextreme-react/select-box'
import { fetchDataMMB, updatePeriodMMB } from '../../../store/actions/dashAction';
import PieChart, { Series, Label, Connector } from 'devextreme-react/pie-chart';
import config from '../../../config';
import { saveToLS } from '../../../store/helper/localStorage';
import moment from 'moment';
import { isEmpty } from 'react-redux-firebase';


function MmbCard({initRef}) {
    const dispatch = useDispatch();
    const dsMmb = useSelector(state => state.dash.dsMmb);
    const mmbPeriod = useSelector(state => state.dash.mmbPeriod);
    const user = useSelector(state => state.auth.authenticatedUser);
    const contentWidth = document.getElementById('root').clientWidth;
    const toggleVisibility = (item) => {
         item.isVisible() ? item.hide() : item.show(); 
        }
    const pointClickHandler = (e) => {
         this.toggleVisibility(e.target);
         }
    const legendClickHandler = (e) => {
         let arg = e.target;
         let item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
         toggleVisibility(item);
    }

    const onChangePeriod = (e) => {
        let cD = new Date('20' + user.dby, e.value, 1);
        let start = moment(cD).startOf('month').format('YYYY-MM-DD');
        let end = moment(cD).endOf('month').format('YYYY-MM-DD');
        let now = new Date();
        if(end > now ){ end = now; }
        dispatch(fetchDataMMB(start, end));
        dispatch(updatePeriodMMB(new Date(start)));
        saveToLS('rgl-8', 'mmbPeriod', {start: start, end: end});
    }


     if(contentWidth <= 575 && !isEmpty(initRef.current)){ initRef.current.instance.render();}


   // const colorPallete = ['#35f2ed', '#37bad6', '#5a5d87', '#373c67', '#2b2954', '#1DE2BE', '#1DC7E5'];
    const customizeText = (arg) => { return `${arg.percentText}`; }
    return (
        <Card className='Mmb-card h-100'>
        <Card.Header>
          
              <div className="row">
                <div className="col-7 p-0">
                  <Card.Title as='h5'>Monthly Media Billing</Card.Title>
                </div>
                <div className="col-5">
                 <div className="mmb-period float-right p-0 m-0" onMouseDown={ e => e.stopPropagation() }>
                    <SelectBox 
                          dataSource={config.dsMmbPeriod}
                          displayExpr="name"
                          valueExpr="value"
                          width={'100%'}
                          defaultValue={ mmbPeriod.getMonth().toString() }
                          onValueChanged={ onChangePeriod }
                          searchEnabled={false}
                      />
                  </div>
                </div>
              </div>
     
        </Card.Header>
        <Card.Body className='px-0 py-2 h-75'>
            <PieChart ref={initRef} id="pie-mmb" dataSource={dsMmb} palette={'Ocean'} onPointClick={pointClickHandler} onLegendClick={legendClickHandler} >
                    <Series argumentType="doughnut" argumentField="vehicle" valueField="total" >
                        <Label visible={true} format="largeNumber" customizeText={customizeText}> > <Connector visible={true} width={1} /> </Label>
                    </Series>
                    {/* <Size height={'100%'} width={600} /> */}
            </PieChart>   
        </Card.Body>
    </Card>  
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(MmbCard, areEqual)
