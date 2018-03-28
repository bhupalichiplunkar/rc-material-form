import React, { Component } from 'react';
import Button from 'material-ui/Button';
import EnhancedInput from './input-hoc';
import TextInput from './input-text';
import ValidateForm from './validate';


const DeduceEnhancedComponents = function(fields){
    let fieldComponents = [], formData = {}
    fields.forEach(field => {
        const comp = EnhancedInput(TextInput, field);
        fieldComponents.push(comp);
        let initialValue = "";
        if(field.options && field.options.initialValue) initialValue = field.options.initialValue
        formData[field.name] = initialValue;
    })
    return {
        fieldComponents,
        formData
    }
}


class Form extends Component{
    constructor(props){
        super(props);
        this.state={
            errors : {},
            formData : {},
            fieldComponents:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount(){
        const {fields} = this.props;
        const {fieldComponents, formData} = DeduceEnhancedComponents(fields);
        this.setState({fieldComponents, formData});
    }

    validateForm(){
        const {fields} = this.props;
        const {formData} =this.state;
        return ValidateForm(fields, formData);
    }

    handleFormChange(input){
        const {formData} = this.state;
        const {fields} = this.props;
        const key = Object.keys(input)[0];
        const field = fields.find(elm=>elm.name === key);
        field.options.initialValue = input[key];
        this.setState({ formData : {...formData, ...input}});
    }

    handleSubmit(e){
        let {errors, formData} = this.state;
        const {onSubmit} = this.props;
        e.preventDefault();
        errors = this.validateForm() || {};
        if(Object.keys(errors).length === 0){
            this.setState({errors}, ()=>onSubmit(formData));
        } else {
            this.setState({errors});
        }
    }

    render(){
        const {fieldComponents, errors} = this.state;
        return (
            <form onSubmit={this.handleSubmit} >
                {
                    fieldComponents.map( (EnhancedInput, index) => ( 
                        <EnhancedInput key={index} handleFormChange = {this.handleFormChange} errors={errors}/>
                    ))
                }
                <br /><br />
                <Button variant="raised" color="primary" onClick={this.handleSubmit}>Submit</Button>
            </form>
        )
    }
}

export default Form;