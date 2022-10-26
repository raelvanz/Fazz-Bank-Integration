import React from 'react'
import Form from 'react-bootstrap/Form';
import { InputFieldProps } from "./InputField.type"

export const Datepicker: React.FC<InputFieldProps> = ({label, name, handleChangeField}: InputFieldProps) => {
    return (
        <React.Fragment>
            <Form.Label>{label}</Form.Label>
            <Form.Control type="text" name={name} onChange={handleChangeField}/>
        </React.Fragment>
    );
};

export default Datepicker;