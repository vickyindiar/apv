import React, { useState, useEffect } from 'react'
import { Popup } from 'devextreme-react/popup';
import { useDispatch, useSelector } from "react-redux";
import { changePreview } from '../../../store/actions/apvAction';
import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';


const PreviewDetail = () => {
    const [popupVisible, setPopupVisible] = useState(false);

    const dispatch = useDispatch();
    const img = useSelector(state => state.apv.imgCellPreview);
    const pdf = useSelector(state => state.apv.pdfCellPreview);

    useEffect(()=> { 
        if(img !== null){
            const viewer = new Viewer(document.getElementById('img-preview'), {
                inline: false,
                zIndex: 999999,
                navbar: false,
                toolbar: false,
                viewed() {
                  viewer.zoomTo(0.75);
                  viewer.move(0, 100);
                },
                hidden(){
                   viewer.destroy();
                   dispatch(changePreview('img', null));
                }
            });
            viewer.show();
        }
        else if(pdf !== null){
            setPopupVisible(true);
        }
    }, [img, pdf]);
    return (
        <>  
            <div id="img-preview-container">
                <img id="img-preview" src={img} alt=""/>
            </div>

            <Popup
                visible={popupVisible}
                onHiding={ () => { setPopupVisible(false);  dispatch(changePreview('pdf', null)); } }
                dragEnabled={false}
                closeOnOutsideClick={true}
                showTitle={true}
                title="Information"
                width={"70vw"}
                height={"80vh"}
            >
                <embed src={pdf} width="100%" height="100%"/>

            </Popup>
        </>
    )
}

export default React.memo(PreviewDetail);
