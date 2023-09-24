//constructor for the book
function Book(title,author,pages,status){
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

//put user book as object in the array
let myLibrary = [];
//form value
const userBookTitle = document.getElementById('book-title');
    const userBookAuthor = document.getElementById('author');
    const userBookPages = document.getElementById('pages');

 //function to add user book to the array
 
 function addBookToLibrary(array){

    let userBook = new Book(userBookTitle.value,userBookAuthor.value,userBookPages.value);
    array.push(userBook)
 }

 //function that accept array of books object and  create card for each book in the array
 function bookCards(myarray){

    myarray.forEach(book => {
        
   const books = document.querySelector('.books')
    const card = document.createElement('div')
    const bookTitle = document.createElement('h3');
    const bookAuthor = document.createElement('h4');
    const bookPage = document.createElement('p');
    const bookStatus = document.createElement('h5');
    const btnHolder = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const read = document.createElement('button');

    card.classList.add('card');

    //set data atribute to associate the book obbject index in the array  and the card
    card.dataset.index = myarray.indexOf(book);

    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPage);
    card.appendChild(bookStatus);
    btnHolder.appendChild(deleteBtn);
    btnHolder.appendChild(read);
    card.appendChild(btnHolder);

books.appendChild(card)

    //text content for items
    bookTitle.textContent = book.title
    bookAuthor.textContent = "by" + book.author
    bookPage.textContent = "pages: " + book.pages
   // bookStatus.textContent = book.status

     //use event delegation on the card a to remove the userbook from the array using remove buttton  
      card.addEventListener('click',(e)=>{
            if(e.target.matches('.delete-btn')){
                //get the index of object associate with the clicked card using data attribute then slice it
                let itemIndex = card.dataset.index;
                let deleteItem = myarray.splice(itemIndex,1)
                //remove from the screen
                card.remove()
            }
      });
    
    }); 

 }

 
 const addBooks = document.querySelector('.add-book');
 const modal = document.querySelector('.book-info');
 const submit = modal.querySelector('.confirm-btn');
 
 //function to display the books on screen
  function displayBook(myarray){
const books = document.querySelector('.books');

// clear the books to avoid new one writing thr old
books.innerHTML = "";

bookCards(myarray);
  }
//button to  show modal
addBooks.addEventListener('click',()=>{
    modal.showModal();
})
  
//button to submit user book

submit.addEventListener('click',function(event){
event.preventDefault();
modal.close();
addBookToLibrary(myLibrary);

displayBook(myLibrary)

})