
import React,  {useState, useEffect, useRef}  from 'react';
import DataGrid, { Column, Selection, Grouping, GroupPanel, Lookup, ColumnFixing, SearchPanel, Scrolling, LoadPanel } from 'devextreme-react/data-grid';
import { useDispatch, useSelector, batch } from "react-redux";
import { fetchDataByToken, fetchDataByUser, changePreview, showLoadPanel } from '../../../store/actions/apvAction';
import config  from '../../../config';
import * as actionTypes from '../../../store/types/apvType';
import isEmpty from '../../../store/helper/isEmpty';
import GroupCellComponent from './GroupCellComponent';
import { synchronizeCheckBoxes, getGroupedColumns } from './GroupSelectionHelper';

const PriviewDetail = React.lazy(() => import(/* webpackChunkName: "preview-detail" */'./PreviewDetail'));


const GridView = ({location}) => {
    const [selectionMode, setSelectionMode] = useState('multiple');
    const [expandMode, setExpandMode] = useState(true);
    const dsDetail = useSelector(state => state.apv.dsDetail);
    const toolModeValue = useSelector(state => state.apv.toolModeValue);
    const toolShowValue = useSelector(state => state.apv.toolShowValue);
    const isLoad = useSelector(state => state.apv.showLoadPanel);
    const thisGrid = useRef(null);  
    const checkBoxGrouped = useRef([]);
    const dispatch = useDispatch();
    const UrlParam = new URLSearchParams(location.search);
    let pToken = UrlParam.get('tid');

    useEffect(() => {
        if(!isEmpty(pToken) && toolShowValue === '2'){
            batch(() =>{
                dispatch(showLoadPanel(true));
                dispatch({ type: actionTypes.CHANGE_TOKEN,  payload: { tokenGrid: pToken }});
                dispatch(fetchDataByToken(pToken, toolModeValue))
                .then((e) => {
                   if(!dsDetail){ dispatch(showLoadPanel(false)); }
                    if(toolModeValue === actionTypes.APPROVE_STATUS){
                        if(!thisGrid.current) return;
                        thisGrid.current.instance.columnOption('astatusop', 'visible', true);
                        thisGrid.current.instance.columnOption('astatusdt', 'visible', true);
                    }
                    else{
                        if(!thisGrid.current) return;
                       thisGrid.current.instance.columnOption('astatusop', 'visible', false);
                       thisGrid.current.instance.columnOption('astatusdt', 'visible', false);
                    }
                });
            });
        } 
        else{
            batch(() =>{
               dispatch(showLoadPanel(true));
               dispatch(fetchDataByUser(toolModeValue))
               .then((e) => { 
                   if(!dsDetail){ dispatch(showLoadPanel(false)); }
                   if(toolModeValue === actionTypes.APPROVE_STATUS){
                       if(!thisGrid.current) return;
                       thisGrid.current.instance.columnOption('astatusop', 'visible', true);
                       thisGrid.current.instance.columnOption('astatusdt', 'visible', true);
                   }
                   else{
                      if(!thisGrid.current) return; 
                      thisGrid.current.instance.columnOption('astatusop', 'visible', false);
                      thisGrid.current.instance.columnOption('astatusdt', 'visible', false);
                   }
                });   
            })
        }  
    },[toolModeValue, toolShowValue, thisGrid]);


    const onToolbarPreparing = (e) => {
        var dataGrid = e.component;
        var toolbarItems = e.toolbarOptions.items;
        toolbarItems.unshift(
        {
            widget: "dxButton",
            name: "btnMulti",
            locateInMenu: "auto",
            location: "after",
            sortIndex: 40,
            showText: "inMenu",
            options: {
                hint: selectionMode === 'multiple' ? "Single selection" : "Multiple selection" ,
                elementAttr: { "id": "btnMulti" },
                icon: "check", //"fa fa-check",
                text: "Multiple selection",
                onClick: (e) => { setSelectionMode(selectionMode === 'multiple' ? "single" : "multiple" ); } // this.selectionModeChanged.bind(this)
            }
        },
        {
            widget: "dxButton",
            name: "btnFilter",
            locateInMenu: "auto",
            location: "after",
            sortIndex: 40,
            showText: "inMenu",
            options: {
                hint: "Filter",
                elementAttr: { "id": "btnFilter" },
                icon: "filter", //"fa fa-filter",
                text: "Filter Row",
                onClick: function (e) {
                    var filter = dataGrid.option("filterRow.visible") === false;
                    dataGrid.option("filterRow.visible", filter);
                }
            }
        },
        {
            widget: "dxButton",
            location: "after",
            name: "btnExpand",
            locateInMenu: "auto",
            sortIndex: 40,
            showText: "inMenu",
            options: {
                hint: expandMode ? "Collapse All" : "Expand All", 
                elementAttr: { "id": "btnExpand" },
                icon: expandMode ? "collapse" : "expand",
                text: expandMode ? "Collapse All" : "Expand All",
                onClick: (e) => {
                    setExpandMode(!expandMode);
                } 
            }
        }
        );
    };

    const changeStateSelectionChange =  (e) => {
        //var key = e.selectedRowKeys;
        var grid = e.component;
        var groupedColumnNames = getGroupedColumns(grid);
        var instanceGrouped = checkBoxGrouped;
        if (groupedColumnNames.length === 0)
            return;
        dispatch({type: actionTypes.CHANGE_CUSTOM_FLAG, payload : true}); 
        synchronizeCheckBoxes(grid, e.selectedRowKeys, e.currentDeselectedRowKeys, groupedColumnNames, false, dsDetail, 'evdno', instanceGrouped);

        synchronizeCheckBoxes(grid, e.currentSelectedRowKeys, e.selectedRowKeys, groupedColumnNames, true,  dsDetail, 'evdno', instanceGrouped);

        dispatch({type: actionTypes.CHANGE_CUSTOM_FLAG, payload : false}); 
        dispatch({type: actionTypes.CHANGE_SELECTED_DETAIL, payload :{selectedDetail: e.selectedRowsData}}); 
    }



    const onContentReady = (e) => {
        if (isLoad) {
            e.component.beginCustomLoading();        
        }
        else{
            e.component.endCustomLoading();   
        }
    }

    const onCellTemplate = (container, options) => {
        let agno = localStorage.getItem('_agno');
        let divno =  localStorage.getItem('_divno');
        let dby =  localStorage.getItem('_dby');
        let sid =  localStorage.getItem('_sid');
       
        let a = document.createElement('a');
        a.text = options.data.evdno;
        a.onclick = (e) => {  
            let rowIndex = options.row.rowIndex;//dsDetail.findIndex((row, index) => {  return row.evdno === options.data.evdno });
            if (rowIndex === 2 ) {
                dispatch(changePreview('pdf', config.apiURL +"appdetails/getpreview/"+options.data.evdno+"?agno="+agno+"&divno="+divno+"&dby="+dby+"&tp=pdf&sid="+sid));       
            }
            else{
                dispatch(changePreview('img', config.apiURL +"appdetails/getpreview/"+options.data.evdno+"?agno="+agno+"&divno="+divno+"&dby="+dby+"&tp=image&sid="+sid));
            }
        }; 
        container.appendChild(a);
    }

    const onGroupRender = (e) => {
       checkBoxGrouped.current[e.rowIndex] = React.createRef();
        return(
              <GroupCellComponent gridRef ={thisGrid.current.instance} checkBoxRef={checkBoxGrouped.current[e.rowIndex]} info={e} keyFieldName={'evdno'} /> 
        )
    }
    return (
        <>                     
             <PriviewDetail />
                <DataGrid
                    ref={thisGrid}
                    id={'AppGridView'}
                    key={'evdno'}
                    dataSource={ 
                        {
                            store: {
                                type: 'array',
                                key: "evdno",
                                data: dsDetail
                            }
                        }
                    }
                    onContentReady={onContentReady }
                    columnAutoWidth={true}
                    height= {"100%"}
                    // width= {"100%"}

                    onToolbarPreparing={ onToolbarPreparing }
                    showBorders={false}
                    showColumnLines= {false}
                    showRowLines={true}
                    rowAlternationEnabled={true}
                    onSelectionChanged= {  changeStateSelectionChange  }  
                 > 

                <Scrolling mode={"virtual"} />
                <LoadPanel enabled={true}  showPane={true} />
                <GroupPanel visible={true} />
                <Grouping autoExpandAll={expandMode} />
                <SearchPanel visible={true} highlightCaseSensitive={true} />
                <Selection mode={selectionMode} selectAllMode={'allPages'} showCheckBoxesMode={'always'} allowSelectAll={true} />
                <ColumnFixing enabled={true} />
                <Column dataField="evdtype" caption= "EVDTYPE" width={80} cssClass= "row-vertical-align" groupIndex={0} groupCellRender={onGroupRender} />
                <Column dataField="apvno" caption= "APVNO" width={120} cssClass= "row-vertical-align" groupIndex={1}  groupCellRender={onGroupRender} />
    
                <Column dataField="customernm" caption= "CLIENT" width={120} cssClass= "row-vertical-align" />
                <Column dataField="evdno" caption="EVDNO" width={120} cssClass="row-vertical-align" cellTemplate={ onCellTemplate } />
                <Column dataField="astatus" caption="ASTATUS" visible={false} width={60} cssClass="row-vertical-align" >
                     <Lookup dataSource={config.aStatusDS} valueExpr="id" displayExpr="value" />
                </Column>
                <Column dataField="oprnm" visible={true} caption="SUBMIT BY" width={100} cssClass="row-vertical-align" /> 
                <Column dataField="astatusdt" visible={false} caption="APPROVE DATE" dataType="date" format="dd/MM/yyyy" width={120} cssClass="row-vertical-align" />
                <Column dataField="astatusop" visible={false} caption="APPROVE BY" width={120} cssClass="row-vertical-align" /> 
         
                <Column dataField="date" caption="DATE" dataType="date" format="dd/MM/yyyy" width={100} cssClass="row-vertical-align" />
                <Column dataField="type" caption="*" width={35} cssClass="row-vertical-align" />
                <Column dataField="ourreff" caption="REFF" width={160} cssClass="row-vertical-align" />
                <Column dataField="currency" caption="CURR" width={60} cssClass="row-vertical-align" />
                <Column dataField="amount" caption="AMOUNT" dataType="number" format={{type:"fixedPoint", precision:2}} width={130} cssClass="row-vertical-align" /> 
                <Column dataField="unpaid" caption="BALANCE" visible={false} dataType="number" format={{type:"fixedPoint", precision:2}} width={130} cssClass="row-vertical-align" />
                <Column dataField="x_unpaid" caption="X-UNPAID" visible={false} dataType="number" format={{type:"fixedPoint", precision:2}} width={130} cssClass="row-vertical-align" />
            
                <Column dataField="custno" caption="CUSTNO" width={80} visible={false} cssClass="row-vertical-align" />
                <Column dataField="brandno" caption="BRANDNO" width={80} visible={false} cssClass="row-vertical-align" />
                <Column dataField="brandnm" caption="PRODUCT" width={180} cssClass="row-vertical-align" />
            
                <Column dataField="period" caption="PERIOD" dataType="date" format="MMM yyyy" width={100} cssClass="row-vertical-align" />
                <Column dataField="remark" caption="REMARK" width={220} cssClass="row-vertical-align" />
                <Column dataField="vatno" caption="VATNO" width={120} cssClass="row-vertical-align" />
                <Column dataField="vatdt" caption="VATDATE" dataType="date" format="dd/MM/yyyy" width={100} cssClass="row-vertical-align" />
                <Column dataField="vat" caption="VAT" dataType="number" format={{type:"fixedPoint", precision:2}} width={120} cssClass="row-vertical-align" />
                <Column dataField="oprnm" caption="OPERATOR" visible={false} cssClass="row-vertical-align" alignment="center" allowSorting={false} allowGrouping={false}/>
            
                <Column dataField="received" caption="RECEIVED" visible={false} dataType="date" format="dd/MM/yyyy" width={100} cssClass="row-vertical-align" />
            
                <Column dataField="discount" caption="DISCOUNT" visible={false} width={120} cssClass="row-vertical-align" />
                <Column dataField="agfee" caption="AGFEE" visible={false} width={120} cssClass="row-vertical-align" />
                <Column dataField="agtype" caption="AGTYPE" visible={false} width={120} cssClass="row-vertical-align" />
                <Column dataField="duedays" caption="DUE DAYS" visible={false} width={120} cssClass="row-vertical-align" />
                <Column dataField="duedate" caption="DUE DATE" visible={false}  dataType="date" format="dd/MM/yyyy" width={120} cssClass="row-vertical-align" />
                <Column dataField="bankreff" caption="BANK REFF" visible={false} width={120} cssClass="row-vertical-align" />
                <Column dataField="bankacc" caption="BANK ACC" visible={false} width={80} cssClass="row-vertical-align" />
                <Column dataField="banktype" caption="BANK TYPE" visible={false} width={80} cssClass="row-vertical-align" />
                <Column dataField="exchange" caption="EXCHANGE" visible={false} width={60} cssClass="row-vertical-align" />
            
                <Column dataField="estimate" caption="ESTIMATE" visible={false} dataType="number" format={{type:"fixedPoint", precision:2}} width={130} cssClass="row-vertical-align" />
                <Column dataField="unbilled" caption="UNBILLED" visible={false} dataType="number" format={{type:"fixedPoint", precision:2}} width={130} cssClass="row-vertical-align" />
                <Column dataField="fee" caption="FEE" dataType="number" visible={false} format={{type:"fixedPoint", precision:2}} width={130} cssClass="row-vertical-align" />
                <Column dataField="dept" caption="DEPT" visible={false} width={60} cssClass="row-vertical-align" />
            
                {/* <Column dataField="astatus" caption="ASTATUS" visible={false} width={60} cssClass="row-vertical-align" >
                     <Lookup dataSource={config.aStatusDS} valueExpr="id" displayExpr="value" />
                </Column> */}
                {/* <Column dataField="astatusdt" visible={(toolModeValue === actionTypes.APPROVE_STATUS)} caption="ADATE" dataType="date" format="dd/MM/yyyy" width={100} cssClass="row-vertical-align" />
                <Column dataField="astatusop" visible={(toolModeValue === actionTypes.APPROVE_STATUS)} caption="ASTATUSOP" width={120} cssClass="row-vertical-align" />  */}
            </DataGrid>  
             
        </>
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(GridView, areEqual)