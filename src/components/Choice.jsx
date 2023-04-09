import React from "react";

const Choice = ({ questionNo, optionNo, option, handleOnChange }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name={`question-${questionNo}`}
        id={`question-${questionNo}-option${optionNo}`}
        value={optionNo}
        onChange={() => handleOnChange(questionNo, optionNo)}
      />
      <label
        className="form-check-label"
        htmlFor={`question-${questionNo}-option${optionNo}`}
      >
        {option}
      </label>
    </div>
  );
};

export default Choice;
