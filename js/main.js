import { getMovies } from "./api.js";
import{creerCarte} from "./render.js";
const moviesG = document.querySelector("#movies");
async function init() {
    const movies= await getMovies();
    console.log(movies);

    moviesG.innerHTML=movies.map(film=>{
        return creerCarte(film);
    }).join("");
}
init();