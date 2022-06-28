const API_KEY = 'ee02699fb081e8927049d0a1f28a2b02'
const API_BASE = `https://api.themoviedb.org/3`

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
}

//https://api.themoviedb.org/3/discover/movie?api_key=ee02699fb081e8927049d0a1f28a2b02&language=pt-BR?sort_by=popularity.desc

export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await basicFetch(
          `/discover/tv?api_key=${API_KEY}&language=pt-BR?with_network=213`
        )
      },
      {
        slug: 'trending',
        title: 'Recomendados para você',
        items: await basicFetch(
          `/discover/movie?api_key=${API_KEY}&language=pt-BR?sort_by=popularity.desc`
        )
      },
      {
        slug: 'toprated',
        title: 'Em alta',
        items: await basicFetch(
          `/discover/movie?api_key=${API_KEY}&language=pt-BR?sort_by=popularity.desc`
        )
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(
          `/discover/movie?api_key=${API_KEY}&language=pt-BR?with_genres=28`
        )
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(
          `/discover/movie?api_key=${API_KEY}&language=pt-BR?with_genres=35`
        )
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(
          `/discover/movie?api_key=${API_KEY}&language=pt-BR?with_genres=27`
        )
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(
          `/discover/movie?api_key=${API_KEY}&language=pt-BR?with_genres=10749`
        )
      },
      {
        slug: 'documantary',
        title: 'Documentários',
        items: await basicFetch(
          `/discover/movie?api_key=${API_KEY}&language=pt-BR?with_genres=99`
        )
      },
    ]
  },
  getMovieInfo: async(movieId, type) => {
    let info = {}

    if(movieId){
      switch(type){
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`)
          break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?api_key=${API_KEY}&language=pt-BR`)  
          break;

          default: info = null;
          break;
      }
    }
    return info;
  }
}







