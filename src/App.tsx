//Sempre deve ser importada, mesmo se não utilizada
import React from 'react';
//Importando landing page
import Landing from './pages/landing/index';
//Importando CSS
import "./assets/Styles/global.css";


//Metodologia "Mobile First"
//Primeiro se desenvolve a versão mobile e depois faz-se adaptações de responsividade


//JSX -> JavaScript + XML
//Componente React -> Função que retorna um HTML
//Componentes são criados para serem reaproveitados
//O nome dos componentes deve sempre iniciar com maiúscula
function App() {
  return (
    <Landing />
  );
}

export default App;
