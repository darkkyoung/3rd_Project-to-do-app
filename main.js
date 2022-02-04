/*
유저가 값을 입력한다.
+ 버튼을 클릭하면, 할 일 탭이 추가된다.
delete 버튼을 누르면 할 일이 삭제된다.
check 버튼을 누르면 할 일이 끝나면서 제거선이 생긴다.
Not Yet, Done 탭을 누르면 언더바가 이동한다.
Done은 끝난 것만, Not Yet은 진행 중인 것만
전체 탭을 누르면 다시 전체 아이템이 돌아옴
*/

let taskInput = document.getElementById("task_input");
let addButton = document.getElementById("add_button");
let taskList = []; //할 일을 추가하기 위해 어레이 생성

addButton.addEventListener("click", addTask);

function addTask() {
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  render();
}

function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class="task">
        <div>
            ${taskList[i]}
        </div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`;
    }

    document.getElementById("task_board").innerHTML = resultHTML;
}
