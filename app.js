'use strict'


async function getDigimon(digimon) {

    const url = `https://digi-api.com/api/v1/digimon/${digimon}`

    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function preencherDigimon() {

    const digimon = document.getElementById('buscar').value
    const dadosDigimon = await getDigimon(digimon)

    //pesquisa atraves do id digimon e troca pelo id pesquisado
    document.getElementById('numeroDigimon').textContent = dadosDigimon.id
    //pesquisa atraves do nome do digimon e troca pelo nome pesquisado
    document.querySelector('.atributos h3').textContent = dadosDigimon.name
}

