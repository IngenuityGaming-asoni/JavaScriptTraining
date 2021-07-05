// const inputText=document.querySelector('.inputfield input');
// const addButton=document.querySelector('.inputfield button');
// const todolist=document.querySelector(".todolist");
// const deleteAllButton=document.querySelector(".footer button");
// // const li=document.querySelector("li");

// inputText.onkeyup =function (){ myFunction()};
// function myFunction() {

//     let toDoItem=inputText.value;
//     if(toDoItem.trim() !=0){
//         addButton.classList.add("active");
//     }
//     else{
//         addButton.classList.remove("active");
//     }
// };

// showTask();
// // function for adding task in local storage
// addButton.onclick = ()=> {
//     let toDoItem=inputText.value;
//     // let localstorage= localStorage.getItem('New Todo');

//     if(localStorage.getItem('New Todo') == null){
//         arr=[];
//     }
//     else{
//         arr=JSON.parse(localStorage.getItem('New Todo'));
//     }
//     arr.push(toDoItem);
//     localStorage.setItem("New Todo",JSON.stringify(arr));
    
//     showTask();
// }
// //function for showing the todo list
// function showTask(){
//     if(localStorage.getItem("New Todo") == null){
//         arr=[];
//     }
//     else{
//         arr=JSON.parse(localStorage.getItem("New Todo"));
//     }
//     document.querySelector(".remainingTask").textContent=arr.length;



//     //clearAll button
//     if(arr.length>0){
//         deleteAllButton.classList.add("active");
//     }
//     else{
//         deleteAllButton.classList.remove("active");
//     }
//     let newLiTag ='';
//     arr.forEach((element,index )=> {
//         newLiTag +=  '<li>'+element+'<span onclick = "deleteTask('+index+')""><img  src="trash.gif"></span></li>';
//         inputText.value='';
//     });
//     todolist.innerHTML = newLiTag;
//     // todolist.appendChild(newLiTag);
// }
// //function for deselecting task that are done


// //function for deleting particular task
// function deleteTask(index){
//     let localstorage =localStorage.getItem("New Todo");
//     arr=JSON.parse(localstorage);
//     arr.splice(index,1);
//     localStorage.setItem("New Todo",JSON.stringify(arr));
//     showTask();
// }



// //function for deleting all task
// deleteAllButton.onclick = () =>{
//     localStorage.clear();
//     showTask();
// }