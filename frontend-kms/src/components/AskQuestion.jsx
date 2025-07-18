import React, { useState } from 'react';
import axios from 'axios';

function AskQuestion({ fileName, setAnswer }) {
  const [question, setQuestion] = useState('');

  const handleAsk = async () => {
    try {
      const res = await axios.post('http://localhost:5000/ask', {
        fileName,
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      alert('Question failed');
    }
  };

  return (
    <div className="card">
      <h3>Ask a Question</h3>
      <input
        type="text"
        placeholder="e.g. What is the document about?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAsk}>Ask</button>
    </div>
  );
}

export default AskQuestion;