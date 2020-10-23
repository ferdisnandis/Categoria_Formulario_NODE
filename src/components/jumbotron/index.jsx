import React, { Component } from 'react'

class Jumbotron extends Component{

    render() {
        return (
        <div class="jumbotron jumbotron-fluid">
            <div className="container">
            <h1 className="display-4">{this.props.titulo}</h1>
            <p className="lead">{this.props.descricao}</p>
            </div>
        </div>
        );
    }
}

export default Jumbotron;