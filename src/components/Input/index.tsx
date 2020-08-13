import React, {InputHTMLAttributes} from 'react';

import './styles.css';

//esse input pode receber todos os inputs padrões de um html
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label: string;
}

const Input: React.FC<InputProps> = ({label, name, ...rest}) =>{ //rest -> Todas as propriedades restantes
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest}/>
        </div>
    );
}

export default Input;