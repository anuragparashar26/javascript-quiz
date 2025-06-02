import React, { useEffect, useState } from "react";
import { quizData } from "../data/quizData";
import Question from "./Question";
import Result from "./Result";

const TOTAL_QUESTIONS = 10;

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const shuffled = quizData.sort(() => 0.5 - Math.random()).slice(0, TOTAL_QUESTIONS);
    setQuestions(shuffled);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) handleNext();
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === questions[current].correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (current + 1 < TOTAL_QUESTIONS) {
      setCurrent(current + 1);
      setSelected(null);
      setTimeLeft(15);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) return <p>Loading...</p>;
  if (showResult) return <Result score={score} total={TOTAL_QUESTIONS} />;

  return (
    <>
      <div className="header">
        <h1>🚀 Quiz App</h1>
        <div id="progress">
          <span id="question-number">{current + 1}/{TOTAL_QUESTIONS}</span>
          <div className="bar">
            <div id="bar-fill" style={{ width: `${((current + 1) / TOTAL_QUESTIONS) * 100}%` }}></div>
          </div>
        </div>
        <div id="timer">⏱ {timeLeft}</div>
      </div>

      <div id="quiz-box">
        <Question
          question={questions[current]}
          selected={selected}
          onOptionClick={handleOptionClick}
        />
        <button id="next" disabled={!selected} onClick={handleNext}>
          Next ➡️
        </button>
      </div>
    </>
  );
};

export default Quiz;
