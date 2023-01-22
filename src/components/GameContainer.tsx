import React, { useState, useEffect } from "react";
import { getAllHighScores, postHighScore } from "../api/highScoresApi";
import {
  fetchPokemonApi,
  fetchSinglePokemonApi,
  Pokemon,
} from "../api/pokemonApi";
import HighScoreModal from "./HighScoreModal/HighScoreModal";

const GameContainer = () => {
  const [pokemonList, setPokemonList] = useState([{ name: "" }]);
  const [correctPokemon, setCorrectPokemon] = useState<Pokemon | null>(null);
  const [score, setScore] = useState<number>(0);
  const [guessOptions, setGuessOptions] = useState<string[]>([]);
  const [timer, setTimer] = useState<number | undefined>(30);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [inter, setInter] = useState<any>(null);
  const [highScoreModal, setHighScoreModal] = useState<boolean>(false);
  const [highScores, setHighScores] = useState<any>(null);
  const [nameInput, setNameInput] = useState<String>("");

  useEffect(() => {
    fetchPokemonApi().then((data: any) => {
      setPokemonList(data);
      console.log("yo", data);
    });
  }, []);

  useEffect(() => {
    console.log(timer);
  }, [timer]);

  function startTimerAndRound() {
    setScore(0);
    setTimer(5);
    startRound();
    const intId = setInterval(() => {
      setTimer((timer: any) => {
        if (timer === 0) {
          clearInterval(intId);
          fetchAndSetHighScore();
          setHighScoreModal(true);
          setIsGameOver(true);
          setTimer(0);
          return;
        }
        return timer - 1;
      });
    }, 1000);
    setInter(intId);
  }

  const fetchAndSetHighScore = async () => {
    try {
      const data = await getAllHighScores();
      setHighScores(data);
    } catch (e) {
      console.log(e);
    }
  };

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

  const submitScore = async () => {
    try {
      const data = {
        name: nameInput || "",
        score: score || 0,
      };

      const response = await postHighScore(data);
      console.log(response);

      fetchAndSetHighScore();

      setHighScoreModal(!HighScoreModal);
    } catch (e) {
      console.log(e);
    }
  };

  const checkGuess = (pokemon: string) => {
    if (correctPokemon?.name === pokemon) {
      setScore((prev) => prev + 1);
      startRound();
    } else {
      setIsGameOver(true);
    }
  };

  return (
    <main>
      <div>Score: {score}</div>
      <div>Timer: {timer}</div>
      <div>{isGameOver ? "GameOver" : null}</div>
      <button onClick={() => startTimerAndRound()}>Start</button>
      <div>
        {/* back out img at 10 score */}
        <img
          className={`${score > 9 ? "brightness-0" : null}`}
          src={score < 4 ? correctPokemon?.img : correctPokemon?.img_shiny}
          alt={correctPokemon?.name}
        />
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
      {highScoreModal ? (
        <HighScoreModal
          highScores={highScores}
          score={score}
          setNameInput={setNameInput}
          setHighScoreModal={setHighScoreModal}
          submitScore={submitScore}
        />
      ) : null}
    </main>
  );
};

export default GameContainer;
