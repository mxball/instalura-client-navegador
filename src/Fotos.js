import React, { Component } from 'react';
import $ from 'jquery';

export default class FotosBox extends Component {

	constructor(){
		super();
		this.state = {fotos : []};
	}

	componentDidMount(){	   
	   $.ajax({
	        url:"http://localhost:8080/api/fotos/1",
	        dataType: 'json',
	        success: (resposta) => {	          
	          this.setState({fotos:resposta});
	        },
	        error: (resposta) => {
	       		console.log("erro  "+resposta) 	;
	        }
	      } 
	    );          		
	}

	render() {		
		return (		
        <div className="fotos"> 
        {
        	this.state.fotos.map((foto) => {
        		return <FotoItem key={foto.id} foto={foto}/>
        	})        	
        }	
        </div>			
		);
	}
}

class FotoItem extends Component {
	render(){
		return (
          <div className="foto">
          	<FotoHeader/>
            <img alt="foto" className="foto-src" src={this.props.foto.url}/>
            <FotoInfo/>
            <FotoAtualizacoes/>
          </div>  			
		);
	}
}

class FotoHeader extends Component {
	render(){
		return (
            <div className="foto-header">
              <img src="https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-19/11199408_569104449895751_1837574990_a.jpg" alt="foto do usuario"/>
              <span>Nome do usuario</span>
              <span>12m</span>
            </div>			
		);
	}
}

class FotoInfo extends Component {
	render(){
		return(
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
		);
	}
}

class FotoAtualizacoes extends Component {
	render(){
		return (
            <div className="foto-atualizacoes">
              <form className="foto-atualizacoes-novo-like">
                <input type="image" value="coracao"/>
              </form>
              <form className="foto-atualizacoes-novo-comentario">
                <input type="text" value="" placeholder="novo comentario"/>
                <input type="submit" value="enviar"/>
              </form>               
            </div>			
		);
	}
}