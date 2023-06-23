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

// renders 
const renderCardsJobs = (jobs) => {
    showElement(".spinner")
    if (jobs) {
        cleanContainer("#container-jobs")
        setTimeout(() => {
            hideElement(".spinner")
            for (const { id, name, image, description, location, organitation, knowledge, membership, enmies } of jobs){
                $("#container-jobs").innerHTML += `
                <div class="flex flex-col items-center rounded-xl mb-12 p-4 w-80 backdrop-opacity-10 backdrop-invert bg-slate-200/50 drop-shadow-lg hover:scale-105">
                    <div class="container-img"><img src="${image}" class="object-cover h-48 w-96 "alt="${name}"></div>
                    <h4 class="text-2xl text-[#373737] font-bold mt-4 ">${name}</h4>
                    <p class="text-sm mt-2"> ${description}</p>
                    <button class="w-28 my-4 h-8 text-white  rounded-lg m-auto bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-sky-900 " onclick="openDetails('${id}')">Detalles</button>
                </div>
                `
            }
        }, 3000)
    }
}

getJobs()
