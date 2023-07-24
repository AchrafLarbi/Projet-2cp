import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import QRCode from 'qrcode.react';

const GET_QUIZ_BYID_QUESTION = gql`
  query GetQuizByID($getQuizByIdId: ID!) {
   getQuizByID(id: $getQuizByIdId) {
    id
    correctAnswer
    createdAt
    moduleName
    propositions
    question
    selectedAnswer
    time
  }
}
`;

function QuizQuestionDetails() {
  const [showPropositions, setShowPropositions] = useState(false);
  const { id: quizId } = useParams();
  const { loading, error, data } = useQuery(GET_QUIZ_BYID_QUESTION, {
    variables: { getQuizByIdId: quizId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <h1>{error.message}</h1>;

  const quizQuestion = data.getQuizByID;

  const qrCodeData = {
    id: quizQuestion.id
  };


  const handleDownloadQRCode = () => {
    const qrCodeDataURL = document.getElementById('qr-code').toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCodeDataURL;
    console.log(quizQuestion.question);
    downloadLink.download = quizQuestion.question;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);


  }



  const handleQuestionHeaderClick = () => {
    setShowPropositions(!showPropositions);
  };
  return (
    <div className="container" style={{ marginTop: "50px", marginRight: "30px" }}>
      <div className="row">
        <div className="col-md-8" style={{ marginLeft: "145px" }}>
        <div className="question-card" style={{background: "linear-gradient(135deg, #C9D6FF, #E2E2E2)"}}>
            <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
              Teacher :
            </h3>
            <h3 style={{ textAlign: "center" }}>
              Larbi Achraf
            </h3>
            <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
              Module:
            </h3>
            <h3 style={{ textAlign: "center" }}>
              {quizQuestion.moduleName}
            </h3>
            <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
              The Question:
            </h3>
            <h2 className="click" onClick={handleQuestionHeaderClick} style={{ textAlign: "center" }} >
              {quizQuestion.question}
            </h2>
            {showPropositions && (
              <div className="propositions">
                <h3 style={{ textAlign: "left", fontWeight: "bold" }}>
                  Propositions :
                </h3>
                <ul>
                  {Object.values(quizQuestion.propositions).map((proposition, index) => (
                    <li key={index}>
                      <div className="proposition-card">
                        {quizQuestion.correctAnswer === proposition ? (
                          <p className="correct-answer">{index + 1}. {proposition}</p>
                        ) : (
                          <div >
                            <p>{index + 1}. {proposition}</p>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <h3 style={{ textAlign: "left", fontWeight: "bold" }}>
                  Correct Proposition :
                </h3>
                <h3>
                  {quizQuestion.correctAnswer}
                </h3>
              </div>
            )}
          </div>
          <div className=" col-md-4" style={{ marginLeft: "300px", marginTop: "30px" }}>
            {qrCodeData && (
              <div className="qr-code">
                <QRCode id="qr-code" value={JSON.stringify(qrCodeData)} size={250} fontWeight={300} />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }} className="like-button" onClick={handleDownloadQRCode}>
                  Download QR Code
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>

  );
}

export default QuizQuestionDetails;


