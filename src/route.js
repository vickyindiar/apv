import React from 'react';

const Auth = React.lazy(() => import(/* webpackChunkName: "login" */'./App/pages/auth/Auth'));

const route = [
    { path: '/login', exact: true, name: 'Login', component: Auth },
    { path: '/selectdb', exact: true, name: 'SelectDB', component: Auth },
];

export default route;