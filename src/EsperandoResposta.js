import React, { Component } from 'react';
import PubSub from 'pubsub-js'

export default class EsperandoResposta extends Component {

	constructor(){
		super();
		this.state = {mensagem : ''}
	}

	componentWillMount(){
		PubSub.subscribe('mensagem', (topico, resposta) => {
	   		this.setState({mensagem: resposta});
	    });
	}

	render(){
		let elemento = this.state.mensagem !== '' ? <p>{this.state.mensagem}</p> : null;
		return elemento;
	}

}