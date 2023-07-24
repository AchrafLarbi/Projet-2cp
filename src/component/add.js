/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { GET_QUIZ_QUESTIONS, CREATE_QUIZ } from "../graphql";
import QRCode from "qrcode.react";
import { FiPlus } from "react-icons/fi";

function Add() {
  const [showModal, setShowModal] = useState(false);

  const [moduleName, setModuleName] = useState("");
  const [question, setQuestion] = useState("");
  const [propositions, setPropositions] = useState({
    p1: "Answer number 1",
    p2: "Answer number 2",
   // p3: "Answer number 3",
  });
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [time, setTime] = useState(0);
  const [qrCodeData, setQRCodeData] = useState(null);

  const [createQuiz, { loading, error }] = useMutation(CREATE_QUIZ, {
    refetchQueries: [{ query: GET_QUIZ_QUESTIONS }],
  });

  const handlePropositionChange = (key, value) => {
    setPropositions({ ...propositions, [key]: value });
  };

  const handleAddProposition = (event) => {
    event.preventDefault();
    const newKey = `p${Object.keys(propositions).length + 1}`;
    setPropositions({ ...propositions, [newKey]: "" });
  };


  const handleRemoveProposition = () => {
    const keys = Object.keys(propositions);

    if (keys.length > 2) {
      const lastKey = keys[keys.length - 1];
      const { [lastKey]: _, ...updatedPropositions } = propositions;
      setPropositions(updatedPropositions);
    }
  };

  const handleDownloadQRCode = () => {
    const qrCodeDataURL = document
      .getElementById("qr-code")
      .toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeDataURL;
    downloadLink.download = `${question}.png`; // Set the name of the picture as the name of the question
    downloadLink.click();
    window.location.reload();

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    

    const quizInput = {
      moduleName,
      question,
      propositions,
      correctAnswer,
      selectedAnswer,
      time: parseInt(time),
    };

    createQuiz({ variables: { quizinput: quizInput } })
      .then((response) => {
        const qrCodeData = {
          id: response.data.createQuiz.id,
        };
        setQRCodeData(qrCodeData);
        handleDownloadQRCode();
        setModuleName("");
        setQuestion("");
        setPropositions({
          p1: "Default Propositions 1",
          p2: "Default Propositions 2",
        });
        setCorrectAnswer("");
        setSelectedAnswer("");
        setTime(0);
      })
      .catch(() => {
        console.log("error quiz");
      });
  };

  useEffect(() => {
    if (qrCodeData) {
      handleDownloadQRCode(question); // Pass the question as an argument
    }
    // eslint-disable-next-line
  }, [qrCodeData]);
  return (
    <>
      <button
        className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 sidebar-link"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
          <FiPlus />
        </span>
        <span className="text-sm font-medium">Add question</span>
      </button>

      {showModal ? (
        <>
          <div className="container">
            <div className="justify-center p-5  items-center flex  overflow-x-hidden overflow-y-fit absolute top-5 inset-0 z-50 outline-none focus:outline-none">
              {/*content*/}
              <div className="border-0  grid grid-rows-[3fr_1fr] rounded-2xl shadow-lg relative  w-2/4 h-3/5  outline-none focus:outline-none">
                {/*header*/}

                {/*body*/}
                <form onSubmit={handleSubmit}>
                  <div className="grid bg-dblack rounded-2xl justify-center overflow-y-scroll max-h-96 pb-4 pt-2.5">
                    <div>
                      <button
                        type="button"
                        class="text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
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
                    <div className="pb-3 grid grid-rows-2 gap-50 justify-center overflow-x-hidden">
                      <label
                        htmlFor="question-name"
                        className="text-3xl text-input text-center bold mb-2"
                      >
                        New question
                      </label>
                      <input
                        type="text"
                        className="pl-4 bg-gris rounded text-input py-2"
                        id="question-name"
                        name="Question"
                        placeholder="Enter your question"
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        required
                      />
                    </div>
                    <div className="grid  grid-rows gap-20  grid-cols-2 justify-center mb-3">
                      <div className="flex flex-col flex-grow-1 space-y-5">
                        {Object.keys(propositions).map((key) => (
                          <div key={key}>
                            <input
                              className="pl-4 bg-gris rounded text-input py-2"
                              type="text"
                              placeholder={propositions[key]}
                              onChange={(event) =>
                                handlePropositionChange(key, event.target.value)
                              }
                              required
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col flex-grow-1 space-y-5">
                        <div className="  rounded ">
                          <input
                            type="text"
                            className="pl-4 bg-gris rounded text-input py-2"
                            placeholder="Enter module name"
                            value={moduleName}
                            onChange={(event) =>
                              setModuleName(event.target.value)
                            }
                            required
                          />
                        </div>
                        <div>
                          <div className="flex flex-row justify-start">
                            <select
                              className="py-2.5 bg-gris text-input text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={correctAnswer}
                              onChange={(event) =>
                                setCorrectAnswer(event.target.value)
                              }
                              required
                            >
                              <option value="">Right Answer</option>
                              {Object.keys(propositions).map((key, index) => (
                                <option key={index} value={propositions[key]}>
                                  {propositions[key]}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <button
                            className="bg-grey  text-white rounded text-center px-12 py-2"
                            onClick={handleAddProposition}
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            className="bg-grey text-white rounded text-center px-8 py-2"
                            onClick={handleRemoveProposition}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {qrCodeData && (
                        <div>
                          <QRCode
                            id="qr-code"
                            value={JSON.stringify(qrCodeData)}
                            size={250}
                            fontWeight={300}
                          />
                          <br />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row space-x-10  justify-center">
                      <button
                        type="submit"
                        className=" bg-orange  flex flex-grow-0.5 justify-center text-white rounded text-center px-20 py-2"
                      >
                        Generate QR code
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
export default Add;
