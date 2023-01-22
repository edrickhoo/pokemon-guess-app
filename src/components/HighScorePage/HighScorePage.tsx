import { useEffect, useState } from "react";
import { getAllHighScores } from "../../api/highScoresApi";

const HighScorePage = () => {
  const [highScores, setHighScores] = useState<any>(null);

  useEffect(() => {
    getAllHighScores().then((res) => setHighScores(res));
  }, []);

  return (
    <div className="max-w-[400px] w-full mx-auto py-12 px-8">
      <div className="flex items-center border-b">
        <div className="flex-[4]">Name</div>
        <div className="flex-1 text-center">Score</div>
      </div>
      <div className="space-y-2">
        {highScores
          ? highScores.map((score: any, idx: number) => (
              <div key={idx} className="flex items-center">
                <div className="flex-[4]">{score.name}</div>
                <div className="flex-1 text-center">{score.score}</div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default HighScorePage;
