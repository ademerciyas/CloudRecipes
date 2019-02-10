import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {createRecipe} from "../../actions/recipeActions";
import RecipeForm from "./RecipeForm";

class CreateRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            amount: 0,
            pg: 0,
            vg: 0,
            strength: 0,
            suggestedSteepTime: 0,
            flavors: [],
            displayFlavors: false,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const recipeData = {
            name: this.state.name,
            amount: this.state.amount,
            pg: this.state.pg,
            vg: this.state.vg,
            strength: this.state.strength,
            suggestedSteepTime: this.state.suggestedSteepTime,
            flavors: this.state.flavors
        };
        this.props.createRecipe(recipeData, this.props.history)
    }

    /*    addFlavor() {
            let container = document.getElementById("recipeForm");
            let input = document.createElement("input");
            input.placeholder = "Flavor 1";
            input.name = "flavor";
            input.type = "text";
            container.appendChild(input);
        }*/

    render() {
        const {errors} = this.state;
        return (
            <div className="create-recipe">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Recipe</h1>
                            <RecipeForm
                                onSubmit={this.onSubmit}
                                onChange={this.onChange}
                                name={this.state.name}
                                amount={this.state.amount}
                                pg={this.state.pg}
                                vg={this.state.vg}
                                strength={this.state.strength}
                                suggestedSteepTime={this.state.suggestedSteepTime}
                                flavors={this.state.flavors}
                                errors={errors}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateRecipe.propTypes = {
    createRecipe: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    recipe: state.recipe,
    errors: state.errors
});

export default connect(mapStateToProps, {createRecipe})(withRouter(CreateRecipe));
