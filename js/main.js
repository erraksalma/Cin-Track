import { getMovies } from "./store.js";
import{creerCarte,creerModal} from "./render.js";
const moviesG = document.querySelector("#movies");
const modal=document.querySelector("#modal");
const modalContent=document.querySelector("#modalContent");
const closeModal=document.querySelector("#closeModal");
const recherche=document.querySelector("#recherche");
const status = document.querySelector("#status");
let movies=[];
async function init() {
    try{
     movies= await getMovies();
     filterFilms();
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
function rechercherFilms(){
    const texte= recherche.value.toLowerCase().trim();
const search=movies.filter(film=>{
    return film.title.toLowerCase().includes(texte);
});
if(search.length===0){
    moviesG.innerHTML=`
    <p class="text-gray-400 text-center">Aucun film ou serie trouve</p>
    `; 
}else{
    moviesG.innerHTML=search.map(film=>{
        return creerCarte(film);
    }).join("");
}
}
recherche.addEventListener("input",()=>{
    rechercherFilms();
});


function filterFilms(){
    const categorie = status.value;
    const resultats=movies.filter(film=>{
        if(categorie==="all"){
            return true;
        }
        return film.type===categorie;
    });
    moviesG.innerHTML=resultats.map(film=>{
        return creerCarte(film);
    }).join("");
}
status.addEventListener("change",()=>{
    filterFilms();
});