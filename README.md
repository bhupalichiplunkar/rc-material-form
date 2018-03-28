Form : Architecture Proposal
Class : Form
State : {
	errors: {},
	this.form : {}
}

Props : {
    	title : String | Required,
        description : String | Optional | Default: Null,
        onSubmit : Function | Required, [Called only if no field errors are present]
        layout: *Vertical / Horizontal | Optional | Default: Horizontal,
        hasSections : *True / False | Optional | Default: false,
        fieldSet :  Array | Required 
}

————————————————————— fieldSets structure explanation + example ———————————————————————

fieldSet = [
		{
			name: String | Required,
            type: String |Required [Have various form field types that map to input type eg: texture, text, number, etc],	options : { 
				rules/constraints : array | Optional [if not present, no validation for this field],			initialValue
                errors : []
            }
		}, ….
]

use validate.js to validate/formulate these rules mentioned in fields


————————————————————————————— individual fields ———————————————————————————

GetFormField/EnhancedFormField : HOC 

This HoC will accept individual field from field set and with a switch case on form field type return an enhanced field with proper event handlers and set initial value as well. (Event handlers to propagate errors/values of respective fields in to actual form and reflect it in the form state) 

——————————————————— wrapper over original Material UI components ——————————————————————

This wrapper will be component with respective props passed down to Material UI component. This wrapper will ensure that all components have the same structure. 
Ie 

Title  							hint
Placeholder/text
help/error text