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
    imagen.style.left = (x + imagen.width / 3 ) + "px";
    imagen.style.top = (y + imagen.width / 3 ) + "px";
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
    })//.finally(() => window.location.reload())
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
        }, 3000)
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
                        <div class="location-details pt-3">Ubicación laboral: ${location}</div>
                        <div class="salary-details pt-3">Remuneración: ${salary} galeones</div>
                        <div class="knowledge-details text-base font-bold pt-3"> Debe tener conocomientos de: 
                            <ul class="text-base font-normal ">
                                <li>${knowledge[0]}</li>
                                <li>${knowledge[1]}</li>
                                <li>${knowledge[2]}</li>
                            </ul> 
                        </div>
                        <div class="enemies-details pt-3 font-bold">Enemigos con quien debe pelear: <p class="font-normal"> ${organitation.enemies}<p></div>
                        <div class="container-btn-details flex justify-end pt-5">
                            <button class="open-edit-job px-3 rounded-lg mx-5 bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-teal-900 text-white" data-id=${id} onclick="openEdit(${id})">Editar</button>
                            <button class="delete-job px-3 rounded-lg bg-[#373737] hover:bg-gradient-to-r  hover:to-slate-600 hover:from-sky-900 text-white" data-id=${id} onclick="openModal(${id})">Eliminar</button>
                        </div>
                    </div>
                `
            
        }, 3000)
        
        
        
    
}

// function save jobs

const openModal = () => {
    showElement(".modal")
}


const saveJobs = () =>{

    return {
        name: $("#name-job").value,
        image: $("#url-img-job").value,
        description: $("#description-job").value,
        location: $("#location").value,
        membership:  $("#membership").value,
        organitation: {
                        intention: "Terminar con los Magos Oscuros",
                        enemies: "Mortífagos"
                    },
        salary: $("#salary").value,
        knowledge: [
            knowledge[0],
            knowledge[1],
            knowledge[2],
            ],
        descriptionDetails: $("#description-details-job").value,
    }
}

// open details jobs
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
        })
       
    }
   
}

const formJob = ({name, image, description, membership, location, organitation, salary, knowledge, descriptionDetails}) => {
    $("#name-job").value = name
    $("#description-job").value = description
    $("#location").selected = location
    $("#membership").value = membership
    $("#salary").value = salary
    $("#description-details-job").value = descriptionDetails
    $("#img-job").src = image
    knowledge[0].checked = knowledge
    knowledge[1].checked = knowledge
    knowledge[2].checked = knowledge
    $("#url-img-job").value = image
    checkedBoxes()
    console.log(knowledge.checked)
}

// checkbox

    

//const limit = 3; // Define el límite de checkboxes seleccionados


// for (let i = 0; i < checkboxes.length; i++) {
//   checkboxes[i].addEventListener("change", () => {
//       let checkedCount = 0
      
//         if(checkboxes[i].checked()){
//             checkedCount ++ 
//         }
//         if (checkedCount > limit) {
//             checkboxes[i].getAttribute("disabled", "") // Deselecciona el checkbox excedido
//             }
//   });
// }

$("#submit-jobs").addEventListener("click", (e) => {
    e.preventDefault()
    showElement("#confirm-add-jobs")
    setTimeout(() => {
        addJobs()
        hideElement("#confirm-add-jobs")
        
        } ,2000)
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

// checkbox

let knowledge = [];
let count = 0
let limit = 3
const checkboxes = document.getElementsByName("knowledge");
console.log(checkboxes)

const checkedBoxes = () => {
    for (let i = 0; i < checkboxes.length; i++) {
        const isCheck = checkboxes[i].checked
        console.log(isCheck)
        checkboxes[i].addEventListener("change", () => {
         //console.log(checkboxes[i])
         if (checkboxes[i].checked && knowledge.length < 3) {
             knowledge.push(checkboxes[i].value);
             count ++
        } else {
            checkboxes[i].checked = false
            checkboxes[i].disabled = true
            }
        console.log(knowledge)
     })   
 }  
}
     



/*
const toggleCheckbox = (checkbox) => {
    let checkedCount = 0;
  
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        knowledge.push(checkboxes[i].value)
        checkedCount++;
        console.log(knowledge)
      }
    }
  
    if (checkedCount > limit) {
      checkbox.checked = false; // Deselecciona el checkbox excedido
    }
  }
  
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", () => {
      toggleCheckbox(this);
    });
  }
  */ 



// const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//console.log(checkboxes)
    // const boxChecked = () => {
    //     let knowledge = []
    //     const checkBoxes = document.querySelectorAll('input[type="checkbox"]:checked')
    //     for (let i =0; i < checkBoxes.length; i++) {
    //         knowledge.push(checkBoxes[i].value)
    //         console.log(knowledge)
    //     }

    //     if (knowledge.length >= 3) {
    //         const allCheckboxes = document.querySelectorAll('input[type="checkbox"]')
    //         for (let i =0; i < allCheckboxes.length; i++) {
    //             if (!allCheckboxes[i].checked) {
    //                 allCheckboxes[i].disabled = true
    //             }
    //         }
            
            
    //     } else {
    //         const allCheckboxes = document.querySelectorAll('input[type="checkbox"]')
    //         for( let i = 0; i< allCheckboxes.length; i++) {
    //             allCheckboxes[i].disabled = false
    //         }
            
    //     }
    // }
    // const allCheckboxes = document.querySelectorAll('input[type="checkbox"]')
    // for (const btn of allCheckboxes){
    //     btn.addEventListener("change", () => {
    //         boxChecked()
    //     })
        
    // }
    
    // const allCheckboxes = document.querySelectorAll('input[type="checkbox"]')
    // allCheckboxes.addEventListener("cha")
    // for (let i = 0; i < checkboxes.length; i++) {
    // checkboxes[i].addEventListener("click", () => {
    //     console.log(checkboxes[i])
    //     if (checkboxes.length >= 3) {
            
    //         knowledge.push(checkboxes[i].value);
    //         count ++
    //       } else {
    //         checkboxes[i].checked = false
    //         checkboxes[i].disabled = true
    //       }

    //     console.log(knowledge)
    // })   
      

//}  
window.addEventListener("load", () => {
    getJobs()
    openForm()
})


