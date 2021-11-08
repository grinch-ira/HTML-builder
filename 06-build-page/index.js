const fs = require('fs')
// const {readdir, readFile, writeFile,rm, mkdir, stat, copyFile} = require('fs/promises')
const path = require('path') 
const fsProm = require('fs/promises')

const componentPath = path.join(__dirname, 'components')
const cssPath = path.join(__dirname, 'styles')
const assetsPath = path.join(__dirname, 'assets')
const htmlPath = path.join(__dirname, 'template.html') 
const cssBundlePath = path.join(__dirname, 'project-dist', 'style.css')
const assetsBundlePath = path.join(__dirname, 'project-dist', 'assets')
const htmlBundlePath = path.join(__dirname, 'project-dist', 'index.html')



async function clearFolder(bundlePath){
    const file = await fsProm.readdir(bundlePath);
    for(const a of file){
        const base = path.join(bundlePath, file)
        const stat = await fsProm.stat(base)
        if(stat.isDirectory()){
            await clearFolder(base)
        }else{
            await fsProm.rm(base)
        }
    }
}

function recursiveMerge(files = [],fileWrite){
    if(!files.length){
    return fileWrite.end();
    }
const thisFile = path.resolve(cssPath, files.pop())
const thisReadStream = fs.createReadStream(thisFile, 'utf-8')
thisReadStream.pipe(fileWrite, {end:false})
thisReadStream.on('end', function(){
    fileWrite.write('\n\n')
    recursiveMerge(files,fileWrite)
})
thisReadStream.on('error', function(error){
    console.log(error)
    fileWrite.close()
})
}



async function buildCss(){
    const allfiles = await fsProm.readdir(cssPath)
    const cssFile = allfiles.filter(file=>path.extname(file)==='.css')
    const writeStr = fs.createWriteStream(cssBundlePath, 'utf-8')
    
    recursiveMerge(cssFile, writeStr)
}





async function buildHtml(){
const allFile = await fsProm.readdir(componentPath);
const files = allFile.filter(file =>path.extname(file)==='.html');
const readd = fs.createReadStream(htmlPath, 'utf-8')
readd.on('data', async (htmlTemplate)=>{
    let bundleHtml = htmlTemplate.toString();
    for(const name of files){
        const compP = path.join(componentPath, name)
        const comp = await fsProm.readFile(compP)
        const firstName = path.basename(name, '.html')
        bundleHtml = bundleHtml.replace(`{{${firstName}}}`, comp)
    }
    await fsProm.writeFile(htmlBundlePath, bundleHtml, 'utf-8')
})
}




async function buildFolder(){
    const newFolder = path.join(__dirname, 'project-dist')
    await fsProm.mkdir(newFolder,{recursive:true})
}

async function copuAssest(bundleFolder, sourceFolder){
    await fsProm.mkdir(bundleFolder, {recursive:true})
    const files = await fsProm.readdir(sourceFolder)


    files.forEach(async(file)=>{
        const basef = path.join(sourceFolder, file)
        const newf = path.join(bundleFolder, file)
        const stat = await fsProm.stat(basef)
        if(stat.isDirectory()){
            copuAssest(newf, basef)
        }
        else{
            await fsProm.copyFile(basef, newf)
        }
    })
}


async function pageBuild(){
    await buildFolder()
    await clearFolder(path.join(__dirname, 'project-dist'));
    buildHtml();
    buildCss();
    
    copuAssest(assetsBundlePath, assetsPath)
}

pageBuild()

