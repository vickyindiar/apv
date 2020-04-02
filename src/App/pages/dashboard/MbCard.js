import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import config from '../../../config';
import { Chart, Series, CommonSeriesSettings, Label, Format, Legend } from 'devextreme-react/chart';

function MbCard({initRef}) {  
  const dsMb = useSelector(state => state.dash.dsMb);
  const onPointClick = (e) => { e.target.select(); }

    return (
        <Card className='Mb-card h-100'>
        <Card.Header>
                  <Card.Title as='h5'>Monthly Billing</Card.Title>
        </Card.Header>
        <Card.Body className='px-0 py-2 h-75'>
               <Chart id="chart-mb" ref={initRef}   dataSource={dsMb} onPointClick={onPointClick} >   {/*  */}
                    <CommonSeriesSettings argumentField="month" type="bar" hoverMode="allArgumentPoints" selectionMode="allArgumentPoints" >
                    <Label visible={true}> <Format type="fixedPoint" precision={0} /> </Label>
                    </CommonSeriesSettings>
                    <Series argumentField="month" valueField="media" name="Media" />
                    <Series valueField="production" name="Production" />
                    <Series valueField="others" name="Others" />
                    <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                </Chart>
        </Card.Body>
    </Card>  
    )
}

export default MbCard
