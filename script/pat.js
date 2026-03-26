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
  console.log(animalData);

  const categoryBTN = document.getElementById("category-btn");
  animalData.forEach((pat) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
          <img class="w-8" src=${pat.category_icon} alt="">
          
            ${pat.category}
          </button>
         
    `;
    categoryBTN.append(div);
  });
};
category();
