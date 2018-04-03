const {app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const url = require('url');
const shelljs = require('shelljs');

shelljs.cd('');

ipcMain.on('initial-ping', (event, arg) => {
  event.sender.send('initial-reply', shelljs.pwd().stdout)
})

ipcMain.on('decode-cmd', (event, arg) => {

  let reply = '';

  if(arg === 'move up') {
    shelljs.cd('..');
  }else if(arg.toLowerCase() === 'help') {
    reply = "move up : moves one level up in the directory structure<br>" +
      "whereami : gives the current location in the file system<br>" +
      "help : displays all the possible commands<br>"
  } else if(arg.toLowerCase() === 'whereami') {
    reply = shelljs.pwd().stdout + "<br>";
  } else {
    reply = "Wrong Command<br>"
  }

  event.sender.send('decode-cmd-reply', reply);

})

let win;
app.on('ready', () => {
  win = new BrowserWindow({width: 1800, height: 1800});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools();

})