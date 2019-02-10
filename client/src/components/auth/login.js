import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from "../../actions/authActions";
import TextfieldGroup from '../common/TextfieldGroup';


class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData)
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="register container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Login</h1>
                        <form onSubmit={this.onSubmit}>
                            <label>Email</label>
                            <TextfieldGroup placeholder="Email Address"
                                            name="email"
                                            value={this.state.email}
                                            type="email"
                                            onChange={this.onChange}
                                            error={errors.email}
                                            required/>

                            <label>Password</label>
                            <TextfieldGroup placeholder="Password"
                                            name="password"
                                            value={this.state.password}
                                            type="password"
                                            onChange={this.onChange}
                                            error={errors.password}
                                            pattern=".{8, 20}"
                                            title="8 to 20 characters"
                                            required/>
                            <input type="submit"
                                   className="btn btn-primary  btn-block" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);
