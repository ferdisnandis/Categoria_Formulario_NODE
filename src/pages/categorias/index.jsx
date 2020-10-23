import Menu from '../../components/menu';
import Jumbotron from '../../components/jumbotron';
import React, { Component } from 'react'

class Categorias extends Component {

    constructor(){
        super();

        //Define os valores do state
        this.state = {
            url : 'https://5f863c44c8a16a0016e6af04.mockapi.io/api/categorias',
            id : '',
            nome : '',
            categorias : []
        }
    }
    //onload
    componentDidMount(){
        this.Listar();
    }

    Listar = () => {
            fetch(this.state.url)
                .then(response => response.json())
                .then(dados => {
                    //Altera o valor do state das categorias
                    this.setState({categorias : dados});

                    this.novaCategoria();
                    console.log(this.state.categorias);
                })
                .catch(err => console.error(err))
    }

    Remover(event){
        event.preventDefault();

        console.log(event.target.value);

            fetch(this.state.url + '/' + event.target.value,{
            method : 'DELETE'
        })
        .then(response => response.json())
        .then(dados => {
            alert('Categoria removida');

            this.Listar();
            })  
    }

    Editar(event){
        event.preventDefault();

        fetch(this.state.url + '/' + event.target.value, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);
            this.setState({id : dado.id});
            this.setState({nome : dado.nome});
        })
    }

    Salvar(event) {
        event.preventDefault();

        const categoria = {
            nome : this.state.nome,
        }

        let method = (this.state.id === "" ? 'POST' : 'PUT');
        let urlRequest = (this.state.id === "" ? this.state.url : this.state.url + '/' + this.state.id);

        fetch(urlRequest , {
            method : method,
            body : JSON.stringfy(categoria),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then (dados => {
            alert ('Categoria salva');

            this.Listar();
        })
        .catch(err => console.error(err));
    }

    setNome(event){
        console.log(event.target.value)
        this.setState({nome : event.target.value});
    }

    novaCategoria(){
            this.setState({id : ''});
            this.setState({nome : ''});
    }

    render() {
        return (
            <div>
                <Menu />
                <Jumbotron titulo='Categorias' descricao='Gerencie as suas categorias' />
            <div className="container">
                <div className="bd-example">
                    <form id="formCategoria" onSubmit={this.Salvar.bind(this)} />
                        <div className="form-group" />
              <label htmlFor="nome">Nome</label>
              <input type="text" className="form-control" value={this.state.nome} onChange={this.setNome.bind(this)} id="nome" placeholder="Informe a Categoria" />
            </div>

            <button type="button" onClick={this.novaCategoria.bind(this)} className="btn btn-secondary">Cancelar</button>
            <button type="submit" className="btn btn-success">Salvar</button>
         </div> 
        

         <table className="table" style={{marginTop : '40px'}}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Ações</th>
                <th scope="col"><button type="reset" class="btn btn-primary" onClick="novaCategoria()">Nova categoria</button></th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
                {
                    this.state.categorias.map((item, index) =>  {
                            return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>
                                    <button value={item.id} onClick={this.Remover.bind(this)} type='button' className='btn btn-danger'>Remover</button>
                                    <button value={item.id} onClick={this.Editar.bind(this)} type='button' className='btn btn-warning'>Editar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
        )
    }
}

export default Categorias;