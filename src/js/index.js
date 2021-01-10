require("@babel/polyfill");
import Search from "./model/search";

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
  const query = "pizza";

  if (query) {
    // 2) Шинээр хайлтын объектийг үүсгэж өгнө
    state.search = new Search(query);
    // 3) Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ

    // 4) Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();
    // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault(); // default үйлдлийг хийхгүй
  controlSearch();
});
