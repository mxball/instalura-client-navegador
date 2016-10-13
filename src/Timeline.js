import React, { Component } from 'react';
import FotosBox from './Fotos';
import Busca from './Busca'
import EsperandoResposta from './EsperandoResposta'
import Infos from './Infos'

export default class Timeline extends Component {
  render() {
    return (
      <div className="main">

        <header className="header container">
          <h1 className="header-logo">
            Instalura
          </h1>       
        <Infos/>
        <Busca/>
        <EsperandoResposta/>
          <nav>
            <ul className="header-nav">
              <li className="header-nav-item">
                <a href="#">
                  ♡
                  {/**                 ♥**/}
                  {/** Quem deu like nas minhas fotos?**/}
                </a>
              </li>
            </ul>
          </nav>          
        </header>      
        <FotosBox login={this.props.params.login}/>
      </div>
    );
  }
}