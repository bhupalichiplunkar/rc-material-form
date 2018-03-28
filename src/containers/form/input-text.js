import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class InputText extends Component{
    constructor(props){
        super(props);
        this.state = {
            value : props.field.options.initialValue || ""
        }
    }

    handleChange = (e) => {
        const {changeListener, field} = this.props;
        const value = e.target.value
        this.setState({value});
        changeListener({[field.name] : value})
    }

    render(){
        const {field, errors} = this.props;
        const {value} = this.state;
        return (
            <div>
                <TextField
                    label={field.label}
                    value={value}
                    placeholder = {field.options.placeholder}
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {
                    errors && errors.length && errors.map((err,index)=>(<div key={index}>{err}</div>))
                }
            </div>
          );
    }
}

export default InputText;