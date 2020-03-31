//import firebase from 'firebase';
import axios from 'axios';
import config from '../../config';
import * as actionTypes from '../types/ntfType'

export const initFirebase = () =>{
//   var firebaseConfig = {
//     apiKey: "AIzaSyA5GdAGgiMVMSlivndKEcS4ItUWhVxEpCo",
//     projectId: "approval-notification",
//     appId: "1:495915625146:web:0756392997ca12a6b87083",
//     messagingSenderId: "495915625146"
//   };
//   firebase.initializeApp(firebaseConfig);
//   return firebase;
}

const getDeviceInfo = () => {
  var module = {
    options: [],
    header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
    dataos: [
        { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
        { name: 'Windows', value: 'Win', version: 'NT' },
        { name: 'iPhone', value: 'iPhone', version: 'OS' },
        { name: 'iPad', value: 'iPad', version: 'OS' },
        { name: 'Kindle', value: 'Silk', version: 'Silk' },
        { name: 'Android', value: 'Android', version: 'Android' },
        { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
        { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
        { name: 'Macintosh', value: 'Mac', version: 'OS X' },
        { name: 'Linux', value: 'Linux', version: 'rv' },
        { name: 'Palm', value: 'Palm', version: 'PalmOS' }
    ],
    databrowser: [
        { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
        { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
        { name: 'Safari', value: 'Safari', version: 'Version' },
        { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
        { name: 'Opera', value: 'Opera', version: 'Opera' },
        { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
        { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
    ],
    init: function () {
        var agent = this.header.join(' '),
            os = this.matchItem(agent, this.dataos),
            browser = this.matchItem(agent, this.databrowser);
        
        return { os: os, browser: browser };
    },
    matchItem: function (string, data) {
        var i = 0,
            j = 0,
            regex,
            regexv,
            match,
            matches,
            version;
        
        for (i = 0; i < data.length; i += 1) {
            regex = new RegExp(data[i].value, 'i');
            match = regex.test(string);
            if (match) {
                regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                matches = string.match(regexv);
                version = '';
                if (matches) { if (matches[1]) { matches = matches[1]; } }
                if (matches) {
                    matches = matches.split(/[._]+/);
                    for (j = 0; j < matches.length; j += 1) {
                        if (j === 0) {
                            version += matches[j] + '.';
                        } else {
                            version += matches[j];
                        }
                    }
                } else {
                    version = '0';
                }
                return {
                    name: data[i].name,
                    version: parseFloat(version)
                };
            }
        }
        return { name: 'unknown', version: 0 };
    } 
  };
  var e = module.init();
  return e;
}

export const askForPermissioToReceiveNotifications = async (username) => {
//   try {
//     const messaging = firebase.messaging();
//     await messaging.requestPermission();
//     const token = await messaging.getToken();
//     console.log("token :", token);
//     localStorage.setItem("ntfc-token", token);
    
//     // fDB.collection('registered').add({ //for using firestore
//     //   username,
//     //   token,
//     //   created_at: new Date(),
//     //   updated_at: new Date()
//     // });
    

//     const axiosConfig = {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('_sid')}`,
//             agno: localStorage.getItem('_agno'),
//             divno: localStorage.getItem('_divno'),
//             dby: localStorage.getItem('_dby'),
//         }
//     }

//     const device = getDeviceInfo();

//     const body = {
//       idnum: localStorage.getItem('_uid'),
//       os: device.os.name,
//       oversion: device.os.version,
//       browser: device.browser.name,
//       bversion: device.browser.version,
//       token
//     }

//     axios.post(`${config.apiURL}registered`, body, axiosConfig)
//     .then(res => {
//         return token;            
//     })
//     .catch(e => console.error(e))
//   } catch (error) {
//     console.error(error);
//   }
};

const tbNTF = [
    { opr:'180001', oprname: 'EPSYLON', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020001', title:'New Approval', body:'Data need to approve APVN.2020001', createdat:'3/13/2020 12:45:01 PM', updateat:'3/13/2020 12:45:01 PM', status:0 }, 
    { opr:'180001', oprname: 'EPSYLON', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020002', title:'New Approval', body:'Data need to approve APVN.2020002', createdat:'3/13/2020 12:30:12 PM', updateat:'3/13/2020 12:30:12 PM', status:0 }, 
    { opr:'180002', oprname: 'JHON', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020003', title:'New Approval', body:'Data need to approve APVN.2020003',    createdat:'3/13/2020 12:25:02 PM', updateat:'3/13/2020 12:25:02 PM', status:0 }, 
    { opr:'180002', oprname: 'JHON', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020004', title:'New Approval', body:'Data need to approve APVN.2020004',    createdat:'3/13/2020 11:10:11 AM', updateat:'3/13/2020 11:10:11 AM', status:0 }, 
    { opr:'180004', oprname: 'RICA', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020005', title:'New Approval', body:'Data need to approve APVN.2020005',    createdat:'3/13/2020 10:33:41 AM', updateat:'3/13/2020 10:33:01 AM', status:0 }, 
    { opr:'180006', oprname: 'ANGELA', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020006', title:'New Approval', body:'Data need to approve APVN.2020006',  createdat:'3/13/2020 09:10:32 AM', updateat:'3/13/2020 09:10:32 AM', status:0 }, 
    { opr:'180007', oprname: 'YUNA', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020007', title:'New Approval', body:'Data need to approve APVN.2020007',   createdat:'3/13/2020 09:26:14 AM', updateat:'3/13/2020 12:11:04 PM', status:1 }, 
    { opr:'180008', oprname: 'EDWARD', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020008', title:'New Approval', body:'Data need to approve APVN.2020008', createdat:'3/13/2020 09:26:14 AM', updateat:'3/13/2020 12:11:04 PM', status:1 }, 
    { opr:'180008', oprname: 'EDWARD', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020009', title:'New Approval', body:'Data need to approve APVN.2020009', createdat:'3/13/2020 09:26:14 AM', updateat:'3/13/2020 12:11:04 PM', status:1 }, 
    { opr:'180007', oprname: 'YUNA', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020010', title:'New Approval', body:'Data need to approve APVN.2020010',   createdat:'3/13/2020 09:11:04 AM', updateat:'3/13/2020 12:11:04 PM', status:1 }, 
    { opr:'180008', oprname: 'EDWARD', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020011', title:'New Approval', body:'Data need to approve APVN.2020011', createdat:'3/12/2020 12:11:04 PM', updateat:'3/12/2020 01:11:04 PM', status:2 }, 
    { opr:'180005', oprname: 'YOO', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020012', title:'New Approval', body:'Data need to approve APVN.2020012', createdat:'3/12/2020 12:11:04 PM', updateat:'3/12/2020 01:11:04 PM', status:2 }, 
    { opr:'180007', oprname: 'YUNA', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020007', title:'New Approval', body:'Data need to approve APVN.2020007',   createdat:'3/13/2020 09:26:14 AM', updateat:'3/13/2020 12:11:04 PM', status:1 }, 
    { opr:'180008', oprname: 'EDWARD', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020008', title:'New Approval', body:'Data need to approve APVN.2020008', createdat:'3/13/2020 09:26:14 AM', updateat:'3/13/2020 12:11:04 PM', status:1 }, 
    { opr:'180008', oprname: 'EDWARD', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020009', title:'New Approval', body:'Data need to approve APVN.2020009', createdat:'3/13/2020 09:26:14 AM', updateat:'3/13/2020 12:11:04 PM', status:1 }, 
    { opr:'180007', oprname: 'YUNA', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020010', title:'New Approval', body:'Data need to approve APVN.2020010',   createdat:'3/13/2020 09:11:04 AM', updateat:'3/13/2020 12:11:04 PM', status:1 }, 
    { opr:'180008', oprname: 'EDWARD', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020011', title:'New Approval', body:'Data need to approve APVN.2020011', createdat:'3/12/2020 12:11:04 PM', updateat:'3/12/2020 01:11:04 PM', status:2 }, 
    { opr:'180005', oprname: 'YOO', spv:'180001', spvname:'EPSYLON', apvno:'APV.2020012', title:'New Approval', body:'Data need to approve APVN.2020012', createdat:'3/12/2020 12:11:04 PM', updateat:'3/12/2020 01:11:04 PM', status:2 }, 
    
];

const tbREG =[
    {idnum:'180001', username:'EPSYLON', os:'Windows', oversion:'6.1', browser:'Chrome', bversion:'80.03987132', createdat:'03/11/2020', updateat:'03/11/2020', token:'f1-YEEJOfS8VEw5jHa9IUU:APA91bEVYo4KkJbxCWxW5vUtxpIC0wRHGuDt1sqNR2OQY1fKWdV3g5UBaZ3PqitYrOFQtf9aAJiBu4wfEw-9A5MFiqAgxacMRrkXL9Q2Yec6rdMTGTOuwZ8fNBnAR4H5XcgEOW6wW0r2'}

]


export const getAllNotification = () => (dispatch) =>  {
    // let url = `${config.apiURL}ntf/${localStorage.getItem('_uid')}`;
    // return axios.get(url)
    //        .then(res => {

    //         })
    //         .catch(err => {

    //         });
    dispatch({type: actionTypes.CHANGE_NTF, payload: tbNTF});
}


export const getNewNotification = () => (dispatch) =>  {
//    const  axiosConfig = {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('_sid')}`,
//             agno: localStorage.getItem('_agno'),
//             divno: localStorage.getItem('_divno'),
//             dby: localStorage.getItem('_dby'),
//         }
//     }
//     let url = `${config.apiURL}ntf/new/${localStorage.getItem('_uid')}`;
//     return axios.get(url, axiosConfig)
//            .then(res => {
//                dispatch({type: actionTypes.CHANGE_TOP_NTF, payload: res.data})
//             })
//             .catch(err => {

//             });
        const comp = (a, b) => { return new Date(b.createdat).getTime() - new Date(a.createdat).getTime(); }    
        const f = tbNTF.filter(v => v.status === 0).sort(comp);//.slice(0, 4);;
        dispatch({type: actionTypes.CHANGE_TOP_NTF, payload: f});
}

export const toogleNotificationList = () => dispatch => {
    dispatch({type: actionTypes.TOOGLE_LIST });
}