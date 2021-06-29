// Source code to interact with smart contract
import { readFile, readFileSync } from 'fs';

var abiPath='app/votacion.abi';

// web3 provider with fallback for old version
//window.addEventListener('load', async () => {
    window.addEventListener('load',  async() => { //sincronico

// New web3 provider
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // ask user for permission
          //  await ethereum.enable();
          await ethereum.enable();
            // user approved permission
        } catch (error) {
            // user rejected permission
            console.log('user rejected permission');
        }
    }
    // Old web3 provider
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // no need to ask for permission
    }
    // No web3 provider
    else {
        console.log('No web3 provider detected');
    }
  });
  console.log (window.web3.currentProvider)
  
  // contractAddress and abi are setted after contract deploy
  //desde 0x9B93AC8C3a7e824957479E625515e85b052ccf26
  var contractAddress = '0x961482140cB6930Ac5D60A34BcC5b7aD3573f679';
 
  let abi;
readFileSync(abiPath, 'utf-8', (err, data) => {
  if(err) {
    console.log('error read abi: ', err);
  } else {
    console.log(data);
    abi=data;}
});

  //var abi = JSON.parse( '[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]' );
  abi =JSON.parse(abi);
  //contract instance
  contract = new web3.eth.Contract(abi, contractAddress);
  
  // Accounts
  var account;
  
  web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
  });
  
  
  //Smart contract functions
  function registerSetInfo() {
    info = $("#newInfo").val();
    contract.methods.setInfo (info).send( {from: account}).then( function(tx) {
      console.log("Transaction: ", tx);
    });
    $("#newInfo").val('');
  }
  
  function registerGetInfo() {
    contract.methods.getInfo().call().then( function( info ) {
      console.log("info: ", info);
      document.getElementById('lastInfo').innerHTML = info;
    });
  }
  