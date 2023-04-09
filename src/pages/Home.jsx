import React, { useEffect, useState } from "react";
import questions from "../../data/questions.json";
import Question from "../components/Question";
import ModeChoiceTable from "../components/ModeChoiceTable";

const Home = () => {
  const [answers, setAnswers] = useState([
    {
      questionNo: 1,
      optionNo: 0,
    },
    {
      questionNo: 0,
      optionNo: 4,
    },
  ]);
  const [showModeChoice, setShowModeChoice] = useState(true);

  useEffect(() => {
    document.title = showModeChoice
      ? "Mode choice"
      : "Respondent Travel profile";
  }, [showModeChoice]);

  const questionElements = questions.map((q, index) => (
    <Question
      question={q.question}
      options={q.choices}
      questionNo={index}
      onSubmit={setAnswers}
      key={q.question}
    />
  ));
  return (
    <div className="home">
      {showModeChoice ? (
        <div className="mode-choice">
          <ModeChoiceTable questions={questions} answers={answers} />
          <div className="btn-back">
            <button
              className="btn btn-primary m-3"
              disabled={!showModeChoice}
              onClick={() => {
                setShowModeChoice((prev) => !prev);
              }}
            >
              &lt; Back
            </button>
            {/* {JSON.stringify(answers)} */}
          </div>
        </div>
      ) : (
        <div>
          <h3>Respondent Travel profile</h3>
          {questionElements.length > 0 ? questionElements : null}
          <div className="btn-next">
            <button
              className="btn btn-primary m-3"
              disabled={answers.length <= 1}
              onClick={() => {
                setShowModeChoice((prev) => !prev);
              }}
            >
              Next &gt;
            </button>
            {/* {JSON.stringify(answers)} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
