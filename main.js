const {app, BrowserWindow} = require('electron');
const path = require('path')
const url = require('url');
//const {shell} = require('electron')
const {ipcMain} = require('electron')

const shelljs = require('shelljs');

 //shell.openExternal('https://github.com')

//shell.openItem('/Users/apoorvaagupta/Desktop/ce.pages')
shelljs.cd('');

ipcMain.on('initial-ping', (event, arg) => {
  event.sender.send('initial-reply', shelljs.pwd().stdout)
})


ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  //shelljs.echo('Sorry, this script requires git');

  if(arg === 'move up') {
    console.log(shelljs.pwd().stdout);
    shelljs.cd('..');
    console.log(shelljs.pwd().stdout);

    event.sender.send('asynchronous-reply', 'received')
  }
})

let win;
app.on('ready', () => {
  win = new BrowserWindow({width: 1000, height: 1000});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools();

})