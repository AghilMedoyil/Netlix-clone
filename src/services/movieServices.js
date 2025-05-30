const key = "37e810fbfca7017cb70e180cc3a93c3c" ;
const baseUrl = "https://api.themoviedb.org/3";

const endpoints = {
  popular: `${baseUrl}/movie/popular?api_key=${key}`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${key}`,
  trending: `${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=2`,
  comedy: `${baseUrl}/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
  upcoming: `${baseUrl}/movie/upcoming?api_key=${key}`,
};

export function createImageUrl(filename,size){
    return `https://image.tmdb.org/t/p/${size}/${filename}`;
    
}
export { key, baseUrl };
export default endpoints;
