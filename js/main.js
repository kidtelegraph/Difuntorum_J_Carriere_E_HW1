(() => {
    const characterBox = document.querySelector("#character-box");
    const movieInfoCon = document.querySelector("#movie-info-con");
    const posterCon = document.querySelector("#poster-con");
    const baseUrl = "https://swapi.dev/api";

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
                a.dataset.image = `https://starwars-visualguide.com/assets/img/characters/${getCharacterId(character.url)}.jpg`;
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
        movieInfoCon.innerHTML = '';

        const title = document.createElement('h2');
        title.textContent = film.title;

        const openingCrawl = document.createElement('p');
        openingCrawl.textContent = film.opening_crawl;

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