//constructor for the book
function Book(title,author,pages,readStatus){
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
}

//add toggle function as prototype for efficiency
Book.prototype.toggleRead = function(book){
    //interchange value
    this.readStatus = !this.readStatus
  }

//put user book as object in the array
let myLibrary = [];
//function to add user book to the array
 
 function addBookToLibrary(array){
 //form values  
 const userBookTitle = document.getElementById('book-title').value;
 const userBookAuthor = document.getElementById('author').value;
 const userBookPages = document.getElementById('pages').value;
 const userReadStatus = document.getElementById('read-it').checked;

 
  
   let userBook = new Book(userBookTitle,userBookAuthor,userBookPages,userReadStatus);
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
    btnHolder.classList.add('btn-holder');
    deleteBtn.classList.add('delete-btn');
    read.classList.add('change-btn')

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
    bookTitle.textContent = book.title;
    bookAuthor.textContent = "by " + book.author;
    bookPage.textContent = "pages: " + book.pages;
    bookStatus.textContent = book.readStatus ? "Completed" : 'Not read it yet.'
    deleteBtn.textContent = "Remove";
    read.textContent = "change status";

     //use event delegation on the card a to remove the userbook from the array using remove buttton  
      card.addEventListener('click',(e)=>{
            if(e.target.matches('.delete-btn')){
                //get the index of object associate with the clicked card using data attribute then slice it
                let itemIndex = card.dataset.index;
                let deleteItem = myarray.splice(itemIndex,1)
                //remove from the screen
                card.remove()
            }
            else if(e.target.matches('.change-btn')){
              let itemIndex = card.dataset.index;
              let changeStatus = myarray[itemIndex];
            
              changeStatus.toggleRead()
              //call dispmay fuc=nction to shaow change in bookstatus on card
              displayBook(myLibrary)
              
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
    
    let userNotRead = document.getElementById('not-read').checked;
    let userBookTitle = document.getElementById('book-title').value;
    let userBookAuthor = document.getElementById('author').value;
    let userBookPages = document.getElementById('pages').value;
    let userReadStatus = document.getElementById('read-it').checked;
    const msg = document.querySelector('.validate-msg')
    const msgFill = document.querySelector('.msg-invalid');
    //functiion to vallidate
    function validateForm(){
        if(userReadStatus == false && userNotRead == false ){
            msg.style.display = 'block' 
            msg.textContent="Please mark one of the checkbox."
            return false
         }
         else if(userReadStatus == true && userNotRead == true){
          msg.style.display = 'block' 
          msg.textContent = "Please,mark only one of the checkbox."
          console.log((userReadStatus == true && userNotRead == true))
          return false
         }
        else if(userBookTitle == "" || userBookAuthor == '' || userBookPages == '' ){
            msgFill.style.display = 'block'
            msgFill.textContent = "plaease fill all the input."
            console.log((userBookTitle == null || userBookAuthor == null || userBookPages == null ))
            return false
         }
    }
    
    
   if(validateForm() == false){
    return
   }
   else{
      modal.close();
      addBookToLibrary(myLibrary);
      displayBook(myLibrary);

      //clear the previous input
    const forms = document.querySelectorAll('input');
    forms.forEach(input=>{
      input.value = ""
      input.checked = false
    });
   }
   
    
});