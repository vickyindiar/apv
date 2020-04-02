import React, {Suspense, useEffect} from 'react';
import {Row, Col, Card } from 'react-bootstrap';
import Loader from "../../layout/Loader";
import { changeTools, SetTrigger } from '../../../store/actions/apvAction';
import { useDispatch } from 'react-redux';
// import FloatingButton from './FloatingButton';
import isEmpty from '../../../store/helper/isEmpty';

const GridView = React.lazy(() => import(/* webpackChunkName: "grid-view" */'./GridView'));
// const ButtonAction = React.lazy(() => import(/* webpackChunkName: "button-action" */'./ButtonAction'));

function Approval({location}) {
    const dispatch = useDispatch();
    const contentWidth = document.getElementById('root').clientWidth;
    useEffect(() => {
        let UrlParam = new URLSearchParams(location.search);
        let pToken = UrlParam.get('tid');

        dispatch(SetTrigger());
        
        if(!isEmpty(pToken)){
              dispatch(changeTools({ showToolMode : true }));
              dispatch(changeTools({ showToolShow : true }));
        } 
        else{
            dispatch(changeTools({ showToolMode : true }));
        }      
        

        return () => {
            if(pToken !== undefined){
                dispatch(changeTools({ showToolMode : false }));
                dispatch(changeTools({ showToolShow : false }));
            } 
            else{
              dispatch(changeTools({ showToolMode : false }));
            } 
        }
    }, []);



    // const buttonAction = () => {
    //     if (contentWidth <= 575) {
    //         return ( <FloatingButton />)
    //     }
    //     else{
    //         return (
    //             <FloatingButton />
    //         )
    //     }
    // }

    return (
        <Row className='h-100'>
            <Col className='h-100'>
                <Card className='h-100'>
                    <Card.Body id='grid-card-body' className='px-2 py-2 h-100'>
                        <Suspense fallback={<Loader/>}>          
                             <GridView location={location}/>
                         </Suspense>
                     </Card.Body>
                 </Card>
                 {/* { buttonAction() } */}
             </Col>
         </Row>   
    )
}


const areEqual = (prevProps, nextProps) => true;
export default React.memo(Approval, areEqual);
