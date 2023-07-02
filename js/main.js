const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const hideElement = (selector) => $(selector).classList.add('hidden')
const showElement = (selector) => $(selector).classList.remove('hidden')
const cleanContainer = (selector) => $(selector).innerHTML = ""

const urlBase = "https://6483a556f2e76ae1b95cbbde.mockapi.io/jobs"

const checkboxes = document.getElementsByName("knowledge");

// function mouse
const eventMouseMove = () => {
    showElement("#sombrero")
    document.addEventListener("mousemove", (e) => {
        let imagen = $("#sombrero");
        let x = e.clientX;
        let y = e.clientY;
        imagen.style.left = (x + imagen.width / 3 ) + "px";
        imagen.style.top = (y + imagen.width / 3 ) + "px";
      });
}
if (!/Mobi|Android/i.test(navigator.userAgent)) {
    eventMouseMove();
  }

// funtion auxiliar disbles selects
const disabledSelects = () => {
    $("#open-select-location").addEventListener("click", (e) => {
        e.preventDefault()
        hideElement("#open-select-location")
        showElement("#params-location")
        showElement("#open-select-membership")
        hideElement("#params-membership")
        showElement("#open-select-knowledge")
        hideElement("#params-knowledge")
    })

    $("#open-select-membership").addEventListener("click", (e) => {
        e.preventDefault()
        hideElement("#open-select-membership")
        showElement("#params-membership")
        showElement("#open-select-location")
        hideElement("#params-location")
        showElement("#open-select-knowledge")
        hideElement("#params-knowledge")
    })

    $("#open-select-knowledge").addEventListener("click", (e) => {
        e.preventDefault()
        hideElement("#open-select-knowledge")
        showElement("#params-knowledge")
        showElement("#open-select-membership")
        hideElement("#params-membership")
        showElement("#open-select-location")
        hideElement("#params-location")
    })
}

const getJobs = (params) => {
    fetch(`${urlBase}${params ? `?${params}` : ""}`)
    .then(response => response.json())
    .then(jobs => renderCardsJobs(jobs))
}
const getDetailsJobs = (id) => {
    fetch (`${urlBase}/${id}`)
    .then(response => response.json())
    .then(job => {
            renderJobsDetails(job)
            formJob(job)
    })
}

const addJobs = () => {
    fetch(`${urlBase}`, {
        method: "POST",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(saveJobs()),   // DATO QUE VAMOS A MANDAR
    }).finally(() => window.location.reload())
}
const editedJobs = (id) => {
    fetch(`${urlBase}/${id}`, {
        method: "PUT",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(saveJobs()),   // DATO QUE VAMOS A MANDAR
    }).finally(() => window.location.reload())
}

const deleteJobs = (id) => {
    fetch(`${urlBase}/${id}`, {
        method: "DELETE",
    }).finally(() => window.location.reload())
}

// renders 
const renderCardsJobs = (jobs) => {
    showElement(".spinner")
    if (jobs) {
        cleanContainer("#container-jobs")
        setTimeout(() => {
            hideElement(".spinner")
            for (const { id, name, image, description } of jobs){
                $("#container-jobs").innerHTML += `
                <div class="flex flex-col items-center rounded-xl mb-12 p-4 w-80 backdrop-opacity-10 backdrop-invert bg-slate-200/50 drop-shadow-lg hover:scale-105">
                    <div class="container-img"><img src="${image}" class="object-cover h-48 w-96 "alt="${name}"></div>
                    <h4 class="text-2xl text-[#373737] font-bold mt-4 ">${name}</h4>
                    <p class="text-sm mt-2"> ${description}</p>
                    <button class="details-jobs w-28 my-4 h-8 text-white  rounded-lg m-auto bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-sky-900 " onclick="openDetails('${id}')">Detalles</button>
                </div>
                `
            }
        }, 2000)
    }
}

const renderJobsDetails = ({ id, name, image, description, membership, descriptionDetails, salary, location, organitation, knowledge }) => {
    showElement(".spinner")
        setTimeout(() => {
            hideElement(".spinner")
            $(".card-details").innerHTML += `
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
                            <button class="open-edit-job px-3 rounded-lg mx-5 bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-teal-900 text-white" data-id=${id} onclick="openEdit(${id})">Editar</button>
                            <button class="delete-job px-3 rounded-lg bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-sky-900 text-white" data-id=${id} onclick="openModal(${id})">Eliminar</button>
                        </div>
                    </div>
                `
            
        }, 2000)
}


const openModal = () => {
    showElement(".modal")
}
// validation
const validationForm = () => {
    const name =$("#name-job").value
    const image = $("#url-img-job").value
    const description = $("#description-job").value
    const location = $("#location").value
    const membership =  $("#membership").value
    const organitation = {
                    intention: $("#intentions").value,
                    enemies: $("#enemies").value
                }
    const salary = $("#salary").value
    const knowledge = limitCheck()
        
    const descriptionDetails =  $("#description-details-job").value

// Realizar la validación
if (!name || !image || !description || !location || !membership || !organitation.intention || !organitation.enemies || !salary || !knowledge || !descriptionDetails) {
    showElement(".validation-text")
    return false; // Retorna null si la validación falla
    } else {
        return true
    }
}
// function save jobs
const saveJobs = () =>{
    return {
        name: $("#name-job").value,
        image: $("#url-img-job").value,
        description: $("#description-job").value,
        location: $("#location").value,
        membership:  $("#membership").value,
        organitation: {
                        intention: $("#intentions").value,
                        enemies: $("#enemies").value
                    },
        salary: $("#salary").value,
        knowledge: limitCheck(),
        descriptionDetails: $("#description-details-job").value,
    }
}

// open details jobs
const openDetails = (id) => {
    hideElement(".hero")
    hideElement(".search")
    hideElement(".cards")
    showElement(".jobs-details")
    getDetailsJobs(id)
    hideElement("#items-menu")
}

//open form 
const openForm = () => {
    for (const btn of $$("#open-form")){
        btn.addEventListener("click", () => {
            showElement(".form")
            hideElement(".hero")
            hideElement(".search")
            hideElement(".cards")
            hideElement(".spinner")
            hideElement("#edit-jobs")
            hideElement(".jobs-details")
            hideElement("#dropdown");
            hideElement("#btn-menu-close");
        })
    }
}

// formulary Jobs
const formJob = ({name, image, description, membership, location, organitation, salary, knowledge, descriptionDetails}) => {
    $("#name-job").value = name
    $("#description-job").value = description
    $("#location").value = location
    $("#membership").value = membership
    $("#salary").value = salary
    $("#description-details-job").value = descriptionDetails
    $("#img-job").src = image
    $("#intentions").value = organitation.intention
    $("#enemies").value = organitation.enemies
    $("#url-img-job").value = image
    for (const check of checkboxes){
        for (let i = 0; i < knowledge.length; i++){
            if(knowledge[i] === check.value) {
                check.checked = true
            }
        }
    }
    for (const check of checkboxes) {
        if(limitCheck().length === 3 && check.checked === false) {
            check.setAttribute("disabled", "")
        }
    }
    
}


$("#submit-jobs").addEventListener("click", (e) => {
    e.preventDefault()
    if(!validationForm()){
        setTimeout(() => {
            hideElement(".validation-text")
        }, 2000)
    } else {
       showElement("#confirm-add-jobs")
        setTimeout(() => {
            addJobs()
            hideElement("#confirm-add-jobs")
            } ,2000)
        
    }
})

$("#edit-jobs").addEventListener("click", (e)=> {
    e.preventDefault()
    const jobId = $("#edit-jobs").getAttribute("data-id")
    editedJobs(jobId)
})

//burguer menu
$("#btn-menu").addEventListener("click", (e) => {
    e.preventDefault();
    showElement("#dropdown");
    showElement("#btn-menu-close");
    hideElement("#btn-menu");
  });

  $("#btn-menu-close").addEventListener("click", (e) => {
    e.preventDefault();
    showElement("#btn-menu");
    hideElement("#dropdown");
    hideElement("#btn-menu-close");
  });

// btn edit
const openEdit = (id) => {
    showElement(".form")
    hideElement(".jobs-details")
    hideElement("#submit-jobs")
    showElement("#edit-jobs")
    $("#edit-jobs").setAttribute("data-id", id)
    
}

// btn cancel add and cancel edit
$("#cancel-job").addEventListener("click", () => {
    hideElement(".form")
    showElement(".hero")
    showElement(".search")
    showElement(".jobs")
})

// btn delete
$("#btn-delete-job").addEventListener("click", () => {
    const jobId = $(".delete-job").getAttribute("data-id")
    deleteJobs(jobId)
})

$("#url-img-job").addEventListener("input", () => {
    const urlImage = $("#url-img-job").value
    $("#img-job").src = urlImage
})

// btn reset filters
$("#reset-filter").addEventListener("click", (e) => {
    e.preventDefault()
    $("#form-filter").reset()
    showElement("#open-select-knowledge")
    hideElement("#params-knowledge")
    showElement("#open-select-membership")
    hideElement("#params-membership")
    showElement("#open-select-location")
    hideElement("#params-location")
    getJobs()
})

// filtersParams

let urlParams = ""
const filterParams = () => {
    $("#params-location").addEventListener("change",() => {
        const valorFilter = $("#params-location").value
        const urlParamsLocation = `location=${valorFilter}`
        if(valorFilter != "") {
            return urlParams = urlParamsLocation
        } else {
            return ""
        }
    })
    $("#params-membership").addEventListener("change",() => {
        const valorFilter = $("#params-membership").value
        const urlParamsLocation = `membership=${valorFilter}`
        if(valorFilter != "") {
            return urlParams = urlParamsLocation
        } else {
            return ""
        }
    })
    $("#params-knowledge").addEventListener("change",() => {
        const valorFilter = $("#params-knowledge").value
        const urlParamsLocation = `knowledge=${valorFilter}`
        if(valorFilter != "") {
            return urlParams = urlParamsLocation
        } else {
            return ""
        }
    })
}


$("#filter-jobs").addEventListener("click", (e) => {
    e.preventDefault()
    getJobs(urlParams)
})

// checkbox
// limit of checkboxs
const limitCheck = () => {
    let arrayKnowledge = []
    for (const check of checkboxes) {
        check.checked && arrayKnowledge.length < 3 ? arrayKnowledge.push(check.value) : null;
    }
    return arrayKnowledge
}


// Event check and disable
    for (const check of checkboxes) {
       check.addEventListener("change", () => {
            if (limitCheck().length === 3 ) {
                for(const check of checkboxes){
                    if(!check.checked) {
                        check.setAttribute("disabled", "")
                    }
                }
            } else {
                for (const check of checkboxes) {
                    check.removeAttribute("disabled", "")
                }
            }
        })   
    }  

    // const validationForm = () => {
    //     if (($("#url-img-job") === "") ||  ($("#name-job") === "")) {
    //         showElement(".validation-text")
    //         return false
    //     }
        
    // }

window.addEventListener("load", () => {
    getJobs()
    openForm()
    disabledSelects()
    filterParams()
   
})


