'use strict'

async function getDigimon(digimon) {

    const url = `https://digi-api.com/api/v1/digimon/${digimon}`

    const response = await fetch(url)
    const data = await response.json()

    return data
}

function criarImagem(urlImagem, nomeDigimon) {

    const imagem = document.createElement('img')

    imagem.src = urlImagem
    imagem.alt = nomeDigimon

    return imagem
}

function criarField(field) {

    const div = document.createElement('div')

    div.classList.add('field')

    const nomeField = document.createElement('p')

    nomeField.textContent = field.field

    const imagemField = document.createElement('img')

    imagemField.src = field.image
    imagemField.alt = field.field

    div.appendChild(nomeField)
    div.appendChild(imagemField)

    return div
}

function preencherDescricao(dadosDigimon) {

    const descricaoIngles = dadosDigimon.descriptions.find(
        descricao => descricao.language === 'en_us' || descricao.language === 'en'
    )

    if (descricaoIngles) {

        document.getElementById('textoDescricao').textContent = descricaoIngles.description

    } else {

        document.getElementById('textoDescricao').textContent = 'Descrição não encontrada'
    }
}

async function preencherDigimon() {

    const digimon = document.getElementById('buscar').value

    const dadosDigimon = await getDigimon(digimon)

    document.getElementById('containerDigimon').style.display = 'flex'

    // id
    document.getElementById('numeroDigimon').textContent = dadosDigimon.id || 'Nâo encontrado'

    // nome
    document.getElementById('nomeDigimon').textContent = dadosDigimon.name || 'Nâo encontrado'

    // level
    document.getElementById('level').textContent = dadosDigimon.levels[0]?.level || 'Nâo encontrado'

    // attributes
    document.getElementById('attributes').textContent = dadosDigimon.attributes[0]?.attribute || 'Nâo encontrado'

    // type
    document.getElementById('type').textContent = dadosDigimon.types[0]?.type || 'Nâo encontrado'

    // release
    document.getElementById('release').textContent = dadosDigimon.releaseDate

    // imagem
    const imagem = criarImagem( dadosDigimon.images[0].href, dadosDigimon.name )

    document .getElementById('fotoDigimon').replaceChildren(imagem)

    // fields
    const fields = dadosDigimon.fields.map(criarField)

    document.getElementById('fieldsContainer').replaceChildren(...fields)

    preencherDescricao(dadosDigimon)
}

// abas
const secao1 = document.getElementById('secao1')
const secao2 = document.getElementById('secao2')
const secao3 = document.getElementById('secao3')

const abaDigimon = document.getElementById('abaDigimon')
const abaFields = document.getElementById('abaFields')
const abaDescricao = document.getElementById('abaDescricao')

function trocarAba(secaoAtiva, abaAtiva) {

    secao1.classList.remove('ativa')
    secao2.classList.remove('ativa')
    secao3.classList.remove('ativa')

    abaDigimon.classList.remove('ativaConteudo')
    abaFields.classList.remove('ativaConteudo')
    abaDescricao.classList.remove('ativaConteudo')

    secaoAtiva.classList.add('ativa')
    abaAtiva.classList.add('ativaConteudo')
}

secao1.addEventListener('click', function () {

    trocarAba(secao1, abaDigimon)
})

secao2.addEventListener('click', function () {

    trocarAba(secao2, abaFields)
})

secao3.addEventListener('click', function () {

    trocarAba(secao3, abaDescricao)
})

document
    .querySelector('button')
    .addEventListener('click', preencherDigimon)