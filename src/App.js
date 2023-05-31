// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import resumeReducer from './Redux/ResumReducer';
import ResumeForm from './Components/ResumeForm';
import ResumeView from './Components/ResumView';
import Header from './Components/Header';
const store = createStore(resumeReducer);
function App() {
  return (
    <Provider store={store}>
      <Header/>
    <Router>
      <Routes>
        <Route path="/"  element={<ResumeForm/>} />
        <Route path="/view" element={<ResumeView/>} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;