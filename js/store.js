const api="https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json";
export async function getMovies() {
    try{
        const reponse = await fetch(api);
        if(!reponse.ok){
            throw new Error("Erreur lors du telechargement des donnees");
        }
        const data = await reponse.json();
        return data;
    } catch(error){
        console.log("Erreur",error);
     throw error; 
    }
}