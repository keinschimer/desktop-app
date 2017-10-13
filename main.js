const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const {globalShortcut} = require('electron')

let mainWindow

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
