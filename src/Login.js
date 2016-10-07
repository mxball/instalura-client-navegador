import React, { Component } from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router'


export default class Login extends Component {

	constructor() {
		super();
		this.state = {login: '', senha: ''};
		this.envia = this.envia.bind(this);
	} 

	onChangeInput(nomeInput, e) {
		this.setState({[nomeInput]: e.target.value});
	}
	
	envia(event){		
		event.preventDefault();

		var login = this.state.login.trim();
		var senha = this.state.senha.trim();
		console.log(login);
		console.log(senha);
		$.ajax({
			url: 'http://localhost:8080/api/public/login',
			type: 'POST',
			data: JSON.stringify({login: login, senha: senha}),
			contentType: 'application/json',
			success: (resposta) => {
				localStorage.setItem('auth-token', resposta);
				this.setState({login: '', senha: ''});				
				browserHistory.push("/timeline");				
			},
			error: (resposta) => {		
				console.log(resposta);
			}
		});		
	}

	render() {
		return (
			<form onSubmit={this.envia}>
				<input type="text"  value={this.state.login} onChange={this.onChangeInput.bind(this,'login')}/>
				<input type="password" value={this.state.senha} onChange={this.onChangeInput.bind(this,'senha')} />	
				<input type="submit" value="Login" />
			</form>
		);
	}
}