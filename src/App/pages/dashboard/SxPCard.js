//Sales vs Payment
import React from 'react';
import {useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Chart, Series, CommonSeriesSettings, Export, Legend, Size, AdaptiveLayout } from 'devextreme-react/chart';
import { isEmpty } from 'react-redux-firebase';

const SxPCard = ({initRef}) => {
    const dsSxP = useSelector(state => state.dash.dsSxP);
    const contentWidth = document.getElementById('root').clientWidth;
    if(contentWidth <= 575 && !isEmpty(initRef.current)){ initRef.current.instance.render();}
    return (
        <Card className='Recent-Users h-100'>
            <Card.Header>
                <Card.Title as='h5'>Sales vs Payment</Card.Title>
            </Card.Header>
            <Card.Body className='px-0 py-2 h-75'>
                <Chart id="chart-sxp" ref={initRef} palette="Material" dataSource={dsSxP}>
                    <CommonSeriesSettings argumentField="cperiod" type="area" />
                    <Series valueField="n_invoice" name="Invoice" color="#01a9ac"></Series>
                    <Series valueField="n_payment" name="Payment"  color="#9575CD"></Series>
                    {/* <ArgumentAxis valueMarginsEnabled={false} /> */}
                    <Legend verticalAlignment="bottom" horizontalAlignment="center" />
                    <Export enabled={false} />
                    <Size height="75%" />
                    <AdaptiveLayout width={200} keepLabels={false}/>
                </Chart>
            </Card.Body>
        </Card>  
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(SxPCard, areEqual)
