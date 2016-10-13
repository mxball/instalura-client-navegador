import React, { Component } from 'react';
var Store = require('./Store');

export default class Info extends Component {

	constructor(){
		super();
		console.log(Store);
		this.state = {likes : Store.getLike()};
		this._onChange = this._onChange.bind(this);
	}

 	componentDidMount() {
    	Store.addChangeListener(this._onChange);
  	}

  	_onChange() {
    	this.setState({likes : Store.getLike().text});
  	}

	render(){
		return (
				<p>Likes: {this.state.likes}</p>
		);	
	}

}