import React, {useState, useEffect} from 'react'
import { fetchPokemonApi, fetchSinglePokemonApi } from '../api/pokemonApi'


const GameContainer = () => {
const [pokemonList, setPokemonList] = useState([])
const [correctPokemon, setCorrectPokemon] = useState({img: "", name: ""})

useEffect(() => {
    fetchPokemonApi().then((data: any) => {
        setPokemonList(data)
        console.log("yo", data)
    })

    startRound()
}, [])
    

    async function startRound () {
        let randomCorrectPokemon : number = Math.floor((Math.random() * 150) + 1 )
        let data = await fetchSinglePokemonApi(randomCorrectPokemon)

        setCorrectPokemon(data)
        console.log(data)
    }


  return (
    <div>
        <button onClick={() =>startRound()}>Start</button>
        <div>
            <img src={correctPokemon.img} alt={correctPokemon.name} />
        </div>
        <div></div>

    </div>
  )
}

export default GameContainer