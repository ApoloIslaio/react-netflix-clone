import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./api_data/Tmdb";
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/Featured';
import Header from './components/Header';



export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect(()=>{
    const loadAll = async () => {
       //pegar a lista de filmes
       let list = await Tmdb.getHomeList();
       setMovieList(list);

       //pegando o filme em destaque(featuredMovie)
       let originals = list.filter( i => i.slug === 'originals')
       let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
       let chosen = originals[0].items.results[randomChosen];
       let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

       setFeaturedData(chosenInfo);
       console.log(chosenInfo)
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }

    
  }, [])
  
  return (
    <div className="page">

      {/*============= HEADER =====================================================*/}
        <Header black={blackHeader}/>


      {/*============= FEATUREDMOVIE =====================================================*/}
      {featuredData && //se tiver carregado/ existir
        <FeaturedMovie item={featuredData} />
      }

      {/*============= LISTS =====================================================*/}
      <section className="lists">
          {movieList.map( (item, key) => (
              <div> 
                <MovieRow 
                  key={key} 
                  title={item.title}
                  items={item.items}

                />
              </div>
          ))}  
      </section>  

      {/*============= FOOTER =====================================================*/}
      <footer>
         Feito por <span role="img" aria-label="coração"> </span> Apolo Islaio <br />
         Direitos de imagens para Netflix <br />  
         Dados pegos do site Themoviedb.org
      </footer>      

      {/* loading  ========================================= */}
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando" />
        </div>
      }

    </div>
  )
}