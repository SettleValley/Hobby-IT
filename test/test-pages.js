'use strict'
const expect = require('chai').expect
const request = require('request')

it('status', (done)=>{
  request('http://localhost:3000', (error, response, body)=>{
    expect(response.statusCode).to.equal(200)
    done()
  })
})
