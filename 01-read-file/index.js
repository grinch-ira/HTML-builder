const fs = require('fs')
const path = require('path')


let readabble = fs.createReadStream(path.join(__dirname, 'text.txt'),'utf8')
readabble.on('data',(chunk)=>{
    console.log(chunk.toString())
})
