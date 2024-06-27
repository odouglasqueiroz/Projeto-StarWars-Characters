let currentPageUrl1 = 'https://swapi.dev/api/planets/'

window.onload = async () => {
    try {
        await loadPlanets(currentPageUrl1);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar Planetas');
    }

    const nextButton1 = document.getElementById('next-button1')
    const backtButton1 = document.getElementById('back-button1')

    nextButton1.addEventListener('click', loadNextPage)
    backtButton1.addEventListener('click', loadPreviousPage)

};

async function loadPlanets(url) {
    const mainContent1 = document.getElementById('main-content1')
    mainContent1.innerHTML = ''; //limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planets) => {
            const card1 = document.createElement("div")
            card1.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')`
            card1.className = "cards1"

            const planetsNameBG = document.createElement("div")
            planetsNameBG.className = "planets-name-bg"

            const planetsName = document.createElement("span1")
            planetsName.className = "planets-name"
            planetsName.innerText = `${planets.name}`

            planetsNameBG.appendChild(planetsName)
            card1.appendChild(planetsNameBG)

            card1.onclick = () => {
                const modal1 = document.getElementById("modal1")
                modal1.style.visibility = "visible"

                const modalContent1 = document.getElementById("modal-content1")
                modalContent1.innerHTML = ''

                const planetsImage = document.createElement("div")
                planetsImage.style.backgroundImage =
                    `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')`
                planetsImage.className = "planets-image"

                const name = document.createElement("span1")
                name.className = "planets-details"
                name.innerText = `Nome: ${planets.name}`

                const rotation = document.createElement("span1")
                rotation.className = "planets-details"
                rotation.innerText = `Rotacao: ${planets.rotation_period}`

                const climate = document.createElement("span")
                climate.className = "planets-details"
                climate.innerText = `Clima: ${planets.climate}`

                const terrain = document.createElement("span")
                terrain.className = "planets-details"
                terrain.innerText = `Terreno: ${planets.terrain}`



                modalContent1.appendChild(planetsImage)
                modalContent1.appendChild(name)
                modalContent1.appendChild(rotation)
                modalContent1.appendChild(climate)
                modalContent1.appendChild(terrain)



            }

            mainContent1.appendChild(card1)
        });

        const nextButton1 = document.getElementById('next-button1')
        const backtButton1 = document.getElementById('back-button1')

        nextButton1.disabled = !responseJson.next
        backtButton1.disabled = !responseJson.previous

        backtButton1.style.visibility = responseJson.previous ? "visible" : "hidden"

        currentPageUrl1 = url

    } catch (error) {
        alert('Erro ao carregar os Personagens')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl1) return;

    try {
        const response = await fetch(currentPageUrl1)
        const responseJson = await response.json()

        await loadPlanets(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl1) return;

    try {
        const response = await fetch(currentPageUrl1)
        const responseJson = await response.json()

        await loadPlanets(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima anterior')
    }
}

function hideModal1() {
    const modal1 = document.getElementById("modal1")
    modal1.style.visibility = "hidden"
}
