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
// TODO: fix after adding then to zero the shet

function openFilePicker() {
  // TODO: look for Path not Name!! / only open vidoe types
  //Kinda Works
  var myFile = dialog.showOpenDialog({
    properties: [
      'openFile', // on Windows/Linux only one
      'promtToCreate',
      'multiSelections'
    ],
  })
  if (myFile != undefined) {
    var titles = document.getElementsByClassName('title')
    for (let i = 0; i < myFile.length; i++) {
      var isNameAvaliable = 0;
      var fileExt = path.extname(myFile[i])
      var fileName = path.basename(myFile[i], fileExt)
      for (let i = 0; i < titles.length; i++) {
        if (titles[i].innerText == fileName) {
          isNameAvaliable = 1
          alert(fileName + ' is already in the table')
        }
      }
      if (isNameAvaliable == 0) {
        generateRow(fileName, myFile[i])
      }
    }
  }
}

function saveDB() { // needs more testing
  var isInDb
  let items = []
  // var id = document.getElementsByClassName('id')
  var pfad = document.getElementsByClassName('path')
  var title = document.getElementsByClassName('title')
  var rating = document.getElementsByClassName('rating')
  var status = document.getElementsByClassName('status')
  var more = document.getElementsByClassName('more')
  for (let i = 0; i < title.length; i++) {
    db.remove({
      path: pfad[i].innerText
    }, function(err, numRemoved) {
      let item = new Item.Item(pfad[i].innerText, title[i].innerText, rating[i].value, status[i].value, more[i].value)
      items.push(item);
      // console.log(item);
    })
  }
  db.insert(items, function(err, doc) {
    // console.log(items);
  })
}

function loadDB() {
  // TODO: replace the alredy existing entries
  var dbInner
  db.find({}, function(err, docs) {
    dbInner = docs
    for (let i = 0; i < docs.length; i++) {
      generateRow(docs[i].name, docs[i].path)
    }
  })
  setTimeout(function() {
    insertValues(dbInner)
  }, 1)
}

function insertValues(docs) {
  for (let i = 0; i < docs.length; i++) {
    document.getElementsByClassName('rating')[i].value = docs[i].score
    document.getElementsByClassName('status')[i].value = docs[i].status
    document.getElementsByClassName('more')[i].value = docs[i].more
  }
}

function generateRow(fileName, myFile) { //was to lazy to write that again for load
  let output = '<tr><td class="tdtitle"><p class="title">' + fileName + '</p></td><td class="tdrating"><select class="rating"><option value="-">-</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td><td class="tdstatus"><select class="status"><option value="fin">Finished</option><option value="wat">Watching</option><option value="ptw">Plan to Watch</option></select></td><td class="tdmore"><textarea class="more" rows="1" cols="10"></textarea></td><td class="tdpath"><p class="path">' + myFile + '</p></td></tr>'
  document.getElementById('table').innerHTML += output
}

// TODO: put that shet in the toolbar
openBtn.onclick = openFilePicker
saveBtn.onclick = saveDB
loadBtn.onclick = loadDB
