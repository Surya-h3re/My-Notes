console.log("Welcome To My Notes");

showNotes(); //To show notes at the beginning of the program

//1.To add notes
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
  let addtitle = document.getElementById("addtitle");
  let addtxt = document.getElementById("addtxt");
  if (addtxt.value.length == 0 || addtitle.value.length == 0) {
    alert("Title or Note Field is empty Please write something!");
  } else {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    //Object to store Title nd Note
    let Myobj = {                  
      title: addtitle.value,
      text: addtxt.value,
    };
    notesObj.push(Myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    addtitle.value = "";
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
      ${element.title}
        </h3>
        <p class="my-notes">
        ${element.text}    
        </p>
        <button class="deletebtn" id="${index}" onclick="deleteNote(this.id)">DELETE NOTE</button>

    </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! use "Add notes" section above to add a note.`;
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
let searchbtn = document.getElementById("clrbtn");
searchbtn.addEventListener("click", function () {
  search.value = "";
});

search.addEventListener("input", function () {
  let inputval = search.value.toLowerCase();
  let notecards = document.getElementsByClassName("my-cards");
  Array.from(notecards).forEach(function (element) {
    let cardtxt = element.getElementsByTagName("p")[0].innerHTML;
    console.log(cardtxt);
    console.log(inputval);
    if (cardtxt.includes(inputval)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
