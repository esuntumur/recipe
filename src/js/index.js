require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";

/*
 - Веб апп төлөв
 - Хайлтын query, үр дүн
 - Тухайн үзүүлж байгаа жор
 - Лайкласан жорууд
 - Захиалж байгаа жорын найрлаганууд
*/
const state = {};

const controlSearch = async () => {
  // 1) Вебээс хайлтын түлхүүр үгийг гаргаж авна
  const query = searchView.getInput();

  if (query) {
    // 2) Шинээр хайлтын объектийг үүсгэж өгнө
    state.search = new Search(query);
    // 3) Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ
    searchView.clearSearchQuery();
    searchView.clearSearchResults();
    renderLoader(elements.searchResultDiv);
    // 4) Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();
    // searchView.renderRecipes();
    // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ
    clearLoader();
    if (state.search.result === undefined) alert("хайлт илэрцгүй...");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // default үйлдлийг хийхгүй
  controlSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const gotoPageNumber = Number(btn.dataset.goto);
    searchView.clearSearchResults();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

const r = new Recipe(47746);
r.getRecipe();
