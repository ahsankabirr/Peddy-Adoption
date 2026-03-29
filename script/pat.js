// category fetch

async function category() {
  const url = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`,
  );
  const categoryData = await url.json();
  categoryBtn(categoryData.categories);
}
// {
//     "id": 1,
//     "category": "Cat",
//     "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }
const categoryBtn = (animalData) => {
  const categoryBTN = document.getElementById("category-btn");
  animalData.forEach((pat) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <button class="btn px-8 lg:py-10 lg:px-20 sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
          <img class="w-4 lg:w-10" src=${pat.category_icon} alt="">
          
            ${pat.category}
          </button>
         
    `;
    const btn = div.querySelector("button");
    btn.addEventListener("click", () => patsCategoryDetails(pat.category));
    categoryBTN.append(div);
  });
};

// Pets category
const patsCategoryDetails = async (pat) => {
  const url = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${pat}`,
  );
  const data = await url.json();
  console.log(data);

  const petCardsDetails = document.getElementById("petCards");
  const spinner = document.getElementById("spinner");

  // show spinner, clear old cards
  spinner.classList.remove("hidden");
  petCardsDetails.innerHTML = "";
  await new Promise((resolve) => setTimeout(resolve, 2000));

  
  data.data?.forEach((e) => {
    spinner.classList.add("hidden");
    const div = document.createElement("div");
    div.innerHTML = `
    
            <div class="card bg-base-100 shadow-sm">
              <figure class="px-4 pt-4">
                <img
                  src="${e.image}"
                  alt="Shoes"
                  class="h-full w-full object-cover rounded-xl"
                />
              </figure>
              <div class="card-body p-4">
                <h2 class="card-title">${e.pet_name}</h2>
                <p class="text-gray-500">
                  <i class="fa-solid fa-qrcode"></i> Breed: ${e.breed}
                </p>
                <p class="text-gray-500">
                  <i class="fa-regular fa-calendar"></i> Birth: ${e.date_of_birth}
                </p>
                <p class="text-gray-500">
                  <i class="fa-solid fa-mercury"></i> Gender: ${e.gender}
                </p>
                <p class="text-gray-500">
                  <i class="fa-solid fa-dollar-sign"></i> Price : € ${e.price}
                </p>
                <hr class="border-gray-300" />
                <div class="card-actions mx-auto">
                  <button class="btn   md:btn-md btn-outline  border-gray-200 text-gray-400">
                    <i class="fa-regular fa-thumbs-up"></i>
                  </button>
                  <button
                    class="btn  md:btn-md   btn-outline border-gray-200 text-[#0e7a81]"
                  >
                    Adopt
                  </button>
                  <button
                    class="btn   md:btn-md   btn-outline border-gray-200 text-[#0e7a81]"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
            `;
    petCardsDetails.append(div);
  });
};

// Pets details
const petsData = async () => {
  const url = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets",
  );
  const data = await url.json();
  petDetails(data.pets);
};

// {
//     "petId": 1,
//     "breed": "Golden Retriever",
//     "category": "Dog",
//     "date_of_birth": "2023-01-15",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//     "gender": "Male",
//     "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Sunny"
// }
const petDetails = async (data) => {
  const petCardsDetails = document.getElementById("petCards");
  const spinner = document.getElementById("spinner");

  // show spinner, clear old cards
  spinner.classList.remove("hidden");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  data.forEach((e) => {
    spinner.classList.add("hidden");
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
              <figure class="px-4 pt-4">
                <img
                  src="${e.image}"
                  alt="Shoes"
                  class="h-full w-full object-cover rounded-xl"
                />
              </figure>
              <div class="card-body p-4">
                <h2 class="card-title">${e.pet_name}</h2>
                <p class="text-gray-500">
                  <i class="fa-solid fa-qrcode"></i> Breed: ${e.breed}
                </p>
                <p class="text-gray-500">
                  <i class="fa-regular fa-calendar"></i> Birth: ${e.date_of_birth}
                </p>
                <p class="text-gray-500">
                  <i class="fa-solid fa-mercury"></i> Gender: ${e.gender}
                </p>
                <p class="text-gray-500">
                  <i class="fa-solid fa-dollar-sign"></i> Price : € ${e.price}
                </p>
                <hr class="border-gray-300" />
                <div class="card-actions mx-auto">
                  <button class="btn   md:btn-md btn-outline  border-gray-200 text-gray-400">
                    <i class="fa-regular fa-thumbs-up"></i>
                  </button>
                  <button
                    class="btn  md:btn-md   btn-outline border-gray-200 text-[#0e7a81]"
                  >
                    Adopt
                  </button>
                  <button
                    class="btn   md:btn-md   btn-outline border-gray-200 text-[#0e7a81]"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
            `;
    petCardsDetails.append(div);
  });
};
category();
petsData();
