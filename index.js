const {ipcRenderer} = require('electron')

$(document).ready(function () {
  console.log(`We are using node ${process.versions.node}, 
               Chrome ${process.versions.chrome}, and Electron ${process.versions.electron}.`)

  const btn = $('#send');
  const inp = $('#input');
  const main = $('#mainarea');

  ipcRenderer.send('initial-ping', 'initial');

  ipcRenderer.on('initial-reply', (event, arg) => {
    main.append(arg);
  })

  btn.click(() => {
    ipcRenderer.send('asynchronous-message', inp.val())
  })

  ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) // prints "pong"
  })
});