import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js'

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
        <div className="fotos container">
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
          	<FotoHeader foto={this.props.foto}/>
          	<img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>            
            <FotoInfo foto={this.props.foto}/>
            <FotoAtualizacoes foto={this.props.foto}/>
          </div>  			
		);
	}
}

class FotoHeader extends Component {
	render(){
		return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <a href="#">
                    {this.props.foto.loginUsuario}
                  </a>  
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.foto.horario}</time>
            </header>			
		);
	}
}

class FotoInfo extends Component {

	constructor(){
		super();
		this.state = {likers: [], comentarios: []};
	}

	componentWillMount(){
		this.setState({
			likers : this.props.foto.likers, 
			comentarios: this.props.foto.comentarios
		});
		PubSub.subscribe('atualiza-likers', (topico,novosLikers) => {						
			this.setState({likers:novosLikers});
		});
		PubSub.subscribe('atualiza-comentarios', (topico,novosComentarios) => {						
			this.setState({comentarios:novosComentarios});
		});
	}

	render(){
		return(
            <div className="foto-info">
              <div className="foto-info-likes">

              	{
              		this.state.likers.map((liker) => {
			    		return (<a key={liker.login} href="#">
                  			{liker.login},
                		</a>)
              		})

            	}

            	{(() => {
            			return this.state.likers.length > 0 ? "curtiram" : "";
            		})()			
				}
             
              </div>

              <p className="foto-info-legenda">
                <a className="foto-info-autor">autor </a>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, illo?
              </p>


              <ul className="foto-info-comentarios">
              {
              	this.state.comentarios.map((comentario) => {
              		return (
		                <li key={comentario.texto} className="comentario">
		                  <a className="foto-info-autor">{comentario.login}</a>
		                  {comentario.texto}
		                </li>
              		)
              	})
              }
              </ul>
            </div>
		);
	}
}

class FotoAtualizacoes extends Component {

	constructor(){
		super();
		this.state = {deuLike : false};
		this.like = this.like.bind(this);
	}

	componentWillMount(){						
		this.setState({deuLike : this.props.foto.likeada});
	}

	like(event){		
		event.preventDefault();
		this.setState({deuLike : true});		
		$.ajax({
			url: 'http://localhost:8080/api/fotos/'+this.props.foto.id+'/like',
			type: 'POST',
			dataType: 'json',
			success: (resposta) => {
				PubSub.publish('atualiza-likers', resposta);
			},
			error: (resposta) => {		
				console.log(resposta);
				this.setState({deuLike : false});
			}
		});		
	}

	render(){		
		return (			
            <section className="fotoAtualizacoes">              
              <a href={'http://localhost:8080/api/foto/'+this.props.foto.id+'/like'} onClick={this.like} className={this.state.deuLike ? 'fotoAtualizacoes-like fotoAtualizacoes-like-likeado' : 'fotoAtualizacoes-like'}>Likar</a>
              <ComentarioForm foto={this.props.foto}/>
            </section>			
		);
	}
}

class ComentarioForm extends Component {
	
	constructor() {
		super();
		this.state = {comentario: ''};
		this.comment = this.comment.bind(this);
	} 

	onChangeComentario(nomeInput, e) {
		this.setState({[nomeInput]: e.target.value});
	}
	
	comment(event){		
		event.preventDefault();

		var value = this.state.comentario.trim();
		$.ajax({
			url: 'http://localhost:8080/api/fotos/'+this.props.foto.id+'/comment',
			type: 'POST',
			data: JSON.stringify({texto: value}),
			dataType: 'json',
			contentType: 'application/json',
			success: (resposta) => {
				console.log("success\n" + resposta);
				PubSub.publish('atualiza-comentarios', resposta);
			},
			error: (resposta) => {		
				console.log(resposta);
			}
		});		
	}

	render() {
		return (
          <form className="fotoAtualizacoes-form-comentario" onSubmit={this.comment}>
            <input type="text" value={this.state.comentario} placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-comentario-campo" onChange={this.onChangeComentario.bind(this, 'comentario')}/>
            <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-comentario-submit" />
          </form>
		);
	}
}