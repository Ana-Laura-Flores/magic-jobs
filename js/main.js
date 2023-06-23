const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const hideElement = (selector) => $(selector).classList.add('hidden')
const showElement = (selector) => $(selector).classList.remove('hidden')
const cleanContainer = (selector) => $(selector).innerHTML = ""


const urlBase = "https://6483a556f2e76ae1b95cbbde.mockapi.io/jobs"

const getJobs = () => {
    fetch(urlBase)
    .then(response => response.json())
    .then(jobs => renderCardsJobs(jobs))
}

getJobs()