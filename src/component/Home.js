import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@apollo/client";
import { useInterval } from "react-use";
import { GET_QUIZ_QUESTIONS } from "../graphql";
import Side from "./sidebar";

import "../style.css";
import '../font.css';
import QuizStats from "./statistic";
import homeImage from "../images/home-img.png";

function QuizQuestionsList() {

  const { loading, error, data, refetch } = useQuery(GET_QUIZ_QUESTIONS);
  useInterval(() => {
    refetch();
  }, 1000);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (data && data.quizs) {
      setQuizQuestions(data.quizs);
    }
  }, [data]);

  const time = (date) => {
    const formattedDate = new Date(
      new Date(date).getTime() + 60 * 60 * 1000
    ).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Africa/Algiers",
    });
    return formattedDate;
  };
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [activeButton, setActiveButton] = useState("recent");


  const handleModuleSelect = (moduleName) => {
    setActiveButton("module");
    setSelectedModule(moduleName);
    setSelectedDate("");
  };

  const handleDateSelect = (date) => {
    setActiveButton("date");
    setSelectedModule("");
    setSelectedDate(date);
  };

  

  const handleQuestionClick = (questionId) => {
    if (selectedQuestionId === questionId) {
      setSelectedQuestionId(null);
    } else {
      setSelectedQuestionId(questionId);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{  window.location.reload()}</p>;

  const uniqueModules = [
    ...new Set(quizQuestions.map((quizQuestion) => quizQuestion.moduleName)),
  ];
  const filteredQuestions = selectedModule
    ? quizQuestions.filter(
        (quizQuestion) =>
          quizQuestion.moduleName.toLowerCase() === selectedModule.toLowerCase()
      )
    : quizQuestions;

  return (
    <body className="width-screen grid grid-cols-[1fr_6fr] max-h-screen overflow-auto bg-grey" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Side />
      <div className="grid grid-rows-[1fr_3fr] max-h-screen overflow-y-scroll">
        <div className="flex flex-col empty-div h-[300px]">
          <div className="flex flex-row basis-1/2">
          <h1>Hello, Oussama</h1>
          <p>Today is {formattedDate}</p>
          </div>
          <img className="flex image basis-1/2" src={homeImage} alt="home" />

          
        </div>
        <div className="roulogonded-t-3xl bg-dblack rounded-3xl px-10 py-5">
          <div className="button-container">
            <button
              className={`button ${activeButton === "recent" ? "active" : ""}`}
              onClick={() => setActiveButton("recent")}
              style={{ width: "150px", marginLeft: "50px" }}
            >
              Recent
            </button>
            <select
              className={`select ${activeButton === "module" ? "active" : ""}`}
              value={selectedModule}
              onChange={(e) => handleModuleSelect(e.target.value)}
              style={{ width: "150px" }}
            >
              <option value="">Module</option>
              {uniqueModules.map((moduleName) => (
                <option key={moduleName} value={moduleName}>
                  {moduleName}
                </option>
              ))}
            </select>
           
          </div>

          <div className=" divide-y-2 divide-slate-200 mt-[5vh] ">
            {filteredQuestions.length === 0 ? (
              <div>No questions available</div>
            ) : (
              filteredQuestions.map((quizQuestion) => (
                <div className="  container flex flex-col  h-fit">
                  <div className="mt-3">
                    <h5 className="text-white ">
                      {" "}
                      Module: {quizQuestion.moduleName}
                    </h5>
                  </div>
                  <div>
                    <h6 className="text-white">
                      Question date: {time(quizQuestion.createdAt)}
                    </h6>
                  </div>

                  <div
                    className="flex text-white bg-grey h-fit w-100 pl-[5vh] py-4 my-3 rounded-3xl hover:cursor-pointer"
                    onClick={() => handleQuestionClick(quizQuestion.id)}
                  >
                    <div className="flex-grow">
                      <h5>Question: {quizQuestion.question}</h5>
                    </div>
                    <div className="flex-shrink-0">
                      <i className="fas fa-angle-down mt-1 pr-10"></i>
                    </div>
                  </div>

                  {selectedQuestionId === quizQuestion.id && (
                    <div className="  grid grid-cols-2 gap-y-10 ">
                      <ul className="  grid grid-rows gap-y-10  decoration-1">
                        {Object.values(quizQuestion.propositions).map(
                          (proposition, index) => (
                            <div className="  ">
                              <li key={index}>
                                {quizQuestion.correctAnswer === proposition ? (
                                  <div className=" px-3 w-fit min-w-[100%]  flex h-fit  justify-start pt-2 bg-sabi   text-white   rounded  ">
                                    <p>
                                      {index + 1}. {proposition}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="  px-3 w-fit min-w-[100%]  h-fit flex justify-start pt-2 bg-dblack border  border-white text-white  rounded  ">
                                    <p className=" ">
                                      {index + 1}. {proposition}
                                    </p>
                                  </div>
                                )}
                              </li>
                            </div>
                          )
                        )}
                      </ul>
                      <div className="flex flex-col justify-self-end justify-center gap-y-10 text-white text-center mr-5">
                        <QuizStats quizID={quizQuestion.id} />
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </body>
  );
}

export default QuizQuestionsList;
