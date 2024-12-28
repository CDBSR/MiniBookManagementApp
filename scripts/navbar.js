
function navbar(){
    let nav = document.getElementById('nav');
    nav.innerHTML = '';

    const navbar = `<a href="index.html">Home</a>
            <a href="admin.html">Admin</a>
            <a href="book.html">Books</a>`;
    
    nav.innerHTML = navbar;
}

export {navbar};