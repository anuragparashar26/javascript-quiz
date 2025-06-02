import React from "react";

const Question = ({ question, selected, onOptionClick }) => {
  return (
    <>
      <h2 id="question">{question.question}</h2>
      <ul id="options">
        {question.options.map((opt, idx) => {
          let className = "";
          if (selected) {
            if (opt === question.correct) className = "correct";
            else if (opt === selected) className = "wrong";
          }
          return (
            <li
              key={idx}
              className={className}
              onClick={() => onOptionClick(opt)}
            >
              {opt}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Question;
