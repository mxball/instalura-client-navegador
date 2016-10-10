import React, { Component } from 'react';
import FotosBox from './Fotos';
import Busca from './Busca'
import EsperandoResposta from './EsperandoResposta'

export default class Timeline extends Component {
  render() {
    return (
      <div className="main">

        <header className="header container">
          <h1 className="header-logo">
            Instalura
          </h1>
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
        <FotosBox/>
      </div>
    );
  }
}