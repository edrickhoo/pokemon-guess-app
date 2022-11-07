import React, { useState, useEffect } from "react";
import { fetchPokemonApi, fetchSinglePokemonApi } from "../api/pokemonApi";

const GameContainer = () => {
  const [pokemonList, setPokemonList] = useState([{ name: "" }]);
  const [correctPokemon, setCorrectPokemon] = useState({ img: "", name: "" });
  const [score, setScore] = useState(0);
  const [guessOptions, setGuessOptions] = useState([]);
  const [timer, setTimer] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    fetchPokemonApi().then((data: any) => {
      setPokemonList(data);
      console.log("yo", data);
    });
  }, []);

  useEffect(() => {
    console.log(timer);
    if (timer <= 0) {
      clearInterval(timerInterval);
      setIsGameOver(true);
    }
  }, [timer]);

  function startTimerAndRound() {
    setScore(0);
    setTimer(30);
    clearInterval(setInterval(reduceTimer, 1000));
    startRound();
    console.log(2);

    let timerInterval = setInterval(reduceTimer, 1000);
    console.log(5);

    console.log(3);
  }

  function reduceTimer() {
    console.log(timer);
    if (timer == 0) {
      clearInterval(setInterval(reduceTimer, 1000));
      setIsGameOver(true);
    } else {
      setTimer((prev) => prev - 1);
    }
  }

  async function startRound() {
    let randomCorrectPokemon: number = Math.floor(Math.random() * 150 + 1);
    let data = await fetchSinglePokemonApi(randomCorrectPokemon);
    let tempGuessOptions = [];
    setCorrectPokemon(data);

    tempGuessOptions.push(data.name);

    while (tempGuessOptions.length < 4) {
      let random: number = getRandomPokemonNumber();
      console.log(random);
      if (
        pokemonList[random].name !== data.name &&
        !tempGuessOptions.includes(pokemonList[random].name)
      ) {
        tempGuessOptions.push(pokemonList[random].name);
      }
    }

    setGuessOptions(
      tempGuessOptions.sort(() => (Math.random() > 0.5 ? 1 : -1))
    );
    console.log(tempGuessOptions);
  }

  function getRandomPokemonNumber(): number {
    return Math.floor(Math.random() * 150 + 1);
  }

  const checkGuess = (pokemon: String) => {
    if (correctPokemon.name === pokemon) {
      setScore((prev) => prev + 1);
      startRound();
    } else {
      setIsGameOver(true);
    }
  };

  return (
    <div>
      <div>Score: {score}</div>
      <div>Timer: {timer}</div>
      <div>{isGameOver ? "GameOver" : null}</div>
      <button onClick={() => startTimerAndRound()}>Start</button>
      <div>
        <img src={correctPokemon.img} alt={correctPokemon.name} />
      </div>
      <div>
        {guessOptions?.map((item) => {
          return (
            <button
              disabled={isGameOver}
              onClick={() => {
                checkGuess(item);
              }}
              key={item}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameContainer;
