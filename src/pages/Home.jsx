import React, { useEffect, useState } from "react";
import questions from "../../data/questions.json";
import Question from "../components/Question";
import ModeChoiceTable from "../components/ModeChoiceTable";

const Home = () => {
  // initialize state for answers as an empty array
  const [answers, setAnswers] = useState([]);

  // initialize state for showModeChoice as false
  const [showModeChoice, setShowModeChoice] = useState(false);

  // set document title based on showModeChoice state
  useEffect(() => {
    document.title = showModeChoice
      ? "Mode choice"
      : "Respondent Travel profile";
  }, [showModeChoice]);

  // map questions to Question component
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
