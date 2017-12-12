var alertCount = []
const path = require('path')
const fs = require('fs')
const Datastore = require('nedb')
const {
  dialog
} = require('electron').remote
const db = new Datastore({
  filename: './file.db',
  autoload: true
});
const {systemPreferences} = require('electron').remote
console.log(systemPreferences);
class Item {
  constructor(path, name, score, status, more) {
    this.path = path
    this.name = name
    this.score = score
    this.status = status
    this.more = more
  }
}

function openFilePicker() {
  alertCount = []
  let myFile = dialog.showOpenDialog({
    filters: [{
        name: 'Videos',
        extensions: ['mkv', 'avi', 'mp4']
      },
      {
        name: 'All Files',
        extensions: ['*']
      }
    ],
    properties: [
      'openFile', // on Windows/Linux only one
      'promtToCreate',
      'multiSelections'
    ],
  })
  if (myFile != undefined) {
    // let pathCheck = document.getElementsByClassName('path')
    for (let i = 0; i < myFile.length; i++) {
      fs.stat(myFile[i], function(err, stats) {
        let fileExt = path.extname(myFile[i])
        let fileName = path.basename(myFile[i], fileExt)
        generateRow(myFile[i], stats.isFile(), fileName)
      })
    }
    setTimeout(function () {
      showAlert()
    },myFile.length+2)
  }
}

function loadDB() {
  alertCount = []
  db.find({}, function(err, docs) {
    for (let i = 0; i < docs.length; i++) {
      fs.stat(docs[i].path, function(err, stats) {
        generateRow(docs[i].path, stats.isFile(), docs[i].name)
      })
      for (let q = 0; q < 100; q++) {
        setTimeout(function() {
          if (document.getElementsByClassName('rating').length >= docs.length) {
            for (let a = 0; a < docs.length; a++) {
              for (let j = 0; j < document.getElementsByClassName('title').length; j++) {
                if (document.getElementsByClassName('title')[j].innerText == docs[a].name) {
                  document.getElementsByClassName('rating')[j].value = docs[a].score
                  document.getElementsByClassName('status')[j].value = docs[a].status
                  document.getElementsByClassName('more')[j].value = docs[a].more
                }
              }
            }
          }
        }, 1)
      }
    }
    setTimeout(function () {
      showAlert()
    },docs.length)
  })
}

function generateRow(pathCheck, fileCheck, fileName) {
  let reVal = false
  let chPath = document.getElementsByClassName('path')
  if (chPath.length == 0) {
    reVal = true
  } else if (chPath.length > 0) {
    for (let l = 0; l < chPath.length; l++) {
      if (chPath[l].innerText == pathCheck) {
        reVal = false
        break
      } else if (chPath[l].innerText != pathCheck) {
        reVal = true
      }
    }
  }
  if (fileCheck && reVal) {
    let output = '<tr><td class="tdtitle"><p class="title">' + fileName + '</p></td><td class="tdrating"><select class="rating"><option value="-">-</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td><td class="tdstatus"><select class="status"><option value="fin">Won</option><option value="wtd">Watched</option><option value="wat">Watching</option><option value="ptw">Plan to Watch</option></select></td><td class="tdmore"><textarea class="more" rows="1" cols="10"></textarea></td><td class="tdpath"><p class="path">' + pathCheck + '</p></td></tr>'
    document.getElementById('table').innerHTML += output
    sortTable(0)
  } else {
    alertCount.push(fileName)
  }
}

function showAlert() {
  if (alertCount.length != 0) {
    let msg = ''
    for (var i = 0; i < alertCount.length; i++) {
      msg += 'File ' + alertCount[i] + ' is already in the table!\n'
    }
    dialog.showMessageBox({
      type: 'info',
      title: 'Already in Table',
      message: msg
    })
  }
}

function saveDB() { // needs more testing
  let isInDb
  let items = []
  let pfad = document.getElementsByClassName('path')
  let title = document.getElementsByClassName('title')
  let rating = document.getElementsByClassName('rating')
  let status = document.getElementsByClassName('status')
  let more = document.getElementsByClassName('more')
  for (let i = 0; i < title.length; i++) {
    db.remove({
      path: pfad[i].innerText
    }, function(err, numRemoved) {
      let item = new Item(pfad[i].innerText, title[i].innerText, rating[i].value, status[i].value, more[i].value)
      items.push(item);
    })
  }
  db.insert(items, function(err, doc) {
    console.log('Saved');
  })
}

// riped out of w3schools
function sortTable(n) {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("wholeTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true
      }
    }
  }
}

if (true) { // want to do settings for autoLoad and such
  loadDB()
}

thtitle.addEventListener('click', function() {
  sortTable(0)
})

// TODO: put that shet in the toolbar
openBtn.onclick = openFilePicker
saveBtn.onclick = saveDB
loadBtn.onclick = loadDB

// DONE: contvert alert() => dialog.showMessageBox
// DONE: get Icon
// IDEA: rightklick in header to show/hide collums
// IDEA: rework the menu/toolbar
// IDEA: remove entry per rightklick ect.
// IDEA: save the file under a diffrent path
// IDEA: start video from app
// DONE: auto load
// DONE: add Kinda done/ not legit done
// IDEA: take parent directory as a category
