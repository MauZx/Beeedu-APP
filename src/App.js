import React, { useState } from 'react';
import Homepage from './components/Homepage';
import StudentDashboard from './components/StudentDashboard';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnrolledCourses from './components/EnrolledCourses';
import UXDesignCoursePage from './components/UXDesignCoursePage';
import ProgressPage from './components/ProgressPage';
import DraftsReceivedPage from './components/DraftsReceivedPage';
import ProjectsInProgressPage from './components/ProjectsInProgressPage';
import InterestsSelectionPage from './components/InterestsSelectionPage';
import FreelasInProgressPage from './components/FreelasInProgressPage';
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
          <Route path="/cadastro" element={<StudentRegistrationForm onCancel={handleCloseRegistration} />} />
          <Route path="/interesses" element={<InterestsSelectionPage />} />
          <Route path="/curso/ux-design" element={<UXDesignCoursePage />} />
          <Route path="/progresso" element={<ProgressPage />} />
          <Route path="/drafts" element={<DraftsReceivedPage />} />
          <Route path="/projetos" element={<ProjectsInProgressPage />} />
          <Route path="/freelas-andamento" element={<FreelasInProgressPage />} />
        </Routes>
        
        {/* Modal de registro */}
        {showRegistration && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '85vh',
              overflow: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <button 
                onClick={handleCloseRegistration}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(0, 0, 0, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: '#666',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.2)';
                  e.target.style.color = '#333';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.1)';
                  e.target.style.color = '#666';
                }}
              >
                ✕
              </button>
              <StudentRegistrationForm onCancel={handleCloseRegistration} />
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App; 