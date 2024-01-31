(() => {
    const characterBox = document.querySelector("#character-box");
    const movieInfoCon = document.querySelector("#movie-info-con");
    const posterCon = document.querySelector("#poster-con");
    const baseUrl = "https://swapi.dev/api";

    const spinner = `<svg width="100" height="100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_d9Sa{transform-origin:center}.spinner_qQQY{animation:spinner_ZpfF 9s linear infinite}.spinner_pote{animation:spinner_ZpfF .75s linear infinite}@keyframes spinner_ZpfF{100%{transform:rotate(360deg)}}</style><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/><rect class="spinner_d9Sa spinner_qQQY" x="11" y="6" rx="1" width="2" height="7"/><rect class="spinner_d9Sa spinner_pote" x="11" y="11" rx="1" width="2" height="9"/></svg>`;

    function showSpinner() {
        characterBox.innerHTML = spinner;
    }

    function hideSpinner() {
        characterBox.innerHTML = "";
    }

    function getCharacters() {
        const randomPage = Math.floor(Math.random() * 7) + 1;
        fetch(`${baseUrl}/people/?page=${randomPage}`)
        .then(response => response.json())
        .then(function(response){
            let characters = response.results;
            characters = (characters);
    
            const ul = document.createElement('ul');
    
            characters.forEach(character => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = character.name;
                a.dataset.films = JSON.stringify(character.films);
                a.dataset.image = `images/${getCharacterId(character.url)}.jpg`;
                li.appendChild(a);
                ul.appendChild(li);
            });
    
            characterBox.appendChild(ul);
        })
        .then(function(){
            const links = document.querySelectorAll('#character-box li a');
            links.forEach(link => {
                link.addEventListener("click", getCharacterFilms);
            })
        })
        .catch(error => {
            console.log(error);
        });
    }
    

    function getCharacterFilms(e) {
        e.preventDefault();
        const films = JSON.parse(e.currentTarget.dataset.films);
        const randomFilmIndex = Math.floor(Math.random() * films.length);
        const randomFilmUrl = films[randomFilmIndex];

        fetch(randomFilmUrl)
        .then(response => response.json())
        .then(function(film) {
            displayMovieInfo(film);
        })
        .catch(error => {
            console.log(error);
        });
    }

    function displayMovieInfo(film) {
        movieInfoCon.innerHTML = "";
        posterCon.innerHTML = "";

        const title = document.createElement("h2");
        title.textContent = film.title;

        const openingCrawl = document.createElement("p");
        openingCrawl.textContent = film.opening_crawl;

        const posterImg = document.createElement("img");

        const posterFilename = film.title.toLowerCase().replace(/ /, "_");

            posterImg.src = `images/${posterFilename}.jpg`;
            posterImg.alt = film.title;
            
        
        posterCon.appendChild(posterImg);
        movieInfoCon.appendChild(title);
        movieInfoCon.appendChild(openingCrawl);
    }


    function getCharacterId(url) {
        const matches = url.match(/[0-9]+$/);
        if (matches) {
            return matches[1];
        }
        return null;
    }


    getCharacters();
})();