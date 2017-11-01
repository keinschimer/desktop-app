const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const {globalShortcut} = require('electron')
const child = require('child_process').exec;
// var executablePath = "D:/Anime/Shows/test%.mp3";
const stuff = "D:/Anime/Shows/Inuyashiki/Inuyashiki - 01.mkv"
var executablePath = `${stuff}`;
// let parameters = [];
let mainWindow

child(executablePath, function(err, data) {
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
