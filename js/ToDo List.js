/*
excercies
1-use sweet Alert
2-check  if task is Exist
3- create delete all tasks button (new button)
4- create finish all tasks button (new button)
5- Add task to localstorage
*/

/*
excercies from Ahmed Helal 
1-

*/



// Setting up variables
let theInput = document.querySelector(".add-task input");
let addButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let noTasksMsg = document.querySelector(".tasks-content .no-tasks-message"); // it is (No tasks to show) static
let taskCount = document.querySelector(".tasks-status .task-count span");
let taskCompleted = document.querySelector(
  ".tasks-status .task-completed span"
);

let deleteAll = document.getElementById("deleteAll");
let completedAll = document.getElementById("completedAll");
let tasks = []; ///////////////////////// best solution

window.onload = function () {
  theInput.focus();
};
const handleNewTask = () => {
  if (theInput.value === "") {
    // using sweet Alert

    // swal("warning!", "You must add your task!", "warning");

    swal("warning!", {
      title: "You must add your task!",
      icon: "warning",
      timer: 2000,
      buttons: false,
    });
  } else {
    let noTasksMsg = document.querySelector(".tasks-content .no-tasks-message"); // it is (No tasks to show) dynamic

    // check if span with no tasks message is exist
    if (
      document.body.contains(
        document.querySelector(".tasks-content .no-tasks-message")
      )
    ) {
      //Remove no tasks message
      noTasksMsg.remove();
    }
    // check task is exist
    if (isTaskExist()) {
      // Empty the input function
      resetInput();
      return false;
    }


    // function to add task (not in locallStorage)
    bindTask(theInput.value);
    tasks.push(theInput.value); ///////////////////////////////////////////////////////////best solution
    localStorage.setItem("myTasks" ,JSON.stringify (tasks ) )




    // Empty the input function
    resetInput();
    // show feedback
    swal("Success!", {
      title: "Task added successfully",
      icon: "success",
      timer: 2000,
      buttons: false,
    });

    // focus on filed
    theInput.focus();
  }

  activateDeleteButton();
  activateCompletedButton()

};

// Adding the task
addButton.onclick = handleNewTask;

// add task by enter button
theInput.onkeypress = function (e) {
  if (e.code == "Enter") {
    handleNewTask();
    
  }
};

// resetInput function
function resetInput() {
  // Empty the input
  theInput.value = "";
}
// deleteButton.onclick()

document.addEventListener("click", function (e) {
  // e.target.className == 'delete' ====> access delete span button
  if (e.target.className == "delete") {
    // Remove current Task
    e.target.parentNode.remove();

    tasks.splice(tasks.indexOf(e.target.parentNode.firstChild.nodeValue), 1); //////////////best solution
    localStorage.setItem("myTasks" ,JSON.stringify (tasks ) )
    // check number of tasks inside the container
    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
      deActivateDeleteButton()
    }
  }

  // e.target.className == 'task-box' ====> access task-box class
  if (e.target.classList.contains("task-box")) {
    // toggle  finished class
    e.target.classList.toggle("finished");
  }

  // calculate Tasks
  calculateTasks();
});

// function to create no tasks message

function createNoTasks() {
  // create message span element
  let noTasksMsg = document.createElement("span");

  noTasksMsg.id = "no_task";

  // create the text message
  let textMeg = document.createTextNode("No tasks to show");

  // Add Text to message span element
  noTasksMsg.appendChild(textMeg);

  // Add class to  message span
  noTasksMsg.className = "no-tasks-message";

  //  Append the  message span element to the tasks Container
  tasksContainer.appendChild(noTasksMsg);
}

// function to calculate Tasks

function calculateTasks() {
  // calculate all tasks
  taskCount.textContent = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  // calculate completed tasks
  taskCompleted.textContent = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}


function bindTask(task)
{
// create span element
let mainSpan = document.createElement("span");

// create Text Node inside mainSpan
mainSpan.appendChild(document.createTextNode(task));

// create delete span Button
let deleteButton = document.createElement("span");

// create Text Node (Delete) inside deleteButton
deleteButton.appendChild(document.createTextNode("Delete"));

// Append deleteButton to mainSpan
mainSpan.appendChild(deleteButton);

// Append mainSpan to tasksContainer
tasksContainer.appendChild(mainSpan);

// Add task-box class to mainSpan
mainSpan.classList.add("task-box");

// Add delete class to deleteButton (another method)
deleteButton.className = "delete";

}
    
function isTaskExist() {
  let tasksArray = [];
  let allTasks = Array.from(
    document.querySelectorAll(".tasks-content .task-box")
  );
  for (let i = 0; i < allTasks.length; i++) {
    tasksArray.push(allTasks[i].firstChild.nodeValue);
  }

  if (tasksArray.includes(theInput.value)) {
    // swal("warning!", "You task is already Exist!", "warning");
    swal("warning", {
      title: "You task is already Exist!",
      icon: "warning",
      timer: 2000,
      buttons: false,
    });
    return true;
  }
  return false;
}

deleteAll.onclick = function () {
  document
    .querySelectorAll(".task-box")
    .forEach((el) => el.parentNode.removeChild(el));
  if (!document.querySelector("#no_task")) {
    createNoTasks();
  }

  deActivateDeleteButton();
};



completedAll.onclick = function () {
  document
    .querySelectorAll(".task-box")
    .forEach((el) => el.classList.add("finished"));

    deActivateCompletedButton()

};



function deActivateDeleteButton()
{
  deleteAll.disabled=true;
  
  
}

function activateDeleteButton()
{
  deleteAll.disabled=false;
}

function deActivateCompletedButton()
{
  completedAll.disabled=true;
  
}

function activateCompletedButton()
{
  completedAll.disabled=false;
}


const handleNewTaskFromLocalStorage = (task) => {
if( document.querySelector("#no_task"))
{
  document.querySelector("#no_task").remove();
}
   
bindTask(task);
  }



const tasksFromLocalStorage=JSON.parse(localStorage.getItem("myTasks"));
if(tasksFromLocalStorage)
{
  tasks=tasksFromLocalStorage;
  for(task of tasksFromLocalStorage)
  {
    
    handleNewTaskFromLocalStorage(task);
    
  }
  
}






//using map

// function isTaskExist() {
//   let allTasks = Array.from(
//     document.querySelectorAll(".tasks-content .task-box")
//   ).map((taskElement) => {
//     console.log(taskElement);
//     return taskElement.firstChild.nodeValue;
//   });

//   if (allTasks.includes(theInput.value)) {
//     swal("warning!", "You task is already Exist!", "warning");
//     return true;
//   }
//   return false;
// }

///////////////////////////// best solution

// function isTaskExist() {
//   if (tasks.includes(theInput.value)) {
//     swal("warning!", "You task is already Exist!", "warning");
//     return true;
//   }
//   return false;
// }


