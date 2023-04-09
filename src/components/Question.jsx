import React from "react";
import Choice from "./Choice";

// component for each question to be rendered along with its options
const Question = ({ questionNo, question, options, onSubmit }) => {
    const handleOnChange = (qNo, oNo)=>{
        onSubmit((prev) => {
            const filtered = prev.filter(q => q.questionNo !== qNo)
            return [...filtered, {"questionNo": qNo, "optionNo": oNo}]
        })
    }
  return (
    <div className="question">
      <p>
        {questionNo + 1}. {question}
      </p>
      {options.map((opt, index) => (
        <Choice
          option={opt}
          optionNo={index}
          questionNo={questionNo}
          key={`${questionNo}-${index}`}
          handleOnChange={handleOnChange}
        />
      ))}
    </div>
  );
};

export default Question;
