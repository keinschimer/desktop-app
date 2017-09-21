const fs = require('fs');
const {dialog} = require('electron').remote
var myDir

function openFilePicker() {
  myDir = dialog.showOpenDialog({
    // title: 'Pick Something',
    properties: [
      //'openFile',     // on Windows/Linux only one
      'openDirectory', // cannot be both
      'promtToCreate',
      'multiSelections'
    ],
    //buttonLabel:
  })
  if (myDir != undefined) {
    for (var i = 0; i < myDir.length; i++) {
      fs.readdir(myDir[i], (err, dir) => {
        console.log(dir);
        for (var i = 0, path; path = dir[i]; i++) {
          console.log(path);
          let output = '<tr><td>' + path + '</td><td class="rating">-</td></tr>'
          document.getElementById('table').innerHTML += output
        }
      });
    }
    var rating = document.getElementsByClassName('rating')
    console.log(rating);
    for (var i = 0; i < rating.length; i++) {
      rating[i].onclick = onClickFunction;
      }
      console.log(i);
    }
  }
  console.log(rating);
}

function onClickFunction() {
  alert()
}

openDialog.addEventListener('click', openFilePicker)
