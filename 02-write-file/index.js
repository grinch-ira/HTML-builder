const fs = require('fs')
const path = require('path')
const process = require('process')
const input = process.stdin
const output = process.stdout
const readline = require('readline')

let writeabble = fs.createWriteStream(path.join(__dirname, 'text.txt'))
const readlines = readline.createInterface({input, output})
readlines.write(`Please, enter your text
to exit press 'CTRL+C' or enter 'exit'
`)


readlines.addListener('line', (input) =>{
    if(input==='exit'){
        readlines.write(`Bye-bye`)
        process.exit(0)
    }
    writeabble.write(input)
})


readlines.addListener('close', ()=>{
    readlines.write('Bye-bye')
    process.exit(0)
})