const fs = require('fs');
const {
  dialog
} = require('electron').remote
var myDir
const Datastore = require('nedb');

var db = new Datastore({ filename: './file.db', autoload: true })
var testUsers = {
  name: 'Eckelmann',
  vorname: 'Max',
  age: '17'
}

function the_Plan() {
  openFilePicker()
  // setTimeout(pls_Work(),3000);
  setTimeout(function() {
    // alert("Hello");
    pls_Work();
  }, 2); // I dont know why but I need to set a timeout here, at min. 2, 1 isn't working.
}

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
          let output = '<tr><td>' + path + '<td class="score"><select class="rating"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td>'
          document.getElementById('table').innerHTML += output
        }
      });
    }
    // var rating = document.getElementsByClassName('rating')
  }
  // console.log(rating)
}

function onClickFunction() {

}

function pls_Work() {
  // console.log(document.getElementsByClassName('rating').length);
  for (var i = 0; i < document.getElementsByClassName('rating').length; i++) {
    document.getElementsByClassName('rating')[i].onclick = onClickFunction;
    console.log(i);
  }
}

function saveDB() {
 db.insert(testUsers, function (err, doc) {
   console.log('Inserted', doc.name, 'with ID', doc._id);
 })

}

function loadDB() {

}

// openDialog.addEventListener('click', openFilePicker)
// plsWork.addEventListener('click', pls_Work)
test.addEventListener('click', the_Plan)
saveBtn.addEventListener('click', saveDB)
loadBtn.addEventListener('click', loadDB)
