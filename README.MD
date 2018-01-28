Chapter 09 - NumInput and DateInput

- create NumInput.jsx and DateInput.jsx to hold number and date value objects in stead of regular 'input' element
- input field: value has always to be a string. so we need help methods to convert between num/date and string

- NumInput: 
-- onChange: whenever user inputs has changed, onChange will be triggered to update state.value
-- onBlur: when it is unfocused, onBlur will be triggered. And it will trigger onChanged in the parent object (IssueEdit) and pass state.value to it.
-- String and Num Transformation

- DateInput:
-- state: added focused and valid
--- focused: if it is true and value is null, display placeholder in the date input field
--- valid: validate it in this level, this value will be passed to parent to display error message.
-- onChange: same as above
-- onBlur: similar. but will reset focused value and pass valid value to parenet (IssueEdit) via onValidityChange. (this.props.onValidityChange(e, valid);)
-- String and Date Transformation PLUS display string transformation. NOTE: from parent passed in date object, in state.value date object will always be transformed to be a string. 

- IssueEdit:
-- state.invalidFields oject to store invalid fields.
-- onValidityChange will be trigged by DateInput onBlur method when input is invalid. then it will add or remove fields from invalidFields. 
-- render: {validationMessage} checks on invalidFields count. if > 1 this will be a formated error message. else it will be ''.

