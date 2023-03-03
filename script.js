let allTasks = [];
let is_night = true;
let newTask = document.querySelector(".new_task");
const main_c = document.querySelector(".main_c");
const list = document.querySelector(".drag_list");
const bg_pic = document.querySelector(".bg_pic");
const time_mode = document.querySelector(".time_mode");

let start_index;
let index = 0

main_c.addEventListener("click",()=>{
    fill_list()
})
document.addEventListener('keydown',(btn)=>{
    if (btn.key == "Enter"){
        fill_list()
    }
})

time_mode.addEventListener("click",()=>{
    alt_time()
})






// function to fill list
const fill_list = ()=>{
    let words = newTask.value
    if (words == ''){
        console.log("zero")
    }else if(words.length > 40 ){
        alert("Todo statement is too long please keep it brief")
        newTask.value='';
    }else{
        allTasks.push(words)
        create_task(words)
        newTask.value='';
    }
}

//function to create elements
function create_task(word){
    const item = document.createElement('li')
    item.classList.add("cont")
    if (is_night == false){
        item.classList.add("cont_white")
    }
    item.setAttribute('d_index',index)
    item.innerHTML = `
    <div class="draggable" draggable="true">
    <div class="cont_inner">
      <div class="circle"></div>
      <p class="cont_text">${word}</p>
    </div>
    <img class="cross" src="images/icon-cross.svg">
    </div>
    `;
    
    list.appendChild(item);
    dragEventListeners();
    console.log(index)
    index +=1
 
}

function dragStart(){
    // console.log('start drag')
    start_index = +this.closest('li').getAttribute('d_index');
    

}

function dragDrop(){
    // console.log('drop')
    this.classList.remove("cont_black_over");
    const end_index = +this.getAttribute('d_index');
    console.log(end_index);
    swap(start_index,end_index)
}

function dragEnter(){
    // console.log('Enter')
    this.classList.add("cont_black_over")
  
    
}

function dragOver(event){
    // console.log('drag over')
    event.preventDefault()
 
}

function dragLeave(){
    // console.log('Leave')
    this.classList.remove("cont_black_over")
}


function dragEventListeners(){
    const drag_items = document.querySelectorAll(".draggable");
    const drag_list = document.querySelectorAll("li");

    drag_items.forEach((item)=>{
        item.addEventListener('dragstart', dragStart)
    })

    drag_list.forEach((item)=>{
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })

}

// Day and night themes for desktop mode
function alt_time(){
    let all_conts = document.querySelectorAll(".cont")

    if (is_night == true){
        bg_pic.src=`images/bg-desktop-light.jpg`
        time_mode.src=`images/icon-moon.svg`
        all_conts.forEach((cont)=>{
        cont.classList.add("cont_white")
        })
        document.querySelector("body").style.backgroundColor= "#F2F2F2"
        is_night = false

    }else{
        bg_pic.src=`images/bg-desktop-dark.jpg`
        time_mode.src=`images/icon-sun.svg`
        all_conts.forEach((cont)=>{
        cont.classList.remove("cont_white")
        })
        document.querySelector("body").style.backgroundColor= "#171823"
        is_night = true

    }
}

// function to swap todo task content
function swap(idx1,idx2){
    let task_list = document.querySelectorAll("li  div p");
    let item1 = task_list[idx1].innerHTML;
    let item2 = task_list[idx2].innerHTML;
    
    task_list[idx1].innerHTML = item2;
    task_list[idx2].innerHTML = item1;
}