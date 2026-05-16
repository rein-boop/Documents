function addItem(){
  //these are mostly input box
  const name = document.getElementById("Name"); // the id set in the html 
  const student_number = document.getElementById("student-number");
  const address_1 =  document.getElementById("address-one");
  const address_2 = document.getElementById("address-two");
  const Book_title = document.getElementById("Book-title");
  const author = document.getElementById("book-author");


  const Name = name.value.trim(); // get the value from those input box
  const studentnumber = student_number.value.trim();
  const address_one = address_1.value.trim();
  const address_two = address_2.value.trim();
  const Booktitle = Book_title.value.trim();
  const Author = author.value.trim();

  fetch("/api/add", {  // send to python via fetch in a json format
      method: "POST", // means theres a message to be send
      headers:{
        "Content-Type": "application/json"  // in a json format
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
  .then(data => { // get the data from the function return jsonify({"message": f"{name} added Succesufylly"}) name will be display  and the rest

    console.log(data) 
    alert(data.message)
    get_items()

  })

  name.value = " "; // clear the inputbox value
  student_number.value = " ";
  address_1.value = " ";
  address_2.value = " ";
  Book_title.value = " ";
  author.value = " ";

}

function get_items(){
 fetch ("/api/get") // the /api/get must match the get item function in the python 
 .then (res => res.json())
 .then (items=> {
     const table = document.getElementById("InventoryTable");


     // html code in the js , this set the table header 
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
        // table data
        table.innerHTML += `
         <tr>

         <td>${item.name}</td>
         <td>${item.student_num}</td>
         <td>${item.address_1}</td>
         <td>${item.address_2}</td>
         <td>${item.Book_title}</td>
         <td>${item.author}</td>

         </tr>
        
        `


    })



 })






}

window.onload = get_items
