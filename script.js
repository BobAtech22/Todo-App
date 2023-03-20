
let completed = [];
let active = []

let is_night = true;
let is_in = false;
let newTask = document.querySelector(".new_task");
const main_c = document.querySelector(".main_c");

const all_list = document.querySelector(".all_list");
const all_filter = document.querySelector(".all");
const comp_filter = document.querySelector(".completed");
const active_filter = document.querySelector(".active");
const clear_comp = document.querySelector(".clear_completed");


const bg_pic = document.querySelector(".bg_pic");
const time_mode = document.querySelector(".time_mode");

const all_mobile = document.querySelector(".all_m");
const comp_mobile = document.querySelector(".completed_m");
const active_mobile = document.querySelector(".active_m");
const mobile = document.querySelector(".mobile");

let filter_status = "all";




let start_index;
let index = 0

let remaining = document.querySelector(".count")


remaining.innerHTML = `${active.length} items left`

main_c.addEventListener("click", () => {
    fill_list(all_list)
    circle_event(main_c.children[0])
    setTimeout(() => {
        circle_event(main_c.children[0])
    }, 200)
});

document.addEventListener('keydown', (btn) => {
    if (btn.key == "Enter") {
        fill_list(all_list);
        circle_event(main_c.children[0])
        setTimeout(() => {
            circle_event(main_c.children[0])
        }, 200)
    }
});

time_mode.addEventListener("click", () => {
    alt_time();
});


function show_all(){
    let list = all_list.childNodes;
    list.forEach((li) => {
        li.style.display = "block"
    })
}

all_filter.addEventListener("click", () => {
    show_all()
    all_filter.classList.add("selected_filter");
    comp_filter.classList.remove("selected_filter");
    active_filter.classList.remove("selected_filter");
    filter_status = "all";
})

comp_filter.addEventListener("click", () => {
    show_all()
    hide_active_cont()
    comp_filter.classList.add("selected_filter");
    all_filter.classList.remove("selected_filter");
    active_filter.classList.remove("selected_filter");
    filter_status = "completed";
})

active_filter.addEventListener("click", () => {
    show_all()
    hide_comp_cont();
    active_filter.classList.add("selected_filter");
    all_filter.classList.remove("selected_filter");
    comp_filter.classList.remove("selected_filter");
    filter_status = "active";
})

clear_comp.addEventListener("click", () => {
    removeAll();
    update_all();
})


function hide_active_cont() {
    let list = all_list.childNodes;
    let p_items = document.querySelectorAll("li .done");

    list.forEach((li) => {
        li.style.display = "none";
    })
    p_items.forEach((item) => {
        let li_item = item.parentNode.parentNode.parentNode;
        li_item.style.display = "block";
    })

}

function hide_comp_cont() {
    let list = all_list.childNodes;
    let p_items = document.querySelectorAll("li .done");

    list.forEach((li) => {
        li.style.display = "block";
    })
    p_items.forEach((item) => {
        let li_item = item.parentNode.parentNode.parentNode;
        li_item.style.display = "none";
    })

}

const circle_event = (item) => {
    let check = item.children[0];
    let circle = item.parentNode;
    let text = item.parentNode.parentNode.children[1]
    if (check.style.display != 'block') {
        check.style.display = "block";
        circle.classList.add("active_circle");
        item.classList.add("active_circle");
        text.classList.add("done");
        text.classList.remove("not_done");
    } else {
        check.style.display = "none"
        circle.classList.remove("active_circle");
        item.classList.remove("active_circle");
        text.classList.remove("done");
        text.classList.add("not_done");
    }
}


// ------------------------------File functions------------
// function to fill list
const fill_list = (ul) => {
    let words = newTask.value
    if (words == '') {
        console.log("zero")
    } else {
        // allTasks.push(words);
        active.push(words);
        create_task(words, ul)
        newTask.value = '';
    }

    remaining.innerHTML = `${active.length} items left`
}

//function to create elements-------------------------
function create_task(word, ul) {
    const item = document.createElement('li')
    item.classList.add("cont")
    item.classList.add("swap")
    if (is_night == false) {
        item.classList.add("cont_white")
    }
    index += 1
    item.setAttribute('d_index', index)
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

    let cross = item.children[0].children[1]
    cross.addEventListener("click", () => {
        remove(item)
    })

    if (is_night == false) {
        circle.classList.add("circle_white")
        circle.children[0].classList.add("in_circle_white")
        item.classList.add("swap_white")
    }
    circle.addEventListener("click", () => {
        circle_event(circle.children[0])
        if(filter_status == "active"){
            item.style.display = "none";
        }
        update_all()
        remaining.innerHTML = `${active.length} items left`
    })

    ul.appendChild(item);
    dragEventListeners();
    console.log(index)

    update_all()

}


function reverse(value) {
    console.log(value)
    let list = document.querySelectorAll(".comp_list li")
    let index = completed.indexOf(value);
    completed.splice(index, 1);
    list.forEach((li) => {
        let text = li.children[0].children[0].children[1].innerHTML
        if (text == value) {
            li.parentNode.removeChild(li)

        }
        console.log("done")
    })

}











// ----------------Drag functions--------------------
function dragStart() {
    // console.log('start drag')
    start_index = +this.closest('li').getAttribute('d_index');


}

function dragDrop() {
    // console.log('drop')
    this.classList.remove("cont_black_over");
    const end_index = +this.getAttribute('d_index');
    console.log(end_index);
    swap(start_index, end_index)
}

function dragEnter() {
    // console.log('Enter')
    this.classList.add("cont_black_over")


}

function dragOver(event) {
    // console.log('drag over')
    event.preventDefault()

}

function dragLeave() {
    // console.log('Leave')
    this.classList.remove("cont_black_over")
}


function dragEventListeners() {
    const drag_items = document.querySelectorAll(".draggable");
    const drag_list = document.querySelectorAll("li");

    drag_items.forEach((item) => {
        item.addEventListener('dragstart', dragStart)
    })

    drag_list.forEach((item) => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })

}
// ------------------------------------------------------------



// Day and night themes for desktop mode
function alt_time() {
    // variables
    let all_conts = document.querySelectorAll(".cont")
    let all_circles = document.querySelectorAll(".in_circle")
    let outer_circles = document.querySelectorAll(".circle")
    let li = document.querySelectorAll(".swap")

    if (is_night == true) {
        // Dark_Mode
        // pictures
        if (window.innerWidth < 420) {
            bg_pic.src = `images/bg-mobile-light.jpg`
        } else {
            bg_pic.src = `images/bg-desktop-light.jpg`
        }

        mobile.classList.add("mobile_white")

        time_mode.src = `images/icon-moon.svg`
        //containers(div elements)
        all_conts.forEach((cont) => {
            cont.classList.add("cont_white")
        })
        all_circles.forEach((cont) => {
            cont.classList.add("in_circle_white")
        })
        outer_circles.forEach((cont) => {
            cont.classList.add("circle_white")
        })

        li.forEach((cont) => {
            cont.classList.add("swap_white")
        })


        document.querySelector("body").style.backgroundColor = "#F2F2F2"
        is_night = false

    } else {
        // Light_Mode
        if (window.innerWidth < 420) {
            bg_pic.src = `images/bg-mobile-dark.jpg`
        } else {
            bg_pic.src = `images/bg-desktop-dark.jpg`
        }

        mobile.classList.remove("mobile_white")
        time_mode.src = `images/icon-sun.svg`
        all_conts.forEach((cont) => {
            cont.classList.remove("cont_white")
        })
        all_circles.forEach((cont) => {
            cont.classList.remove("in_circle_white")
        })
        outer_circles.forEach((cont) => {
            cont.classList.remove("circle_white")
        })

        li.forEach((cont) => {
            cont.classList.remove("swap_white")
        })

        document.querySelector("body").style.backgroundColor = "#171823"
        is_night = true

    }
}

// function to swap todo task content
function swap(idx1, idx2) {

    let item1 = document.querySelector(`[d_index = "${idx1}"]`);
    let item2 = document.querySelector(`[d_index = "${idx2}"]`);
    let rsv;
    rsv = item1.innerHTML;
    item1.innerHTML = item2.innerHTML;
    item2.innerHTML = rsv;
    let check = [item1, item2]

    check.forEach((item) => {
        let circle = item.children[0].children[0].children[0];
        let cross = item.children[0].children[1]
        circle.addEventListener("click", () => {
            circle_event(circle.children[0])
            update_all()
            remaining.innerHTML = `${active.length} items left`
        })

        cross.addEventListener("click", () => {
            console.log(item.parentNode.parentNode)
            remove(item)
            remaining.innerHTML = `${active.length} items left`;
        })
    })

    // check_cross.forEach((item)=>{
    //     
    // })
    update_all()
}

//removing list item
function remove(li) {
    li.parentNode.removeChild(li);
    update_all()
    remaining.innerHTML = `${active.length} items left`

}

function removeAll() {
    let p_comp = document.querySelectorAll("li .done");
    p_comp.forEach((item) => {
        let li = item.parentNode.parentNode.parentNode;
        li.parentNode.removeChild(li);
    })
}

function update_all_data_array() {
    let p_comp = document.querySelectorAll("li .done");
    let p_active = document.querySelectorAll("li .not_done");
    // let p_all = document.querySelectorAll("li .cont_text");
    completed = fill_data(p_comp, completed);
    active = fill_data(p_active, active);
    // allTasks = fill_data(p_all,allTasks);
}

function fill_data(p_list, array) {
    array = []
    p_list.forEach((p) => {
        array.push(p.innerHTML)
    })
    return array
}
// ----------------------------------------------------------------------


function round_top() {
    let li_one = all_list.firstChild
    let all_li = document.querySelectorAll("li")
    all_li.forEach((li) => {
        li.classList.remove("round_top");
    });
    if (document.querySelector("ul").childNodes.length != 0) {
        li_one.classList.add("round_top");
    }

}

function update_all() {
    update_all_data_array()
    round_top()
}



all_mobile.addEventListener("click", () => {
    let list = all_list.childNodes;
    list.forEach((li) => {
        li.style.display = "block"
    })
    all_mobile.classList.add("selected_filter");
    comp_mobile.classList.remove("selected_filter");
    active_mobile.classList.remove("selected_filter");

})

comp_mobile.addEventListener("click", () => {
    hide_active_cont()
    comp_mobile.classList.add("selected_filter");
    all_mobile.classList.remove("selected_filter");
    active_mobile.classList.remove("selected_filter");
})

active_mobile.addEventListener("click", () => {
    hide_comp_cont();
    active_mobile.classList.add("selected_filter");
    all_mobile.classList.remove("selected_filter");
    comp_mobile.classList.remove("selected_filter");
})