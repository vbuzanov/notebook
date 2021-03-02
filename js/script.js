'use strict';

let note = document.forms.note;
let newNote = note.elements.newNote;
let imgs = '';
let noteArr;
let degFlag = true;
noteArr = JSON.parse(localStorage.getItem('notes'));

if(noteArr){
    for (let i = 0; i < noteArr.length; i++) {
        crBookmark(noteArr[i]);
    }
}
else noteArr = [];

note.addEventListener('submit', (event)=>{
    event.preventDefault();
    let textNewNote = newNote.value;
    if(!textNewNote) return;
    noteArr.push(textNewNote);
    newNote.value = '';
    crBookmark(textNewNote);
})

window.addEventListener('beforeunload', ()=>{
    localStorage.setItem('notes', JSON.stringify(noteArr));
});

function crBookmark(textNewNote){
    let divNewNote = document.createElement('div');
    divNewNote.classList.add('note');
    divNewNote.innerText = textNewNote;
    let deg = Math.round(Math.random()*(5-1)+1);
    if(degFlag){
        divNewNote.style.transform = 'rotate('+deg+'deg)';
        degFlag = false;
    }
    else{
        divNewNote.style.transform = 'rotate(-'+deg+'deg)';
        degFlag = true;
    } 
    note.after(divNewNote);

    let img = document.createElement('img');
    img.src = 'images/delete.gif';
    img.style.top = '1px';
    img.style.right = '1px';
    img.style.position = 'absolute';
    divNewNote.append(img);
    remBookmark();
}

function remBookmark(){
    imgs = document.querySelectorAll('.note>img');
        
    for (let i = 0; i < imgs.length; i++){
        imgs[i].onclick = () =>{
            imgs[i].parentElement.remove();
            noteArr.splice(-(i+1), 1);
            remBookmark();
        }
    }
}