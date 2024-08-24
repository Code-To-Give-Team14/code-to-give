import React, { useState } from 'react';

const QuizForm = () => {
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: "Paris",
    },
    {
      id: 2,
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: "4",
    },
    {
      id: 3,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: "Mars",
    },
  ];

  const handleChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        score++;
      }
    });
    alert(`You scored ${score} out of ${questions.length}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '10px' }}>{q.question}</h3>
          {q.options.map(option => (
            <div key={option} style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => handleChange(q.id, option)}
                  style={{ display: 'none' }}
                />
                <span style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  border: '2px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: answers[q.id] === option ? 'lightgreen' : 'white',
                  transition: 'background-color 0.3s',
                }}>
                  {option}
                </span>
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit" style={{
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '8px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}>
        Submit
      </button>
    </form>
  );
};

export default QuizForm;