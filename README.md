# My first toy-project 'Make my own todo-list!!'
show my project: https://no-chat.github.io/toy__project__todo__list/

### 스택
Javascript, HTML, CSS
---

### 사용 logic
- localStorage이용을 통해 브라우저를 나갔다 와도 todo-list가 나타나는 기능
- `if(inputValue === "") return;` 코드를 통해 값을 입력안했을 때를 방지
- `toDo__input.focus();` 코드를 통해 입력 후 바로 입력할 수 있도록 함
- progressBar를 translateX를 사용해서 composite단계만 일어나도록 함
- setInterval()를 통해 1초마다 업데이트 되는 시계 
---

### 추가할 기능
- list 내 전체 초기화
- scroll bar 디자인 - 완료
- scroll bar가 생길 경우 새로 입력한 목록에 focus가도록 - 완료
---

### 목표
- 다 완성한 후 code리팩토링을 통해 성능을 향상시키고 싶다.
---

## :fire: commit log :fire:
---

2021.11.16 
first commit
1. todo-list 목록 추가, 제거 기능 구현
2. 디자인 틀 대충 완성
---

2021.11.17
1. checkbox check 여부에 따른 진행률(%) 표시

---
2021.11.19
1. nigt디자인 테마 선택
2. moon 만들고 애니메이션 효과 추가
3. toDolist 내부 정렬 
4. moon 내부에 clock추가
5. localstorage에 저장정보 있을 경우 나타내는 logic추가