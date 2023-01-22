const BASE_URL = "http://localhost:8080/highscore";

export const getAllHighScores = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  return data;
};

export const postHighScore = async (data: any) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const postRes = await response.json();

  console.log(postRes);
  return postRes;
};
