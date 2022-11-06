const BASE_URL = "https://pokeapi.co/api/v2/pokemon"

export const fetchPokemonApi :any = async () => {
    let response = await fetch(`${BASE_URL}?limit=151`)
    let data = await response.json()
    return data.results
}

export const fetchSinglePokemonApi = async (id : number) => {
    let response = await fetch(`${BASE_URL}/${id}`)
    let data = await response.json()

    let organisedData = {
        id: data.id,
        img: data.sprites.front_default,
        name: data.name,
    }

    return organisedData
}