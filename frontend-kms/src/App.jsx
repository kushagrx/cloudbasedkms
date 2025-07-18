import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import SummaryBox from './components/SummaryBox';
import AskQuestion from './components/AskQuestion';

function App() {
  const [summary, setSummary] = useState('');
  const [fileName, setFileName] = useState('');
  const [answer, setAnswer] = useState('');

  return (
    <div className="container">
      <h1>📘 Knowledge Management System</h1>

      <FileUpload setSummary={setSummary} setFileName={setFileName} />
      {summary && <SummaryBox summary={summary} />}

      {fileName && <AskQuestion fileName={fileName} setAnswer={setAnswer} />}
      {answer && (
        <div className="answer-box">
          <h3>AI Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;