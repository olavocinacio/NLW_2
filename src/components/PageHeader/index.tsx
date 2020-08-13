import React from 'react';
import {Link} from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps{
    title: string; //Propriedade obrigatória
    description?:string;//Propridedade não obrigatória
}//Define as propriedades de tipagem de um objeto

const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    //Existe um componente PageHeader do tipo FunctionComponent da biblioteca React
    //Os componentes desse são PageHeaderProps
    return (
        <header className="page-header">
        <div className="top-bar-container">
            <Link to="/">
                <img src={backIcon} alt="voltar"/>
            </Link>
            <img src={logoImg} alt="Proffy"/>
        </div>
        <div className="header-content">
            <strong>{props.title}</strong> 
            { props.description && <p>{props.description}</p>}
            {props.children}
        </div>
    </header>
    ); //Linha 27 -> se a props.description existe, cria-se uma div p para colocar a mesma
}

export default PageHeader;