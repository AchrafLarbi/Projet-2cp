import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min.js';
import logoSvg from './images/logo2.svg';

import QuizQuestionsList from './component/Home';
import QuizQuestionDetails from './component/userdetails';
import './style.css';
import QuizStats from './component/statistic'
import AboutUs from './component/AboutUs'
import AddQuizQuestionForm from './component/create';
import Side from './component/sidebar';
const client = new ApolloClient({
  uri:'https://endpoint.astropiole.com/graphQuery',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      {/* <div>
      <nav className="navbar">
    <img className="navbar-logo" src={logoSvg} alt="Logo" />
    <ul className="nav ul" >
      <li className="nav li">
        <Link to="/">Home</Link>
      </li>
      <li className="nav li">
        <Link to="/create">Create Quiz</Link>
      </li>
      <li className="nav li">
        <Link to="/AboutUs">About Us</Link>
      </li>
    </ul>
  </nav> */}
        <Routes>
        <Route path="/" element={<QuizQuestionsList />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/quiz/:id/details" element={<QuizQuestionDetails />} />
        <Route path="/quiz/:id/stats" element={<QuizStats />} />
        <Route path="/create" element={<AddQuizQuestionForm />} />
        <Route path="/sd" element={<Side />}/>
        </Routes>
     
    </Router>
    </ApolloProvider>
  );
}

export default App;
