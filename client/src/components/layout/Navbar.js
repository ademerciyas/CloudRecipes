import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from "../../actions/authActions";
import {clearProfile} from "../../actions/profileActions";


class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearProfile();
        this.props.logoutUser();

    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link"
                       href="#"
                       onClick={this.onLogoutClick.bind(this)}>
                        <img className="rounded-circle"
                             src={user.avatar}
                             style={{width: '25px', marginRight: '5px'}}/>
                        Logout
                    </a>
                </li>
            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Cloud Recipes</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">

                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = ({
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
});

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {logoutUser, clearProfile})(Navbar);
