require("@babel/polyfill");
import Search from "./model/search";

const object = new Search("pasta");
object.doSearch().then((r) => console.log(r));
