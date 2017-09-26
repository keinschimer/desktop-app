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
})
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
        // console.log(myFile[i]);
        let output = '<tr><td class="tdtitle"><p class="title">' + fileName + '</p></td><td class="tdrating"><select class="rating"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td><td class="tdstatus"><select class="status"><option value="fin">Finished</option><option value="wat">Watching</option><option value="ptw">Plan to Watch</option></select></td><td class="tdmore"><textarea class="more" rows="1" cols="10"></textarea></td><td class="tdpath"><p class="path">' + myFile[i] + '</p></td></tr>'
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

function saveDB() { //items is gonna be the array of the files
  items = []
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
  console.log("dummy-button");
}

openBtn.addEventListener('click', openFilePicker)
saveBtn.addEventListener('click', saveDB)
loadBtn.addEventListener('click', loadDB)
