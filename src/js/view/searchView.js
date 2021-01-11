import { elements } from "./base";

// private function
const renderRecipe = (recipe) => {
  const markup = `
    <li>
    <a class="results__link" href="#${recipe}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
    </li>
    `;
  // https://forkify-api.herokuapp.com/api/get
  // ul рүүгээ нэмнэ
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};
export const clearSearchResults = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};

export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  // Хайлтын үр дүнг хуудаслаж үзүүлэх
  // page = 2, start = 10, end = 20
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe); // дэлгэцэнд үзүүлэх функц дуудах

  // Хуудаслалтын товчуудыг гаргаж ирэх
  const totalPages = Math.ceil(recipes.length / resPerPage); // ceil - дээшээгээ бүхэлдэх - тааз
  renderButtons(currentPage, totalPages);
};
// type =>>> 'prev', 'next'
const createButton = (page, type, direction) => `
    <button class="btn-inline results__btn--${type}" data-goto=${page}>
        <span>Хуудас ${page}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${direction}"></use>
        </svg>      
    </button>`;

const renderButtons = (currentPage, totalPages) => {
  let buttonHtml;
  if (currentPage === 1 && totalPages > 1) {
    // 1-р хуудсан дээр байна, 2-р хуудас гэдэг товчийг үзүүл
    buttonHtml = createButton(currentPage + 1, "next", "right");
  } else if (currentPage < totalPages) {
    // Өмнөх болон дараагийн хуудас руу шилжих товчийг үзүүл
    buttonHtml = createButton(currentPage - 1, "prev", "left");
    buttonHtml += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    // Хамгийн сүүлийн хуудсан дээр байна, өмнөх рүү шилжих товчийг үзүүл
    buttonHtml = createButton(currentPage - 1, "prev", "left");
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};
