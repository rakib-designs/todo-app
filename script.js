// Find Input area //

const getTodo = document.getElementById("getTodo");
const addTodo = document.getElementById("addTodo");
const paragraph = document.getElementById("paragraph");
const paragaphList = document.querySelector(".paragaphList");


// added and deleted Todo message

const todoMessage = document.querySelector(".addedTodo");

const todoMessgae = (todoMsg, todoCls) => {
     todoMessage.innerHTML = todoMsg;
     todoMessage.classList.add(todoCls)

     setTimeout(() => {
          todoMessage.textContent = "";
          todoMessage.classList.remove(todoCls)
     }, 1000)
}

// getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
     return localStorage.getItem("mytodos")
       ? JSON.parse(localStorage.getItem("mytodos"))
       : [];
   };

addTodo.addEventListener("click", (event) => {

     // Get Input Value
     event.preventDefault();
     const inputValue = getTodo.value;
     const todoId = Date.now().toString();
     getPragraph(todoId, inputValue);
     todoMessgae("Todo is Added!", "addedTodoMsg");
     getTodo.value = "";
     // add todo to localStorage
     const todos = getTodosFromLocalStorage();
     todos.push({ todoId, inputValue });
     localStorage.setItem("mytodos", JSON.stringify(todos));
     
     
})
     
const getPragraph = (uniQueId, value) => {

     // Added Todo Element

     const newParagraph = document.createElement("p");
     newParagraph.id = uniQueId;
     newParagraph.innerHTML = `
          <span>${value}</span>
          <button class="deleteBtn">
          <i class="fa-solid fa-trash-can"></i>
          </button>
     `;
     paragaphList.appendChild(newParagraph);
     newParagraph.classList.add("paragraph")


     // call delete todo function
     const removeTodo = newParagraph.querySelector(".deleteBtn");
     removeTodo.addEventListener("click", deleteTodo)
}

// Delete TODO meaages

const deleteTodo = (event) => {
     const selectedTodo = event.target.parentElement.parentElement;
     paragaphList.removeChild(selectedTodo);
     todoMessgae("Todo is Deleted", "deletedTodoMsg");

     let todos = getTodosFromLocalStorage();
     todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
     localStorage.setItem("mytodos", JSON.stringify(todos));
}

const loadTodo = () => {
     const getTodo = getTodosFromLocalStorage()

     getTodo.map((todo) => {
          getPragraph(todo.todoId, todo.inputValue)
     })
}


window.addEventListener("DOMContentLoaded", loadTodo)