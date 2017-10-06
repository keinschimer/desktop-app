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
// IDEA: fix after adding then to zero the shet
// might be too Hard for me to fix (lazy)

function openFilePicker() {
  // IDEA: check if file exists
  //Works (i guess)
  var myFile = dialog.showOpenDialog({
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
    let pathCheck = document.getElementsByClassName('path')
    for (let i = 0; i < myFile.length; i++) {
      var isNameAvaliable = 0;
      var fileExt = path.extname(myFile[i])
      var fileName = path.basename(myFile[i], fileExt)
      for (let j = 0; j < pathCheck.length; j++) {
        if (pathCheck[j].innerText == myFile[i]) {
          isNameAvaliable = 1
          alert(fileName + ' with ' + myFile[i] + ' is already in the table')
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
    console.log('Saved');
  })
}

function loadDB() {
  // TODO: replace the alredy existing entries
  db.find({}, function(err, docs) {
    for (let i = 0; i < docs.length; i++) {
      fs.stat(docs[i].path, function(err, stats) {
        if (stats.isFile() && isInTable(docs[i].path)) {
          console.log('yes');
          generateRow(docs[i].name, docs[i].path)
          sortTable(0)
        }
      })
    }
    var valCount = 0
    while (valCount < 100) {
      setTimeout(function() {
        if (document.getElementsByClassName('rating').length == docs.length) {
          for (let i = 0; i < docs.length; i++) {
            for (let j = 0; j < document.getElementsByClassName('title').length; j++) {
              if (document.getElementsByClassName('title')[j].innerText == docs[i].name) {
                document.getElementsByClassName('rating')[j].value = docs[i].score
                document.getElementsByClassName('status')[j].value = docs[i].status
                document.getElementsByClassName('more')[j].value = docs[i].more
              }
            }
          }
        }
      }, 1)
      valCount++
    }
  })
}

function isInTable(pathToCheck) {
  let path = document.getElementsByClassName('path')
  if (true) {
    console.log(path);
    return true;
  }
}

//was to lazy to write that again for load
function generateRow(fileName, filePath) {
  let output = '<tr><td class="tdtitle"><p class="title">' + fileName + '</p></td><td class="tdrating"><select class="rating"><option value="-">-</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td><td class="tdstatus"><select class="status"><option value="fin">Finished</option><option value="wat">Watching</option><option value="ptw">Plan to Watch</option></select></td><td class="tdmore"><textarea class="more" rows="1" cols="10"></textarea></td><td class="tdpath"><p class="path">' + filePath + '</p></td></tr>'
  document.getElementById('table').innerHTML += output
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
        switching = true;
      }
    }
  }
}

thtitle.addEventListener('click', function() {
  sortTable(0)
})

// TODO: put that shet in the toolbar
openBtn.onclick = openFilePicker
saveBtn.onclick = saveDB
loadBtn.onclick = loadDB
