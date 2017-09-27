const Item = require('./files.js');
const path = require('path');
const fs = require('fs');
const Datastore = require('nedb')
const {
  dialog
} = require('electron').remote
const db = new Datastore({
  filename: './file.db',
  autoload: true
});
var myFile
var isNameAvaliable = 0
var items = []

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
        generateRow(fileName, myFile, i)
      }
    }
  }
}

function generateRow(fileName, myFile, i) {
  var output = '<tr><td class="tdtitle"><p class="title">' + fileName + '</p></td><td class="tdrating"><select class="rating"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td><td class="tdstatus"><select class="status"><option value="fin">Finished</option><option value="wat">Watching</option><option value="ptw">Plan to Watch</option></select></td><td class="tdmore"><textarea class="more" rows="1" cols="10"></textarea></td><td class="tdpath"><p class="path">' + myFile[i] + '</p></td></tr>'
  document.getElementById('table').innerHTML += output
}

function saveDB() {
  // IDEA: Overrite already exsiteing items
  items = []
  // var id = document.getElementsByClassName('id')
  var path = document.getElementsByClassName('path')
  var title = document.getElementsByClassName('title')
  var rating = document.getElementsByClassName('rating')
  var status = document.getElementsByClassName('status')
  var more = document.getElementsByClassName('more')
  for (var i = 0; i < title.length; i++) {
    var item = new Item.Item(path[i].innerText, title[i].innerText, rating[i].value, status[i].value, more[i].value)
    items.push(item);
  }
  console.log(items);
  db.insert(items, function(err, doc) {})
}

function loadDB() {
  db.find({}, function(err, docs) {
    console.log(docs);
    for (var i = 0; i < docs.length; i++) {
      generateRow(docs[i].name, docs[i].path)
      document.getElementsByClassName('rating')[i].value = docs[i].score
      document.getElementsByClassName('status')[i].value = docs[i].status
      document.getElementsByClassName('more')[i].value = docs[i].more
    }
  })
}

openBtn.onclick = openFilePicker
saveBtn.onclick = saveDB
loadBtn.onclick = loadDB
