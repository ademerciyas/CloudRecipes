import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextfieldGroup = ({name, placeholder, label, error, info, type, onChange, disabled}) => {
    return (
        <div className="form-group">
            <input type={type}
                   className={classnames('form-control', {
                       'is-invalid': error
                   })}
                   placeholder={placeholder}
                   name={name}
                   onChange={onChange}
                   disabled={disabled}/>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}

        </div>
    );
};

TextfieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
};

TextfieldGroup.defaultProps = {
    type: 'text'
};

export default TextfieldGroup;