import { baseurl } from "./baseurl.js";

const loginData = JSON.parse(localStorage.getItem('loginData'));

if(!loginData || loginData.email !== 'admin@empher.com'){
    alert('Admin not loggd in..');
    window.location.href = 'index.html';
}

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
        isAvailable : false
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

        if (el.isAvailable == false){
            card.classList.add("Not Available");
        }

        let staus = document.createElement('h3');
        title.textContent = `Status : ${el.isAvailable} == true ? "Status : Available" : "Status : Not Available"` ;

         

    });
}

