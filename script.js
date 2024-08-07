// Heading  & Description

const head = document.createElement("div");
head.setAttribute("id", "head");
head.setAttribute("class", "container");4
document.body.appendChild(head);

const heading = document.createElement("h1");
heading.id = "title";
heading.textContent = "Pagination in DOM Manipulation";
head.appendChild(heading);

const description = document.createElement("div");
document.body.appendChild(description);

const description1 = document.createElement("p");
description1.id = "description";
description1.textContent = "JSON data displayed in table with pagination";
description.appendChild(description1);

// Buttons for pagination

const buttons = document.createElement("div");
buttons.setAttribute("class", "wrapper d-flex justify-content-center");
buttons.setAttribute("id", "buttons");
document.body.appendChild(buttons);

const paginationBtnOne = document.createElement("div");
paginationBtnOne.classList.add("paginationBtn", "one");

const firstBtn = document.createElement("a");
firstBtn.textContent = "First";
firstBtn.setAttribute("data-set", "fir");

const prevBtn = document.createElement("a");
prevBtn.textContent = "Previous";
prevBtn.setAttribute("data-set", "pre");
paginationBtnOne.append(firstBtn, prevBtn);

const DompaginationNumber = document.createElement("div");
DompaginationNumber.id = "paginationNumber";

const paginationBtnTwo = document.createElement("div");
paginationBtnTwo.classList.add("paginationBtn", "two");

const nextBtn = document.createElement("a");
nextBtn.textContent = "Next";
nextBtn.setAttribute("data-set", "nxt");

const lastBtn = document.createElement("a");
lastBtn.textContent = "Last";
lastBtn.setAttribute("data-set", "lst");
paginationBtnTwo.append(nextBtn, lastBtn);

buttons.append(paginationBtnOne, DompaginationNumber, paginationBtnTwo);



// Table for viewing JSON content

let TableContainer = document.createElement("div");
TableContainer.setAttribute("class", "table-responsive");


let DomTable = document.createElement("table");
DomTable.setAttribute("id", "table");
DomTable.className="table table-bordered";

let divnew = document.createElement("div");

TableContainer.append(DomTable);
document.body.append(TableContainer);


//Fetching data through API function &  manipulating DOM

let paginationNumbers = document.getElementById("paginationNumber");
let list = document.getElementById("table");
let wrapper = document.querySelector(".wrapper");

//fetching data from url as json
const dataURL = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";

const req = new XMLHttpRequest();
req.open("GET", dataURL);
req.send();
req.addEventListener("load", reqListener);
function reqListener() {
  
  
  let data = JSON.parse(this.responseText);
  let currentPage = 1;
  let rows = 10;
  
  //Displaying JSON data in UI using table
  
  function DisplayList(data, list, rows, currentPage) {
    list.innerHTML = `
    <thead>  
    <tr>  
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
    </tr>
    </thead>`;
    let tbody=document.createElement("tbody");
    currentPage--;
    let start = rows * currentPage;
    let end = start + rows;
    let paginatedItems = data.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
      let item = paginatedItems[i];
      let tr = document.createElement("tr");
      tr.classList.add("item"); 
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      td1.textContent = item.id;
      td2.textContent = item.name;
      td3.textContent = item.email;
      tr.append(td1, td2, td3);
      tbody.append(tr);
      list.appendChild(tbody);
    }
  }

  // Page no displayed in UI as per data retrived from url

  function SetupPagination(data, paginationNumbers, rows) {
    paginationNumbers.innerHTML = "";
    let page_count = Math.ceil(data.length / rows);
    for (let i = 1; i < page_count + 1; i++) {
      let btn = PaginationButton(i, data);
      paginationNumbers.appendChild(btn);
    }
  }
  
  //Creating button and adding onclick event 
  
  function PaginationButton(page, data) {
    let button = document.createElement("a");
    button.classList.add("page");
    button.innerText = page;
    if (currentPage == page) button.classList.add("active");
    button.addEventListener("click", function () {
      currentPage = page;
      DisplayList(data, list, rows, currentPage);
      let allBtn = document.querySelectorAll(".page");
      allBtn.forEach((e) => e.classList.remove("active"));
      button.classList.add("active");
    });
    return button;
  }
  
  // onclick event 
  
  function updateBtn(currentPage) {
    let allBtn = document.querySelectorAll(".page");
    allBtn.forEach((e) => e.classList.remove("active"));
    allBtn[currentPage - 1].classList.add("active");
    DisplayList(data, list, rows, currentPage);
  }
  wrapper.addEventListener("click", (e) => {
    if (e.target.dataset.set == "fir") {
      if (currentPage != 1) {
        currentPage = 1;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "lst") {
      if (currentPage != 10) {
        currentPage = 10;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "pre") {
      if (currentPage != 1) {
        currentPage--;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "nxt") {
      if (currentPage != 10) {
        currentPage++;
        updateBtn(currentPage);
      }
    }
  });
  DisplayList(data, list, rows, currentPage);
  SetupPagination(data, paginationNumbers, rows);
}