import React, { useState } from 'react';
import Homepage from './components/Homepage';
import StudentDashboard from './components/StudentDashboard';
import StudentRegistrationForm from './components/StudentRegistrationForm';
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
      {loggedIn ? (
        <StudentDashboard onLogout={() => setLoggedIn(false)} />
      ) : showRegistration ? (
        <div>
          <button onClick={handleCloseRegistration} style={{ margin: 16 }}>&larr; Voltar</button>
          <StudentRegistrationForm />
        </div>
      ) : (
        <Homepage onStudentRegister={handleOpenStudentRegistration} />
      )}
    </div>
  );
}

export default App; 