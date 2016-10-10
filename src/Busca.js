import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js'

export default class Busca extends Component {
	
	constructor(){
		super();
		this.state = {busca : ''}
		this.envia = this.envia.bind(this);
		this.onChangeBusca = this.onChangeBusca.bind(this);
	}

	onChangeBusca(e){
		this.setState({busca : e.target.value});
	}

	envia(event){
		event.preventDefault();

		var value = this.state.busca;
		$.ajax({
			beforeSend: () => {
				PubSub.publish('mensagem', 'carregando');
			},
			url: 'http://localhost:8080/api/busca?q='+ value +'&X-AUTH-TOKEN='+localStorage.getItem("auth-token"),
			type: 'GET',
			dataType: 'json',
			success: (resposta) => {
				this.setState({busca:''});
				PubSub.publish('pesquisa',resposta);
				if (resposta.length >0) {
					PubSub.publish('mensagem', '');
				}
				else {
					PubSub.publish('mensagem', 'Não encontrado');
				}
			},
			error: (resposta) => {		
				console.log(resposta);
			}
		});		
	}

	render(){
		return(
          <form className="header-busca" onSubmit={this.envia}>
            <input type="text" onChange={this.onChangeBusca} value={this.state.busca} placeholder="Pesquisa" className="header-busca-campo"/>
            <input type="submit" value="Buscar" className="header-busca-submit"/>
          </form>
		)
	}
}