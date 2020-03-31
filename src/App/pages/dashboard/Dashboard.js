import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Item1 from './Item1';
import Item2 from './Item2';
import Item3 from './Item3';
import SxPCard from './SxPCard';
import SbMCard from './SbMCard';
import MmbCard from './MmbCard';
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';
import { WidthProvider, Responsive } from "react-grid-layout";
import { updateDashLayout } from '../../../store/actions/dashAction';
import isEmpty from '../../../store/helper/isEmpty';
import moment from 'moment';
import { fetchDataMMB, fetchDataSbM } from '../../../store/actions/dashAction';
import { getFromLS, saveToLS } from '../../../store/helper/localStorage'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Dashboard() {
  const dispatch = useDispatch();
  const dashLayout = useSelector(state => state.dash.dashLayout);
  const dashItems = useSelector(state => state.dash.dashItems);
  const dashLocked = useSelector(state => state.dash.dashLocked);
  const refSxp = React.createRef();
  const refSbm = React.createRef();
  const refMmb = React.createRef();

  useEffect(() => {
    let start;
    let end;
    let now = new Date();
    let cur = getFromLS('rgl-8', 'mmbPeriod');
    let cD = new Date('20' + localStorage.getItem('_dby'), now.getMonth(), 1);

    if(cur){
        start = moment(cur.start).format('YYYY-MM-DD');;
        end = moment(cur.end).format('YYYY-MM-DD');
    }
    else{
        start = moment(cD).startOf('month').format('YYYY-MM-DD');
        end = moment(cD).endOf('month').format('YYYY-MM-DD');
     
        if(end > now ){ end = now; }
    }

 dispatch(fetchDataMMB(start, end)).then(e => {
   dispatch(fetchDataSbM());
 });
}, []);

  const changeLayout = (layout, layouts) =>{
    if(!isEmpty(refSxp.current)){ refSxp.current.instance.render();}
    if(!isEmpty(refSbm.current)){ refSbm.current.instance.render();}
    if(!isEmpty(refMmb.current)){ refMmb.current.instance.render();}
    saveToLS("rgl-8","layouts", layouts);
    dispatch(updateDashLayout({layouts}));
  }


  const getElement = (key) =>{
    if(key === 1){      return( <div key={1} data-grid={{ w: 6, h: 10, x: 0, y: 0, minW: 2, minH: 3, static: dashLocked }}> <MmbCard initRef={refMmb}/> </div> )  }
    else if(key === 2){ return( <div key={2} data-grid={{ w: 6, h: 5, x: 6, y: 0, minW: 2, minH: 4, static: dashLocked}}> <Item2 /> </div> )                      }
    else if(key === 3){ return( <div key={3} data-grid={{ w: 6, h: 5, x: 6, y: 5, minW: 2, minH: 4, static: dashLocked }}> <Item3 /> </div> )                      }
    else if(key === 4){ return( <div key={4} data-grid={{ w: 6, h: 10, x: 0, y: 10, minW: 2, minH: 3,  static: dashLocked }}> <SxPCard initRef={refSxp} /> </div> )  }
    else if(key === 5){ return( <div key={5} data-grid={{ w: 6, h: 10, x: 6, y: 10, minW: 2, minH: 3, static: dashLocked }}> <SbMCard initRef={refSbm}/> </div> )   }
    else { return( <div key={1} data-grid={{ w: 4, h: 3, x: 0, y: 0, minW: 2, minH: 3, static: dashLocked }}> <Item1 /> </div> ) }

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
        <ResponsiveReactGridLayout className="layout" 
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
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(Dashboard, areEqual )
