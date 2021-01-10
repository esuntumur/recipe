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
      alert;
    } catch (error) {
      console.log("Алдаа гарлаа: " + error);
    }
  }
}
