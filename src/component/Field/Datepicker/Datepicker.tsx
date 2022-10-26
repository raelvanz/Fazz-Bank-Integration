import React from 'react'
import Form from 'react-bootstrap/Form'
import { DatepickerProps } from "./Datepicker.types"

export const Datepicker: React.FC<DatepickerProps> = ({label, name, handleChangeDatePicker}: DatepickerProps) => {
    return (
        <React.Fragment>
            <Form.Label>{label}</Form.Label>
            <Form.Control type="date" name={name} placeholder="Enter email" onChange={handleChangeDatePicker}/>
        </React.Fragment>
    )
}

export default Datepicker