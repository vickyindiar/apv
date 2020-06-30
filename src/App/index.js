import React, { useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from './layout/Loader';
import Aux from "../hoc/_Aux";
import PrivateRoute from "../hoc/_PrivateRoute/PrivateRoute";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.final-custom-dark.css';
import 'devextreme/dist/css/dx.material.final-custom.css';
import { AuthorizationCheck } from '../store/actions/authAction';
import { CHANGE_THEME } from '../store/types/layoutType';

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

 function App() {
    const dispatch = useDispatch(); 
    const location = useLocation();
    const history = useHistory();
    const selectedTheme = useSelector(state => state.layout.layoutType);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isLoad = useSelector(state => state.auth.firstLoad);
    useEffect(() => {
        if(!localStorage.getItem('theme')){
            localStorage.setItem('theme', 'default');
            // themes.current(localStorage.getItem('theme') === 'default' ? 'dx.material.final-custom' : 'dx.material.final-custom-dark' );
        }
        if( localStorage.getItem('theme') !== selectedTheme ){
            dispatch({type: CHANGE_THEME, theme:  localStorage.getItem('theme')});
        }
        if (!isAuthenticated) {
            dispatch(AuthorizationCheck(history, location));
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const menu = routes.map((route, index) => {
        return (route.component) ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                    <route.component {...props} />
                )} />
        ) : (null);
      });

      const content = () => {
          if (isLoad) {
             return null;
          }
          else{
              return(
                  <Aux>
                  <ScrollToTop>
                      <Suspense fallback={<Loader/>}>
                          <Switch>
                              {menu}
                              <PrivateRoute path="/" auth={isAuthenticated} component={AdminLayout} />
                          </Switch>
                      </Suspense>
                  </ScrollToTop>
              </Aux>
              )
          }
      }
    return (
        content()
    )
}
const areEqual = (prevProps, nextProps) => true;
export default React.memo(App, areEqual)
