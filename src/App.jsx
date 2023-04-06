import './App.css';
import { useState } from 'react';
import axios from 'axios'
import SearchPage from './Search';
import ResultsPage from './Results'
import LoadingPage from './LoadingPage';
import mySVG from './images/bg-img.svg';
import { Layout, Input, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


const App = () => {
  const [testResult, setTestResult] = useState([
    {img: "https://cdn.shopify.com/s/files/1/3099/8088/products/NK_Cream_1728x.jpg?v=1660571996", title: "Novel Key Creams", seller: "KBD Fans", price: "$14"},
    {img: "https://cdn.shopify.com/s/files/1/3099/8088/products/NK_Cream_Tactile_1728x.jpg?v=1660571996", title: "Novel Key Creams", seller: "MDN", price: "$13"},
    {img: "https://cdn.shopify.com/s/files/1/3099/8088/products/NK_Cream_Clickie_1728x.jpg?v=1672936107", title: "Novel Key Creams", seller: "Another Comp", price: "$10"},
    {img: "https://cdn.shopify.com/s/files/1/3099/8088/products/Kailh_Box_MuteJade_1728x.jpg?v=1641915008", title: "Novel Key Creams", seller: "NovelKey", price: "$8.99"},
  ])

  const[resultPageState, setResultPageState] = useState(false)
  const[KBDItems, setKBDItems] = useState({})
  const[dataLoading, setDataLoading] = useState(true)
  const handleSearch = (x) => {
    if(x !== "") {
      setDataLoading(true)
    setResultPageState(y => !y)
    // axios.get('http://127.0.0.1:5001/keebinv/us-central1/widgets/search', {
    axios.get('https://us-central1-keebinv.cloudfunctions.net/widgets/search', {
      params: {
        search: x
      }
    }).then((data) => {
      console.log('Searching for ' + x)  
      setKBDItems(data.data.result)
    })
    .catch((err)=> {console.log(err)})
    .finally(()=>{setDataLoading(false)})
    }else if(x === ""){
      console.log("Give an input")
    }
  }
  return (
    <>
    {
      resultPageState ? dataLoading ? 
      <h1 className="loading-text">Loading...  </h1> :
      <ResultsPage results={KBDItems} switchPage={()=>setResultPageState((y) => !y)}/> 
      : 
      <SearchPage clickSearch={(x) => handleSearch(x)}/>
    }
    </>
  );
}

export default App;
