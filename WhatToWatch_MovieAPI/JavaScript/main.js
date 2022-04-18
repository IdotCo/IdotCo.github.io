import { onFilterMenuButtonClick } from "./filter.js"


const searchButton = document.querySelector('#searchButton')
const resultDiv = document.querySelector('#resultDiv')

let imageURL = 'https://image.tmdb.org/t/p/original'

let date = new Date()


const genresCBs = document.getElementsByName('genre')
let genres = ''

const movieRB = document.querySelector('#movieRadio');
const serieRB = document.querySelector('#serieRadio');
let type

const durationRBs = document.getElementsByName('duration')
let duration = 0

const releaseDateInput = document.querySelector('#releaseDateInput')
// releaseDateInput.value = getTodaysDate()
// let releaseDate = releaseDateInput.value + '-01'
let releaseDate = ''




//GET FILTER
function getFilter() {
    getTypeRB()
    getGenres()
    getDuration()
    getReleaseDate()
}

//GET DIFFERENT SETTINGS FROM FILTER
function getReleaseDate() {
    if (releaseDateInput.value) {
        releaseDate = releaseDateInput.value + '-01'
    }
}

function getGenres() {
    genres = ''
    genresCBs.forEach((element) => {
        if (element.checked) {
            genres += `${element.value},`
        }
    })
}

function getDuration() {
    durationRBs.forEach((element) => {
        if (element.checked) {
            duration = element.value
            return
        }
    })
}

function getTypeRB() {
    if (movieRB.checked) {
        type = movieRB.value
    }
    else if (serieRB.checked) {
        type = serieRB.value
    }
}

//SEARCH BUTTON LISTENER
searchButton.addEventListener('click', () => {
    //CLOSE FILTER MENU
    onFilterMenuButtonClick(true);

    //GET RESULTS
    getFilter()

    if (type === 'movie') {
        getFilteredMovies(getRandomNumber(100))
    }else{
        getFilteredSeries(getRandomNumber(100))
    }
})

//GET DATA FROM API
function getFilteredMovies(pageNumber) {
    fetch('https://api.themoviedb.org/3/discover/' + type +'?api_key=d4602fb833f927023ee19bdeaaca7b79'
    + '&with_runtime.gte=' + duration
    + '&with_genres=' + genres
    + '&primary_release_date.gte=' + releaseDate
    + '&language=en-US'
    + '&sort_by=popularity.desc&page=' + pageNumber)
    .then(res => {
        if (!res.ok) {
            console.log('ERROR RES')
        }
        else{
            res.json().then(data => {
                // console.log(data)
                // console.log(data.results)

                if (data.results.length > 0) {
                    printResult(data.results)
                }
                else{
                    // console.log('NO DATA')
                    getFilteredMovies(getRandomNumber(data.total_pages))
                }

            })
        }
    })
}

function getFilteredSeries(pageNumber) {
    fetch('https://api.themoviedb.org/3/discover/' + type +'?api_key=d4602fb833f927023ee19bdeaaca7b79'
    + '&with_runtime.gte=' + duration
    + '&with_genres=' + genres
    + '&first_air_date.gte=' + releaseDate
    + '&language=en-US'
    + '&sort_by=popularity.desc&page=' + pageNumber)
    .then(res => {
        if (!res.ok) {
            console.log('ERROR RES')
        }
        else{
            res.json().then(data => {
                // console.log(data)
                // console.log(data.results)

                if (data.results.length > 0) {
                    printResult(data.results)
                }
                else{
                    // console.log('NO DATA')
                    getFilteredMovies(getRandomNumber(data.total_pages))
                }

            })
        }
    })
}

function getRandomMoviesWithoutFilter() {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=d4602fb833f927023ee19bdeaaca7b79'
            + '&sort_by=popularity.desc&page=' + getRandomNumber(500))
    .then(res => {
        if (!res.ok) {
            console.log('ERROR RES')
        }
        else{
            res.json().then(data => {
                console.log(data)
                console.log(data.results)
                printResult(data.results)
            })
        }
    })
}

function getMovieWithID() {
    fetch('https://api.themoviedb.org/3/movie/' + randomId
            + '?api_key=d4602fb833f927023ee19bdeaaca7b79&language=en-US&append_to_response=images')
    .then(res => {
        if (!res.ok) {
            console.log('ERROR RES')
        }
        else{
            res.json().then(data => {
                console.log(data)
                let randomNumber = getRandomNumber(data.images.posters.length - 1)
                if (!data.images.posters[randomNumber]) {
                    console.log('NO POSTERS')
                }
                else{
                    image.src = imageURL + data.images.posters[randomNumber].file_path
                    document.getElementsByTagName('body')[0].append(image)
                }
            })
        }
    })
}

function getPopularMovies() {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=d4602fb833f927023ee19bdeaaca7b79'
            + '&language=en-US&page=1')
    .then(res => {
        if (!res.ok) {
            console.log('ERROR RES')
        }
        else{
            res.json().then(data => {
                console.log(data)
            })
        }
    })
}

function getGenreList() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=d4602fb833f927023ee19bdeaaca7b79')

    .then(res => {
        if (!res.ok) {
            console.log('ERROR RES')
        }
        else{
            res.json().then(data => {
                console.log(data)
            })
        }
    })
}

function getConfigurationData() {
    fetch('https://api.themoviedb.org/3/configuration?api_key=d4602fb833f927023ee19bdeaaca7b79')
    .then(res => {
        if (!res.ok) {
            console.log('ERROR')
        }
        else{
            res.json().then(data => {
                console.log(data)
            })
        }
    })
}

function printResult(dataArray) {
    resultDiv.innerHTML = ''
    dataArray.forEach(movieOrTV => {
        printCard(movieOrTV)
    });
}

function printCard(movieOrTV) {
    const resultCard = document.createElement('div')
    const resultCardInner = document.createElement('div')
    const cardFront = document.createElement('div')
    const cardBack = document.createElement('div')
    const contentDivFront = document.createElement('div')    
    const contentDivBack = document.createElement('div')    
    const titleFront = document.createElement('h2')
    const titleBack = document.createElement('h2')
    const releaseDateBack = document.createElement('p')

    if (type === 'movie') {   
        titleFront.textContent = movieOrTV.title
        titleBack.textContent = movieOrTV.title

        if (movieOrTV.release_date) {
            releaseDateBack.textContent = '(' + movieOrTV.release_date + ')'
        }
    }
    else if(type === 'tv'){
        titleFront.textContent = movieOrTV.name
        titleBack.textContent = movieOrTV.name

        if (movieOrTV.first_air_date) {
            releaseDateBack.textContent = '(' + movieOrTV.first_air_date + ')'
        }
    }

    if (movieOrTV.poster_path) {
        contentDivFront.style.backgroundImage = 'url(' + imageURL + movieOrTV.poster_path + ')'
    }
    
    contentDivBack.textContent = movieOrTV.overview

    resultCard.classList.add('resultCard')
    resultCardInner.classList.add('resultCardInner')
    cardFront.classList.add('cardFace', 'cardFront')
    cardBack.classList.add('cardFace', 'cardBack')
    contentDivFront.classList.add('imageDiv')
    contentDivBack.classList.add('contentDiv')

    cardFront.appendChild(titleFront)
    cardFront.appendChild(contentDivFront)
    cardBack.appendChild(titleBack)
    cardBack.appendChild(releaseDateBack)
    cardBack.appendChild(contentDivBack)

    resultCardInner.appendChild(cardFront)
    resultCardInner.appendChild(cardBack)

    resultCard.appendChild(resultCardInner)

    resultDiv.appendChild(resultCard)

    resultCardInner.addEventListener('click', () => {
        resultCardInner.classList.toggle('isFlipped')
    })
}

function getRandomNumber(maxValue) {
    return Math.floor(Math.random() * maxValue) + 1
}

function getTodaysDate() {
    let year = String(date.getFullYear())
    let month = String(date.getMonth() + 1)

    if (month.length < 2) {
        month = '0' + month
    }

    return year + '-' + month
}