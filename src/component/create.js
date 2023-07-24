import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { GET_QUIZ_QUESTIONS, CREATE_QUIZ } from '../graphql';
import QRCode from 'qrcode.react';

function AddQuizQuestionForm() {
  const [showModal, setShowModal] = useState(false);

  const [moduleName, setModuleName] = useState('');
  const [question, setQuestion] = useState('');
  const [propositions, setPropositions] = useState({
    p1: 'Default Proposition 1',
    p2: 'Default Proposition 2',
  });
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [time, setTime] = useState(0);
  const [errorMessage, setError] = useState('');
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
    setPropositions({ ...propositions, [newKey]: '' });
  };

  const handleRemoveProposition = (key) => {
    if (key < 'p3') {
      return;
    }
    const { [key]: value, ...newPropositions } = propositions;
    setPropositions(newPropositions);
  };

  const handleDownloadQRCode = () => {
    const qrCodeDataURL = document.getElementById('qr-code').toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCodeDataURL;
    downloadLink.download = `${question}.png`; // Set the name of the picture as the name of the question
    downloadLink.click();
    window.location.reload();
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (moduleName === '' || question === '') {
      const errorMessage = 'Please fill out all fields.';
      setError(errorMessage);
      return;
    }
    if (correctAnswer === '') {
      const errorMessage = 'Please fill out all fields.';
      setError(errorMessage);
      return;
    }

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
        setModuleName('');
        setQuestion('');
        setPropositions({
          p1: 'Default Propositions 1',
          p2: 'Default Propositions 2',
        });
        setCorrectAnswer('');
        setSelectedAnswer('');
        setTime(0);
        setError('');
      })
      .catch(() => {
        console.log('error quiz');
      });
  };

  useEffect(() => {
    if (qrCodeData) {
      handleDownloadQRCode(question); // Pass the question as an argument
    }
    // eslint-disable-next-line
  }, [qrCodeData]);

  return(
    <>
    <button
        className=" text-white   font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
       Add
      </button>
      { showModal ? (
        <>
          <div
            className="justify-center p-5  items-center flex  overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none"
          >
            <div  >
              {/*content*/}
              <div className="border-0  grid grid-rows-2 rounded-lg shadow-lg relative  w-full  outline-none focus:outline-none">
                {/*header*/}
             
                {/*body*/}
                <div className=' '>
                <form onSubmit={handleSubmit} >
       
                <div className=' grid   bg-noun rounded '>
                <div className='flex flex-row   justify-center '> 
                 <label htmlFor="question-name" className='text-xl text-white'>Question</label>
                       <input type="text" className=' rounded text-input' id="question-name" name="Question" placeholder="Enter Question" value={question} onChange={(event) => setQuestion(event.target.value)} required />
                      
                       </div> 
                     < div className='  grid  grid-rows  grid-cols-2   gap-y-20 justify-between'>
                      <div className='grid grid-rows gap-10'>
                       <div className='  rounded '> 
         
                       <label className='  text-center  text-white' for="module-name">Module Name:</label>
                      <input type="text" className=' border rounded  bg-white text-grey' placeholder="Enter module name" value={moduleName} onChange={(event) => setModuleName(event.target.value)} required />
                       </div>
                      < div>
                       <div className='  flex flex-row justify-start   '>
                     <p className=' items-center text-white'> Correct Proposition:</p>
                       <select className='rounded ' value={correctAnswer} onChange={(event) => setCorrectAnswer(event.target.value)}>
                         <option value="">Select a Proposition</option>
                         {Object.keys(propositions).map((key, index) => (
                           <option key={index} value={propositions[key]}>
                             {propositions[key]}
                           </option>
                         ))}
                       </select>
                       </div>
                     </div>
                     <div>
                     <button className="   bg-orange  text-white rounded text-center" onClick={handleAddProposition}>Add Proposition</button>
                     </div>
                     </div>
                     <div className='flex flex-col flex-grow-1   space-y-6 space-x-20 float-left'>
                       {Object.keys(propositions).map((key, index) => (
                         <div key={key}>
                           <label className="  text-white">
                             Proposition {index + 1}:
                           </label>
                           <input
                           className='rounded'
                             type="text"
                             value={propositions[key]}
                             onChange={(event) => handlePropositionChange(key, event.target.value)}
                           />
         <div className='flex flex-row justify-between '>
         
                           {(Object.keys(propositions).length > 2 && index >= 2) && (
                               <button className="flex  w-1/3 text-white rounded bg-orange text-center" onClick={() => handleRemoveProposition(key)}>
                               Remove
                             </button>  )}

                             </div>
                         </div>
                       ))}
                       </div>
                       {qrCodeData && (
                       <div className="qr-code">
                         <QRCode id="qr-code" value={JSON.stringify(qrCodeData)} size={250} fontWeight={300} />
                         <br />
                       </div>
                     )}
                      </div>
                      <div className='flex flex-row space-x-10  justify-center'>
                  
                   
                     <button type="submit"  onClick={handleSubmit} className=" bg-orange  flex flex-grow-0.5 justify-center text-white rounded text-center">
                       Generate QR code
                       </button>
         </div>
                       {errorMessage && <p className='text-white'>{errorMessage}</p>}

                    </div>
                   
                 </form>
                 </div>
           
                {/*footer*/}
                   <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                 
                 
              </div>
            </div>
          </div>
        </>
      ) : null}
      </>);
     

                        }; 




  

  export default AddQuizQuestionForm;