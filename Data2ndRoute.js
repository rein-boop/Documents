
//DATA2NDROUTE

function addItem(){
  //these are mostly input box
  const name = document.getElementById("Name");
  const student_number = document.getElementById("student-number");
  const address_1 =  document.getElementById("address-one");
  const address_2 = document.getElementById("address-two");
  const Book_title = document.getElementById("Book-title");
  const author = document.getElementById("book-author");


  const Name = name.value.trim();
  const studentnumber = student_number.value.trim();
  const address_one = address_1.value.trim();
  const address_two = address_2.value.trim();
  const Booktitle = Book_title.value.trim();
  const Author = author.value.trim();

  fetch("/api/add", {  // set to python via fetch in a json format
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          // headers in database: the var in this js
          name: Name,
          student_number: studentnumber,
          address_1: address_one,
          address_2: address_two,
          Book_title: Booktitle,
          author: Author
      })


  })

  .then(res => res.json())
  .then(data => {

    console.log(data)
    alert(data.message)
    get_items()

  })

}

function get_items(){
 fetch ("/api/get")
 .then (res => res.json())
 .then (items=> {
     const table = document.getElementById("InventoryTable");

     table.innerHTML = `
        <tr>
           <th> Name </th>
           <th> Student Number </th>
           <th> Address 1 </th>
           <th> Address 2 </th>
           <th> Book Title </th>
           <th> Author </th>
         </tr>
     
     `
    items.forEach(item => {
        table.innerHTML += `
         <tr>

         <td>${item.name}</td>
         <td>${item.student_number}</td>
         <td>${item.address_1}</td>
         <td>${item.address_1}</td>
         <td>${item.Book_title}</td>
         <td>${item.author}</td>

         </tr>
        
        `


    })



 })






}
