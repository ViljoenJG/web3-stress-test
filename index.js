let Web3 = require('web3');
// let contract_address='0x9F586b879ef822045708f500CA209e0445Fec958';
let contract_address='0x78763a94bD3f71436053d8dA9C8b87aCD03816ce';
let contract_abi = [{"constant":true,"inputs":[],"name":"getTheIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"key","type":"bytes8"}],"name":"get","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"bytes8"},{"name":"value","type":"bytes32"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"key","type":"bytes8"},{"indexed":false,"name":"value","type":"bytes32"}],"name":"SetEvent","type":"event"}];
let web3;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

let contract_instance = web3.eth.contract(contract_abi).at(contract_address);

web3.personal.unlockAccount(web3.eth.accounts[0], '1qazxsw2');

for (let a=0; a<=10; a++) {
    contract_instance.set(`key${ a }`, `Value of ${ a }`, { from: web3.eth.accounts[0] }, function (err, txHash) {
        if (err) {
            console.error(err);
        } else {
            console.log(txHash);
            callWhenMined(txHash, function () {
                console.log(`mined: ${ txHash }`)
            })
        }
    })
}

function callWhenMined(txHash, callback) {
    web3.eth.getTransactionReceipt(txHash, function(error, rcpt) {
        if(error) {
            console.error(error);
        } else {
            if(rcpt == null) {
                setTimeout(function() {
                    callWhenMined(txHash, callback);
                }, 500);
            } else {
                callback();
            }
        }
    })
}