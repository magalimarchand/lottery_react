import Web3 from 'web3';

/*si Metamask est ouvert avec un compte, n'importe quelle 
page ouverte aura Web3 chargé, et connecté a Rinkerby. Donc on utilise
ce web3 pour notre application afin de pouvoir tester notre code.*/
const web3 = new Web3(window.web3.currentProvider);

export default web3;