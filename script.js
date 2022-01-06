const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let data = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = data.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async() => {
    try {
        let res = await fetch('https://hp-api.herokuapp.com/api/characters');
        data = await res.json();
        displayCharacters(data);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const html = characters
        .map((character) => {
            return `
            <div class="character">
                <h2>${character.name}</h2>
                <a>House: ${character.house}</a>
                <img src="${character.image}"></img>
            </div>
        `;
        })
        .join('');
    charactersList.innerHTML = html;
};



loadCharacters();