require('./files.js')
const path = require('path');
const fs = require('fs');
const {dialog} = require('electron').remote
const Datastore = require('nedb')
const db = new Datastore({filename: './file.db', autoload: true})
var myFile
var isNameAvaliable = 0
var temp = []

function openFilePicker() {
  myFile = dialog.showOpenDialog({
    properties: [
      'openFile', // on Windows/Linux only one
      'promtToCreate',
      'multiSelections'
    ],
  })
  if (myFile != undefined) {
    var titles = document.getElementsByClassName('title')
    for (var i = 0; i < myFile.length; i++) {
      isNameAvaliable = 0;
      var fileExt = path.extname(myFile[i])
      var fileName = path.basename(myFile[i], fileExt)
      for (var j = 0; j < titles.length; j++) {
        if (titles[j].innerText == fileName) {
        isNameAvaliable = 1
        alert(fileName + ' is already in the table')
        console.log(isNameAvaliable)
        }
      }
      if (isNameAvaliable == 0) {
        let output = '<tr><td class="title">' + fileName + '<td class="score"><select class="rating"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td><td><select class="status"><option value="fin">Finished</option><option value="wat">Watching</option><option value="ptw">Plan to Watch</option></select></td><td class="more"><textarea rows="1" cols="10"></textarea></td>'
        document.getElementById('table').innerHTML += output
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

function saveDB() { //temp is gonna be the array of the files

for (var i = 0; i < document.getElementsByClassName('title').length; i++) {
  var item = new Item()
  temp.push(item);
  console.log('i');
}

  // db.insert(testUsers, function(err, doc) {
  //   console.log('Inserted', doc.name, 'with ID', doc._id);
  // })
}

function loadDB() {

}

openBtn.addEventListener('click', openFilePicker)
saveBtn.addEventListener('click', saveDB)
loadBtn.addEventListener('click', loadDB)
