let currentPets = [];

// Category fetch
async function category() {
  const url = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`,
  );
  const categoryData = await url.json();
  categoryBtn(categoryData.categories);
}

const categoryBtn = (animalData) => {
  const categoryBTN = document.getElementById("category-btn");

  animalData.forEach((pat) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button id="btn-${pat.category}" class="category-btn btn px-8 lg:py-10 lg:px-20 sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
        <img class="w-4 lg:w-10" src=${pat.category_icon} alt="">
        ${pat.category}
      </button>
    `;
    const btn = div.querySelector("button");
    btn.addEventListener("click", () => patsCategoryDetails(pat.category));
    categoryBTN.append(div);
  });
};

const removeActiveClass = () => {
  const button = document.getElementsByClassName("category-btn");
  for (let btn of button) {
    btn.classList.remove("rounded-full");
  }
};

// Pets category
const patsCategoryDetails = async (pat) => {
  removeActiveClass();
  const url = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${pat}`,
  );
  const data = await url.json();

  const featureImg = document.getElementById("pat-img");
  featureImg.innerHTML = "";

  const petCardsDetails = document.getElementById("petCards");
  const spinner = document.getElementById("spinner");

  spinner.classList.remove("hidden");
  const petBtn = document.getElementById(`btn-${pat}`);
  petBtn.classList.add("rounded-full");

  petCardsDetails.innerHTML = "";
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const noDataFound = document.getElementById("noData");
  noDataFound.innerHTML = "";

  if (data.data.length === 0) {
    spinner.classList.add("hidden");
    noDataFound.innerHTML = `
      <div class="text-center">
        <div class="flex justify-center">
          <img src="./images/error.webp" alt="" />
        </div>
        <h1 class="font-extrabold text-2xl">No Information Available</h1>
        <p class="mx-16 text-xl">
          It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout.
        </p>
      </div>`;
  } else {
    currentPets = data.data ?? []; // save for sort
    data.data.forEach((e) => {
      spinner.classList.add("hidden");
      const div = document.createElement("div");
      div.innerHTML = buildCard(e);
      petCardsDetails.append(div);
    });
  }
};

// Pets details (on load)
const petsData = async () => {
  const url = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets",
  );
  const data = await url.json();
  petDetails(data.pets);
};

const petDetails = async (data) => {
  currentPets = data; // save for sort
  const petCardsDetails = document.getElementById("petCards");
  const spinner = document.getElementById("spinner");

  data.forEach((e) => {
    spinner.classList.add("hidden");
    const div = document.createElement("div");
    div.innerHTML = buildCard(e);
    petCardsDetails.append(div);
  });
};

// Shared card HTML builder
function buildCard(e) {
  return `
    <div class="card bg-base-100 shadow-sm">
      <figure class="px-4 pt-4">
        <img src="${e.image}" alt="${e.pet_name}" class="h-full w-full object-cover rounded-xl"/>
      </figure>
      <div class="card-body p-4">
        <h2 class="card-title">${e.pet_name}</h2>
        <p class="text-gray-500"><i class="fa-solid fa-qrcode"></i> Breed: ${e.breed}</p>
        <p class="text-gray-500"><i class="fa-regular fa-calendar"></i> Birth: ${e.date_of_birth}</p>
        <p class="text-gray-500"><i class="fa-solid fa-mercury"></i> Gender: ${e.gender}</p>
        <p class="text-gray-500"><i class="fa-solid fa-dollar-sign"></i> Price : € ${e.price}</p>
        <hr class="border-gray-300" />
        <div class="card-actions mx-auto">
          <button onclick="myFunction(${e.petId})" class="btn md:btn-md btn-outline border-gray-200 text-gray-400">
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <button id="${e.petId}" onclick="adoptedData(${e.petId})" class="btn md:btn-md btn-outline border-gray-200 text-[#0e7a81]">
            Adopt
          </button>
          <button onclick="modalFunction(${e.petId})" class="btn md:btn-md btn-outline border-gray-200 text-[#0e7a81]">
            Details
          </button>
        </div>
      </div>
    </div>`;
}

// Sort by price (high to low)
function sortByPrice() {
  const sorted = [...currentPets].sort((a, b) => {
    b.price - a.price;
    // console.log(a, b);
  });
  console.log(...currentPets);

  const petCardsDetails = document.getElementById("petCards");
  petCardsDetails.innerHTML = "";

  sorted.forEach((e) => {
    const div = document.createElement("div");
    div.innerHTML = buildCard(e);
    petCardsDetails.append(div);
  });
}

// Like image section
function myFunction(e) {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${e}`)
    .then((res) => res.json())
    .then((data) => {
      const img = document.createElement("img");
      img.src = `${data.petData?.image}`;
      img.alt = "pets";
      img.classList = "w-full object-cover rounded-xl";

      const imgs = document.getElementById("pat-img");
      imgs.append(img);
    });
}

// Modal section
function modalFunction(e) {
  const cardData = document.getElementById("cardData");
  cardData.innerHTML = "";

  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${e}`)
    .then((res) => res.json())
    .then((data) => {
      const div = document.createElement("div");
      div.classList.add("card", "bg-base-100", "shadow-sm");
      div.innerHTML = `
        <figure>
          <img class="h-full w-full object-cover rounded-xl" src="${data.petData?.image}" alt="Pet Data"/>
        </figure>
        <div class="card-body p-5">
          <h2 class="card-title">${data.petData?.pet_name}</h2>
          <div class="grid grid-cols-2">
            <div>
              <p class="text-gray-500"><i class="fa-solid fa-qrcode"></i> Breed: ${data.petData?.breed}</p>
              <p class="text-gray-500"><i class="fa-solid fa-mercury"></i> Gender: ${data.petData?.gender}</p>
              <p class="text-gray-500"><i class="fa-solid fa-mercury"></i> Vaccinated status: ${data.petData?.vaccinated_status}</p>
            </div>
            <div>
              <p class="text-gray-500"><i class="fa-regular fa-calendar"></i> Birth: ${data.petData?.date_of_birth}</p>
              <p class="text-gray-500"><i class="fa-solid fa-euro-sign"></i> Price : € ${data.petData?.price}</p>
            </div>
          </div>
          <hr class="border-gray-300" />
          <h2 class="font-bold">Details Information</h2>
          <p class="text-gray-500">${data.petData?.pet_details}</p>
        </div>
        <div>
          <form method="dialog">
            <button class="btn btn-block primary-color text-white">Cancel</button>
          </form>
        </div>`;

      cardData.append(div);
      document.getElementById("showModalData").click();
    });
}

// Adopted Data (countdown modal)
function adoptedData(e) {
  const modal = document.getElementById("countdown_modal");
  const countEl = document.getElementById("count");
  const adoptedBtn = document.getElementById(e);

  let count = 3;
  countEl.textContent = count;
  modal.showModal();

  const interval = setInterval(() => {
    count--;
    countEl.textContent = count;
    if (count <= 0) {
      clearInterval(interval);
      modal.close();
      adoptedBtn.classList.add("btn-disabled");
      adoptedBtn.innerText = "Adopted";
    }
  }, 1000);
}

category();
petsData();
