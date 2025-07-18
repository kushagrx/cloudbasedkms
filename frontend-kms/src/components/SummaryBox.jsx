import React from 'react';

function SummaryBox({ summary }) {
  return (
    <div className="card">
      <h3>Document Summary</h3>
      <p>{summary}</p>
    </div>
  );
}

export default SummaryBox;