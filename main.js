const input = document.getElementById('input'),
    submit = document.getElementById('submit'),
    todoList = document.getElementById('todoList'),
    todoItem = document.getElementsByClassName('todoItem'),
    clearAll = document.getElementById('clearAll')

let todoListArr = []
let todoListHtmlArr = []

document.addEventListener("DOMContentLoaded", ready);
submit.addEventListener("click", main);
clearAll.addEventListener("click", clearStorage);

function ready() {
    let temp = JSON.parse(localStorage.getItem('itemsArr'))
    if (temp) todoListArr = temp
    render()
}

function main() {
    inputCapture()
    addToStorage()
    render()
}

//Pushes text from input into array and removes input & todo list html
function inputCapture() {
    todoListArr.push(input.value)
    input.value = ''
}

//Creates list item from array items
function createHtmlArr() {
    todoListHtmlArr = todoListArr.map(function (value, index) {
        return `
        <li class="todo"> 
        <input type="checkbox" data-id='${index}' class='todoItem' name="todo" > 
        <label for="todo">${value}</label> 
        </li>
        `
    })
}

// Incerts html of todo list item inside the list
function insertArrInHtml() {
    todoList.innerHTML = ''
    for (item of todoListHtmlArr) {
        todoList.innerHTML += item
    }
}

function addListener() {
    for (item of todoItem) {
        item.onchange = function () {
            todoListArr.splice(this.dataset.id, 1)
            addToStorage()
            render()
        }
    }
}

//Rerenders the whole todo list, inserts it inside HTML and add listener to every list item
function render() {
    createHtmlArr()
    insertArrInHtml()
    addListener()
}

//Adds stringified array to local storage
function addToStorage() {
    let arr = JSON.stringify(todoListArr)
    localStorage.setItem('itemsArr', arr)
}

function clearStorage() {
    localStorage.setItem('itemsArr', '')
    todoListArr = ''
    todoList.innerHTML = ''
}

/*
    My very first javascript project
    Created by webl1sek  https://github.com/webl1sek
*/