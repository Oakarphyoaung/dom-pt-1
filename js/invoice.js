//variable
const services = [
  { id: 1, title: "Domain Service", price: 15 },
  { id: 2, title: "Hosting Service", price: 30 },
  { id: 3, title: "Website Service", price: 150 },
  { id: 4, title: "Maintenance Service", price: 100 },
];

//selector
const invoiceForm = document.querySelector("#invoice-form");
const selectService = document.querySelector("#selectService");
const quantity = document.querySelector("#quantity");
const lists = document.querySelector("#lists");
const subTotal = document.querySelector("#subTotal");
const tax = document.querySelector("#tax");
const total = document.querySelector("#total");
const listTable = document.querySelector("#listTable");
const addServiceBtn = document.querySelector("#addServiceBtn");
const addServiceModel = document.querySelector("#addServiceModel");
const closeServiceModalBtn = document.querySelector("#closeServiceModalBtn");
const addServiceForm = document.querySelector("#addServiceForm");
const menu = document.querySelectorAll(".menu");
const sideBar = document.querySelector("#sideBar");
//Function
const createTr = (service, quantity) => {
  const tr = document.createElement("tr");
  tr.classList.add("list");
  tr.setAttribute("service-id", service.id);
  const total = service.price * quantity;
  tr.innerHTML = `
    <td class="d-flex justify-content-between">
    ${service.title}
    <i class="bi bi-trash3 text-danger del-btn"></i></td>
    <td class="text-end list-quantity">${quantity}</td>
    <td class="text-end">${service.price}</td>
    <td class="text-end list-total">${total}</td>
    `;
  return tr;
};
const calculateTax = (amount, percent = 5) => {
  return amount * (percent / 100);
};
const findTotal = () => {
  const listTotal = document.querySelectorAll(".list-total");
  console.log(listTotal);
  const subTotalCalculate = [...listTotal].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );
  subTotal.innerText = subTotalCalculate;
  tax.innerText = calculateTax(subTotalCalculate);
  total.innerText = subTotalCalculate + calculateTax(subTotalCalculate);
  console.log(subTotal);
};
const showTable = () => {
  if (lists.children.length) {
    listTable.classList.remove("d-none");
  } else listTable.classList.add("d-none");
};

//process(tasks)
//service option loop
services.forEach((service) =>
  selectService.append(new Option(service.title, service.id))
);
//data collect from Form
invoiceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //   console.log(selectService.value,
  //     selectService.options[selectService.selectedIndex].innerText,
  //     quantity.valueAsNumber);
  // console.log(
  //   selectService.value,
  //   quantity.valueAsNumber,
  //   services.find((service) => service.id == selectService.value)
  // );
  const selectedService = services.find(
    (service) => service.id == selectService.value
  );

  const isExitedService = [...lists.children].find(
    (el) => el.getAttribute("service-id") == selectService.id
  );

  if (isExitedService) {
    console.log("yes it is exited");
    console.log(isExitedService);

    const exitedQuantity = isExitedService.querySelector(".list-quantity");

    exitedQuantity.innerText =
      parseFloat(exitedQuantity.innerText) + quantity.valueAsNumber;
    isExitedService.querySelector(".list-total").innerText =
      exitedQuantity.innerText * selectService.price;
  } else {
    lists.append(createTr(selectedService, quantity.valueAsNumber));
  }

  findTotal();
  invoiceForm.reset();
  showTable();
});
app.addEventListener("click", (event) => {
  const currentElement = event.target;
  if (currentElement.classList.contains("del-btn")) {
    currentElement.closest("tr").remove();
    findTotal();
  }

  console.log(currentElement);
  showTable();
});

addServiceBtn.addEventListener("click", () => {
  console.log("add Service Btn");
  //1 idea create element
  //2 idea hide show
  addServiceModel.classList.remove("d-none");
});
closeServiceModalBtn.addEventListener("click", () => {
  addServiceModel.classList.add("d-none");
});
addServiceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("this Form Service");
  console.dir(event.target);

  const formData = new FormData(event.target);
  console.log(formData.get("serviceTitle"), formData.get("servicePrice"));

  const id = Date.now();



  //add data
  services.push({
    id,
    title: formData.get("serviceTitle"),
    price: formData.get("servicePrice"),
  });
  //add dom
  selectService.append(new Option(formData.get("serviceTitle"),id));

  //close model
  event.target.reset();
  addServiceModel.classList.add("d-none");
});

menu.forEach(el =>{
  el.addEventListener("click",() => {
    sideBar.classList.toggle("active");
  });
});