const charsContainer = document.querySelector('.chars-container');
const searchInput = document.querySelector('#search');

const speciesFilter = document.querySelector('#species')
const genderFilter = document.querySelector('#gender')
const statusFilter = document.querySelector('#status')
const loadMoreButton = document.querySelector('#load-more')

const API = 'https://rickandmortyapi.com/api'
const defaultFilters = {
    name: "",
    species: "",
    gender: "",
    status: "",
    page: 1
}

async function getCharacters({ name, species, gender, status, page = 1 }) {
    const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`)

    const characters = await response.json()
    return characters.results
}

async function render({ characters }) {
    try {
        const resolvedCharacters = await characters; // Aguarda a resolução da promise
        resolvedCharacters.forEach((character) => {
            return charsContainer.innerHTML +=
                `<div class="char">
                    <img src="${character.image}" alt="">
                    <div class="char-info">
                      <h3>${character.name}</h3>
                      <span>${character.species}</span>
                    </div>
                  </div>`
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

function handleFilterChange(type, event) {
    defaultFilters[type] = event.target.value;
    charsContainer.innerHTML = '';
    const characters = getCharacters(defaultFilters);
    render({ characters });
}


async function handleLoadMore() {
    defaultFilters.page += 1
    const characters = await getCharacters(defaultFilters)
    render({ characters })
}

function addListeners() {
    speciesFilter.addEventListener('change', (event) => {
        handleFilterChange('species', event);
    });

    genderFilter.addEventListener('change', (event) => {
        handleFilterChange('gender', event);
    })
    statusFilter.addEventListener('change', (event) => {
        handleFilterChange('status', event)
    })
    searchInput.addEventListener('keyup', (event) => {
        handleFilterChange('name', event)
    })

    loadMoreButton.addEventListener('click', handleLoadMore)


}

async function main() {
    const characters = await getCharacters(defaultFilters)
    addListeners()
    render({ characters })
}

main()
