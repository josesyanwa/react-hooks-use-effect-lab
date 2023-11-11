import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    if (timeRemaining === 0) {
      // When time runs out
      setTimeRemaining(10); // Reset timer
      onAnswered(false); // Trigger behavior in the App component
    } else {
      // Set up a timer to decrease timeRemaining every second
      const timerId = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Clean up the timer when the component unmounts or when the question is answered
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [timeRemaining, onAnswered]); // Run the effect whenever timeRemaining or onAnswered changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
