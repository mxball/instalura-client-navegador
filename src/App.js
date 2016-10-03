import React, { Component } from 'react';
import FotosBox from './Fotos';

class App extends Component {
  render() {
    return (
      <div className="main">
        <form>
          <input type="text" name="search"/>
          <input type="submit" value="pesquisar"/>
        </form>
        <ul>
          <li><a href="">Quem deu like nas minhas fotos?</a></li>
        </ul>
        <FotosBox/>
      </div>
    );
  }
}

export default App;
