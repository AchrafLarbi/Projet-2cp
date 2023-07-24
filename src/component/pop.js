// import React, {useNavigate, useState, useRef, useEffect } from 'react';
// import { useQuery } from '@apollo/client';
// //import { useLazyQuery } from '@apollo/client';

// import { useParams } from 'react-router-dom';
// import { GET_QUIZ_ITEMS_BY_QUESTION_ID, GET_AVERAGE_TIME, GET_USER_BY_ID } from '../graphql'
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { useInterval } from 'react-use';
// import { GET_QUIZ_QUESTIONS } from '../graphql';


// export default function Modal() {

//     const navigate = useNavigate();
//     const [quizQuestions, setQuizQuestions] = useState([]);
//     const [selectedModule, setSelectedModule] = useState('');
//     const [selectedQuestionId, setSelectedQuestionId] = useState(null);

//     const uniqueModules = [...new Set(quizQuestions.map((quizQuestion) => quizQuestion.moduleName))];
//     const filteredQuestions = selectedModule
//     ? quizQuestions.filter((quizQuestion) =>
//         quizQuestion.moduleName.toLowerCase() === selectedModule.toLowerCase()
//       )
//     : quizQuestions;

//     const [showModal, setShowModal] = useState(false);


//     const [showTable, setShowTable] = useState(false);
//     const tableRef = useRef(null);
  
//     useEffect(() => {
//       if (showTable) {
//         const interval = setInterval(() => {
//           if (tableRef.current) {
//             tableRef.current.scrollTop = tableRef.current.scrollHeight;
//           }
//         }, 10000);
  
//         return () => {
//           clearInterval(interval);
//         };
//       }
//     }, [showTable]);
  
  
  
//     const { id: questionId } = useParams();
  
//     //uselazyquery
//     const { data: quizItemsData, refetch: refetchQuizItems } = useQuery(GET_QUIZ_ITEMS_BY_QUESTION_ID, {
//       variables: { questionId },
  
//     });
  
//     const { data: averageData, refetch: refetchAverageData } = useQuery(GET_AVERAGE_TIME, {
//       variables: { questionId },
  
//     });
  
  
//     useInterval(() => {
//       refetchQuizItems();
//       refetchAverageData();
//     }, 1000);
//     // refresh every 1 seconds
//     // kol 10 secs t3awd t3ytl usequery
  
//     if (!quizItemsData || !averageData) {
//       return <p>Loading...</p>;
  
//     }
  
//     const quizItems = quizItemsData.getQuizPropaByQuestionId.quizItems;
//     const totalCount = quizItemsData.getQuizPropaByQuestionId.totalCount;
  
  
//     const result = quizItems.reduce(
//       (accumulator, item) => {
//         if (item.correctAnswer === item.selectedAnswer) {
//           accumulator.correctAnswers += 1;
//         } else {
//           accumulator.incorrectAnswers += 1;
//         }
//         return accumulator;
//       },
//       { correctAnswers: 0, incorrectAnswers: 0 }
//     );
  
//     const correctPercentage = ((result.correctAnswers / totalCount) * 100).toFixed(2);
//     const incorrectPercentage = ((result.incorrectAnswers / totalCount) * 100).toFixed(2);
//     const averageTime = averageData.getAverageTime.toFixed(2);
  
  
//     const totalPercentage = parseFloat(correctPercentage) + parseFloat(incorrectPercentage);
//     const doubledPercentage = (totalPercentage / 2).toFixed(2);
  
//     console.log((doubledPercentage));
  
  
  
//     const toggleTable = () => {
//       setShowTable(!showTable);
//       if (!showTable) {
//         setTimeout(() => {
//           tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }, 100);
//       }
//     };
  
  
  
  
//     console.log(quizItems);
  
  
//     const UserData = ({ userId, item }) => {
//       const { loading, error, data } = useQuery(GET_USER_BY_ID, {
//         variables: { getUserByIdId: userId },
//       });
  
//       if (loading) {
//         return <td>Loading...</td>;
//       }
//       if (error) {
//         return <p>{error.message}</p>;
//       }
//       return (
//         <>
//           <td>{data.getUserByID.email}</td>
//           <td>{item.selectedAnswer}</td>
//           <td>
//             {item.correctAnswer === item.selectedAnswer ? (
//              <span className="checkmark">
//            <i className="fas fa-check  " ></i>
  
//            </span>
//             ) : (
//               <span className="checkmark-wrong">
//               <i className="fas fa-times text-danger"></i>
              
//               </span>
//             )}
//           </td>
//         </>
//       );
//     };
    
//   return (
//     <>
    
//       <button
//         className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//         type="button"
//         onClick={() => setShowModal(true) && navigate(`/quiz/${quizQuestion.id}/stats`)}
//       >
//         Open regular modal
//       </button>
//       {showModal ? (
//         <>
//           <div
//             className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//           >
//             <div className="relative w-auto my-6 mx-auto max-w-3xl">
//               {/*content*/}
//               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 {/*header*/}
//                 <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//                   <h3 className="text-3xl font-semibold">
//                     Modal Title
//                   </h3>
//                   <button
//                     className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                     onClick={() => setShowModal(false)}
//                   >
//                     <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                       ×
//                     </span>
//                   </button>
//                 </div>
//                 {/*body*/}
     



   
//     <div className='grid grid-cols '>
//      <div className='container bg-black'>
//       {quizItems.length ? (

//         <div >
//           <div >
//             <div className='flex flex-row text-white  justify-center'>
//          <h2 >Question:</h2>

//          <h3>{quizItems[0].question}</h3>
// </div>
//           </div>
//           <div className=' flex flex-row  justify-between bg-black'>





//           <div className='flex flex-start '>
//                 <div className="progress-item">
//                   <CircularProgressbar
//                     value={correctPercentage}
//                     text={`${correctPercentage} %`}
//                     styles={buildStyles({
//                       pathColor: '#28a745',
//                       textColor: '#28a745',
//                     })}
//                   />
//                   <p className="progress-label" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Correct Answers</p>
//                 </div>
//               </div>
//             <div  className='grid grid-cols-3 grid-rows-2 gap-6 self-baseline text-center  text-white'>
//               <div className='border rounded text-center ' >
//                 <p  >Total : {totalCount}</p>
//               </div>
//               <div className='border rounded  '>
//                 <p  >Answer : {totalCount}</p>
//               </div>
//               <div className='border rounded  self-center '>
//                 <p className='  text-valid  
//                 ' >Correct : {result.correctAnswers}</p>
//               </div>
//               <div className='border rounded'>
//                 <p className='  '>Wrong : {result.incorrectAnswers}</p>
//               </div>
//               <div className='border rounded '>
//             <h3>
//               Average Time:
//             </h3>
//             <h3>
//               <i className="far fa-clock"></i> {averageTime} minutes
//             </h3>

//           </div>

//           </div>

           
          
             
             

//           </div>









          

//           <div style={{ textAlign: 'center' }}>


//           </div>


//           {/* Only render the table if showBreakdown is true */}

//           <div>
//             <div class="text-center text-white">
//               <h3 >Answers Breakdown:</h3>

//               <button  onClick={toggleTable}>
//                 <span> {showTable ? 'Hide The Answers' : 'Show The Answers'}</span>

//               </button>

//             </div>
//             {showTable && (
//               <div
//                 id="data"
//                 ref={tableRef}
//               >
//                 <table className="w-full table-auto bg-black text-white  rounded ">
//                   <thead >
//                     <tr>
//                       <th >Users</th>
//                       <th >ID</th>
//                       <th >Email</th>
//                       <th>Select Answer</th>
//                       <th>Correct?</th>
//                     </tr>
//                   </thead>
//                   <tbody  className='overflow-scroll  gap-6  border border-white '>
//                     {quizItems.map((item, index) => (
//                       <tr className=' border border-white text-white ' key={item.id}>
//                         <td>User : {index + 1}</td>
//                         <td>{item.userid}</td>
//                         {item.userid && <UserData userId={item.userid} item={item} />}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>

//         </div>
//       ) : (
//         <div>
//           <p>any Answers available</p>
//         </div>
//       )}
//     </div>
//     </div>
//   );

//                 {/*footer*/}
//                 <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//                   <button
//                     className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Close
//                   </button>
//                   <button
//                     className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//         </>
//       ) : null}
//     </>
//   );
//       }
    