const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const hideElement = (selector) => $(selector).classList.add('hidden')
const showElement = (selector) => $(selector).classList.remove('hidden')
const cleanContainer = (selector) => $(selector).innerHTML = ""

// function mouse
document.addEventListener("mousemove", (e) => {
    let imagen = $("#sombrero");
    let x = e.clientX;
    let y = e.clientY;
    imagen.style.left = (x + imagen.width / 2 ) + "px";
    imagen.style.top = (y + imagen.width / 2 ) + "px";
  });

const urlBase = "https://6483a556f2e76ae1b95cbbde.mockapi.io/jobs"

const getJobs = () => {
    fetch(urlBase)
    .then(response => response.json())
    .then(jobs => renderCardsJobs(jobs))
}
const getDetailsJobs = (id) => {
    fetch (`${urlBase}/${id}`)
    .then(response => response.json())
    .then(job => {
            renderJobsDetails(job)
            editJob(job)
    })
}

const addJobs = () => {
    fetch(urlBase, {
        method: "POST",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(saveJobs()),   // DATO QUE VAMOS A MANDAR
    })
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
            for (const { id, name, image, description, location, organitation, knowledge, membership, enmies } of jobs){
                $("#container-jobs").innerHTML += `
                <div class="flex flex-col items-center rounded-xl mb-12 p-4 w-80 backdrop-opacity-10 backdrop-invert bg-slate-200/50 drop-shadow-lg hover:scale-105">
                    <div class="container-img"><img src="${image}" class="object-cover h-48 w-96 "alt="${name}"></div>
                    <h4 class="text-2xl text-[#373737] font-bold mt-4 ">${name}</h4>
                    <p class="text-sm mt-2"> ${description}</p>
                    <button class="details-jobs w-28 my-4 h-8 text-white  rounded-lg m-auto bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-sky-900 " onclick="openDetails('${id}')">Detalles</button>
                </div>
                `
            }
        }, 3000)
    }
}

const renderJobsDetails = ({ id, name, image, description, descriptionDetails, salary, location, organitation, knowledge }) => {
    showElement(".spinner")
        setTimeout(() => {
            hideElement(".spinner")
            $(".card-details").innerHTML += `
                <div class="w-full md:w-1/4 flex pt-3 justify-center backdrop-filter-none">
                        <img src="${image}" class="object-cover w-64 h:52 md:w-52 md:h-80 " alt="${name}">
                    </div>
                    <div class="w-2/3 p-3">
                        <div class="name-details text-3xl text-[#373737] font-bold">${name}</div>
                        <div class="membership-details text-xl">${organitation.membership}</div>
                        <div class="description-details text-sm mt-2 "> ${description} ${descriptionDetails}</div>
                        <div class="location-details pt-3">Ubicación laboral: ${location}</div>
                        <div class="salary-details pt-3">Remuneración: ${salary} galeones</div>
                        <div class="knowledge-details text-base font-bold pt-3"> Debe tener conocomientos de: 
                            <ul class="text-base font-normal ">
                                <li>${knowledge[0]}</li>
                                <li>${knowledge[1]}</li>
                                <li>${knowledge[2]}</li>
                                <li>${knowledge[3]}</li>
                            </ul> 
                        </div>
                        <div class="enemies-details pt-3">Enemigos con quien debe pelear: ${organitation.enemies}</div>
                        <div class="container-btn-details flex justify-end pt-5">
                            <button class="open-edit-job px-3 rounded-lg mx-5 bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-teal-900 text-white" data-id=${id} onclick="openEdit(${id})">Editar</button>
                            <button class="delete-job px-3 rounded-lg bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-sky-900 text-white" data-id=${id}>Eliminar</button>
                        </div>
                    </div>
                `
            
        }, 3000)
        
        
        
    
}

// save jobs
const saveJobs = () =>{
    return {
        name: $("#name-job").value,
        image: "https://pm1.aminoapps.com/6875/45b11445c8860dc4385e7c09df22be149ca03155r1-512-384v2_hq.jpg",
        description: $("#description-job").value,
        location: $("#location").selected,
        organitation: {
                        intention: "Terminar con los Magos Oscuros",
                        membership: $("#membreship").selected,
                        enemies: "Mortífagos"
                    },
        salary: $("#salary").value,
        knowledge: [
            "Disimulo y Rastreo ",
            "Transformaciones",
            "Encantamientos",
            "Pociones"
            ],
        descriptionDetails: $("#description-details-job").value,
    }
}

// open

const openDetails = (id) => {
    hideElement(".hero")
    hideElement(".search")
    hideElement(".cards")
    // const idEditJob = $(".edit-job").setAttribute("data-id", id)
    // const idDeleteJob = $(".delete-job").setAttribute("data-id", id)
    // $(".delete-job"),addEventListener("click", deleteJobs(id))
    showElement(".jobs-details")
    getDetailsJobs(id)
    
}

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
        })
    }
    
}

const editJob = ({name, image, description, location, organitation, salary, knowledge, descriptionDetails}) => {
    $("#name-job").value = name
    $("#description-job").value = description
    $("#location").value = location
    //$("#membreship").selected = organitation.membership
    $("#salary").value = salary
    $("#description-details-job").value = descriptionDetails

}

$("#submit-jobs").addEventListener("click", (e) => {
    e.preventDefault()
    $("#form").reset()
    showElement("#confirm-add-jobs")
    setTimeout(() => {
        addJobs()
        hideElement("#confirm-add-jobs")
        } ,2000)
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



getJobs()
openForm()

