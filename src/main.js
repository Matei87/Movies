let API_KEY = 'd2f90b385fa2430163392784263021de';
let POSTER_URL = 'https://image.tmdb.org/t/p/original';
let url = 'https://api.themoviedb.org/3/search/movie?api_key=d2f90b385fa2430163392784263021de';
let MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';
let MOVIE_BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280';

let searchButton = document.querySelector('#search');
let searchInput  = document.querySelector('#inputValue');
let moviesSearchable = document.querySelector('#movies-searchable');
let firstResult = document.querySelector('.first-result');

let movieSelected = function (id) {
    window.location.href = `movies.html?id=${id}`;
}
popularMovies();
nowPlayingMovies();

function truncateString(str, num) {
    return str && str.length > num ? str.slice(0, num).split(' ').slice(0, -1).join(' ') + '...': str;
}


function createMovieContainer(movies){

        let output = movies.map( (movie) => {
            if (movie.poster_path) {
                    return `
                            <div class="chit-chat">
                                 <img src=${POSTER_URL + movie.poster_path} class="image-poster">
                                 <div class="right">
                                     <h4 class="title">${movie.title}</h4>
                                     <span class="an">${movie.vote_average} / 10</span>
                                 </div>
                                 <div class="right2">
                                     <p class="plot">${truncateString(movie.overview, 90)}</p>
                                     <p class="view-more"><a id=${movie.id} onclick=movieSelected(${movie.id}) title="${movie.title}" alt="${movie.title}">More Info</a></p>
                                 </div>
                            </div>
                      </div>`;
             }
            }
        ).join('');
       return output;
}

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    let inputValue = searchInput.value;

        if (inputValue){
            document.querySelector('#movies-popular').style.display = "none";
            document.querySelector('#nowPlaying').style.display = "none";
        }

    let ceva = `https://api.themoviedb.org/3/movie/${inputValue}?api_key=${API_KEY}&language=en-US`;
    let newUrl = url + '&query=' + inputValue + '&language=en-US';
    let searchResultat = `<h1 id="resultat">Search Result</h1>`;
    fetch(newUrl)
        .then((res) => res.json())
        .then( data => {
            moviesSearchable.innerHTML = '';
            let movies = data.results;
            let movieBlock = createMovieContainer(movies);
           moviesSearchable.innerHTML = searchResultat + movieBlock;
        })
        .catch(Error => {
            console.log(Error);
        });

    //Empty the search field input after the search
      searchInput.value = '';
})


//POPULAR MOVIES
function popularMovies() {
    let moviesPopular = document.querySelector('#movies-popular');
    let popularUrl =  `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;

        fetch(popularUrl)
            .then(res => res.json())
            .then( data => {

                let movies = data.results;
                let movieBlock = movieContainerPopular(movies);
                moviesPopular.innerHTML = movieBlock;
            })
            .catch(error => console.log(error))
}

function movieContainerPopular(movies){

    let popularResultat = `<h1 id="popular-resultat">Popular</h1>`;
    let output = `${ movies.map( (movie) => {
            
              return ` <div class="popular-chit-chat">
                                 <img src=${POSTER_URL + movie.poster_path} class="popular-image-poster">
                                 <div class="popular-right">
                                     <h4 class="popular-title">${movie.title}</h4>
                                     <span class="popular-an">${movie.vote_average} / 10</span>
                                 </div>
                                 <div class="popular-right2">
                                     <p class="popular-plot">${truncateString(movie.overview, 90)}</p>
                                     <p class="view-more"><a onclick=movieSelected(${movie.id}) title="${movie.title}" alt="${movie.title}">More Info</a></p>
                                 </div>
                       </div>`; 
        }
    ).join('')}`;

    return popularResultat + output;
}

//NOW PLAYING MOVIES
function nowPlayingMovies() {
    let nowPlaying = document.querySelector('#nowPlaying');
    let nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`;

    fetch(nowPlayingUrl)
        .then( (res) => res.json())
        .then( data => {

            let rezultate = data.results;
            let movieBloc = movieContainerNow(rezultate);
            nowPlaying.innerHTML = movieBloc;

            let firstMovieBlock = function firstMovie(movies){
                    return ` <div class="first-background" style="background: linear-gradient(to bottom, rgba(0,0,0,0) 39%,rgba(0,0,0,0) 41%,rgba(0,0,0,0.65) 100%), url(${MOVIE_BACKDROP_URL + movies[0].backdrop_path}), #1c1c1c">
                                    <div class="first-result-text">
                                        <h1>${movies[0].title}</h1>
                                        <p>${movies[0].overview}</p>
                                    </div>
                            </div>`;
                };

            firstResult.innerHTML = firstMovieBlock(rezultate);
        })
        .catch(err => {
            console.log(err);
        })

}

function movieContainerNow(movies){

    let nowPlayingResultat = `<h1 id="nowPlaying-resultat">Now Playing</h1>`;
    let output = `${ movies.map( (movie) => {
            
            return ` <div class="now-chit-chat">
                             <img src=${POSTER_URL + movie.poster_path} class="now-image-poster">
                             <div class="now-right">
                                 <h4 class="now-title">${movie.title}</h4>
                                 <span class="now-an">${movie.vote_average} / 10</span>
                             </div>
                             <div class="now-right2">
                                 <p class="now-plot">${truncateString(movie.overview, 90)}</p>
                                 <p class="view-more"><a onclick=movieSelected(${movie.id}) title="${movie.title}" alt="${movie.title}">More Info</a></p>
                             </div>
                      </div>`;
        }
    ).join('')}`;

    return nowPlayingResultat + output;
}
