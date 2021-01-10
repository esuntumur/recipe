require("@babel/polyfill");
import axios from "axios";
export default class Search {
  constructor(query) {
    this.query = query;
  }
  async doSearch() {
    try {
      const getResult = await axios(
        "https://forkify-api.herokuapp.com/api/search?q=" + this.query
      );

      this.result = getResult.data.recipes;

      return this.result;
    } catch (error) {
      alert("Алдаа гарлаа: " + error);
    }
  }
}
