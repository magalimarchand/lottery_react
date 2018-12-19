import web3 from './web3';


//C'est une copie du contrat deployé dans le porjet lottery (pas react) avec: $ node deploy.js

const address = '0x76d0bCaee5Ae32E4e0217070B6f1226f9a20d058';

const abi = [
	{
	"constant":true,
	"inputs":[],
	"name":"manager",
	"outputs":[{"name":"","type":"address"}],
	"payable":false,
	"stateMutability":"view",
	"type":"function"
	},
	{
	"constant":false,
	"inputs":[],
	"name":"pickWinner",
	"outputs":[],
	"payable":false,
	"stateMutability":"nonpayable",
	"type":"function"
	},
	{
	"constant":true,
	"inputs":[],
	"name":"getPlayers",
	"outputs":[{"name":"","type":"address[]"}],
	"payable":false,
	"stateMutability":"view",
	"type":"function"
	},
	{
	"constant":false,
	"inputs":[],
	"name":"enter",
	"outputs":[],
	"payable":true,
	"stateMutability":"payable",
	"type":"function"
	},
	{
	"constant":true,
	"inputs":[{"name":"","type":"uint256"}],
	"name":"players",
	"outputs":[{"name":"","type":"address"}],
	"payable":false,
	"stateMutability":"view",
	"type":"function"
	},
	{
	"inputs":[],
	"payable":true,
	"stateMutability":"payable",
	"type":"constructor"
	}];

	export default new web3.eth.Contract(abi, address);