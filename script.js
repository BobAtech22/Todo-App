let allTasks = [];
let completed = [];
let active =[]

let is_night = true;
let is_in = false;
let newTask = document.querySelector(".new_task");
const main_c = document.querySelector(".main_c");

const all_list = document.querySelector(".all_list");
const all_filter = document.querySelector(".all");
const comp_filter = document.querySelector(".completed");
const active_filter = document.querySelector(".active");



const bg_pic = document.querySelector(".bg_pic");
const time_mode = document.querySelector(".time_mode");



let start_index;
let index = 0

let remaining = document.querySelector(".count")


remaining.innerHTML = `${active.length} items left`

main_c.addEventListener("click",()=>{
    fill_list(all_list)
    circle_event(main_c.children[0])
    setTimeout(()=>{
        circle_event(main_c.children[0])},200)
});

document.addEventListener('keydown',(btn)=>{
    if (btn.key == "Enter"){
        fill_list(all_list);
        circle_event(main_c.children[0])
        setTimeout(()=>{
            circle_event(main_c.children[0])},200)
    }
});

time_mode.addEventListener("click",()=>{
    alt_time();
});




all_filter.addEventListener("click",()=>{
    let list = all_list.childNodes;
    list.forEach((li)=>{
        li.style.display="block"
    })
    all_filter.classList.add("selected_filter");
    comp_filter.classList.remove("selected_filter");
    active_filter.classList.remove("selected_filter");
})

comp_filter.addEventListener("click",()=>{
    hide_active_cont()
    comp_filter.classList.add("selected_filter");
    all_filter.classList.remove("selected_filter");
    active_filter.classList.remove("selected_filter");
})

 active_filter.addEventListener("click",()=>{
    hide_comp_cont();
    active_filter.classList.add("selected_filter");
    all_filter.classList.remove("selected_filter");
    comp_filter.classList.remove("selected_filter");
})




function hide_active_cont(){
    let list = all_list.childNodes;
    let p_items = document.querySelectorAll("li .done");
    
    list.forEach((li)=>{
            li.style.display="none";
    })
    p_items.forEach((item)=>{
        let li_item = item.parentNode.parentNode.parentNode;
        li_item.style.display="block";
    })

}

function hide_comp_cont(){
    let list = all_list.childNodes;
    let p_items = document.querySelectorAll("li .done");
    
    list.forEach((li)=>{
            li.style.display="block";
    })
    p_items.forEach((item)=>{
        let li_item = item.parentNode.parentNode.parentNode;
        li_item.style.display="none";
    })

}

const circle_event = (item)=>{
            let check = item.children[0];
            let circle = item.parentNode;
            let text = item.parentNode.parentNode.children[1]
            if (check.style.display != 'block'){
                check.style.display = "block";
                circle.classList.add("active_circle");
                item.classList.add("active_circle");
                text.classList.add("done");
                text.classList.remove("not_done");
            }else{
                check.style.display = "none"
                circle.classList.remove("active_circle");
                item.classList.remove("active_circle");
                text.classList.remove("done");
                text.classList.add("not_done");
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

    remaining.innerHTML = `${active.length} items left`
}

function fill_completed(item){
    let text = item.innerHTML;
    
    if (item.className == 'cont_text done'){
        completed.push(text);
        inactive(text)
        console.log("yes")
    }else{
        active.push(text)
        let index = completed.indexOf(text)
        completed.splice(index,1)
        console.log("no")
    }  
}

function inactive(value){
    let index = active.indexOf(value)
    active.splice(index,1)
}
// function make_active_array(){
//     let active = []
//     active = allTasks.forEach((item)=>{
//         if (completed.includes(item)){
//            let idx = allTasks.indexOf(item);
//            allTasks.splice(idx,1)
//         }
//     })
//     return active
// }


//function to create elements-------------------------
function create_task(word,ul){
    const item = document.createElement('li')
    item.classList.add("cont")
    item.classList.add("swap")
    if (is_night == false){
        item.classList.add("cont_white")
    }
    item.setAttribute('d_index',index)
    item.innerHTML = `
    <div class="draggable" draggable="true">
    <div class="cont_inner">
      <div class="circle li_circle">
        <div class="in_circle">
            <img class="checked" src="images/icon-check.svg" alt="">
        </div>
      </div>
      <p class="cont_text not_done point">${word}</p>
    </div>
    <img class="cross point" src="images/icon-cross.svg">
    </div>
    `;
    let circle = item.children[0].children[0].children[0];
    let text = item.children[0].children[0].children[1];
    let cross = item.children[0].children[1]
    cross.addEventListener("click",()=>{
        remove(item)
    })
    
    if (is_night == false){
        circle.classList.add("circle_white")
        circle.children[0].classList.add("in_circle_white")
    }
    circle.addEventListener("click",()=>{
        circle_event(circle.children[0])
        fill_completed(text)
        // reverse(text.innerHTML)
        remaining.innerHTML = `${active.length} items left`
    })

    ul.appendChild(item);
    dragEventListeners();
    console.log(index)
    index +=1
    update_all_data_array()
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
    // variables
    let all_conts = document.querySelectorAll(".cont")
    let all_circles = document.querySelectorAll(".in_circle")
    let outer_circles = document.querySelectorAll(".circle")
    
    
    if (is_night == true){
        // Dark_Mode
            // pictures
        bg_pic.src=`images/bg-desktop-light.jpg`
        time_mode.src=`images/icon-moon.svg`
            //containers(div elements)
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
        // Light_Mode
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
    let task_list = document.querySelectorAll(".swap");
    let item1 = task_list[idx1].innerHTML;
    let item2 = task_list[idx2].innerHTML;
    
    task_list[idx1].innerHTML = item2;
    task_list[idx2].innerHTML = item1;


    const check_circle = document.querySelectorAll(".li_circle")
    check_circle.forEach((item)=>{
        item.addEventListener("click",()=>{
            circle_event(item.children[0])
            fill_completed(item.parentNode.children[1])
            // reverse(text.innerHTML)
            remaining.innerHTML = `${active.length} items left`
        })
    })
    update_all_data_array()
}

//removing list item
function remove(li){
    li.parentNode.removeChild(li);
    update_all_data_array()
    remaining.innerHTML = `${active.length} items left`
    
}

function update_all_data_array(){
    let p_comp = document.querySelectorAll("li .done");
    let p_active = document.querySelectorAll("li .not_done");
    let p_all = document.querySelectorAll("li .cont_text");
    completed = fill_data(p_comp,completed);
    active = fill_data(p_active,active);
    allTasks = fill_data(p_all,allTasks);
}

function fill_data(p_list,array){
    array = []
    p_list.forEach((p)=>{
        array.push(p.innerHTML)
    })
    return array
}
// ----------------------------------------------------------------------