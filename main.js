const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const {globalShortcut} = require('electron')
const child = require('child_process').execFile;
// let executablePath = "D:\\Program Files\\VideoLAN\\VLC\\vlc.exe";
// let parameters = [];
let executablePath = "D:\\Anime\\Shows\\Kakegurui\\Kakegurui%20-%2001.mkv";
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
