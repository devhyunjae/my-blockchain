import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import { Button, Card, Elevation, InputGroup } from "@blueprintjs/core";
const web3 = new Web3();
const provider = new web3.providers.HttpProvider('http://localhost:7545')
web3.setProvider(provider)

// 2. ABI 연동
const ContractABI = web3.eth.contract(
  [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_fName",
          "type": "string"
        },
        {
          "name": "_age",
          "type": "uint256"
        }
      ],
      "name": "setInstructor",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getInstructor",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
).at('0x2c7f048230a0f24356cabaefefd0ef5ba2930c30')
web3.eth.defaultAccount = web3.eth.accounts[0];

class App extends Component {
  state = {
    accounts: [],
    name: null,
    age: null,
    n: null,
    a: null
  }
  async componentDidMount () {
    const [n, a] = await ContractABI.getInstructor()
    this.setState({n, a})
  }

  render() {
    const { n,a } = this.state
    return (
      <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
        <Card>
          <h2>INPUTS</h2>
          <InputGroup
            placeholder='name'
            onChange={(e) => this.setState({name: e.target.value})}
            style={{marginTop: 10, marginBottom: 10}}
          />
          <InputGroup
            placeholder='age'
            type='number'
            onChange={(e) => this.setState({age: e.target.value})}
            style={{marginTop: 10, marginBottom: 10}}
          />
          <Button
            style={{marginTop: 10, marginBottom: 10, width: '100%'}}
            onClick={async () => {
              const { name, age } = this.state
              ContractABI.setInstructor(name, age)
              const [n, a] = await ContractABI.getInstructor()
              this.setState({n, a})
            }}
          >Save</Button>
        </Card>
        <Card style={{marginTop: 20}}>
          <h2>NAME AND AGE</h2>
          { `name: ${n}, age: ${a}` }
        </Card>
      </div>
    );
  }
}

export default App;
