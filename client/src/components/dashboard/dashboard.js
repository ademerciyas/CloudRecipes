import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from "../../actions/profileActions";
import Spinner from '../common/Spinner';
import {Link} from "react-router-dom";

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;
        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner/>
        } else {
            dashboardContent = <p className="lead text-muted">Welcome {user.username}</p>
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                            <Link to="/createRecipe" className="btn btn-lg btn-info">
                                Create Recipe
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth

});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
