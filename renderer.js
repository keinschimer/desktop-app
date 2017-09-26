const path = require('path');
const fs = require('fs');
const {
  dialog
} = require('electron').remote
var myFile
const Datastore = require('nedb');

var db = new Datastore({
  filename: './file.db',
  autoload: true
})
var testUsers = {
  name: 'Eckelmann',
  vorname: 'Max',
  age: '17'
}

function the_Plan() {
  openFilePicker()
  setTimeout(function() {
    // pls_Work();
  }, 2); // I dont know why but I need to set a timeout here, at min. 2, 1 isn't working.
}

function openFilePicker() {
  myFile = dialog.showOpenDialog({
    // title: 'Pick Something',
    properties: [
      'openFile', // on Windows/Linux only one
      // 'openDirectory', // cannot be both
      'promtToCreate',
      'multiSelections'
    ],
    //buttonLabel:
  })
  // console.log(myFile);
  if (myFile != undefined) {
    var titles = document.getElementsByClassName('title')
    for (var i = 0; i < myFile.length; i++) {
      var fileExt = path.extname(myFile[i])
      var fileName = path.basename(myFile[i],fileExt)
      console.log(titles.length);
      for (var i = 0; i <= titles.length; i++) {
        console.log(i);
        console.log(titles[i]);
        // console.log(titles[i].innerText);
        console.log(fileName);
        if (titles[i].innerText != fileName) {
          setTimeout(function () {
            let output = '<tr><td class="title">' + fileName + '<td class="score"><select class="rating"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td>'
            document.getElementById('table').innerHTML += output
          }, 1000)
        }
      }
    }
  }
}

function onClickFunction() {

}

function pls_Work() {
  for (var i = 0; i < document.getElementsByClassName('rating').length; i++) {
    document.getElementsByClassName('rating')[i].onclick = onClickFunction;
    console.log(i);
  }
}

function saveDB() {
  // db.insert(testUsers, function(err, doc) {
  //   console.log('Inserted', doc.name, 'with ID', doc._id);
  // })
}

function loadDB() {

}

// openDialog.addEventListener('click', openFilePicker)
// plsWork.addEventListener('click', pls_Work)
test.addEventListener('click', the_Plan)
saveBtn.addEventListener('click', saveDB)
loadBtn.addEventListener('click', loadDB)
