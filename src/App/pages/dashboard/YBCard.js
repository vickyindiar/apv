import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import PieChart, { Series, Label, Connector } from 'devextreme-react/pie-chart';
import { isEmpty } from 'react-redux-firebase';

function YBCard({initRef}) {
    const dsYb = useSelector(state => state.dash.dsYb);
    const contentWidth = document.getElementById('root').clientWidth;
    const toggleVisibility = (item) => { item.isVisible() ? item.hide() : item.show(); }
    const pointClickHandler = (e) => { this.toggleVisibility(e.target); }
    const legendClickHandler = (e) => {
        let arg = e.target;
        let item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
        toggleVisibility(item);
    }
    const customizeText = (arg) => { return `${arg.percentText}`; }
    if(contentWidth <= 575 && !isEmpty(initRef.current)){ initRef.current.instance.render();}
    return (
        <Card className='yB-card h-100'>
        <Card.Header>
            <Card.Title as='h5'>Yearly Billing</Card.Title>
        </Card.Header>
        <Card.Body className='px-0 py-2 h-75'>
            <PieChart ref={initRef} id="pie-yb" dataSource={dsYb} palette={'Ocean'} onPointClick={pointClickHandler} onLegendClick={legendClickHandler} >
                    <Series argumentType="doughnut" argumentField="el" valueField="data" >
                        <Label visible={true} format="largeNumber" customizeText={customizeText}> > <Connector visible={true} width={1} /> </Label>
                    </Series>
                    {/* <Size height={'100%'} width={600} /> */}
            </PieChart>   
        </Card.Body>
        </Card>  
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(YBCard, areEqual)
