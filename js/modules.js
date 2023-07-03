export const $ = (selector) => document.querySelector(selector)
export const $$ = (selector) => document.querySelectorAll(selector)
export let urlParams = ""

export const SEL = {
    eventMouse: "#sombrero",
    openFilterLocation: "#open-select-location",
    filterParamsLocation: "#params-location",
    openFilterMembership: "#open-select-membership",
    filterParamsMembership: "#params-membership",
    openFilterKnowledge: "#open-select-knowledge",
    filterParamsKnowledge: "#params-knowledge",
    submitJobs: "#submit-jobs",
    confirmAdd: "#confirm-add-jobs",
    openFormEdit: "#edit-jobs",
    burguerMenu: "#btn-menu",
    dropdown: "#dropdown",
    closeBurguerMenu: "#btn-menu-close",
    btnCancel: "#cancel-job",
    btnDelete: "#btn-delete-job",
    openDeleteModal: ".delete-job",
    urlImage: "#url-img-job",
    imgJob: "#img-job",
    resetFilter: "#reset-filter",
    filterForm: "#form-filter",
    filter: "#filter-jobs",
    jobName: "#name-job",
    description: "#description-job",
    location: "#location",
    membership: "#membership",
    inputIntentions: "#intentions",
    inputEnemies: "#enemies",
    inputSalary: "#salary",
    descriptionDetails: "#description-details-job",
    openFormAdd: "#open-form",
    spinner: ".spinner",
    containerCards: ".cards",
    cardDetails: ".card-details",
    containerSearch: ".search",
    containerHero: ".hero",
    containerForm: ".form",
    detailsJobs: ".jobs-details",
    itemMenuSearch: "#item-search",
    itemMenuView: "#item-view",
    openDetails: ".details-jobs",
    editForm: ".open-edit-job",
    btnCloseModal: "#btn-close-modal-job",
    modalConfirm: ".modal"

}
export const Utils = {
    hideElement: (selector) => $(selector).classList.add('hidden'),
    showElement: (selector) => $(selector).classList.remove('hidden'),
    cleanContainer: (selector) => $(selector).innerHTML = "",
    urlBase: "https://6483a556f2e76ae1b95cbbde.mockapi.io/jobs",
    checkboxes: document.getElementsByName("knowledge"),
    validationForm: () => {
        const name =$(SEL.jobName).value
        const image = $(SEL.urlImage).value
        const description = $(SEL.description).value
        const location = $(SEL.location).value
        const membership =  $(SEL.membership).value
        const organitation = {
                    intention: $(SEL.inputIntentions).value,
                    enemies: $(SEL.inputEnemies).value
                    }
        const salary = $(SEL.inputSalary).value
        const knowledge = Utils.limitCheck()
            
        const descriptionDetails =  $(SEL.descriptionDetails).value
        
        // Realizar la validación
        if (!name || !image || !description || !location || !membership || !organitation.intention || !organitation.enemies || !salary || !knowledge || !descriptionDetails) {
            Utils.showElement(".validation-text")
            return false; 
            } else {
                return true
            }
        },
        
        openForm: () => {
            for (const btn of $$(SEL.openFormAdd)){
                btn.addEventListener("click", () => {
                    Utils.showElement(SEL.containerForm)
                    Utils.hideElement(SEL.containerHero)
                    Utils.hideElement(SEL.containerSearch)
                    Utils.hideElement(SEL.containerCards)
                    Utils.hideElement(SEL.spinner)
                    Utils.hideElement(SEL.openFormEdit)
                    Utils.hideElement(SEL.detailsJobs)
                    Utils.hideElement(SEL.dropdown);
                    Utils.hideElement(SEL.closeBurguerMenu);
                    Utils.hideElement(SEL.itemMenuSearch);
                    Utils.hideElement(SEL.itemMenuView);
                    Utils.hideElement(SEL.openFormAdd)
                    
                })
            }
        },
        saveJobs: () =>{
            return {
                name: $(SEL.jobName).value,
                image: $(SEL.urlImage).value,
                description: $(SEL.description).value,
                location: $(SEL.location).value,
                membership:  $(SEL.membership).value,
                organitation: {
                        intention: $(SEL.inputIntentions).value,
                        enemies: $(SEL.inputEnemies).value
                            },
                salary: $(SEL.inputSalary).value,
                knowledge: Utils.limitCheck(),
                descriptionDetails: $(SEL.descriptionDetails).value,
            }
        },
       
        
        formJob: ({name, image, description, membership, location, organitation, salary, knowledge, descriptionDetails}) => {
            $(SEL.jobName).value = name
            $(SEL.description).value = description
            $(SEL.location).value = location
            $(SEL.membership).value = membership
            $(SEL.inputSalary).value = salary
            $(SEL.descriptionDetails).value = descriptionDetails
            $(SEL.imgJob).src = image
            $(SEL.inputIntentions).value = organitation.intention
            $(SEL.inputEnemies).value = organitation.enemies
            $(SEL.urlImage).value = image
            for (const check of Utils.checkboxes){
                for (let i = 0; i < knowledge.length; i++){
                    if(knowledge[i] === check.value) {
                        check.checked = true
                    }
                }
            }
            for (const check of Utils.checkboxes) {
                if(Utils.limitCheck().length === 3 && check.checked === false) {
                    check.setAttribute("disabled", "")
                }
            }
            
        },
        filterParams: () => {
            $(SEL.filterParamsLocation).addEventListener("change",() => {
                const valorFilter = $(SEL.filterParamsLocation).value
                const urlParamsLocation = `location=${valorFilter}`
                if(valorFilter != "") {
                    return urlParams = urlParamsLocation
                } else {
                    return ""
                }
            })
            $(SEL.filterParamsMembership).addEventListener("change",() => {
                const valorFilter = $(SEL.filterParamsMembership).value
                const urlParamsLocation = `membership=${valorFilter}`
                if(valorFilter != "") {
                    return urlParams = urlParamsLocation
                } else {
                    return ""
                }
            })
            $(SEL.filterParamsKnowledge).addEventListener("change",() => {
                const valorFilter = $(SEL.filterParamsKnowledge).value
                const urlParamsLocation = `knowledge=${valorFilter}`
                if(valorFilter != "") {
                    return urlParams = urlParamsLocation
                } else {
                    return ""
                }
            })
        },
        limitCheck: () => {
            let arrayKnowledge = []
            for (const check of Utils.checkboxes) {
                check.checked && arrayKnowledge.length < 3 ? arrayKnowledge.push(check.value) : null;
            }
            return arrayKnowledge
        }

}

export const Methods = {
    getJobs: (params) => {
        fetch(`${Utils.urlBase}${params ? `?${params}` : ""}`)
        .then(response => response.json())
        .then(jobs => Render.cardsJobs(jobs))
    },
    getDetailsJobs: (id) => {
        fetch (`${Utils.urlBase}/${id}`)
        .then(response => response.json())
        .then(job => {
                Render.jobsDetails(job)
                Utils.formJob(job)
        })
    },
    addJobs: () => {
        fetch(`${Utils.urlBase}`, {
            method: "POST",
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(Utils.saveJobs()),   // DATO QUE VAMOS A MANDAR
        }).finally(() => window.location.reload())
    },
    
    editedJobs: (id) => {
        fetch(`${Utils.urlBase}/${id}`, {
            method: "PUT",
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(Utils.saveJobs()),   // DATO QUE VAMOS A MANDAR
        }).finally(() => window.location.reload())
    },
    deleteJobs: (id) => {
        fetch(`${Utils.urlBase}/${id}`, {
            method: "DELETE",
        }).finally(() => window.location.reload())
    }
}

export const Render = {
    cardsJobs: (jobs) => {
        Utils.showElement(SEL.spinner)
        if (jobs) {
            Utils.cleanContainer("#container-jobs")
            setTimeout(() => {
                Utils.hideElement(SEL.spinner)
                for (const { id, name, image, description } of jobs){
                    $("#container-jobs").innerHTML += `
                    <div class="flex flex-col items-center rounded-xl mb-12 p-4 w-80 backdrop-opacity-10 backdrop-invert bg-slate-200/50 drop-shadow-lg hover:scale-105">
                        <div class="container-img"><img src="${image}" class="object-cover h-48 w-96 "alt="${name}"></div>
                        <h4 class="text-2xl text-[#373737] font-bold mt-4 ">${name}</h4>
                        <p class="text-sm mt-2"> ${description}</p>
                        <button class="details-jobs w-28 my-4 h-8 text-white  rounded-lg m-auto bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-sky-900" data-id="${id}" >Detalles</button>
                    </div>
                    `
                    for (const btn of $$(SEL.openDetails)) {
                        btn.addEventListener("click", () => {
                            const jobId = btn.getAttribute("data-id")
                            Utils.hideElement(SEL.containerHero)
                            Utils.hideElement(SEL.containerSearch)
                            Utils.hideElement(SEL.containerCards)
                            Utils.showElement(SEL.detailsJobs)
                            Methods.getDetailsJobs(jobId)
                            Utils.hideElement(SEL.burguerMenu)
                            Utils.hideElement(SEL.itemMenuSearch);
                            Utils.hideElement(SEL.itemMenuView);
                            Utils.hideElement(SEL.openFormAdd)
                        })
                    }  
                }
                
            }, 2000)
        }
        
    },
    jobsDetails: ({ id, name, image, description, membership, descriptionDetails, salary, location, organitation, knowledge }) => {
        Utils.showElement(SEL.spinner)
            setTimeout(() => {
                Utils.hideElement(SEL.spinner)
                $(SEL.cardDetails).innerHTML += `
                    <div class="w-full md:w-1/4 flex pt-3 justify-center backdrop-filter-none">
                            <img src="${image}" class="object-cover w-64 h:52 md:w-52 md:h-80 " alt="${name}">
                        </div>
                        <div class="w-2/3 p-3">
                            <div class="name-details text-3xl text-[#373737] font-bold">${name}</div>
                            <div class="membership-details text-xl">${membership}</div>
                            <div class="description-details text-sm mt-2 "> ${description} ${descriptionDetails}</div>
                            <div class="location-details pt-3 font-bold">Ubicación laboral: <p class="font-normal">${location}</p></div>
                            <div class="salary-details pt-3 font-bold">Remuneración: <p class="font-normal">${salary} galeones</p></div>
                            <div class="enemies-details pt-3 font-bold">Intenciones: <p class="font-normal"> ${organitation.intention}<p></div>
                            <div class="enemies-details pt-3 font-bold">Enemigos con quien debe pelear: <p class="font-normal"> ${organitation.enemies}<p></div>
                            <div class="knowledge-details text-base font-bold pt-3"> Debe tener conocomientos de: 
                                <ul class="text-base font-normal ">
                                    <li>${knowledge[0]}</li>
                                    <li>${knowledge[1]}</li>
                                    <li>${knowledge[2]}</li>
                                </ul> 
                            </div>
                            <div class="container-btn-details flex justify-end pt-5">
                                <button class="open-edit-job px-3 rounded-lg mx-5 bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-teal-900 text-white" data-id=${id} >Editar</button>
                                <button class="delete-job px-3 rounded-lg bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-sky-900 text-white" data-id=${id} >Eliminar</button>
                            </div>
                        </div>
                    `
                for(const btn of $$(SEL.editForm)) {
                    btn.addEventListener("click", ()=>{
                        Utils.showElement(SEL.containerForm)
                        Utils.hideElement(SEL.detailsJobs)
                        Utils.hideElement(SEL.submitJobs)
                        Utils.showElement(SEL.openFormEdit)
                        $(SEL.openFormEdit).setAttribute("data-id", id)
                    })
                }
                for (const btn of $$(SEL.openDeleteModal)) {
                    btn.addEventListener("click", () => {
                        $(SEL.btnDelete).setAttribute("data-id", id)
                        Utils.showElement(SEL.modalConfirm)
                    })
                for (const btn of $$(SEL.btnCloseModal)) {
                    btn.addEventListener("click", () => {
                        Utils.hideElement(SEL.modalConfirm)
                    })
                }
                    
                }
            }, 2000)
    },
}