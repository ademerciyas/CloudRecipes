import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from "../../actions/authActions";
import TextfieldGroup from "../common/TextfieldGroup";


class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            avatar: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            avatar: this.state.avatar,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="register container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Register</h1>
                        <form onSubmit={this.onSubmit}>
                            <label>Email Address</label>
                            <TextfieldGroup placeholder="Email Address"
                                            name="email"
                                            value={this.state.email}
                                            type="email"
                                            onChange={this.onChange}
                                            error={errors.email}
                                            required/>

                            <label>Username</label>
                            <TextfieldGroup placeholder="Username"
                                            name="username"
                                            value={this.state.username}
                                            type="username"
                                            onChange={this.onChange}
                                            error={errors.username}
                                            required/>

                            <label>Avatar</label>
                            <TextfieldGroup placeholder="Avatar"
                                            name="avatar"
                                            value={this.state.avatar}
                                            type="avatar"
                                            onChange={this.onChange}
                                            error={errors.avatar}
                                            required/>

                            <label>Password</label>
                            <TextfieldGroup placeholder="Password"
                                            name="password"
                                            value={this.state.password}
                                            type="password"
                                            onChange={this.onChange}
                                            error={errors.password}
                                            required/>

                            <label>Password Again</label>
                            <TextfieldGroup placeholder="Password"
                                            name="password2"
                                            value={this.state.password2}
                                            type="password"
                                            onChange={this.onChange}
                                            error={errors.password2}
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {registerUser})(withRouter(Register));
