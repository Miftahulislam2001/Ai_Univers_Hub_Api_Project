/* ------------------------------- Accuracy ------------------------------ */
const accuracyContainer = document.getElementById("accuracy-container")
function accuracyTagRemover() {
  document.getElementById("accuracy").remove();
  return "";
};

function accuracyTagAdder(score) {
  accuracyContainer.innerHTML = `<p class=" bg-danger p-2" id="accuracy">${score}</p>`;
}

/* ------------------------------ Load Card Data ------------------------------ */
let cardCount = 6;
const LoadData = () => {
    spinner(true)
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            let toolsData = data.data.tools;
            let tools = toolsData.slice(0, cardCount)
            displayData(tools)
            /* ------------------------------ Sort By Date ------------------------------ */
            const sortByDate = () =>{
                tools.sort(function(a, b){
                    return new Date(a.published_in) - new Date(b.published_in);
                })
            };
            const sortBtn = document.getElementById('sort-btn');
            sortBtn.addEventListener('click', ()=>{
                sortByDate();
                displayData(tools)
            })

            /* ------------------------------ Show More Card ------------------------------ */
            const seeMoreBtn = document.getElementById('see-more');
            if (tools.length === 6) {
                seeMoreBtn.classList.add('d-block');
                seeMoreBtn.classList.remove('d-none');
            }
            seeMoreBtn.onclick = () => {
                cardCount = toolsData.length;
                LoadData()
                seeMoreBtn.classList.add('d-none');
                seeMoreBtn.classList.remove('d-block');
            }
        })
};

/* ------------------------------- Display Card ------------------------------ */
const displayData = (data) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    data.forEach(elements => {
        const { image, name, description, published_in, features, id } = elements;
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="col">
        <div class="card h-100 p-3 mb-4">
            <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                    <div>
                        <ol>
                            <li>${features[0]}</li>
                            <li>${features[1]}</li>
                            <li>${features[2]}</li>
                        </ol>  
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <div>
                        <h4>${name}</h4>
                         <div class = "d-flex  justify-content-center align-items-center gap-2">
                         <i class="fa-solid fa-calendar-days"></i>
                         <p class="p-0 m-0">${published_in}</p>
                         </div>
                     </div>
                     <div>
                     <button onclick = "showModal('${id}')" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="fa-solid fa-arrow-right fs-3 text-danger"></i></button>
                     </div>  
                </div>
            </div>
    </div>
        `;
        cardContainer.appendChild(div);
    });
    spinner(false)
};

/* ------------------------------- Spinner Add ------------------------------ */
const spinner = (isLoading) => {
    if (isLoading) {
      document.getElementById("spinner-section").classList.remove("d-none");
    } else {
      document.getElementById("spinner-section").classList.add("d-none");
    }
};

/* ------------------------------- Show Modal ------------------------------ */
const showModal = (id) =>{
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(URL)
    .then(res => res.json())
    .then(data => {

        displayModal(data.data)
    })
};

/* ------------------------------- Display Modal ------------------------------ */
const displayModal = (singleData) =>{
    const {image_link, input_output_examples, description, pricing, features} = singleData;
    
    document.getElementById('modal-images').src = `${image_link[0]}`
    document.getElementById('modal-title').innerText = `${input_output_examples ? input_output_examples[0].input : 'Can You Give any Example ?'}`
    document.getElementById('modal-para').innerText = `${input_output_examples ? input_output_examples[0].output : 'No ! No Yet. Talk a Break'}`
    
    document.getElementById('modal-left-dec').innerText = `${description ? description : 'NO Description'}`
    document.getElementById('basic').innerText = `${pricing ? pricing[0].price : 'Free of Cost'}`
    document.getElementById('month-pro').innerText = `${pricing ? pricing[1].price : 'Free of Pro'}`
    document.getElementById('contact-us').innerText = `${pricing ? pricing[2].price : 'Free of Enterprise'}`
    `${singleData.accuracy.score ? accuracyTagAdder(singleData.accuracy.score * 100 + '% accuracy') : accuracyTagRemover()}`;

    document.getElementById('li-1').innerText = `${features[1].feature_name}`
    document.getElementById('li-2').innerText = `${features[2].feature_name}`
    document.getElementById('li-3').innerText = `${features[3].feature_name}`

    /* ------------------------------- Integration ------------------------------ */
    const integrations = document.getElementById("Integrations");
    integrations.innerHTML = "";
    const integrationsList = singleData.integrations ? integrationsAdder(singleData.integrations) : integrationsAdder("");
    function integrationsAdder(integrationsLists) {
      try {
        integrationsLists.forEach(integration => {
          integrations.innerHTML += `<li class="py-1">${integration}</li>`
        })
      } catch (err) {
        integrations.innerText = "No data found";
      }
    }
   

};


LoadData();