export function creerCarte(film) {
  let statut = "";
  let couleur = "";
  if (film.type == "movie") {
    statut = "Film";
    couleur = "bg-[#800020] text-white";
  } else {
    statut = "Série";
    couleur = "bg-black  text-white";
  }
  return ` 
    <article data-id="${film.id}"
            class=" relative rounded-lg bg-[#171717]  p-4 flex flex-col gap-3 hover:scale-90 transition">

            <img
                src="${film.image}"
                alt="${film.title}"
                class="w-full h-64 object-cover rounded-lg"
            >
            <h2 class="text-xl font-bold text-white">
                ${film.title}
            </h2>
            <p class="text-gray-400">
                 Année : ${film.releaseYear}
            </p>
            <span class="${couleur} rounded-lg px-3 py-2 text-center">
                ${statut}
            </span>
            <button
    data-favorite="${film.id}"
    class="absolute right-6 top-6 z-10 rounded-full bg-black p-2 text-2xl text-[#B03050] hover:text-red-500 transition"
    aria-label="Ajouter aux favoris"
>
    ♥
</button>

        </article>
 `;
}
export function creerModal(film) {
   let statut = "";
    if (film.type == "movie") {
        statut = "Film";
    } else {
        statut = "Série";
    }
    let dure = "";
    if (film.type == "movie") {
        dure = `<p class="text-gray-300">Durée : ${film.duration} minutes</p>`;
    } else {
        dure = `<p class="text-gray-300">Saisons : ${film.seasons.length}</p>`;
    }
  return`

  <div class="flex flex-col gap-4">
  <img src="${film.image}" alt="${film.title}" class=" h-64 object-cover rounded-b-lg">
  <h2 class="text-2xl font-bold text-white">${film.title}</h2>
  <p class="text-white">Type : ${statut}</p>
  <p>Annes : ${film.releaseYear}</p>
  ${dure}
  <p>Genres : ${film.genres.join(", ")}</p>
  <p> Realisateurs : ${film.directors.join(",")}</p>
   <p>Pays de production : ${film.productionCountries.join(", ")}</p>
   <p class="text-gray-300">Description :${film.description}</p>
  </div>
  `;
}