import { getMovies } from "./store.js";
import{creerCarte,creerModal} from "./render.js";
const moviesG = document.querySelector("#movies");
const modal=document.querySelector("#modal");
const modalContent=document.querySelector("#modalContent");
const closeModal=document.querySelector("#closeModal");
let movies=[];
async function init() {
    try{
     movies= await getMovies();
    console.log(movies);

    moviesG.innerHTML=movies.map(film=>{
        return creerCarte(film);
    }).join("");
}catch(error){
    moviesG.innerHTML=`
    <p class="text-red-500 text-center">Impossible de charger les films et les series.
    Veuillez ressayer</p>
    `
}
}
init();
moviesG.addEventListener("click", (e) => {
    const card= e.target.closest("article");
    if(!card) return;
    const id = card.dataset.id;
    const film = movies.find(movie=>movie.id==id);
    if(film){
        modalContent.innerHTML= creerModal(film);
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }

});
closeModal.addEventListener("click", ()=>{
    modal.classList.add("hidden");
    modal.classList.remove("flex");
});