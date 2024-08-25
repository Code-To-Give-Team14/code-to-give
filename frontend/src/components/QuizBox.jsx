import React, { useState } from 'react';

const QuizForm = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is a common activity during family reunions?",
      options: ["Board games", "Skydiving", "Scuba diving", "Bungee jumping"],
      correct: "Board games"
    },
    {
      id: 2,
      question: "What is often shared at family gatherings?",
      options: ["Secrets", "Food", "Cars", "Computers"],
      correct: "Food"
    },
    {
      id: 3,
      question: "Which holiday is commonly associated with family gatherings?",
      options: ["Halloween", "Thanksgiving", "Labor Day", "Columbus Day"],
      correct: "Thanksgiving"
    }
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
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      {questions.map((q, index) => (
        <div key={q.id} style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '10px' }}>
            {index + 1}. {q.question}
          </h3>
          {q.options.map((option, i) => (
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
                  {String.fromCharCode(97 + i)}. {option}
                </span>
              </label>
            </div>
          ))}
        </div>
      ))}
      <button 
        type="submit" 
        style={{
          width: "140px",
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          backgroundColor: submitted ? 'white' : "#4CAF50",
          color: submitted ? 'black' : "white",
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
      >
        {submitted ? 'Submitted' : 'Submit'}
      </button>
    </form>
  );
};

export default QuizForm;