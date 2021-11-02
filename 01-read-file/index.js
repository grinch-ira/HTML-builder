const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

const myPath = path.join(__dirname, 'text.txt')
let readabble = fs.createReadStream(myPath,'utf8')
readabble.on('data',(chunk)=>{
    console.log(chalk(chunk))
})