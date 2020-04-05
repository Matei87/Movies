"use strict";
let API = 'd2f90b385fa2430163392784263021de';
let POSTER = 'https://image.tmdb.org/t/p/original';
let MOVIE_BACKDROP = 'https://image.tmdb.org/t/p/w1280';
let profil = 'http://image.tmdb.org/t/p/w300';
let home = document.querySelector('#home');

function timeConvert(n){
    if (n){
        let ore = Math.floor(n / 60);
        let minute = n % 60;
        return `${ore}h ${minute}m`;
    } else {
        return '-';
    }

}
function moneyConvert(n){
    if (n){
        let formatul = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });
        return formatul.format(n);
    } else {
        return '-';
    }

}
function dateConvert(n){
    if (n){
        let data = new Date(n);
        let zi = data.getDate();
        let an = data.getFullYear();
        let months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
        let luna = months[data.getMonth()];
        return luna + ' ' + zi + ', ' + an;
    } else {
        return '-';
    }

}
function yearConvert(n){
    let an = n.slice(0, 4);
    return an;
}
function diru(n){
    if (n){
        return n;
    } else {
        return '-';
    }
}
function postEru(n){
    if (n) {
        return POSTER + n;
    } else {
        return `img/movie.jpg`;
    }
}

function bioSelected(cl) {
    window.location.href = `profile.html?profile=${cl}`;
}

window.addEventListener("DOMContentLoaded", () => {
    let params = new URLSearchParams(window.location.search);
    let movieId = params.get('id');

    let url1 = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API}&language=en-US`;

    fetch(url1)
        .then( res => res.json())
        .then( dats => {

            let imdb = `https://www.imdb.com/title/` + `${dats.imdb_id}`;

            let genre = [];
            for (let i = 0; i < dats.genres.length; i++) {
                genre.push(dats.genres[i].name);
            }

            home.innerHTML = `<a href="index.html">Home /&nbsp</a> <div id="movie-name"> ${dats.title}</div>`;
            document.querySelector('#over').innerHTML = `
                    <div class="movieinfo row no-gutters" style="background: rgba(0, 0, 0, 0) url(${MOVIE_BACKDROP + dats.backdrop_path}) repeat scroll 0% 0%;">
                        <div class="movieinfo-content col-12">
                            <div class="movieinfo-poster">
                                <div class="movieposter"><img src=${postEru(dats.poster_path)} alt="movieposter"></div>
                            </div>
                            
                            <div class="row no-gutters">
                            <div class="movieinfo-text col-12">
                                <div class="titleu"><span class="title">${dats.title}</span> <span>(${yearConvert(dats.release_date)})</span></div>
                                <div class="info">
                                    <span>${dateConvert(dats.release_date)}</span>&nbsp&nbsp<span class="dot"></span>&nbsp
                                    <span class="genre">${genre.join(', ')}</span>&nbsp&nbsp<span class="dot"></span>&nbsp
                                    <span> ${timeConvert(dats.runtime)}</span>
                                </div>
                                <p class="tags">${dats.tagline}</p>
                                <h3 class="plot">Overview</h3>
                                <p class="over">${dats.overview}</p>
                                
                                
                    <div class="row no-gutters">
                             
                           <div id="movieinfos" class="col-12">
                           
                             <div class="movieinfo-text1 col-6">
                                    <div class="dir col-6">
                                        <p class="director"></p>
                                        <p>Director</p>
                                    </div>
                                    <div class="prod col-6">
                                        <p class="producer"></p>
                                        <p>Screenplay</p>
                                     </div>
                            </div>

                            <div class="movieinfo-text2 col-6">
                                <div class="budget col-6">
                                    <p>${moneyConvert(dats.budget)}</p>
                                    <p>Budget</p>
                                </div>
                                <div class="revenue col-6">
                                    <p>${moneyConvert(dats.revenue)}</p>
                                    <p>Revenue</p>
                                 </div>
                            </div>
                            
                            <div id="homepage" class="col-12">
                                     <p><a href="${imdb}" target="_blank"><i class="fab fa-fw fa-imdb"></i>View IMDb</a></p>
                             </div>
                           </div>
                           
                     </div>
                                
                                
                            </div>
                                       
                     </div>
                        </div>
                    </div>`;

            let url2 = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API}`;
            fetch(url2)
                .then( res => res.json())
                .then( data => {

                    let direct = data.crew.filter(a => a.job === "Director");
                        let directors = [];
                        for (let i = 0; i < direct.length; i++){
                            directors.push(direct[i].name);
                        }

                       document.querySelector('.director').innerHTML = `<p class="directors"> ${diru(directors.join(', '))}</p>`;

                        let writer = data.crew.filter(a => a.job === 'Screenplay');
                        let screenwrit = [];
                        for (let i = 0; i < writer.length; i++){
                            screenwrit.push(writer[i].name)
                        }
                       document.querySelector('.producer').innerHTML = `<p class="producers">${diru(screenwrit.join(', '))}</p>`;

                    let dire = `<h1>Crew</h1>`;
                    let direc = ` ${data.crew.map(z => {
                        if (z.job === "Director") {
                            
                            if (z.profile_path){
                                return `<div class="crew-act">
                                            <div class="crewimg">
                                                <div>
                                                    <img src=${profil + z.profile_path} alt="imageprofil">
                                                </div>
                                                <p class="crew-name">${z.name}</p>
                                                <p class="crew-character">${z.job}</p>
                                                <p class="view-more"><a id=${z.id} onclick=bioSelected(${z.id}) title="${z.name}">See Bio</a></p>
                                            </div>
                                        </div>`;
                            } else if (z.profile_path === null){
                                return `<div class="crew-act">
                                            <div class="crewimg">
                                                <div>
                                                    <img src="img/movie.jpg" alt="imageprofil">
                                                </div>
                                                <p class="crew-name">${z.name}</p>
                                                <p class="crew-character">${z.job}</p>
                                                <p class="view-more"><a id=${z.id} onclick=bioSelected(${z.id}) title="${z.name}">See Bio</a></p>
                                            </div>
                                        </div>`;
                            }
                            
                        }
                    }).join('')}`;

                    let prod = `${data.crew.map(z => {
                        if (z.job === "Producer") {
                            
                            if (z.profile_path){
                                return ` <div class="crew-act">
                                            <div class="crewimg">
                                                <div>
                                                    <img src=${profil + z.profile_path} alt="imageprofil">
                                                </div>
                                                <p class="crew-name">${z.name}</p>
                                                <p class="crew-character">${z.job}</p>
                                                <p class="view-more"><a id=${z.id} onclick=bioSelected(${z.id}) title="${z.name}">See Bio</a></p>
                                            </div>
                                         </div>`;
                            } else if (z.profile_path === null){
                                return `<div class="crew-act">
                                            <div class="crewimg">
                                                <div>
                                                    <img src="img/movie.jpg" alt="imageprofil">
                                                </div>
                                                <p class="crew-name">${z.name}</p>
                                                <p class="crew-character">${z.job}</p>
                                                <p class="view-more"><a id=${z.id} onclick=bioSelected(${z.id}) title="${z.name}">See Bio</a></p>
                                            </div>
                                       </div>`;
                            }

                        }
                    }).join('') }` ;

                    document.querySelector('#crews').innerHTML = dire +  direc + prod;


                   let actHeader = `<h1>Actors</h1>`;
                   let actCast = `${data.cast.map( a => {
                       if(a.profile_path){
                        return ` <div class="actori">
                                    <div class="actorimg">
                                        <div>
                                            <img src=${profil + a.profile_path} alt="imageprofil">
                                        </div>
                                        <p class="actor-name">${a.name}</p>
                                        <p class="actor-character">${a.character}</p>
                                        <p class="view-more"><a id=${a.id} onclick=bioSelected(${a.id}) title="${a.name}">See Bio</a></p>
                                    </div>
                                  </div>`;
                       } else if(a.profile_path === null) {
                           return ` <div class="actori">
                                        <div class="actorimg">
                                            <div>
                                                <img src="img/movie.jpg" alt="imageprofil">
                                            </div>
                                            <p class="actor-name">${a.name}</p>
                                            <p class="actor-character">${a.character}</p>
                                            <p class="view-more"><a id=${a.id} onclick=bioSelected(${a.id}) title="${a.name}">See Bio</a></p>
                                         </div>
                                    </div>`;
                       }
                    }).join('')}`;

                   document.querySelector('#actors').innerHTML = actHeader + actCast;

                })
                .catch(error => {
                    console.log(error);
                })
        })
});