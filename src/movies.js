"use strict";
let API = 'd2f90b385fa2430163392784263021de';
let POSTER = 'https://image.tmdb.org/t/p/original';
let MOVIE_BACKDROP = 'https://image.tmdb.org/t/p/w1280';
let profil = 'http://image.tmdb.org/t/p/w300';

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
        let format = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });
        return format.format(n);
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

function nameOrNot(n){
    if (n){
        return n;
    } else {
        return '-';
    }
}

function posterPath(n){
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

    async function movieInfo(){
        let url1 = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API}&language=en-US`;
        let res = await fetch(url1);
        let data = await res.json();
        return data;
    }

    movieInfo()
        .then( (dats ) => {
                let home = document.querySelector('#home');
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
                                    <div class="movieposter"><img src=${posterPath(dats.poster_path)} alt="movieposter"></div>
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

        async function credits() {
            let url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API}`;
            let res = await fetch(url);
            let data = res.json();
            return data;
        }
        credits()
            .then( (data) => {

                        let directorFilter = data.crew.filter(  director => director.job === "Director");
                            let directors = [];
                            for (let i = 0; i < directorFilter.length; i++){
                                directors.push(directorFilter[i].name);
                            }

                           document.querySelector('.director').innerHTML = `<p class="directors"> ${nameOrNot(directors.join(', '))}</p>`;

                            let writer = data.crew.filter(a => a.job === 'Screenplay');
                            let screenwrit = [];
                            for (let i = 0; i < writer.length; i++){
                                screenwrit.push(writer[i].name)
                            }
                           document.querySelector('.producer').innerHTML = `<p class="producers">${nameOrNot(screenwrit.join(', '))}</p>`;

                        let h1Crew = `<h1>Crew</h1>`;
                        let directorMap = ` ${data.crew.map( director => {
                            if (director.job === "Director") {
                                
                                if (director.profile_path){
                                    return `<div class="crew-act">
                                                <div class="crewimg">
                                                    <div>
                                                        <img src=${profil + director.profile_path} alt="imageprofil">
                                                    </div>
                                                    <p class="crew-name">${director.name}</p>
                                                    <p class="crew-character">${director.job}</p>
                                                    <p class="view-more"><a id=${director.id} onclick=bioSelected(${director.id}) title="${director.name}">See Bio</a></p>
                                                </div>
                                            </div>`;
                                } else if (director.profile_path === null){
                                    return `<div class="crew-act">
                                                <div class="crewimg">
                                                    <div>
                                                        <img src="img/movie.jpg" alt="imageprofil">
                                                    </div>
                                                    <p class="crew-name">${director.name}</p>
                                                    <p class="crew-character">${director.job}</p>
                                                    <p class="view-more"><a id=${director.id} onclick=bioSelected(${director.id}) title="${director.name}">See Bio</a></p>
                                                </div>
                                            </div>`;
                                }
                                
                            }
                        }).join('')}`;

                        let producerMap = `${data.crew.map( producer => {
                            if (producer.job === "Producer") {
                                
                                if (producer.profile_path){
                                    return ` <div class="crew-act">
                                                <div class="crewimg">
                                                    <div>
                                                        <img src=${profil + producer.profile_path} alt="imageprofil">
                                                    </div>
                                                    <p class="crew-name">${producer.name}</p>
                                                    <p class="crew-character">${producer.job}</p>
                                                    <p class="view-more"><a id=${producer.id} onclick=bioSelected(${producer.id}) title="${producer.name}">See Bio</a></p>
                                                </div>
                                             </div>`;
                                } else if (producer.profile_path === null){
                                    return `<div class="crew-act">
                                                <div class="crewimg">
                                                    <div>
                                                        <img src="img/movie.jpg" alt="imageprofil">
                                                    </div>
                                                    <p class="crew-name">${producer.name}</p>
                                                    <p class="crew-character">${producer.job}</p>
                                                    <p class="view-more"><a id=${producer.id} onclick=bioSelected(${producer.id}) title="${producer.name}">See Bio</a></p>
                                                </div>
                                           </div>`;
                                }
    
                            }
                        }).join('') }` ;

                        document.querySelector('#crews').innerHTML = h1Crew +  directorMap + producerMap;


                       let h1Actors = `<h1>Actors</h1>`;
                       let actorsMap = `${data.cast.map( actors => {
                           if(actors.profile_path){
                            return ` <div class="actori">
                                        <div class="actorimg">
                                            <div>
                                                <img src=${profil + actors.profile_path} alt="imageprofil">
                                            </div>
                                            <p class="actor-name">${actors.name}</p>
                                            <p class="actor-character">${actors.character}</p>
                                            <p class="view-more"><a id=${actors.id} onclick=bioSelected(${actors.id}) title="${actors.name}">See Bio</a></p>
                                        </div>
                                      </div>`;
                           } else if(actors.profile_path === null) {
                               return ` <div class="actori">
                                            <div class="actorimg">
                                                <div>
                                                    <img src="img/movie.jpg" alt="imageprofil">
                                                </div>
                                                <p class="actor-name">${actors.name}</p>
                                                <p class="actor-character">${actors.character}</p>
                                                <p class="view-more"><a id=${actors.id} onclick=bioSelected(${actors.id}) title="${actors.name}">See Bio</a></p>
                                             </div>
                                        </div>`;
                           }
                        }).join('')}`;

                       document.querySelector('#actors').innerHTML = h1Actors + actorsMap; })
            .catch( error => console.log(error) ); })

    .catch( error => console.log(error) );
});
