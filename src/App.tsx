import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadCapture from './components/LeadCapture';
import VideoPage from './components/VideoPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeadCapture />} />
        <Route path="/video" element={<VideoPage />} />
      </Routes>
    </Router>
  );
};

export default App;