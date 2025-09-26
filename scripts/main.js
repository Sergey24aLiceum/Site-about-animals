// scripts/main.js

// Дані про тварин
const animals = [
  { name: "Лев", type: "mammal", img: "images/lev.jpg", desc: "Леви — великі хижаки, яких називають царями савани.", tags: ["ссавець", "Африка"] },
  { name: "Орел", type: "bird", img: "images/orel.jpg", desc: "Орли мають чудовий зір і сильні крила.", tags: ["птах", "хижак"] },
  { name: "Слон", type: "mammal", img: "images/slon.jpg", desc: "Слони — найбільші наземні тварини на планеті.", tags: ["ссавець", "великий"] },
  { name: "Пінгвін", type: "bird", img: "images/pingvin.jpg", desc: "Пінгвіни живуть у холодних регіонах і не вміють літати.", tags: ["птах", "Антарктида"] },
  { name: "Тигр", type: "mammal", img: "images/tigr.jpg", desc: "Тигри — одні з найбільших котячих, відомі своєю силою.", tags: ["ссавець", "Азія"] },
  { name: "Жираф", type: "mammal", img: "images/zhyraf.jpg", desc: "Жирафи — найвищі наземні тварини з довгою шиєю.", tags: ["ссавець", "Африка"] },
  { name: "Ведмідь", type: "mammal", img: "images/vedmid.jpg", desc: "Ведмеді живуть у різних куточках світу й добре пристосовуються.", tags: ["ссавець", "ліс"] },
  { name: "Фламінго", type: "bird", img: "images/flamingo.jpg", desc: "Фламінго мають рожеве пір’я завдяки харчуванню.", tags: ["птах", "вода"] }
];

// DOM елементи
const grid = document.getElementById("animalGrid");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const emptyMsg = document.getElementById("emptyMsg");

// Модалка
const modal = document.getElementById("animalModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModalBtn = document.getElementById("closeModal");

// Функція рендеру карток
function renderAnimals(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    emptyMsg.style.display = "block";
    return;
  } else {
    emptyMsg.style.display = "none";
  }

  list.forEach((animal, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${i * 0.1}s`;

    card.innerHTML = `
      <img src="${animal.img}" alt="${animal.name}" loading="lazy">
      <h3>${animal.name}</h3>
      <div class="tags">
        ${animal.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
    `;

    card.addEventListener("click", () => openModal(animal));
    grid.appendChild(card);
  });
}

// Відкрити модалку
function openModal(animal) {
  modalImg.src = animal.img;
  modalTitle.textContent = animal.name;
  modalDesc.textContent = animal.desc;
  modal.classList.add("open");
}

// Закрити модалку
closeModalBtn.addEventListener("click", () => modal.classList.remove("open"));

// Закрити по кліку поза модалкою
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("open");
});

// Закрити клавішею Esc
document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.classList.remove("open");
});

// Фільтр та пошук
function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const filter = filterSelect.value;

  const filtered = animals.filter(animal => {
    const matchesName = animal.name.toLowerCase().includes(query);
    const matchesType = filter === "all" || animal.type === filter;
    return matchesName && matchesType;
  });

  renderAnimals(filtered);
}

// Події
searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);

// Початковий рендер
renderAnimals(animals);
