console.log("hello india");
showNotes();
//1.To add notes
let addbtn = document.getElementById("addbtn");
//console.log(addbtn);
addbtn.addEventListener("click", function (e) {
  let addtxt = document.getElementById("addtxt");
  // console.log(addtxt);
  if (addtxt.value.length == 0) {
  } else {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    //console.log(notesObj);
    showNotes();
  }
});

//2. function to show  notes from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="my-cards">
        <h3 class="card-title">
       NOTE ${index + 1}
        </h3>
        <p class="my-notes">
        ${element}    
        </p>
        <button class="deletebtn" id="${index}" onclick="deleteNote(this.id)">DELETE NOTE</button>

    </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! use "ADD A NOTE" section above to add a note.`;
  }
}

//3.function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//4.function to search a note

let search = document.getElementById("searchtxt");

search.addEventListener("input", function () {

  let inputval = search.value.toLowerCase();
  let notecards = document.getElementsByClassName('my-cards');
  Array.from(notecards).forEach(function (element) {
    let cardtxt = element.getElementsByTagName("p")[0].innerHTML;
    console.log(cardtxt);
    console.log(inputval);
    if (cardtxt.includes(inputval)){
      console.log("hooooooooooooooooooooooooooo");
      element.style.display = "block";
    } else {
      element.style.display = "none";
      console.log("hnnnnnnnnnnnnnnnnnnooooooooooooooooooooooooooo");

    }
  });
});
