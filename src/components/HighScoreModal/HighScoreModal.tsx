import { highScoreData } from "../../api/highScoresApi";

interface props {
  score: number;
  highScores: highScoreData[];
  submitScore: () => void;
  setNameInput: React.Dispatch<React.SetStateAction<any>>;
  setHighScoreModal: React.Dispatch<React.SetStateAction<any>>;
}

const HighScoreModal = ({
  score,
  highScores,
  submitScore,
  setNameInput,
  setHighScoreModal,
}: props) => {
  return (
    <div>
      <div
        onClick={() => setHighScoreModal((prev: boolean) => !prev)}
        className="fixed top-0 z-10 left-0 h-[100vh] w-full bg-black/40"
      ></div>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-black py-8 px-8 rounded-md space-y-3">
        <div>
          <h3 className="text-center">High Scores</h3>
          <div className="flex items-center">
            <div className="flex-[4]">Name</div>
            <div className="flex-1">Score</div>
          </div>
          {highScores
            ? highScores.map((score: highScoreData, idx: number) => {
                return (
                  <div key={idx} className="flex items-center">
                    <div className="flex-[4]">{score.name}</div>
                    <div className="flex-1 text-center">{score.score}</div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="space-y-5">
          <div>
            <label htmlFor="">Name:</label>{" "}
            <input onChange={(e) => setNameInput(e.target.value)} type="text" />
          </div>
          <div className="flex justify-center items-center">
            <p>Score: {score}</p>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={submitScore}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighScoreModal;
