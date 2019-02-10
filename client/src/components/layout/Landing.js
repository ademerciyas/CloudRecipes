import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

class Landing extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }
    render() {
        return (
            <header>
                <div className="overlay"/>
                <video playsInline="playsInline" autoPlay="autoplay" muted="muted" loop="loop"
                       src={ require( "../../video/clouds.mp4" ) }>
                </video>
                <div className="container h-100">
                    <div className="d-flex text-center h-100">
                        <div className="my-auto w-100 text-white">
                            <h1 className="display-3">Welcome to Cloud Recipes</h1>
                            <h2>The right place for delicious recipes</h2>
                            <Link type="button" className="btn btn-primary" id="btn-landing" to="/recipes">Browse Recipes</Link>
                        </div>
                    </div>
                </div>
            </header>


        );

    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps) (Landing);
