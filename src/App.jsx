import './App.css';
import { useState, useMemo } from 'react';
import axios from 'axios'
import SearchPage from './Search';
import ResultsPage from './Results'
import { Route, Routes } from 'react-router-dom';

const App = () => {

  const[fetchedDataSrc, setFetchedDataSrc] = useState({})
  return (
    <Routes>
      <Route index element={<SearchPage setFetchedDataSrc={setFetchedDataSrc}/>}/>
      <Route path="results" element={<ResultsPage results={fetchedDataSrc}/>}/>
    </Routes>
  );
}

export default App;
