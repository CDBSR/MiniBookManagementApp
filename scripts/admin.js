import { baseurl } from "./baseurl.js";
import { navbar } from "./navbar.js";

navbar();

const loginData = JSON.parse(localStorage.getItem('loginData'));

if(!loginData || loginData.email !== 'admin@empher.com'){
    alert('Admin not loggd in..');
    window.location.href = 'index.html';
}

window.onload = async () =>{
    let arr = await fetchBooks();
    displayAllBooks(arr);
};

const form = document.getElementById('addBook-form');
const bookcont = document.getElementById('books-container');

form.addEventListener('submit', async function (){
    event.preventDefault();
    alert('clicked');

    const title = form.title.value;
    const author = form.author.value;
    const category = form.category.value;

    const bookObj = {
        title,
        author,
        category,
        borrowDays: null,
        isAvailable : true,
        isVarified: false
    };

    try{
        await fetch(`${baseurl}/books`, {
            method:'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(bookObj),
        });
        alert('Book Added');
        form.reset();
    } catch(err){
        console.log("Error in adding Book..", err);
        alert('something went wrong in adding book');
    }
    
});

async function fetchBooks() {
    try {
        const res = await fetch(`${baseurl}/books`);
        const books = await res.json();
        // display books
        //displayAllBooks(books);
    }
    catch(err){
        console.log("error in getttng books", err);
    }
}

function displayAllBooks(books){
    let cont = document.getElementById('books-container');
    cont.innerHTML = '';

    books.map((el, i) => {
        let card = document.createElement('div');
        card.setAttribute('class', 'book-card');

        let title = document.createElement('h3');
        title.textContent = `Title : ${el.title}`;

        let author = document.createElement('h3');
        title.textContent = `Author : ${el.author}`;

        let category = document.createElement('h3');
        title.textContent = `Category : ${el.category}`;

        let isvailable = document.createElement('h3');
        title.textContent = `Availability : ${el.isAvailable ? 'Available' : 'Not Available'}`;

        let isvarified = document.createElement('h3');
        title.textContent = `Status : ${el.isVarified ? 'Pending' : 'Verified'}`;
        
        let updateverifiedBtn = document.createElement('button');
        updateverifiedBtn.setAttribute('class', 'bookBtns');
        updateverifiedBtn.textContent = `Toggle Verified`;
        updateverifiedBtn.addEventListener('click', function(){
            verifiedBook(el);
        });
        updateverifiedBtn.disabled = true;

        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'bookBtns');
        deleteBtn.textContent = `Delete Book`;
        deleteBtn.addEventListener('click', function(){
            deleteBook();
        });

        card.append(
            title,
            author,
            category,
            isvarified,
            isvailable,
            updateverifiedBtn,
            deleteBtn
        );

        cont.append(card);
    });

}


async function verifiedBook(el){
    let updatestatus = {...el, isVarified : !el.isVarified};

    try{
        await fetch(`${baseurl}/books/${el.id}`,{
            method : 'PATCH',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(updatestatus),
        });
        alert('Status updated..');
        form.reset();
    } catch(err){
        console.log('errro in toggle status', err);
    }
}

async function deleteBook(el){
    try{
        await fetch(`${baseurl}/books/${el.id}`,{
            method : 'DELETE',
        });
        alert('book deleted..');
        form.reset();
    } catch(err){
        console.log('errro in deleting book', err);
    }
}

