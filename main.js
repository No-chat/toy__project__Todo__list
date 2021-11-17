// 구현 기능
/* 
    1. input에 Enter를 치거나 btn을 눌렀을 때 목록에 표기
        - 아무것도 입력하지 않았을 땐 동작 x
        - scroll bar가 생기면 새로 추가한 목록에 focus가 가도록
        - 항상 input에 focus가 가도록 -> 바로 바로 입력하기 위해서(scroll APi)
    2. 각 list별 완료되었는지 여부를 보여주는 checkbox -> check하면 가운데 줄
    3. checkbox 체크된 거 기준으로 몇% 했는지 보여주는 progressbar
    


    반응형에 대해서 더 공부한 다음 반응형으로 다시 디자인

    나아ㅏㅏㅏ중에 서버쪽 배우면 데이터 저장부터 해서 다시 리팩토링 하기
        - 데이터는 어떤 형식으로 어떻게 저장할것인가??
        - 로그인 기능 구현해서 사용자 별 todo 저장
*/

const toDoList = document.querySelector(".toDoList");
const toDoForm = document.querySelector(".toDoForm");
const toDo__input = document.querySelector(".toDo__input");
const toDo__inputBtn = document.querySelector(".toDo__inputBtn");
const myProgressBar = document.querySelector(".myProgressBar");
const TODO_KEY = "todo";
const HIDDEN_CLASS = "hidden";
const LINETHROUGH_CLASS = "lineThrough";
let listArr = [];
let title = ""; // title 전역변수 사용은 많이 고려 해봐야 할 듯

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
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute('class', "toDo__delete fas fa-trash");
    div.appendChild(checkBox);
    div.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function displayList(li) {toDoList.appendChild(li)};

function setLocalStorage() {
    localStorage.setItem(TODO_KEY,JSON.stringify(listArr));
}

function onAdd(event) {
    event.preventDefault();
    const inputValue = toDo__input.value;
    if(inputValue === "") return;
    toDo__input.value = "";
    toDo__input.focus();
    const newObj = {
        value: inputValue,
        id: Date.now(),
    };
    listArr.push(newObj);
    const li = createListElement(newObj);
    displayList(li);
    setLocalStorage();
}

toDoForm.addEventListener("submit", onAdd);

function handleCheck(event) {
    const targetText = event.target.parentNode.previousSibling;
    const checkBox = event.target;
    if(checkBox.checked) targetText.classList.add(LINETHROUGH_CLASS);
    else targetText.classList.remove(LINETHROUGH_CLASS);
    updateProgressBar();
}

function deleteList(event) {
    const target = event.target.parentElement.parentElement;
    target.remove();
    listArr = listArr.filter((item) => item.id !== parseInt(target.id));
    setLocalStorage();
}

toDoList.addEventListener("click",(event) => {
    const target = event.target;
    if(target.tagName === "INPUT") handleCheck(event);
    else if(target.tagName === "BUTTON") deleteList(event);
    else return;
}); 

function updateProgressBar() {
    const itemsCount = toDoList.childElementCount;
    let counter = 0;
    for(let i = 0; i < itemsCount; i++) {
        if(toDoList.children[i].children[1].children[0].checked) counter++
    }
    const percentage = Math.floor((counter/itemsCount)*100);
    myProgressBar.style.transform = `translateX(${percentage-100}%)`;
}
