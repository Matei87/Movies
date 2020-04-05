"use strict";
let KEY = 'd2f90b385fa2430163392784263021de';
let MOVIE_BACK = 'https://image.tmdb.org/t/p/w1280';
let profil = 'http://image.tmdb.org/t/p/w300';

function movieSelected(id) {
    window.location.href = `movies.html?id=${id}`;
}


function gen(n) {
    if (n == 2) {
        return 'Male';
    } else if (n == 1) {
        return 'Female';
    } else {
        return '-';
    }
}

function calcAge(n) {
    if (n) {
        let birthdate = new Date(n);
        let dates = new Date();
        let diff = dates - birthdate;
        let age = Math.floor(diff / 31557600000);
        return '(' + age + ' years old)';
    } else {
        return '';
    }
}

function deathAge(n, m) {
    if (m !== null) {
        // age till today
        let birthdate = new Date(n);
        let dates = new Date();
        let diff = dates - birthdate;
        let age = Math.floor(diff / 31557600000);

        // time from deathday
        let birthdate1 = new Date(m);
        let datez = new Date();
        let diffz = datez - birthdate1;
        let agez = Math.floor(diffz / 31557600000);

        let deathAge = age - agez;
        return '(' + deathAge + ' years old)';

    } else {
        return '-';
    }

}

function dBirthday(n) {
    if (n) {
        return n;
    } else {
        return '-';
    }
}

function knownAs(n) {
    if (n) {
        return n;
    } else {
        return '-';
    }
}

function biog(n) {
    if (n){
        return n;
    } else {
        return '-';
    }
}

function placeOfBirth(n){
    if (n){
        return n;
    } else {
        return '-';
    }
}

function poza(n){
    if (n === null){
        return `img/movie.jpg`;
    } else {
        return profil + n;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    let parameters = new URLSearchParams(window.location.search);
    let profileId = parameters.get('profile');

        let url = ` https://api.themoviedb.org/3/person/${profileId}?api_key=${KEY}&language=en-US`;
        fetch(url)
            .then(res => res.json())
            .then( data => {

                        document.querySelector('#movie').innerHTML = `<a href="index.html">Home /&nbsp</a> <div id="name"> ${data.name}</div>`;
                        let name = data.name;

                        let aka = [];
                        for (let i = 0; i < data.also_known_as.length; i++) {
                            aka.push(data.also_known_as[i]);
                        }

                        let imdbProfileLink = `https://www.imdb.com/name/` + data.imdb_id;

                        if (data.deathday){
                            document.querySelector('#left-column').innerHTML = `
                                     <div id="left-column-picture"><img src="${poza(data.profile_path)}" alt="${data.name}"></div>
                                    <div id="left-column-details">
                                        <div class="personal-info">
                                            <h4>Personal Info</h4>
                                                <div id="detalii">
                                                    <div>
                                                        <p>Known For</p>
                                                        <span>${data.known_for_department}</span>
                                                    </div>
                                                    
                                                    <div>
                                                        <p>Known Credits</p>
                                                        <span id="credits"></span>
                                                    </div>
                                                    
                                                    <div>
                                                        <p>Gender</p>
                                                        <span>${gen(data.gender)}</span>
                                                    </div>
                                                    
                                                    <div>
                                                        <p>Birthday</p>
                                                        <span>${dBirthday(data.birthday)}</span>
                                                    </div>
                                                    
                                                    <div>
                                                        <p>Deathday</p>
                                                        <span>${dBirthday(data.deathday)} ${deathAge(data.birthday, data.deathday)}</span>
                                                    </div>
                                                    
                                                    <div>
                                                        <p>Place of Birth</p>
                                                        <span>${placeOfBirth(data.place_of_birth)}</span>
                                                    </div>
                                                    
                                                    <div class="alsoknown">
                                                        <p>Also known As</p>
                                                            <ul>
                                                                <li>${knownAs(data.also_known_as.join('<br>'))}</li>
                                                            </ul>
                                                    </div>
                                                    
                                                    <div>
                                                        <p>More Details</p>
                                                        <span><a href="${imdbProfileLink}" target="_blank"><i class="fab fa-fw fa-imdb"></i>View IMDb</a></span>
                                                    </div>
                                                    
                                                </div>
                                        </div>
                                    </div>`;
                        } else {
                            document.querySelector('#left-column').innerHTML = `
                                     <div id="left-column-picture"><img src="${poza(data.profile_path)}" alt="${data.name}"></div>
                                    <div id="left-column-details">
                                        <div class="personal-info">
                                            <h4>Personal Info</h4>
                                                <div id="detalii">
                                                    <div>
                                                        <p>Known For</p>
                                                        <span>${data.known_for_department}</span>
                                                    </div>
                                                    
                                                    <div>
                                                        <p>Known Credits</p>
                                                        <span id="credits"></span>
                                                    </div>
                                                    
                                                    <div>
                                                        <p>Gender</p>
                                                        <span>${gen(data.gender)}</span>
                                                    </div>
                                                    
                                                    <div>
                                                        <p>Birthday</p>
                                                        <span>${dBirthday(data.birthday)} ${calcAge(data.birthday)}</span>
                                                    </div>
                                                    
                                                    <div>
                                                        <p>Place of Birth</p>
                                                        <span>${placeOfBirth(data.place_of_birth)}</span>
                                                    </div>
                                                    
                                                    <div class="alsoknown">
                                                        <p>Also known As</p>
                                                            <ul>
                                                                <li>${knownAs(data.also_known_as.join('<br>'))}</li>
                                                            </ul>
                                                    </div>
                                                    
                                                    <div>
                                                        <p>More Details</p>
                                                        <span><a href="${imdbProfileLink}" target="_blank"><i class="fab fa-fw fa-imdb"></i>View IMDb</a></span>
                                                    </div>
                                                    
                                                </div>
                                        </div>
                                    </div>`;
                        }

                        if (data.known_for_department === 'Acting') {
                            document.querySelector('#center-column').innerHTML= `
                                                <h2 class="title">${data.name}</h2>
                                                    <h3>Biography</h3>
                                                    <p class="biography">${ biog(data.biography)}</p>
                                                    <div class="known-for">
                                                        <h3>Known For</h3>
                                                        <div class="known-for-scrolabble">
                                                            <p id="actin">Acting</p>
                                                            <ul id="actinul">
                                                                <li id="moviez"></li>
                                                            </ulid>
                                                            
                                                            <p id="crew">Crew</p>
                                                            <ul id="crewul">
                                                                <li id="crewz"></li>
                                                            </ul>
                                                        </div>
                                                     </div>`;
                        } else {
                            document.querySelector('#center-column').innerHTML= `
                                                <h2 class="title">${data.name}</h2>
                                                    <h3>Biography</h3>
                                                    <p class="biography">${ biog(data.biography)}</p>
                                                    <div class="known-for">
                                                        <h3>Known For</h3>
                                                        <div class="known-for-scrolabble">
                                                            <p id="crew">Crew</p>
                                                            <ul id="crewul">
                                                                <li id="crewz"></li>
                                                            </ul>
                                                            
                                                            <p id="actin">Acting</p>
                                                            <ul id="actinul">
                                                                <li id="moviez"></li>
                                                            </ul>
                                                        </div>
                                                     </div>`;
                        }

        let url2 = `https://api.themoviedb.org/3/person/${profileId}/movie_credits?api_key=${KEY}&language=en-US`;
        fetch(url2)
            .then( res => res.json())
            .then( dats => {

                        if (dats.cast.length === 0){
                            document.getElementById('actin').style.display = 'none';
                            document.getElementById('actinul').style.display = 'none';
                        } else {
                            document.querySelector('#moviez').innerHTML = `${dats.cast.map(a => {
                                    return `<a onclick=movieSelected(${a.id}) title="${a.title}">
                                                        <img src="${poza(a.poster_path)}" alt="${a.title}">
                                                        <p class="movie-title">${a.title}</p>
                                                    </a> `;
                            }).join('')} `;
                        }

                        if (dats.crew.length === 0) {
                            document.getElementById('crew').style.display = 'none';
                            document.getElementById('crewul').style.display = 'none';
                        } else {
                            document.querySelector('#crewz').innerHTML = `${dats.crew.map(a => {
                                    return `<a onclick=movieSelected(${a.id}) title="${a.title}">
                                                        <img src="${poza(a.poster_path)}" alt="${a.title}">
                                                        <p class="crewz-title">${a.title}</p>
                                                    </a> `;
                            }).join('')} `;
                        }

                        document.querySelector('#credits').innerHTML = `${dats.cast.length + dats.crew.length}`;
            })
            .catch(err => {
                console.log(err);
            })

    })
})