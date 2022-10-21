import React,{FC} from 'react'
import {ButtonProps} from "./Button.types"
import ButtonBootstraps from 'react-bootstrap/Button';

export const Button: React.FC<ButtonProps> = ({name, typeButton, handleChangeProcess}: ButtonProps) => {
    return (
        <ButtonBootstraps onClick={(event) => handleChangeProcess(event)} variant={typeButton}>{name}</ButtonBootstraps>
    );
};

export default Button;