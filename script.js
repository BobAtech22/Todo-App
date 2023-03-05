let allTasks = [];
let completed = [];
let active = [];
let is_night = true;
let is_in = false;
let newTask = document.querySelector(".new_task");
const main_c = document.querySelector(".main_c");

const all_list = document.querySelector(".all_list");
const comp_list = document.querySelector(".comp_list");
const active_list = document.querySelector(".active_list");

const bg_pic = document.querySelector(".bg_pic");
const time_mode = document.querySelector(".time_mode");



let start_index;
let index = 0


main_c.addEventListener("click",()=>{
    fill_list(all_list)
    circle_event(main_c.children[0])
})

document.addEventListener('keydown',(btn)=>{
    if (btn.key == "Enter"){
        fill_list(all_list)
    }
})

time_mode.addEventListener("click",()=>{
    alt_time()
})





const circle_event = (item)=>{
            let check = item.children[0];
            let circle = item.parentNode;
            if (check.style.display != 'block'){
                check.style.display = "block";
                circle.classList.add("active_circle");
                item.classList.add("active_circle");
            }else{
                check.style.display = "none"
                circle.classList.remove("active_circle");
                item.classList.remove("active_circle");
            }
}


// ------------------------------File functions------------
// function to fill list
const fill_list = (ul)=>{
    let words = newTask.value
    if (words == ''){
        console.log("zero")
    }else if(words.length > 40 ){
        alert("Todo statement is too long please keep it brief")
        newTask.value='';
    }else{
        allTasks.push(words);
        active.push(words);
        create_task(words,ul)
        newTask.value='';
    }
}

function fill_completed(item){
    item.classList.add("done");
    completed.push(item.innerHTML);
    create_task_comp(item.innerHTML,comp_list);
}

// function make_active_array(){
//     active = []
//     allTasks.forEach((item)=>{
//         if (completed.includes(item)){
//             //pass
//         }else{
//             active.push(item)
//         }
//     })
// }


//function to create elements-------------------------
function create_task(word,ul){
    const item = document.createElement('li')
    item.classList.add("cont")
    if (is_night == false){
        item.classList.add("cont_white")
    }
    item.setAttribute('d_index',index)
    item.innerHTML = `
    <div class="draggable" draggable="true">
    <div class="cont_inner">
      <div class="circle">
        <div class="in_circle">
            <img class="checked" src="images/icon-check.svg" alt="">
        </div>
      </div>
      <p class="cont_text">${word}</p>
    </div>
    <img class="cross point" src="images/icon-cross.svg">
    </div>
    `;
    let circle = item.children[0].children[0].children[0];
    let text = item.children[0].children[0].children[1];
    let cross = item.children[0].children[1]
    cross.addEventListener("click",()=>{
        //pass
    })
    
    if (is_night == false){
        circle.classList.add("circle_white")
        circle.children[0].classList.add("in_circle_white")
    }
    circle.addEventListener("click",()=>{
        
        circle_event(circle.children[0])
        if (is_in == false){
            fill_completed(text);
            let index = active.indexOf(text.innerHTML);
            active.splice(index,1);
            is_in = true;
        }else{
            reverse(text.innerHTML);
            active.push(text.innerHTML)
            is_in = false;
        }
        make_active_array()
    })

    ul.appendChild(item);
    dragEventListeners();
    console.log(index)
    index +=1
 
}


function reverse(value){
    console.log(value)
    let list = document.querySelectorAll(".comp_list li")
    let index = completed.indexOf(value);
    completed.splice(index,1);
    list.forEach((li)=>{
        let text = li.children[0].children[0].children[1].innerHTML
        if (text == value){
            li.parentNode.removeChild(li)
            
        }
        console.log("done")
    })
    
}





function create_task_comp(word,ul){
    const item = document.createElement('li')
    item.classList.add("cont")
    if (is_night == false){
        item.classList.add("cont_white")
    }
    item.setAttribute('d_index',index)
    item.innerHTML = `
    <div class="draggable" draggable="true">
    <div class="cont_inner">
      <div class="circle active_circle">
        <div class="in_circle active_circle">
            <img class="checked" src="images/icon-check.svg" alt="">
        </div>
      </div>
      <p class="cont_text done">${word}</p>
    </div>
    <img class="cross point" src="images/icon-cross.svg">
    </div>
    `;
    let circle = item.children[0].children[0].children[0];
    let cross = item.children[0].children[1]
    circle.children[0].children[0].style.display= "block";
    cross.addEventListener("click",()=>{
        //pass
    })
    
    if (is_night == false){
        circle.classList.add("circle_white")
        circle.children[0].classList.add("in_circle_white")
    }
    


    ul.appendChild(item);
    dragEventListeners();
    index +=1
 
}







// ----------------Drag functions--------------------
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
// ------------------------------------------------------------



// Day and night themes for desktop mode
function alt_time(){
    let all_conts = document.querySelectorAll(".cont")
    let all_circles = document.querySelectorAll(".in_circle")
    let outer_circles = document.querySelectorAll(".circle")
    if (is_night == true){
        bg_pic.src=`images/bg-desktop-light.jpg`
        time_mode.src=`images/icon-moon.svg`
        all_conts.forEach((cont)=>{
        cont.classList.add("cont_white")
        })
        all_circles.forEach((cont)=>{
            cont.classList.add("in_circle_white")
            })
        outer_circles.forEach((cont)=>{
            cont.classList.add("circle_white")
            })
        document.querySelector("body").style.backgroundColor= "#F2F2F2"
        is_night = false

    }else{
        bg_pic.src=`images/bg-desktop-dark.jpg`
        time_mode.src=`images/icon-sun.svg`
        all_conts.forEach((cont)=>{
        cont.classList.remove("cont_white")
        })
        all_circles.forEach((cont)=>{
            cont.classList.remove("in_circle_white")
            })
        outer_circles.forEach((cont)=>{
            cont.classList.remove("circle_white")
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

//removing list item
