import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, ZoomAndPan, ScrollBar, ArgumentAxis } from 'devextreme-react/chart';
import { isEmpty } from 'react-redux-firebase';
// import { Button } from 'devextreme-react';
// import { Popover } from 'devextreme-react/popover';



function MbCard({initRef}) { 
  const dsMb = useSelector(state => state.dash.dsMb);
  const contentWidth = document.getElementById('root').clientWidth;
  const [endArgument, setEndArgument] = useState('December');
  // const [showInfoMB, setShowInfoMB] = useState(false);
  // const desc = ['Use mouse scroll for zoom in/out chart!', 'Pinch two fingers for zoom in/out the chart!']
  // const [descInfo, setDescInfo] = useState(0)


  if (contentWidth <= 575) {
    if(endArgument !== 'April') setEndArgument('April');  
    //if(descInfo !== 1) setDescInfo(1); 
  }
  if(contentWidth <= 575 && !isEmpty(initRef.current)){ initRef.current.instance.render();}

  const onPointClick = (e) => { e.target.select(); }
  // const animationConfig = {
  //   show: {
  //     type: 'pop',
  //     from: { scale: 0 },
  //     to: { scale: 1 }
  //   },
  //   hide: { type: 'fade', from: 1, to: 0 }
  // };
  // const onToogleViewInfo = () =>{
  //   setShowInfoMB(!showInfoMB);
  // }

    return (
        <Card className='Mb-card h-100'>
        <Card.Header>
          <div className="row">
            <div className="col-7 p-0">
              <Card.Title as='h5'>Monthly Billing</Card.Title>
            </div>
            <div className="col-5">
              <div className="mmb-period float-right p-0 m-0" onMouseDown={ e => e.stopPropagation() }>
                {/* <Button 
                  icon="feather icon-info"
                  elementAttr={{'id':'BtnInfoMB'}}
                  width={40}
                  height={40}
                  onClick={onToogleViewInfo}
                />
                <Popover target="#BtnInfoMB" position="top" width={300} visible={showInfoMB} animationConfig={animationConfig} >
                    { desc[descInfo] }
                </Popover> */}
              </div>
            </div>
          </div>
        </Card.Header>
        <Card.Body className='px-0 py-2 h-75'>
               <Chart id="chart-mb" ref={initRef}  dataSource={dsMb} onPointClick={onPointClick} >   {/*  */}
                    <CommonSeriesSettings argumentField="month" type="bar" hoverMode="allArgumentPoints" selectionMode="allArgumentPoints" >
                       <Label visible={true}> <Format type="fixedPoint billions" /* precision={2} */ /> </Label>
                    </CommonSeriesSettings>
                    <ArgumentAxis defaultVisualRange={{ startValue: 'January', endValue: endArgument }} />
                    <Series argumentField="month" valueField="media" name="Media" />
                    <Series valueField="production" name="Production" />
                    <Series valueField="others" name="Others" />
                    <ScrollBar visible={true} />
                    <ZoomAndPan argumentAxis="both" />
                    <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                </Chart>
        </Card.Body>
    </Card>  
    )
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(MbCard, areEqual)
