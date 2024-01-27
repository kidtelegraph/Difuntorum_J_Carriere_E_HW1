(() => {
    const characterBox = document.querySelector("#character-box");
    const movieInfoCon = document.querySelector("#movie-info-con"); // Container to display movie info
    const baseUrl = "https://swapi.dev/api";

    function getCharacters() {
        fetch(`${baseUrl}/people/`)
        .then(response => response.json())
        .then(function(response){
            const characters = response.results;
            const ul = document.createElement('ul');

            characters.forEach(character => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = character.name;
                a.href = "#"; // Prevent the page from reloading on link click
                a.dataset.films = JSON.stringify(character.films); // Store film URLs for later
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
        e.preventDefault(); // Prevent the default link action
        const films = JSON.parse(e.currentTarget.dataset.films);

        // Assuming we're just interested in the first film for this demo
        fetch(films[0])
        .then(response => response.json())
        .then(function(film) {
            displayMovieInfo(film);
        })
        .catch(error => {
            console.log(error);
        });
    }

    function displayMovieInfo(film) {
        movieInfoCon.innerHTML = ''; // Clear existing movie info if any

        const title = document.createElement('h2');
        title.textContent = film.title;

        const openingCrawl = document.createElement('p');
        openingCrawl.textContent = film.opening_crawl;

        movieInfoCon.appendChild(title);
        movieInfoCon.appendChild(openingCrawl);

        // Add more film details as you like (e.g., director, release date, etc.)
    }

    getCharacters();
})();