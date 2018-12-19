import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  //Constructor
  state = {
    manager:"";
  };

  //Recuperer le manager
  async componentDidMount(){

    /*Quand on utilise le provider web3 de metamask, comme dans cette application,
    on n'a pas besoin de specifier from:accounts[0], car il utilisera le compte 
    par defaut que l'on voit dans Metamask */
    const manager = await lottery.methods.manager().call();

    this.setState({ manager });
  }

  render() {

   //web3.eth.getAccounts().then(console.log);

    return (

     <div>
     <h2>Lottery Contract</h2>
     <p>This contract is managed by {this.state.manager}</p>
     </div>
    );
  }
}

export default App;
