import { $, $$, urlParams, Render, SEL, Utils, Methods } from './modules.js'

// function mouse
const eventMouseMove = () => {
    Utils.showElement(SEL.eventMouse)
    document.addEventListener("mousemove", (e) => {
        let imagen = $(SEL.eventMouse);
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
    $(SEL.openFilterLocation).addEventListener("click", (e) => {
        e.preventDefault()
        Utils.hideElement(SEL.openFilterLocation)
        Utils.showElement(SEL.filterParamsLocation)
        Utils.showElement(SEL.openFilterMembership)
        Utils.hideElement(SEL.filterParamsMembership)
        Utils.showElement(SEL.openFilterKnowledge)
        Utils.hideElement(SEL.filterParamsKnowledge)
    })

    $(SEL.openFilterMembership).addEventListener("click", (e) => {
        e.preventDefault()
        Utils.hideElement(SEL.openFilterMembership)
        Utils.showElement(SEL.filterParamsMembership)
        Utils.showElement(SEL.openFilterLocation)
        Utils.hideElement(SEL.filterParamsLocation)
        Utils.showElement(SEL.openFilterKnowledge)
        Utils.hideElement(SEL.filterParamsKnowledge)
    })

    $(SEL.openFilterKnowledge).addEventListener("click", (e) => {
        e.preventDefault()
        Utils.hideElement(SEL.openFilterKnowledge)
        Utils.showElement(SEL.filterParamsKnowledge)
        Utils.showElement(SEL.openFilterMembership)
        Utils.hideElement(SEL.filterParamsMembership)
        Utils.showElement(SEL.openFilterLocation)
        Utils.hideElement(SEL.filterParamsLocation)
    })
}

$(SEL.submitJobs).addEventListener("click", (e) => {
    e.preventDefault()
    if(!Utils.validationForm()){
        setTimeout(() => {
            Utils.hideElement(".validation-text")
        }, 2000)
    } else {
       Utils.showElement(SEL.confirmAdd)
        setTimeout(() => {
            Methods.addJobs()
            Utils.hideElement(SEL.confirmAdd)
            } ,2000)
        
    }
})

$(SEL.openFormEdit).addEventListener("click", (e)=> {
    e.preventDefault()
    const jobId = $(SEL.openFormEdit).getAttribute("data-id")
    Methods.editedJobs(jobId)
})

//burguer menu
$(SEL.burguerMenu).addEventListener("click", (e) => {
    e.preventDefault();
    Utils.showElement(SEL.dropdown);
    Utils.showElement(SEL.closeBurguerMenu);
    Utils.hideElement(SEL.burguerMenu);
  });

  $(SEL.closeBurguerMenu).addEventListener("click", (e) => {
    e.preventDefault();
    Utils.showElement(SEL.burguerMenu);
    Utils.hideElement(SEL.dropdown);
    Utils.hideElement(SEL.closeBurguerMenu);
  });

// btn cancel add and cancel edit
$(SEL.btnCancel).addEventListener("click", () => {
    Utils.hideElement(".form")
    Utils.showElement(".hero")
    Utils.showElement(".search")
    Utils.showElement(".jobs")
})

// btn delete
$(SEL.btnDelete).addEventListener("click", () => {
    const jobId = $(SEL.openDeleteModal).getAttribute("data-id")
    Methods.deleteJobs(jobId)
})

$(SEL.urlImage).addEventListener("input", () => {
    const urlImage = $(SEL.urlImage).value
    $(SEL.imgJob).src = urlImage
})

// btn reset filters
$(SEL.resetFilter).addEventListener("click", (e) => {
    e.preventDefault()
    $(SEL.filterForm).reset()
    Utils.showElement(SEL.openFilterKnowledge)
    Utils.hideElement(SEL.filterParamsKnowledge)
    Utils.showElement(SEL.openFilterMembership)
    Utils.hideElement(SEL.filterParamsMembership)
    Utils.showElement(SEL.filterLocation)
    Utils.hideElement(SEL.filterParamsLocation)
    Methods.getJobs()
})

// filtersParams





$(SEL.filter).addEventListener("click", (e) => {
    e.preventDefault()
    Methods.getJobs(urlParams)
})

// checkbox
// limit of checkboxs



// Event check and disable
const chekDisable = () => {
for (const check of Utils.checkboxes) {
       check.addEventListener("change", () => {
            if (Utils.limitCheck().length === 3 ) {
                for(const check of Utils.checkboxes){
                    if(!check.checked) {
                        check.setAttribute("disabled", "")
                    }
                }
            } else {
                for (const check of Utils.checkboxes) {
                    check.removeAttribute("disabled", "")
                }
            }
        })   
    }  
}

window.addEventListener("load", () => {
    Methods.getJobs()
    Utils.openForm()
    disabledSelects()
    Utils.filterParams()
   
})


