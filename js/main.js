import { getMovies } from "./store.js";
import{creerCarte,creerModal} from "./render.js";
const moviesG = document.querySelector("#movies");
const modal=document.querySelector("#modal");
const modalContent=document.querySelector("#modalContent");
const closeModal=document.querySelector("#closeModal");
const recherche=document.querySelector("#recherche");
const status = document.querySelector("#status");
const pagination = document.querySelector("#pagination");
const favoritelist=document.querySelector("#favoritesList");

let movies=[];
let favoris=JSON.parse(localStorage.getItem("favoris")) || [];
let pageactuelle = 1;
let filmparpage = 6;

async function init() {
    try{
     movies= await getMovies();
     afficherFilms();
     afficherFavoris();
    console.log(movies);
}catch(error){
    moviesG.innerHTML=`
    <p class="text-red-500 text-center">Impossible de charger les films et les series.
    Veuillez ressayer</p>
    `
}
}
init();
moviesG.addEventListener("click", (e) => {
     const btnFavori = e.target.closest("[data-favorite]");
    if (btnFavori) {
        e.stopPropagation();
        const id = btnFavori.dataset.favorite;
        if (favoris.includes(id)) {
            favoris = favoris.filter(f => f !== id);
        } else {
            favoris.push(id);
        }
        localStorage.setItem("favoris", JSON.stringify(favoris));
        afficherFilms();
        afficherFavoris();
        return;
    }
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


function afficherFilms() {
    // recherche
    const texte = recherche.value.toLowerCase().trim();
    let resultats = movies.filter(film => {
        return film.title.toLowerCase().startsWith(texte);
    });
    //  Filtrage
    const categorie = status.value;
    resultats = resultats.filter(film => {
        if (categorie === "all") {
            return true;
        }
        return film.type === categorie;
    });
    //  calcule des pages
    const totalpages = Math.ceil(resultats.length / filmparpage);
    if (pageactuelle > totalpages) {
        pageactuelle = 1;
    }
    //  decoupage des films l pagination
    const debut = (pageactuelle - 1) * filmparpage;
    const fin = debut + filmparpage;
    const filmspage = resultats.slice(debut, fin);
    //  affichage 
    if (filmspage.length === 0) {
        moviesG.innerHTML = `
            <p>Aucun film ou série trouvé</p>
        `;
    } else {
        moviesG.innerHTML = filmspage.map(film => {
            return creerCarte(film);
        }).join("");
    }
    // boutons
    afficherPagination(totalpages);
}
function afficherPagination(totalpages) {
    pagination.innerHTML = "";

    for (let i = 1; i <= totalpages; i++) {
        pagination.innerHTML += `
            <button
                data-page="${i}"
                class="px-4 py-2 rounded-lg ${
                    pageactuelle === i
                    ? "bg-[#800020] text-white"
                    : "bg-white text-red-900"
                }">
                ${i}
            </button>
        `;
    }
}
// recherche
recherche.addEventListener("input", () => {
    pageactuelle = 1;
    afficherFilms();
});
// filtrage
status.addEventListener("change", () => {
    pageactuelle = 1;
    afficherFilms();
});
// pagination
pagination.addEventListener("click", (e) => {
    const bouton = e.target.closest("button");
    if (!bouton) return;
    pageactuelle = Number(bouton.dataset.page);
    afficherFilms();
});
// moviesG.addEventListener("click", e => {
//     const btnfav=e.target.closest("[data-favorite]");
//     if(btnfav){
//         e.stopPropagation();
//         const id=btnfav.dataset.favorite;
//         if(favoris.includes(id)){
//             favoris=favoris.filter(f=>f!== id);
//         }else{
//             favoris.push(id);
//         }
//         localStorage.setItem("favoris", JSON.stringify(favoris));

//         afficherFilms();
       

//         return;
//     }
//  afficherFavoris();
    function afficherFavoris() {
    const filmsfavoris = movies.filter(film => {
        return favoris.includes(String(film.id));
    });

    if (filmsfavoris.length === 0) {
        favoritelist.innerHTML = `
            <p class="text-gray-400 text-center">
                Aucun favori pour le moment ❤️
            </p>
        `;
        return;
    }

    favoritelist.innerHTML = filmsfavoris.map(film => {
        return `
            <div class="flex items-center justify-between gap-2">
                <p class="text-white">${film.title}</p>
                <button data-remove="${film.id}">
                    ❌
                </button>
            </div>
        `;
    }).join("");
}
    favoritelist.addEventListener("click", e=>{
const bouton = e.target.closest("[data-remove]");
    if (!bouton) return;
    const id=bouton.dataset.remove;
    favoris=favoris.filter(f=>f!==id);
    localStorage.setItem("favoris", JSON.stringify(favoris));
    afficherFilms();
    afficherFavoris();
    })
