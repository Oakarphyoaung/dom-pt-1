const createBtn = document.querySelector("#createBtn");
const textInput = document.querySelector("#textInput");
const lists = document.querySelector("#lists");
const data = ["hello", "Morning", "Good Night", "Love", "Javascript"];
const total = document.querySelector("#total");
const doneTotal = document.querySelector("#done");

const counter = () => {
  const totalCount = lists.children.length;
  const doneCount = [...lists.children].filter(
    (e) => e.querySelector(".form-check-input").checked === true
  ).length;

  total.innerText = totalCount;
  doneTotal.innerText = doneCount;
};

const createLi = (text) => {
  const dynamicId = "flexCheck" + Math.random();
  const li = document.createElement("li");
  // li.addEventListener("dblclick", edit);
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
      <div class="form-check">

<input class="form-check-input" type="checkbox" value="" id="${dynamicId}"
onchange="done(event)" >
<label class="form-check-label" for="flexCheckChecked">
                                    ${text}
                                  </label>
                                </div>
                                <div class="btn-group">
    <button class="btn btn-sm btn-outline-dark ms-auto edit-btn" onclick="edit(event)">
                                <i class="bi bi-pencil"></i>
                                </button>
    <button class="btn btn-sm btn-outline-danger ms-auto del-btn" onclick="del(event)">
                                <i class="bi bi-trash3 pe-none"></i>
                                </button>
                                </div>

                               `;

  return li;
};

const addList = () => {
  if (textInput.value.trim()) {
    const text = textInput.value;
    lists.append(createLi(text));
    textInput.value = null;
    counter();
  } else {
    alert("Input Text is empty");
  }
};
const del = (event) => {
  if (confirm("Are you want to delete")) {
    event.target.closest("li").remove();
    counter();
  }
};
const done = (event) => {
  event.target.nextElementSibling.classList.toggle(
    "text-decoration-line-through"
  );
  counter();
};

const edit = (event) => {
  const old = event.target
    .closest(".list-group-item")
    .querySelector(".form-check-label");
  const newText = prompt("Input New Text", old.innerText);
  if (newText && newText.trim()) {
    old.innerText = newText;
  }
};

data.forEach((d) => lists.append(createLi(d)));

// [...lists.children].forEach((li)=>{
//   li.querySelector(".edit-btn").addEventListener("click",edit);
//   li.querySelector(".del-btn").addEventListener("click",del);
// });

lists.addEventListener("click", (event) => {
  if (event.target.classList.contains("del-btn")) {
    if (confirm("Are you want to delete")) {
      event.target.closest("li").remove();
      counter();
    }
  } else if (event.target.classList.contains("edit-btn")) {
    const old = event.target
      .closest(".list-group-item")
      .querySelector(".form-check-label");
    const newText = prompt("Input New Text", old.innerText);
    if (newText && newText.trim()) {
      old.innerText = newText;
    }
  }
});
createBtn.addEventListener("click", addList);
textInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    addList();
  }
});

window.addEventListener("load", counter);
