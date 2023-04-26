import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QuestionView from './pages/QuestionView';
import EditQuestion from './pages/EditQuestion';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/questionView/:id' element={<QuestionView />} />
          <Route path='/edit/:id' element={<EditQuestion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
