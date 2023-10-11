// LoadData Function
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

            // Show More Card
            const seeMoreBtn = document.getElementById('see-more');
            if (tools.length === 6) {
                seeMoreBtn.classList.add('d-block');
                seeMoreBtn.classList.remove('d-none');
            }
            // Show More Card
            seeMoreBtn.onclick = () => {
                cardCount = toolsData.length;
                LoadData()
                seeMoreBtn.classList.add('d-none');
                seeMoreBtn.classList.remove('d-block');
            }
        })
};

const displayData = (data) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    data.forEach(elements => {
        const { image, name, description, published_in, features } = elements;
        console.log(elements);
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
                     <button onclick = "" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="fa-solid fa-arrow-right fs-3 text-danger"></i></button>
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









LoadData();