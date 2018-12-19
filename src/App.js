import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

//start application: $ npm start (and url localhost:3001)

class App extends Component {

  //Constructor
  state = {
    manager:'',
    players:[],
    balance:'',
    value:'',
    message:''
  };

  //Recuperer le manager
  async componentDidMount(){

    /*Quand on utilise le provider web3 de metamask, comme dans cette application,
    on n'a pas besoin de specifier from:accounts[0], car il utilisera le compte 
    par defaut que l'on voit dans Metamask */
    const manager = await lottery.methods.manager().call();

    const players = await lottery.methods.getPlayers().call();

    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  //Methode qui gere son propre this (arrow function), permet d'enregistrer un joueur
  onSubmit = async (event)=>{ //event represente la submission du form

    event.preventDefault(); //empeche le form de se submit lui-meme

    const accounts = await web3.eth.getAccounts(); //recupere les accounts pour la transaction

    //envoi front-end d'un message  d'attente pour l'utilisateur
    this.setState({ message: 'Waiting on transaction success...'});

    //envoyer une transaction avec la submission de l'utilisateur: ajout du compte dans la lottery
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    //envoi front-end d'un message  de succes pour l'utilisateur
    this.setState({ message: 'You have been entered!'});

  };

  //Methode qui permet de choisir un gagnant
  onClick = async (event)=>{

    event.preventDefault(); //empeche le form de se submit lui-meme

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...'});

    //when we send a transaction, we get no return value back (never):
    //So how to know who is the winner???
    await lottery.methods.pickWinner().send({
      from:accounts[0]
    });

    this.setState({ message: 'A winner has been picked!'});
  };

  render() {

   //web3.eth.getAccounts().then(console.log);
   //ne pas oublier de se connecter a MetaMask pour que cela fonctionne!!!

    return (

     <div style={{ margin: 60 }}>
       <h2>Lottery Contract</h2>
       <p>
          This contract is managed by {this.state.manager}
          . There are currently {this.state.players.length} people entered, 
          competing to win {web3.utils.fromWei(this.state.balance, "ether")} ether !
       </p>
       <hr/>

       <form onSubmit={this.onSubmit}>
         <h4>Want to try your luck ?</h4>
         <div>
          <label>Amount of ether to enter</label>
          <input 
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
         </div>
         <button>Enter</button>
       </form>

       <hr/>

       <h4>Ready to pick a winner?</h4>
       <button onClick={this.onClick}>Pick a winner!</button>

       <hr/>

       <h1>{this.state.message}</h1>
 
     </div>
    );
  }
}

export default App;
