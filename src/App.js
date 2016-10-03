import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <form>
          <input type="text" name="search"/>
        </form>
        <ul>
          <li><a href="">Quem deu like nas minhas fotos?</a></li>
        </ul>
        <div className="fotos"> 
               
          <div className="foto">
            <div className="foto-header">
              <img src="https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-19/11199408_569104449895751_1837574990_a.jpg" alt="foto do usuario"/>
              <span>Nome do usuario</span>
              <span>12m</span>
            </div>
            <img className="foto-src" src="https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-15/e35/14374164_331475697200143_8405760329853698048_n.jpg?ig_cache_key=MTM0NzQxNjQ4NDE5NjA4NzQwNw%3D%3D.2"/>
            <div className="foto-info">
              <ul className="fotos-info-likes">
                <li>alots_ssa</li>
                <li>rafael_rollo</li>
              </ul> 
              <ul className="foto-info-comments">
                <li>Autor : blabkabkba</li>
                <li>Seguidor : comentario do seguidor</li>
              </ul>                    
            </div>
            <div className="foto-atualizacoes">
              <form className="foto-atualizacoes-novo-like">
                <input type="image" value="coracao"/>
              </form>
              <form className="foto-atualizacoes-novo-comentario">
                <input type="text" value="" placeholder="novo comentario"/>
                <input type="submit" value="enviar"/>
              </form>               
            </div>
          </div>  

        </div>
      </div>
    );
  }
}

export default App;
