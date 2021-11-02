const fs = require('fs')
const chalk = require('chalk')
const path = require('path')


let readabble = fs.createReadStream(path.join(__dirname, 'text.txt'),'utf8')
readabble.on('data',(chunk)=>{
    console.log(chalk(chunk))
})