const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const {globalShortcut} = require('electron')
const {ipcMain} = require('electron')
const child = require('child_process').exec;
// let executablePath = '"D:\\Anime\\Shows\\Kakegurui\\Kakegurui - 01.mkv"';
// this works with .exec

// for the string replace regex stuff
// let str = "D:\Anime\Shows\Kakegurui\Kakegurui - 05.mkv"
// let reg = /\\/g
// let rep = "\\\\"
// let testpath = str.replace(reg,rep)
let mainWindow



ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
})




function palceholder() {
  let str = "D:\Anime\Shows\Kakegurui\Kakegurui - 05.mkv"
  console.log(str);
  let testpath = str.replace(/\\/g,"\\\\")
  var temp = "'"+testpath+"'"
  console.log(temp);
}
function testt() {
  let executablePath = temp//'"D:\\Anime\\Shows\\Kakegurui\\Kakegurui - 01.mkv"';
  child(executablePath, function(err, data) {//parameters,
    if (err) {
      console.log(err)
    }
    console.log(data.toString());
  });
}

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
