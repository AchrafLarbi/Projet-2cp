import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_QUIZ_ITEMS_BY_QUESTION_ID,
  GET_AVERAGE_TIME,
  GET_USER_BY_ID,
} from "../graphql";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useInterval } from "react-use";

function QuizStats({ quizID }) {
  const [showModal, setShowModal] = useState(false);

  const tableRef = useRef(null);

  const questionId = quizID;

  //uselazyquery
  const { data: quizItemsData, refetch: refetchQuizItems } = useQuery(
    GET_QUIZ_ITEMS_BY_QUESTION_ID,
    {
      variables: { questionId },
    }
  );

  const { data: averageData, refetch: refetchAverageData } = useQuery(
    GET_AVERAGE_TIME,
    {
      variables: { questionId },
    }
  );

  useInterval(() => {
    refetchQuizItems();
    refetchAverageData();
  }, 1000);
  // refresh every 1 seconds
  // kol 10 secs t3awd t3ytl usequery

  if (!quizItemsData || !averageData) {
    return <p>Loading...</p>;
  }

  const quizItems = quizItemsData.getQuizPropaByQuestionId.quizItems;
  const totalCount = quizItemsData.getQuizPropaByQuestionId.totalCount;

  const result = quizItems.reduce(
    (accumulator, item) => {
      if (item.correctAnswer === item.selectedAnswer) {
        accumulator.correctAnswers += 1;
      } else {
        accumulator.incorrectAnswers += 1;
      }
      return accumulator;
    },
    { correctAnswers: 0, incorrectAnswers: 0 }
  );

  const correctPercentage = (
    (result.correctAnswers / totalCount) *
    100
  ).toFixed(2);
  const incorrectPercentage = (
    (result.incorrectAnswers / totalCount) *
    100
  ).toFixed(2);
  const averageTime = averageData.getAverageTime.toFixed(2);

  const totalPercentage =
    parseFloat(correctPercentage) + parseFloat(incorrectPercentage);
  const doubledPercentage = (totalPercentage / 2).toFixed(2);

  console.log(doubledPercentage);

  console.log(quizItems);

  const UserData = ({ userId, item }) => {
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
      variables: { getUserByIdId: userId },
    });

    if (loading) {
      return <td>Loading...</td>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <>
        <td className="px-6 py-4">{data.getUserByID.email}</td>
        <td className="px-6 py-4">{item.selectedAnswer}</td>
        <td className="px-6 py-4">
          {item.correctAnswer === item.selectedAnswer ? (
            <span className="checkmark">
              <i className="fas fa-check-circle" style={{ color: "#27AE60" }}></i>
            </span>
          ) : (
            <span className="checkmark-wrong">
              <i className="fa fa-times-circle" style={{ color: "#AA0C0C" }}></i>
            </span>
          )}
        </td>
        
      </>
    );
  };

  return (
    <>
      <button
        className="bg-orange text-white   font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-[300px]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <i className="fas fa-list-alt px-2"></i>
        Live Answers
      </button>
      {showModal ? (
        <>
          <div className="justify-center p-5  items-center flex absolute top-5 inset-0 z-50 outline-none focus:outline-none">
            <div className="border-0  grid grid-rows-[3fr_1fr] relative  w-4/5 h-100 outline-none focus:outline-none">
              <div className="rounded-2xl grid bg-noun justify-center overflow-y-scroll px-8">
                <div className="justify-self-start mt-3">
                  <button
                    type="button"
                    class="text-white font-medium rounded-full text-sm p-2.5"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>

                    <span class="sr-only">Return</span>
                  </button>
                </div>
                <div className="grid grid-cols min-w-[800px] max-w-[800px]">
                  <div className="">
                    {quizItems.length ? (
                      <div>
                        <div>
                          <div className="flex flex-row text-white  justify-center lg:mt-4">
                            <h2>Question: {quizItems[0].question}</h2>
                          </div>
                        </div>

                        <div className="flex flex-row  justify-between">
                          <div className="flex flex-start m-10 h-20 w-20">
                            <div className="progress-item">



                            <CircularProgressbar
                                value={correctPercentage}
                                text={`${correctPercentage} %`}                                styles={buildStyles({
                                  pathColor: "#28a745",
                                  textColor: "#D9D9D9",
                                  trailColor: "#1D4C37",
                                })}
                              />
                           
                            </div>
                          </div>
                          <div className="grid grid-cols-3 grid-rows-2 gap-6 self-baseline text-center sm:mt-2 lg:mt-8 text-white">
                            <div className="flex  items-center justify-center    rounded text-center bg-grey px-2 py-2">
                              Total: {totalCount}
                            </div>
                            <div className="flex  rounded items-center justify-center rounded text-center bg-grey px-2 py-2">
                              Answer: {totalCount}
                            </div>
                            <div className="flex rounded items-center justify-center bg-grey px-2 py-2 row-span-2">
                              <div className="flex items-center">
                                <i className="far fa-clock"></i>
                              </div>
                              <div className="ml-2">
                                Time: {averageTime} min
                              </div>
                            </div>

                            <div className="  flex  rounded items-center justify-center rounded text-center bg-grey px-2 py-2">
                              Correct: {result.correctAnswers}
                            </div>

                            <div className="flex  rounded items-center justify-center  rounded text-center bg-grey px-2 py-2">
                              Wrong: {result.incorrectAnswers}
                            </div>
                          </div>
                        </div>
                        <div id="data" ref={tableRef} className="mb-10 justify-center items-center">
                          <table className="w-full table-auto text-white">
                            <tbody className="gap-5">
                              {quizItems.map((item, index) => (
                                <tr
                                  className="divide-y-6 divide-slate-500 mt-[5vh] border-b"
                                  key={item.id}
                                >
                                  <td className="px-6 py-4"> {index + 1}</td>

                                  {item.userid && (
                                    <UserData
                                      userId={item.userid}
                                      item={item}
                                    />
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-danger">No Answers Available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default QuizStats;
