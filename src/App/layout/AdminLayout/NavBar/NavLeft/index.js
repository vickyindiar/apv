import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Dropdown} from 'react-bootstrap';
import windowSize from 'react-window-size';

// import NavSearch from './NavSearch';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import * as actionTypes from "../../../../../store/types/layoutType";
import { changeTools } from '../../../../../store/actions/apvAction';
const GridMode = React.lazy(() => import(/* webpackChunkName: "grid-mode" */'../../../../pages/approval/Toolbar/GridMode'));
const GridShow = React.lazy(() => import(/* webpackChunkName: "grid-show" */'../../../../pages/approval/Toolbar/GridShow'));
const ButtonAction = React.lazy(() => import(/* webpackChunkName: "grid-show" */'../../../../pages/approval/ButtonAction'));


class NavLeft extends Component {

    render() {
        let iconFullScreen = ['feather'];
        iconFullScreen = (this.props.isFullScreen) ? [...iconFullScreen, 'icon-minimize'] : [...iconFullScreen, 'icon-maximize'];

        let navItemClass = ['nav-item'];
        if (this.props.windowWidth <= 575) {
            navItemClass = [...navItemClass, 'd-none'];
        }
        // let dropdownRightAlign = false;
        // if (this.props.rtlLayout) {
        //     dropdownRightAlign = true;
        // }

        let ToolGridModeClass = ['nav-item'];
        if(!this.props.showToolMode){ ToolGridModeClass = [...ToolGridModeClass, 'd-none']; }

        let ToolGridShowClass  = ['nav-item'];
        if(!this.props.showToolShow){ ToolGridShowClass = [...ToolGridShowClass, 'd-none']; }

        let ToolBtnAction = ['nav-item'];
        if(!this.props.showToolMode) { ToolBtnAction = [...ToolBtnAction, 'd-none']; }

        return (
            <Aux>
                {/* <ul className="navbar-nav mr-auto"> */}
                <ul className="navbar-nav mr-auto">
                    <li><a href={DEMO.BLANK_LINK} className="full-screen" onClick={this.props.onFullScreen}><i className={iconFullScreen.join(' ')} /></a></li>
                    {/* <li className={navItemClass.join(' ')}>
                        <Dropdown alignRight={dropdownRightAlign}>
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                Dropdown
                            </Dropdown.Toggle>
                            <ul>
                                <Dropdown.Menu>
                                    <li><a className="dropdown-item" href={DEMO.BLANK_LINK}>Action</a></li>
                                    <li><a className="dropdown-item" href={DEMO.BLANK_LINK}>Another action</a></li>
                                    <li><a className="dropdown-item" href={DEMO.BLANK_LINK}>Something else here</a></li>
                                </Dropdown.Menu>
                            </ul>
                        </Dropdown>
                    </li>
                    <li className="nav-item"><NavSearch/></li> */}
                    <li className={ navItemClass.length > 1 ? navItemClass.join(' ') : ToolGridModeClass.join(' ')  } > MODE </li>
                    <li className={ToolGridModeClass.join(' ')} >
                        <GridMode />
                    </li>
                    <li className={navItemClass.length > 1 ? navItemClass.join(' ') : ToolGridShowClass.join(' ')}> SHOW </li>
                    <li className={ToolGridShowClass.join(' ')}>
                         <GridShow />
                    </li>
                    <li className={navItemClass.length > 1 ? navItemClass.join(' ') : ToolBtnAction.join(' ')}>
                         <ButtonAction />
                    </li>
            
                </ul>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFullScreen: state.layout.isFullScreen,
        rtlLayout:    state.layout.rtlLayout,
        showToolMode: state.apv.showToolMode,
        showToolShow: state.apv.showToolShow
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreen: () => dispatch({type: actionTypes.FULL_SCREEN}),
        visibleToolMode: (value) => dispatch(changeTools({showToolMode: value})),
        visibleToolShow: (value) => dispatch(changeTools({showToolShow: value}))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(NavLeft));
