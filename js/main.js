import { getMovies } from "./api.js";
async function init() {
    const movies= await getMovies();
    console.log(movies);
}
init();