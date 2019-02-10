import React from "react";
import TextFieldGroup from '../common/TextfieldGroup';

const RecipeForm = ({onSubmit, onChange, name, amount, pg, vg, strength, suggestedSteepTime, flavors, errors}) => {
    return (
        <form id="recipeForm" onSubmit={onSubmit}>
            <TextFieldGroup
                placeholder="Name"
                name="name"
                type="text"
                value={name}
                onChange={onChange}
                error={errors.name}
                required/>

            <TextFieldGroup
                placeholder="Amount"
                name="amount"
                type="number"
                value={amount}
                onChange={onChange}
                error={errors.amount}
                required/>

            <TextFieldGroup
                placeholder="PG"
                name="pg"
                type="number"
                value={pg}
                onChange={onChange}
                error={errors.pg}
            />

            <TextFieldGroup
                placeholder="VG"
                name="vg"
                type="number"
                value={vg}
                onChange={onChange}
                error={errors.vg}
            />

            <TextFieldGroup
                placeholder="Strength"
                name="strength"
                type="number"
                value={strength}
                onChange={onChange}
                error={errors.strength}
            />

            <TextFieldGroup
                placeholder="Suggested Steeptime"
                name="suggestedSteepTime"
                type="number"
                value={suggestedSteepTime}
                onChange={onChange}
                error={errors.suggestedSteepTime}
            />

            <TextFieldGroup
                placeholder="Flavor"
                name="flavor"
                type="text"
                value={flavors}
                onChange={onChange}
                error={errors.flavors}
            />
            <input type="submit" value="Submit" className="btn btn-info btn-block"/>

        </form>

    )
};

export default RecipeForm;