const {ipcRenderer} = require('electron')

$(document).ready(function () {
  console.log(`We are using node ${process.versions.node}, 
               Chrome ${process.versions.chrome}, and Electron ${process.versions.electron}.`)

  const inp = $('#input');
  const main = $('#mainarea');

  ipcRenderer.send('initial-ping', 'initial');

  ipcRenderer.on('initial-reply', (event, arg) => {
    main.append("<span style='color: greenyellow'>" + arg + " $ </span>");
  })

  inp.keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
    {
      main.append("<span style='color: white'>" + inp.val() + "<br>");
      ipcRenderer.send('decode-cmd', inp.val())
    }
  });

  ipcRenderer.on('decode-cmd-reply', (event, arg) => {
    inp.val('');
    console.log("received");
    main.append("<span style='color: #66D9EF'>" + arg);
    console.log(arg);
    ipcRenderer.send('initial-ping', 'initial');
  })
});