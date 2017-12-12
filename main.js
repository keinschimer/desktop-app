const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const {globalShortcut} = require('electron')
const child = require('child_process').exec;
// let executablePath = '"D:\\Anime\\Shows\\Kakegurui\\Kakegurui - 01.mkv"';
// this works with .exec

// for the string replace regex stuff
// let str = "D:\Anime\Shows\Kakegurui\Kakegurui - 05.mkv"
// let reg = /\\/g
// let rep = "\\\\"
// let testpath = str.replace(reg,rep)

let str = "D:\Anime\Shows\Kakegurui\Kakegurui - 05.mkv"
let testpath = str.replace(/\\/g,"\\\\")
var temp = "'"+testpath+"'"
console.log(temp);
let executablePath = temp//'"D:\\Anime\\Shows\\Kakegurui\\Kakegurui - 01.mkv"';
let mainWindow

child(executablePath, function(err, data) {//parameters,
  if (err) {
    console.log(err)
  }
  console.log(data.toString());
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './icon_small.png'
    // autoHideMenuBar: true
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function() {
    mainWindow = null
  })

}

app.on('ready', () => {
  createWindow()
  globalShortcut.register('CommandOrControl+O', () => {
    console.log('ok');
    // openFilePicker()
  })
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})
