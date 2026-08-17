let works = [
  {
    id: 1,
    name: "Александр (Сантехник)",
    category: "Сантехник",
    price: 18.0,
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Саша (Электрик)",
    category: "Электрик",
    price: 22.5,
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Магомед (Логист / Грузчик)",
    category: "Грузчик / Логист",
    price: 12.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpvet9XGX3ZlXiO78yEWqsuDmlC-XCIw4Wp0h4OHCvWg&s=10",
  },
  {
    id: 4,
    name: "Дмитрий (Маляр-Отделочник)",
    category: "Отделочник / Маляр",
    price: 16.0,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
  },
];
const ShowAddModal = document.querySelector(".header__btn");
const CLoseAddModal = document.querySelector(".my-dialog__closeBtn");
const addModal = document.querySelector("#AddModal");
const displayCards = document.getElementById("placeCards");
ShowAddModal.addEventListener("click", () => {
  addModal.showModal();
});
CLoseAddModal.addEventListener("click", () => {
  addModal.close();
});

let selectJob = document.getElementById("selectJob");
let imgInput = document.getElementById("imgInput");
let nameInput = document.getElementById("nameInput");
let priceInput = document.getElementById("priceInput");
const addJob = document.querySelector("#AddJob");
addJob.addEventListener("click", () => {
  if (
    selectJob.value === "" ||
    imgInput.value.trim() === "" ||
    nameInput.value.trim() === "" ||
    priceInput.value.trim() === ""
  ) {
    alert("Fill the fields");
    return;
  }
  let newWorkers = {
    id: Date.now(),
    name: nameInput.value.trim(),
    category: selectJob.value,
    price: Number(priceInput.value),
    image: imgInput.value.trim(),
  };
  works.push(newWorkers);
  selectJob.value = "";
  imgInput.value = "";
  nameInput.value = "";
  priceInput.value = "";
  addModal.close();
  renderCards(works);
});

const editDialog = document.getElementById("editModal");
const closeEditModal = document.getElementById("editCloseModal");
const saveBtnEditModal = document.getElementById("editAddJob");
let editWorkerId = null;
let selectJobEdit = document.getElementById("editSelectJob");
let imgEdit = document.getElementById("editImgInput");
let nameEdit = document.getElementById("editNameInput");
let priceEdit = document.getElementById("editPriceInput");
saveBtnEditModal.addEventListener('click',()=>{
  const work = works.find(el => el.id === editWorkerId)

  work.category = selectJobEdit.value 
  work.image = imgEdit.value.trim()
  work.name = nameEdit.value.trim()
  work.price = Number(priceEdit.value.trim())

  editDialog.close()
  renderCards(works)
})
closeEditModal.addEventListener("click", () => {
  editDialog.close();
});

function renderCards(data) {
  displayCards.innerHTML = "";
  data.forEach((element) => {
    let div = document.createElement("div");
    div.className = "main__cards";

    let img = document.createElement("img");
    img.src = element.image;
    img.classList.add("main__img");

    let badge = document.createElement("div");
    badge.textContent = element.category;
    badge.classList.add("main__badge");

    let title = document.createElement("h3");
    title.textContent = element.name;
    title.classList.add("main__cards-title");

    let priceBox = document.createElement("div");
    priceBox.classList.add("main__cards-priceBox");
    let priceBasic = document.createElement("span");
    priceBasic.textContent = element.price + "$";
    priceBasic.classList.add("main__cards-price");
    let priceSecondary = document.createElement("span");
    priceSecondary.textContent = "/час";
    priceSecondary.classList.add("main__cards-priceTime");
    priceBox.append(priceBasic, priceSecondary);

    let btnBox = document.createElement("div");
    btnBox.classList.add("main__btnBox");
    let firstBtn = document.createElement("button");
    firstBtn.textContent = "Change";
    firstBtn.classList.add("main__btnChange");
    firstBtn.addEventListener("click", () => {
      editWorkerId = element.id;
      selectJobEdit.value = element.category;
      imgEdit.value = element.image;
      nameEdit.value = element.name;
      priceEdit.value = element.price;
      editDialog.showModal();
    });
    let thirdBtn = document.createElement("button");
    thirdBtn.textContent = "Delete";
    thirdBtn.classList.add("main__btnDelete");
    btnBox.append(firstBtn, thirdBtn);

    div.append(img, badge, title, priceBox, btnBox);
    displayCards.append(div);

    thirdBtn.addEventListener("click", () => {
      div.style.opacity = "0";
      div.style.transform = "scale(0.8)";
      div.addEventListener(
        "transitionend",
        () => {
          deleteWorkers(element.id);
        },
        { once: true },
      );
    });
  });
}

function deleteWorkers(id) {
  works = works.filter((element) => element.id != id);
  renderCards(works);
}
renderCards(works);
