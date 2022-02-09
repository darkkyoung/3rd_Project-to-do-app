/*
유저가 값을 입력한다.
+ 버튼을 클릭하면, 할 일 탭이 추가된다.
check 버튼을 누르면 할 일이 끝나면서 제거선이 생긴다.
1) check 클릭 순간, false→true로 바뀜
2) true이면, 끝난 걸로 간주하고 제거선이 생김
3) false면, 그대로

delete 버튼을 누르면 할 일이 삭제된다.
Not Yet, Done 탭을 누르면 언더바가 이동한다.
Done은 끝난 것만, Not Yet은 진행 중인 것만
전체 탭을 누르면 다시 전체 아이템이 돌아옴
*/

let taskInput = document.getElementById("task_input");
let addButton = document.getElementById("add_button");
let tabs = document.querySelectorAll(".task_tabs div")
let taskList = []; //할 일을 추가하기 위해 어레이 생성
let filterList = [];
let mode = "all";

for (let i = 1; i < tabs.length; i++) {
    //0은 밑줄이기 때문에 i=1부터
    tabs[i].addEventListener("click", function(event){filter(event)})

}

function filter(event) {
    mode = event.target.id;
    //event는 클릭에 관해서 모든 상황을 알려줌. event.target은 클릭한 것의 정확한 걸 알려줌
    if (mode == "all") {
        render();
    } else if (mode == "not_yet") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        //taskList = filterList; 이러면 다시 all로 못 돌아감
        render();
    } else if (mode == "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

addButton.addEventListener("click", addTask);

function addTask() {
    //let taskContent = taskInput.value; 아래 코드때문에 이제 필요 없음
    let task = {
        id: generateRandomID(),
        taskContent: taskInput.value,
        isComplete: false
    } //랜덤 생선된 ID를 가져옴

    taskList.push(task);
    console.log(taskList); //string이 아니라 객체로 바뀜 [object Object]라 뜸
    render();
}

function render() {
    let list = []; //이것으로 all 탭에서 not yet 탭으로 왕복 가능
    if (mode == "all") {
        list = taskList;
    } else if (mode == "not_yet" || mode == "done") {
        list = filterList;
    }

    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task_done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }
    } //${}는 EL로 html 문법을 자바에서 실행하는 듯
    //taskList[i]는 string일 때만, 이제는 .taskContent로 지정해야 함
    document.getElementById("task_board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete; //현재 가지고 있는 값의 반대값을 저장
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i,1);
            break;
        }
    }
    render(); //실제 UI에서 삭제되는 걸 구현 + 어떤 걸 하면 반드시 render 해줘야 함.
}

function generateRandomID() {
    return '_' + Math.random().toString(36).substr(2, 9);
} //랜덤 ID를 생성함