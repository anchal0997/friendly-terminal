const {ipcRenderer} = require('electron')

$(document).ready(function () {
  console.log(`We are using node ${process.versions.node}, 
               Chrome ${process.versions.chrome}, and Electron ${process.versions.electron}.`)

  const btn = $('#send');
  const inp = $('#input');
  const main = $('#mainarea');

  ipcRenderer.send('initial-ping', 'initial');

  ipcRenderer.on('initial-reply', (event, arg) => {
    main.append(arg + "> ");
  })

  btn.click(() => {
    main.css('color', 'green').append(inp.val() + "<br>");
    ipcRenderer.send('decode-cmd', inp.val())
  })

  ipcRenderer.on('decode-cmd-reply', (event, arg) => {
    console.log("received");
    main.css('color', 'red').append(arg);
    console.log(arg);
    ipcRenderer.send('initial-ping', 'initial');
  })
});