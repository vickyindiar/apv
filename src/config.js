import * as actionTypes from '../src/store/types/apvType';

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
);

export default {
    defaultPath: '/dashboard',
    basename: '/datta-able/react/default', // only at build time to set, like /datta-able
    layout: 'vertical', // vertical, horizontal (not available in lite version)
    preLayout: null, // (not available in lite version)
    collapseMenu: false, // mini-menu
    layoutType: 'default', // menu-dark, (menu-light, dark are not available in lite version)
    navIconColor: false,
    headerBackColor: 'header-default', // header-default, (header-blue, header-red, header-purple, header-lightblue, header-dark are not available in lite version)
    navBackColor: 'navbar-default', // navbar-default, (navbar-blue, navbar-red, navbar-purple, navbar-lightblue, navbar-dark are not available in lite version)
    navBrandColor: 'brand-default', // brand-default, (brand-blue, brand-red, brand-purple, brand-lightblue, brand-dark are not available in lite version)
    navBackImage: false, // not available in lite version
    rtlLayout: false, // not available in lite version
    navFixedLayout: true,
    headerFixedLayout: false, // not available in lite version
    boxLayout: false,
    navDropdownIcon: 'style1', // style1, (style2, style3 are not available in lite version)
    navListIcon: 'style1', // style1, (style2, style3, style4, style5, style6 are not available in lite version)
    navActiveListColor: 'active-default', // active-default, (active-blue, active-red, active-purple, active-lightblue, active-dark are not available in lite version)
    navListTitleColor: 'title-default', // title-default, (title-blue, title-red, title-purple, title-lightblue, title-dark are not available in lite version)
    navListTitleHide: false, // not available in lite version
    configBlock: false, // not available in lite version
    layout6Background : 'linear-gradient(to right, #A445B2 0%, #D41872 52%, #FF0066 100%)', // used only for pre-layout = layout-6
    layout6BackSize : '', // used only for pre-layout = layout-6
    
    
    baseURL:  isLocalhost ? 'http://localhost:8080/' : 'ISAPI.dll/',
    apiURL: isLocalhost ? 'http://localhost:8080/api/': 'ISAPI.dll/api/',
    // baseURL: 'ISAPI.dll/',
    // apiURL: 'ISAPI.dll/api/',
    dsToolMode : [
        {text: 'APPROVAL', value: actionTypes.SUBMIT_STATUS },
        {text: 'UNAPPROVAL', value:actionTypes.APPROVE_STATUS }
    ],
    dsToolShow : [
        {text: 'ALL', value:'1'},
        {text: 'TOKEN', value:'2'}
    ],

    aStatusDS : [
        { id : actionTypes.SUBMIT_STATUS,  value : "SUBMIT"},
        { id : actionTypes.REJECT_STATUS,  value : "REJECT"},
        { id : actionTypes.APPROVE_STATUS,  value : "APPROVE"},
        ],

    //DASHBOARD
    dsMmbPeriod: [
        { "abbreviation": "Jan", "name": "January", 'value': '0' },
        { "abbreviation": "Feb", "name": "February", 'value': '1' },
        { "abbreviation": "Mar", "name": "March", 'value': '2' },
        { "abbreviation": "Apr", "name": "April", 'value': '3' },
        { "abbreviation": "May", "name": "May", 'value': '4' },
        { "abbreviation": "Jun", "name": "June", 'value': '5' },
        { "abbreviation": "Jul", "name": "July", 'value': '6', },
        { "abbreviation": "Aug", "name": "August", 'value': '7' },
        { "abbreviation": "Sep", "name": "September", 'value': '8' },
        { "abbreviation": "Oct", "name": "October", 'value': '9' },
        { "abbreviation": "Nov", "name": "November", 'value': '10' },
        { "abbreviation": "Dec", "name": "December", 'value': '11' }
    ]

};
