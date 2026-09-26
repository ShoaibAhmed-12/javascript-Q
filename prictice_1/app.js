// const h1 = document.querySelector("h1")
// const list = document.querySelector("#list")
// const button = document.querySelector("#button")


// list.addEventListener('click',function(e){
//   e.target.style.textDecoration = "Line-through"
// })

// button.addEventListener('click',function(e){
  
//   })
// const h1 = document.querySelector("h1");
// const list = document.querySelector("#list");
// const button = document.querySelector("#button");

// list.addEventListener("click", function (e) {
//   e.target.style.textDecoration = "line-through";
// });

// button.addEventListener("click", function (e) {
//   const li = document.createElement("li");
  
//   li.textContent = "Item4";

//   list.appendChild(li);
  
// });
// const h1 = document.querySelector("h1");
// const list = document.querySelector("#list");
// const button = document.querySelector("#button");

// list.addEventListener("click", function (e) {
//   if (e.target.style.textDecoration === "line-through") {
//     e.target.style.textDecoration = "none";
//   } else {
//     e.target.style.textDecoration = "line-through";
//   }
// });

// button.addEventListener("click", function (e) {
//   const li = document.createElement("li");

//   li.textContent = "Item4";

//   list.appendChild(li);
// // });
// const list = document.querySelector("#list");
// const button = document.querySelector("#button");
// const input = document.querySelector("#input");

// // Existing li par event listener
// const items = document.querySelectorAll("#list li");

// items.forEach(function (li) {
//   li.addEventListener("click", function () {
//     if (li.style.textDecoration === "line-through") {
//       li.style.textDecoration = "none";
//     } else {
//       li.style.textDecoration = "line-through";
//     }
//   });
// });

// // New item add karna
// button.addEventListener("click", function () {
//   if (input.value.trim() === "") {
//     return;
//   }

//   const li = document.createElement("li");

//   li.textContent = input.value;

//   // New li par bhi directly event listener
//   li.addEventListener("click", function () {
//     if (li.style.textDecoration === "line-through") {
//       li.style.textDecoration = "none";
//     } else {
//       li.style.textDecoration = "line-through";
//     }
//   });

//   list.appendChild(li);

//   input.value = "";
// });

// const list = document.querySelector("#list");
// const button = document.querySelector("#button");
// const input = document.querySelector("#input");


// // Function jo har li ko functionality dega
// function addEvents(li) {

//   // Li par click -> line through
//   li.addEventListener("click", function (e) {

//     // Agar button par click hua hai to line-through nahi lagayenge
//     if (e.target.tagName === "BUTTON") {
//       return;
//     }

//     if (li.style.textDecoration === "line-through") {
//       li.style.textDecoration = "none";
//     } else {
//       li.style.textDecoration = "line-through";
//     }
//   });


//   // Delete button
//   const deleteButton = li.querySelector(".delete");

//   deleteButton.addEventListener("click", function () {
//     li.remove();
//   });


//   // Rename button
//   const renameButton = li.querySelector(".rename");

//   renameButton.addEventListener("click", function () {

//     const oldName = li.firstChild.textContent.trim();

//     const newName = prompt("Enter new name:", oldName);

//     if (newName !== null && newName.trim() !== "") {
//       li.firstChild.textContent = newName + " ";
//     }
//   });
// }


// // Existing items ko functionality dena
// const items = document.querySelectorAll("#list li");

// items.forEach(function (li) {
//   addEvents(li);
// });


// // New item add karna
// button.addEventListener("click", function () {

//   if (input.value.trim() === "") {
//     return;
//   }

//   const li = document.createElement("li");

//   li.innerHTML = `
//     ${input.value}
//     <button class="rename">Rename</button>
//     <button class="delete">Delete</button>
//   `;

//   list.appendChild(li);

//   // New li ko bhi same functionality dena
//   addEvents(li);

//   // Input clear
//   input.value = "";
// });

// const ul = document.querySelector('ul')
// const addTodo = document.querySelector('#add')
// const addInput = document.querySelector('#addInput')

// ul.addEventListener('click',function(e){
//   if(e.target.classList.contains('del')){
//     e.target.parentElement.remove()

    
//   }
//   if(e.target.nodeName ==='Li'){
//     e.target.style.textDecoration = "line-through"
//   }
// })
// addTodo.addEventListener("click",function(){
//   let div = document.createElement("div")
//   let button = document.createElement("button")
//   let li = document.createElement("li")

//   li.textContent = addInput.value;
//   button.textContent = "Delete"
//   button.setAttribute("class","del")
//   div.appendChild(li);
//   div.appendChild(button)
  

//   div.classList.add("item")
//   ul.appendChild(div)
//   addInput.value = ""
// }
// )

const ul = document.querySelector("ul");
const addTodo = document.querySelector("#add");
const addInput = document.querySelector("#addInput");

addTodo.addEventListener("click", function () {

    if (addInput.value.trim() === "") {
        alert("Please enter an item!");
        return;
    }  
    const div = document.createElement("div");
    div.classList.add("item");

    const li = document.createElement("li");
    li.textContent = addInput.value;
    const renameBtn = document.createElement("button");
    renameBtn.textContent = "Rename";
    renameBtn.classList.add("rename");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("del");   
    div.appendChild(li);
    div.appendChild(renameBtn);
    div.appendChild(deleteBtn);  
    ul.appendChild(div); 
    addInput.value = "";
});
ul.addEventListener("click", function (e) {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("rename")) {  
        const item = e.target.parentElement;
       const li = item.querySelector("li");      
        const newName = prompt("Enter new name:", li.textContent);      
        if (newName !== null && newName.trim() !== "") {
            li.textContent = newName.trim();
        }
    }  
    if (e.target.tagName === "LI") {
        if (e.target.style.textDecoration === "line-through") {
            e.target.style.textDecoration = "none";
        } else {
            e.target.style.textDecoration = "line-through";
        }
    }

});




 






