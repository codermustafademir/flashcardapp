const container = document.querySelector(".container");
const addBtn = document.querySelector(".add-btn");
const addCardCon = document.querySelector(".add-card-con");
const errCon = document.querySelector(".error-con");
const clsBtn = document.querySelector(".cls-btn");
const titleDiv = document.querySelector(".title-div");
const question = document.querySelector(".question");
const answer = document.querySelector(".answer");
const saveBtn = document.querySelector(".save-btn");

let flashes = JSON.parse(localStorage.getItem('flashes')) || [];

addBtn.addEventListener("click", ()=>{
    titleDiv.innerHTML = "Add A New Card";
    container.classList.add("hide");
    question.value = "";
    answer.value = "";
    addCardCon.classList.remove("hide");
});

clsBtn.addEventListener("click", ()=>{
    container.classList.remove("hide");
    addCardCon.classList.add("hide");
    errCon.classList.add("hide");
});

saveBtn.addEventListener("click", ()=>{
    let tempQuestion = question.value.trim();
    let tempAnwer = answer.value.trim();

    if (!tempQuestion || !tempAnwer) {
        errCon.classList.remove("hide");
    }else{
        let id = Date.now();
        flashes.push({id, question:tempQuestion, answer:tempAnwer});
        localStorage.setItem('flashes', JSON.stringify(flashes));
        viewcards();
        container.classList.remove("hide");
        addCardCon.classList.add("hide");
    }
});

function viewcards(){
    const cardCon = document.querySelector(".card-container");
    cardCon.innerHTML = "";
    flashes.forEach(flash => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <p class="question-div">${flash.question}</p>
        <p class="answer-div hide">${flash.answer}</p>
        <button class="show-hide">Show/Hide</button>
        <div class="buttons-con">
        <button class="edit-btn">E</button>
        <button class="delete-btn">D</button>
        </div>
        `;
        div.setAttribute('data-id', flash.id);
        const showHide = div.querySelector(".show-hide");
        const answerDiv = div.querySelector(".answer-div");
        const editBtn = div.querySelector(".edit-btn");
        const delBtn = div.querySelector(".delete-btn");

        showHide.addEventListener("click", ()=>{
            answerDiv.classList.toggle("hide");
        });

        editBtn.addEventListener("click", ()=>{
            titleDiv.innerHTML = "Edit The Card";
            container.classList.add("hide");
            modifyElemet(editBtn, true);
            addCardCon.classList.remove("hide");
        });

        delBtn.addEventListener("click", ()=>{
            modifyElemet(delBtn);
        });

        cardCon.appendChild(div);
    });
}

function modifyElemet(element, edit = false) {
    const parentDiv = element.parentElement.parentElement;
    let id = Number(parentDiv.getAttribute('data-id'));
    const paretnQ = parentDiv.querySelector('.question-div');

    if (edit) {
        const parentA = parentDiv.querySelector('.answer-div');
        question.value = paretnQ.innerText;
        answer.value = parentA.innerText;
        flashes = flashes.filter(flash => flash.id !==id);
    
    }
    else{
        flashes = flashes.filter(flash => flash.id !== id);
        localStorage.setItem('flashes',JSON.stringify(flashes));
    }
    parentDiv.remove();
}

document.addEventListener("DOMContentLoaded",viewcards);