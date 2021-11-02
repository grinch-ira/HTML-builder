const fs = require('fs/promises')
const path = require('path')
const myPath = path.join(__dirname, 'secret-folder')

async function FilesInFolder(file){
    const filePath = path.join(__dirname, 'secret-folder', file)
    const stat = await fs.stat(filePath)
    if(!stat.isDirectory()){
        let extname = path.extname(file)
        let basename = path.basename(file, extname)
        let filesInformation = `${basename} - ${extname.slice(1)} - ${Math.round(stat.size/1024)} kb\n`
        process.stdout.write(filesInformation)
    }
}

async function Read(){
    let files = await fs.readdir(myPath)
    files.forEach(async(file)=>{
        FilesInFolder(file)
    })
}
Read()

