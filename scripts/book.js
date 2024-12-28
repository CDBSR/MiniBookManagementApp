import { baseurl } from "./baseurl.js"; 

window.onload = function (){
    const loginData = JSON.parse(localStorage.getItem('loginData'));


    if(!loginData || loginData.email !== 'user@empher.com'){
        alert('User not loggd in..');
        window.location.href = 'index.html';
    }

    const avl = document.getElementById('available');
    const brr = document.getElementById('borrowed');
    const bookcont = document.getElementById('books-container');

    avl.addEventListener('click', fetchAvailableBooks);
    brr.addEventListener('click', fetchBorrowedBooks);


    async function fetchAvailableBooks() {
        try {
            const res = await fetch(`${baseurl}/books?isAvailable=true`);
            const books = await res.json();
            // display books
            displayBooks(books,true);
        }
        catch(err){
            console.log("error in getttng books", err);
        }
    }

    async function fetchBorrowedBooks() {
        try {
            const res = await fetch(`${baseurl}/books?isAvailable=false`);
            const books = await res.json();
            // display books
            displayBooks(books,false);
        }
        catch(err){
            console.log("error in getttng books", err);
        }
    }

    function displayBooks(books, isAvailable){
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
            
            let borroBtn = document.createElement('button');
            borroBtn.setAttribute('class', 'bookBtns');
            borroBtn.textContent = `Borrow Book`;
            borroBtn.addEventListener('click', function(){
                borrowBook(el);
            });

            card.append(
                title,
                author,
                category,
                isvailable,
                borroBtn 
            );

            cont.append(card);
        });
    }
    

    async function borrowBook(el){
        if(isAvailable){
            const days = prompt("Enter borrowing duration (max 10 days) :");
            const bdays = parseInt(days, 10);

            if(isNaN(bdays) || bdays <=0 || bdays > 10){
                alert("Invalid duration. please enter a number between 1 to 10.");
                return;
            }

            try {
                await fetch(`${baseurl}/books/${el.id}`,{
                    method : 'PATCH',
                    headers: {
                        'content-type' : 'application/json',
                    },
                    body: JSON.stringify({isAvailable: false, bdays}),
                });
                alert('Book Borrowed..');
                fetchAvailableBooks();
            } catch(err){
                console.log("error in borrowing book", err);
                alert('something went wrong in borrowing books');
            }
        }

        if(!isAvailable){
            if(confirm('Are You sure to return book...')){
                try {
                    await fetch(`${baseurl}/books/${el.id}`,{
                        method : 'PATCH',
                        headers: {
                            'content-type' : 'application/json',
                        },
                        body: JSON.stringify({isAvailable: true, borrowDays:null}),
                    });
                    alert('Book Returned..');
                    fetchBorrowedBooks();
                } catch(err){
                    console.log("error in borrowing book", err);
                    alert('something went wrong in borrowing books');
                }
            }
            
        }
    }

    fetchAvailableBooks();

};

