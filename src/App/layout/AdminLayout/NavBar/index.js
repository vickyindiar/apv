import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import NavMid from './NavMid';
import Aux from "../../../../hoc/_Aux";
import DEMO from "../../../../store/constant";
import * as actionTypes from "../../../../store/types/layoutType";
import brandlogo from '../../../../assets/images/sysad-logo.png';


class NavBar extends Component {
    render() {
        const contentWidth = document.getElementById('root').clientWidth;
        let rightOnNavBar = '';
        let rightOnHeader = '';


        if (contentWidth <= 575) {
            rightOnNavBar =  this.props.showToolMode ? ( <NavMid/> ) : null;
            rightOnHeader = ( <NavRight rtlLayout={this.props.rtlLayout} />)
        }
        else{
            rightOnHeader = null;
            rightOnNavBar = ( <NavRight rtlLayout={this.props.rtlLayout} /> )
        }

        let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', this.props.headerBackColor];
        if (this.props.headerFixedLayout) {
            headerClass = [...headerClass, 'headerpos-fixed'];
        }

        let toggleClass = ['mobile-menu'];
        if (this.props.collapseMenu) {
            toggleClass = [...toggleClass, 'on'];
        }

        return (
            <Aux>
                <header className={headerClass.join(' ')}>
                    <div className="m-header">
                        <a className={toggleClass.join(' ')} id="mobile-collapse1" href={DEMO.BLANK_LINK} onClick={this.props.onToggleNavigation}><span/></a>
                        <a href={DEMO.BLANK_LINK} className="b-brand">
                            <img id="brand-logo" src={brandlogo} alt=""/>
                            <span className="b-title">Approval</span> 
                        </a>
                        { rightOnHeader }  
                    </div>
                    <a className="mobile-menu" id="mobile-header" href={DEMO.BLANK_LINK}><i className="feather icon-more-horizontal"/></a>
                    <div className="collapse navbar-collapse">
                        <NavLeft/>
                        { rightOnNavBar }
                    </div>
                </header>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        rtlLayout:          state.layout.rtlLayout,
        headerBackColor:    state.layout.headerBackColor,
        headerFixedLayout:  state.layout.headerFixedLayout,
        collapseMenu:       state.layout.collapseMenu,
        showToolMode:       state.apv.showToolMode
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);
