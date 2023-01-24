const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemonApi = async () => {
  let response = await fetch(`${BASE_URL}?limit=151`);
  let data = await response.json();
  return data.results;
};
export type Pokemon = {
  id: string;
  img: string;
  name: string;
  img_shiny: string;
};
export const fetchSinglePokemonApi = async (id: number): Promise<Pokemon> => {
  let response = await fetch(`${BASE_URL}/${id}`);
  let data = await response.json();

  let organisedData = {
    id: data.id,
    img: data.sprites.front_default,
    name: data.name,
    img_shiny: data.sprites.front_shiny,
  };

  return organisedData;
};
