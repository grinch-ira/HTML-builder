const {promises: fs, access} = require('fs');
const path = require('path');
// const fsProm = require('fs/promises')

let oldFolder = path.join(__dirname, 'files');
let newFolder = path.join(__dirname, 'files-copy')

async function copyDir(src, dest){
await fs.mkdir(dest, {recursive: true})
let notation = await fs.readdir(src, {withFileTypes:true})

for (let n of notation){
    let oldPath = path.join(src, n.name);
    let newPath = path.join(dest, n.name);

    if(n.isDirectory()){
         await copyDir(oldPath, newPath)
    }else{
         await fs.copyFile(oldPath, newPath)
    }
}
}
copyDir(oldFolder, newFolder)