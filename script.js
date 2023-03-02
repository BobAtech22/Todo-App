let allTasks = [];
let is_night = true;
let newTask = document.querySelector(".new_task");
const main_c = document.querySelector(".main_c");
let list = document.querySelector(".drag_list");
let bg_pic = document.querySelector(".bg_pic");
let time_mode = document.querySelector(".time_mode");



main_c.addEventListener("click",()=>{
    fill_list()

})

time_mode.addEventListener("click",()=>{
    alt_time()
})

// function to fill list
const fill_list = ()=>{
    let words = newTask.value
    if (words == ''){
        console.log("zero")
    }else{
        allTasks.push(words)
        create_task(words)
        newTask.value='';
    }
}

//function to create elements
function create_task(word){
    const item = document.createElement('li')
    item.innerHTML = `
    <div class="cont" draggable="true">
    <div class="cont_inner">
      <div class="circle"></div>
      <p class="cont_text">${word}</p>
    </div>
    </div>
    `;

    list.appendChild(item)
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
    let task_list = document.querySelectorAll("li  div p")
    let item1 = task_list[idx1].innerHTML
    let item2 = task_list[idx2].innerHTML
    
    task_list[idx1].innerHTML = item2
    task_list[idx2].innerHTML = item1
}