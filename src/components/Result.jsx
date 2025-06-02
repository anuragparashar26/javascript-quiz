import React from "react";

const Result = ({ score, total }) => {
  return (
    <div id="result-box">
      <h2 id="score-text">🎉 You scored {score} out of {total}!</h2>
      <button onClick={() => location.reload()}>🔁 Retake Quiz</button>
    </div>
  );
};

export default Result;
