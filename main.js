const {app, BrowserWindow, ipcMain, shell} = require('electron');
const path = require('path')
const url = require('url');
const shelljs = require('shelljs');

shelljs.cd('');

ipcMain.on('initial-ping', (event, arg) => {
  event.sender.send('initial-reply', shelljs.pwd().stdout)
})

ipcMain.on('decode-cmd', (event, arg) => {

  let reply = '';

  if (arg.toLowerCase() === 'move up') {
    shelljs.cd('..');
  } else if (arg.toLowerCase() === 'help') {
    reply = "whereami : gives the current location in the file system<br>" +
      "move up : moves one level up in the directory structure<br>" +
      "move to home : moves to home in the directory structure<br>" +
      "move to : moves to the specified directory<br>" +
      "show files : shows files in the current directory<br>" +
      "show all files : shows all files in the current directory<br>" +
      "print : prints the statement<br>" +
      "open : opens the specifies file<br>" +
      "openw : opens the specified website in teh browser<br>" +
      "open ide : opens the Online IDE in the browser<br>" +
      "clear : clears teh terminal<br>" +
      "help : displays all the possible commands<br>"
  } else if (arg.toLowerCase() === 'whereami') {
    reply = shelljs.pwd().stdout + "<br>";
  } else if (arg.toLowerCase() === 'move to home') {
    shelljs.cd('');
  } else if (arg.toLowerCase() === 'show files') {
    reply = shelljs.ls();
  } else if (arg.toLowerCase() === 'show all files') {
    reply = shelljs.ls('-A');
  } else if (arg.toLowerCase().startsWith('print')) {

    let a = arg.split(' ')
    a.splice(0, 1);
    a = a.join(" ")
    reply = shelljs.echo(a).stdout + "<br>"

  } else if(arg.toLowerCase().startsWith('moveto')) {
    shelljs.cd(arg.split(' ')[1])
  }else if (arg.toLowerCase() === 'open ide') {
    shell.openExternal('http://localhost:9999')
  } else if (arg.toLowerCase().startsWith('openw')) {
    shell.openExternal(arg.split(' ')[1])
  } else if (arg.toLowerCase().startsWith('open')) {
    shell.openItem(arg.split(' ')[1])
  }else {
    reply = "Wrong Command<br>"
  }

  event.sender.send('decode-cmd-reply', reply);

})

let win;
app.on('ready', () => {
  let mainScreenDim = require('electron').screen.getPrimaryDisplay().size;
  win = new BrowserWindow({width: mainScreenDim.width, height: mainScreenDim.height});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // win.webContents.openDevTools();

})