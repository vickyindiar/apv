import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SxPCard from './SxPCard';
import SbMCard from './SbMCard';
import MmbCard from './MmbCard';
import MbCard from './MbCard';
import YBCard from './YBCard';
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';
import { WidthProvider, Responsive } from "react-grid-layout";
import { updateDashLayout } from '../../../store/actions/dashAction';
import isEmpty from '../../../store/helper/isEmpty';
import moment from 'moment';
import { fetchDataSxP, fetchDataMMB,  fetchDataMb, fetchDataSbM } from '../../../store/actions/dashAction';
import { getFromLS, saveToLS } from '../../../store/helper/localStorage';
import LockButton from './LockButton';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Dashboard() {
  const dispatch = useDispatch();
  const dashLayout = useSelector(state => state.dash.dashLayout);
  const dashItems = useSelector(state => state.dash.dashItems);
  const dashLocked = useSelector(state => state.dash.dashLocked);
  const refSxp = React.createRef();
  const refSbm = React.createRef();
  const refMmb = React.createRef();
  const refMb = React.createRef();
  const refYb = React.createRef();
  const contentWidth = document.getElementById('root').clientWidth;


  useEffect(() => {
    let start, startYear;
    let end, endYear;
    let now = new Date();
    let cur = getFromLS('rgl-8', 'mmbPeriod');
    let cD = new Date('20' + localStorage.getItem('_dby'), now.getMonth(), 1);

    if(cur){
        start = moment(cur.start).format('YYYY-MM-DD');
        end = moment(cur.end).format('YYYY-MM-DD');
    }
    else{
        start = moment(cD).startOf('month').format('YYYY-MM-DD');
        end = moment(cD).endOf('month').format('YYYY-MM-DD');
     
        if(end > now ){ end = now; }
    }
    startYear = moment(cD).startOf('year').format('YYYY-MM-DD');
    endYear = moment(cD).endOf('year').format('YYYY-MM-DD');
 
    dispatch(fetchDataMb(startYear, endYear));
    dispatch(fetchDataSbM());
    dispatch(fetchDataMMB(start, end));
    dispatch(fetchDataSxP(startYear, endYear)); 

  }, []);

  let ulClass = ['layout'];
  if (dashLocked) {
      ulClass = ['layout', 'dashLocked'];
  }

  const changeLayout = (layout, layouts) =>{
    if(!isEmpty(refSxp.current)){ refSxp.current.instance.render();}
    if(!isEmpty(refSbm.current)){ refSbm.current.instance.render();}
    if(!isEmpty(refMmb.current)){ refMmb.current.instance.render();}
    if(!isEmpty(refMb.current)){ refMb.current.instance.render();}
    if(!isEmpty(refYb.current)){ refYb.current.instance.render();}
    saveToLS("rgl-8","layouts", layouts);
    dispatch(updateDashLayout({layouts}));
  }


  const getElement = (key) =>{
    const dataGrid = [
      { w: 6, h: 10, x: 0, y: 0, minW: 2, minH: 3, static: dashLocked },
      { w: 12, h: 10, x: 0, y: 10, minW: 2, minH: 4, static: dashLocked},
      { w: 6, h: 10, x: 0, y: 20, minW: 2, minH: 4, static: dashLocked },
      { w: 6, h: 10, x: 6, y: 20, minW: 2, minH: 3,  static: dashLocked },
      { w: 6, h: 10, x: 6, y: 0, minW: 2, minH: 3, static: dashLocked }
    ]


    if(key === 1){      return( <div key={1} data-grid={{...dataGrid[0]}}> <MmbCard initRef={refMmb}/> </div> )  }
    else if(key === 2){ return( <div key={2} data-grid={{...dataGrid[1]}}> <MbCard initRef={refMb}/> </div> )                      }
    else if(key === 3){ return( <div key={3} data-grid={{...dataGrid[2]}}> <YBCard initRef={refYb} /> </div> )                      }
    else if(key === 4){ return( <div key={4} data-grid={{...dataGrid[3]}}> <SxPCard initRef={refSxp} /> </div> )  }
    else if(key === 5){ return( <div key={5} data-grid={{...dataGrid[4]}}> <SbMCard initRef={refSbm}/> </div> )   }
    else { return( <div key={1} data-grid={{...dataGrid[1]}}> <MmbCard initRef={refMmb}/> </div> ) }

  }

  const showingItems = () => {
    let items = [];
    dashItems.forEach(element => {
      if(element.isShow){ items.push(getElement(element.keyComponent)) }
    });
    saveToLS("rgl-9","items", dashItems);
    return items;
  }
  return (
      <>
        <ResponsiveReactGridLayout className={ulClass.join(' ')}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={dashLayout} 
          onLayoutChange={ (layout, layouts) => { changeLayout(layout, layouts) }} 
        > 
          {
             showingItems()
          }
        </ResponsiveReactGridLayout>
        {/* <LockButton /> */}
      </>

    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(Dashboard, areEqual )
