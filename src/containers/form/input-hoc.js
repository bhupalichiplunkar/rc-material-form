import React, {Component} from 'react'

function EnhancedInput(WrappedComponent, field){
    return class extends Component{

        constructor(props){
            super(props);
            this.propogateInputChange= this.propogateInputChange.bind(this);
        }

        propogateInputChange(input){
            this.props.handleFormChange(input);
        }

        render(){
            const {errors} = this.props;
            return (<WrappedComponent field={field} changeListener={this.propogateInputChange} errors={errors[field.name]}/>)
        }
    }
}

export default EnhancedInput;