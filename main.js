// 구현 기능
/* 
    1. input에 Enter를 치거나 btn을 눌렀을 때 목록에 표기
        - 아무것도 입력하지 않았을 땐 동작 x
        - scroll bar가 생기면 새로 추가한 목록에 focus가 가도록
        - 항상 input에 focus가 가도록 -> 바로 바로 입력하기 위해서(scroll APi)
    2. 목록에 있는 거 각각 삭제 하는 버튼
        - 목록 전체 초기화 버튼도 추가
    3. 각 list별 완료되었는지 여부를 보여주는 checkbox -> check하면 가운데 줄
    4. 제목별 todo-list 저장 
        - 제목수정기능 -> 제목 수정하면 localstorage도 업데이트??
        - 한 제목에는 하나의 Todo-list만 저장이 가능함
        - 저장된 list를 클릭하면 옆에 저장된 데이터가 나타나도록
        - 각 제목 별 todo는 수정이 가능하고 기존에 쓰던 todo를 저장하지 않으면 기존에 쓰던 것은 초기화
    5. 제목 별 todo목록에 check여부를 %로 나타내기즉, 완료 여부 %로


    반응형에 대해서 더 공부한 다음 반응형으로 다시 디자인

    나아ㅏㅏㅏ중에 서버쪽 배우면 데이터 저장부터 해서 다시 리팩토링 하기
        - 데이터는 어떤 형식으로 어떻게 저장할것인가??
        - 로그인 기능 구현해서 사용자 별 todo 저장
*/
const toDoList = document.querySelector(".toDoList");
const toDo__input = document.querySelector(".toDo__input");
const toDo__inputBtn = document.querySelector(".toDo__inputBtn");
const toDoTitle__input = document.querySelector(".setToDoTitle");
const toDoTitle = document.querySelector(".toDoTitle");
const HIDDEN_CLASS = "hidden";
const LINETHROUGH_CLASS = "lineThrough";
let listArr = [];

function onAdd(event) {
    const title = toDoTitle.innerText;
    if(title === "") return;
    const inputValue = toDo__input.value;
    toDo__input.value = "";
    toDo__input.focus();
    const newObj = {
        value: inputValue,
        id: Date.now(),
    };
    listArr.push(newObj);
    const li = createListElement(newObj);
    displayList(li);
    setLocalStorage(title);
}

function handleCheck(event,checkBox) {
    const targetText = event.target.parentNode.previousSibling;
    if(checkBox.checked) targetText.classList.add(LINETHROUGH_CLASS);
    else targetText.classList.remove(LINETHROUGH_CLASS);
}

function deleteList(event) {
    const target = event.target.parentElement.parentElement;
    target.remove();
    listArr = listArr.filter((item) => item.id !== parseInt(target.id));
    setLocalStorage();
}

// title을 전역변수로 해야하나...

function createListElement(newObj) {
    const li = document.createElement("li");
    li.className = "toDoItem";
    li.id = newObj.id;
    const span = document.createElement("span");
    span.className = "toDo__text";
    span.innerText = newObj.value;
    const div = document.createElement("div");
    div.className = "btns";
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.addEventListener("click", (event) => handleCheck(event,checkBox));
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute('class', "toDo__delete fas fa-trash");
    deleteBtn.addEventListener("click", deleteList);
    
    div.appendChild(checkBox);
    div.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function displayList(li) {toDoList.appendChild(li)};

function setLocalStorage(title) {
    localStorage.setItem(title,listArr)
}

toDo__inputBtn.addEventListener("click", onAdd);


function setToDoTitle(event) {
    if(event.key === 'Enter') {
        toDoTitle.innerText = toDoTitle__input.value;
        toDoTitle__input.value="";
        toDoTitle.classList.remove(HIDDEN_CLASS);
        toDoTitle__input.classList.add(HIDDEN_CLASS);
    }
}
toDoTitle__input.addEventListener("keydown", setToDoTitle);

