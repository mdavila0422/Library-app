/* let myLibrary = [
    new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 479, "Not Read Yet"),
    new Book("The Two Towers", "J.R.R. Tolkien", 560, "Not Read Yet"),
    new Book("The Return of the King", "J.R.R. Tolkien", 498, "Not Read Yet")
]; */

let myLibrary = localStorage.getItem('library') ? JSON.parse(localStorage.getItem('library')) : [
    new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 479, "Not Read Yet"),
    new Book("The Two Towers", "J.R.R. Tolkien", 560, "Not Read Yet"),
    new Book("The Return of the King", "J.R.R. Tolkien", 498, "Not Read Yet")
];

localStorage.setItem("library", JSON.stringify(myLibrary));
const data = JSON.parse(localStorage.getItem("library"));

const addNewButton = document.querySelector('#addNew');
addNewButton.addEventListener('click', showForm);

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', submit);

function Book(title, author, numPages, readStatus) {
    // Constructor
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readStatus = readStatus;
}

Book.prototype.toggleRead = function() {
    if(this.readStatus == 'Have Read'){
        this.readStatus = 'Not Read Yet';
    } else {
        this.readStatus = "Have Read";
    }
}

function showForm() {
    let form = document.getElementById('bookForm');
    form.hidden = false;
}

function addBookInfoToCard(bookCard, book) {
    let title = document.createElement('h3');
    let details = document.createElement('p');
    let readStatus = document.createElement('p');
    title.innerHTML = book.title;
    details.innerHTML =  " By " + book.author + " has " + book.numPages + " pages.";
    readStatus.innerText = book.readStatus;
    bookCard.appendChild(title);
    bookCard.appendChild(details);
    bookCard.appendChild(readStatus);
}

function emptyError(message){
    this.message = message;
    this.name = 'emptyError';
}

if(myLibrary.length > 0){render()};

function submit(e) {
    e.preventDefault();
    let form = document.getElementById('bookForm');
        title = document.querySelector("#title"),
        author = document.querySelector("#author"),
        pages = document.querySelector("#pages"),
        readStatus = document.getElementsByName("readRespose");
    
    try{
        if(title.value == '' || author.value == '' || pages == ''){
            throw new emptyError("Please fill in empty fields.");
        }
    } catch(err){
        alert(err.message);
        return;
    }

    readStatus.forEach( radio => {
        if(radio.checked) {
            readStatus = radio.value;
        }
    })

    myLibrary.push(new Book(title.value, author.value, pages.value, readStatus));
    localStorage.setItem("library", JSON.stringify(myLibrary));

    title.value = '';
    author.value = '';
    pages.value = '';
    form.hidden = true;

    refreshLibrary();
    render();
}

function refreshLibrary() {
    let libElem = document.querySelector('#Library');

    while(libElem.firstChild){
        libElem.removeChild(libElem.firstChild);
    }
}

function createRemoveButton (index) {
    let removeButton = document.createElement('input');
    removeButton.type = 'button';
    removeButton.value = 'Remove';
    removeButton.addEventListener('click', () => {
        // remove the book from the library and rerender
        myLibrary.splice(index, 1);
        localStorage.setItem('library', JSON.stringify(myLibrary));
        refreshLibrary();
        render();
    });
    return removeButton;
}

function createReadStatusButton(book, bookCard) {
    let readToggleButton = document.createElement('input');
    readToggleButton.type = 'button';
    readToggleButton.value = 'Toggle read Status';
    readToggleButton.addEventListener('click', () => {
        book.toggleRead();
        readStatusElement = bookCard.childNodes[2];
        readStatusElement.innerText = book.readStatus;
    });
    return readToggleButton;
}

function render() {
    let libElem = document.querySelector('#Library');

    myLibrary.forEach( (book,index) => {
        let bookCard = document.createElement('span');
        bookCard.classList.add('bookCard');
        addBookInfoToCard(bookCard,book);
        bookCard.appendChild(createReadStatusButton(book, bookCard));
        bookCard.appendChild(createRemoveButton(index));
        libElem.appendChild(bookCard);
    });
}
