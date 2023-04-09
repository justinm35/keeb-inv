import './App.css';
import { useState, useMemo } from 'react';
import axios from 'axios'
import SearchPage from './Search';
import ResultsPage from './Results'
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const App = () => {

  const navigate = useNavigate();
  const[fetchedDataSrc, setFetchedDataSrc] = useState({})

  const[errorMsg, setErrorMsg] = useState('')
  const[resultItems, setResultItems] = useState({})
  const[dataLoading, setDataLoading] = useState(false)
  console.log(resultItems)
  const handleSearch = (x) => {
    setErrorMsg('')
    if(x !== "") {
      setDataLoading(true)
      console.log('Searching for ' + x)  
      axios.get('http://127.0.0.1:5001/keebinv/us-central1/widgets/search', {
      // axios.get('https://us-central1-keebinv.cloudfunctions.net/widgets/search', {
      params: {search: x}
    })
    .then((data) => {
      setResultItems(data.data.result)
      setDataLoading(false)
      navigate('/results')
    })
    .catch((err)=> {
      setDataLoading(false)
      setErrorMsg('Error Message: '+ err?.message)
      console.log(err)
    })
    .finally(()=>{})
    }else if(x === ""){
      console.log("Give an input")
    }
  }
  return (
    <Routes>
      <Route index element={<SearchPage isLoading={dataLoading} clickSearch={(x) => handleSearch(x)} errorMsg={errorMsg}/>}/>
      <Route path="results" element={<ResultsPage results={resultItems}/>}/>
    </Routes>
  );
}

export default App;
