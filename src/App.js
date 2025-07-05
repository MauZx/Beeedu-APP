import React, { useState } from 'react';
import Homepage from './components/Homepage';
import StudentDashboard from './components/StudentDashboard';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnrolledCourses from './components/EnrolledCourses';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  // Handler para abrir o formulário de cadastro de aluno
  const handleOpenStudentRegistration = () => setShowRegistration(true);
  // Handler para fechar o formulário de cadastro
  const handleCloseRegistration = () => setShowRegistration(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage onStudentRegister={handleOpenStudentRegistration} />} />
          <Route path="/dashboard" element={<StudentDashboard onLogout={() => setLoggedIn(false)} />} />
          <Route path="/matriculados" element={<EnrolledCourses />} />
          <Route path="/cadastro" element={<StudentRegistrationForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; 