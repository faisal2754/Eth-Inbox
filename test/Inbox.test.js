const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const { interface, bytecode } = require('../compile')

let accounts, inbox

beforeEach(async () => {
    //get list of accounts
    accounts = await web3.eth.getAccounts()

    //use an account to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['Hello world']
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        })
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })

    it('has an initial message', async () => {
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, 'Hello world')
    })

    it('can change the message', async () => {
        await inbox.methods.setMessage('Bruh').send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, 'Bruh')
    })
})
