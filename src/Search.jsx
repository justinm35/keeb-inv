import { useState } from 'react';
import './search.css'
import blob1 from './images/blob1.svg';
import blob2 from './images/blob2.svg';
import { Layout, Input, Button, Alert } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SearchPage ({setFetchedDataSrc}) {
  const navigate = useNavigate()
    const layoutStyle = {
        backgroundColor:'rgb(255,255,255,0)'
      }
      const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor:'rgb(255,255,255,0)',
        padding:'10px',
      };
      const mainStyle = {
        backgroundImage:'./images/bg-img.svg',
        height:'calc(100vh - 68px)',
        width:'100%',
        paddingTop:'20vh',
        margin:'0',
      }
      const alertStyle = {
          margin: '100px 100px 0 100px'
      }


      const [whatToSearch, setWhatToSearch] = useState([""])
      const[errorMsg, setErrorMsg] = useState('')
      const[resultItems, setResultItems] = useState({})
      const[dataLoading, setDataLoading] = useState(false)

        const handleChange = (event) => {
            const {name, value} = event.target
            setWhatToSearch(prevData => {return {[name] : value}})
        } 

        const handleSubmit = (e) => {
          e.preventDefault()
          setErrorMsg('')
          if(whatToSearch.search !== "") {
            setDataLoading(true)
            // axios.get('http://127.0.0.1:5001/keebinv/us-central1/widgets/search', {
            axios.get('https://us-central1-keebinv.cloudfunctions.net/widgets/search', {
            params: {search: whatToSearch.search}
          })
          .then((data) => {
            setFetchedDataSrc(data.data.result)
            // setResultItems(data.data.result)
            setDataLoading(false)
            navigate('/results')
          })
          .catch((err)=> {
            setDataLoading(false)
            setErrorMsg('Error Message: '+ err?.message)
            console.log(err)
          })
          .finally(()=>{})
          }else if(whatToSearch.search === ""){
            console.log("Give an input")
          }
        }

        
    return(
        <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <p className="nav-title">Keebinv</p>
          <Alert style={alertStyle}
              className="warning-alert"
              message="Warning"
              description='Currently there is an issue making consistent requests to the API. This is caused by a memory leak from Puppeteer\s 
                        headless Chromium instance. I will be re-building the backend using Playwright to hopefully 
                        fix memory leak issue. Link to GitHub issue: https://github.com/puppeteer/puppeteer/issues/5893'
              type="warning"
              showIcon
              closable
            />
        </Header>
        <Content style={mainStyle}>
         <img className="main-bg-img" src={blob1} /> 
         <img className="main-bg-img" src={blob2} /> 
          <h2 className="main-header">We will search the web and find keyboard stock for you!</h2>
          <form action="GET" className="main-form" onSubmit={(e)=>handleSubmit(e)}>
            <Input type="text" name="search" value={whatToSearch.search} onChange={handleChange} className="main-search" placeholder='Tell Us What Your Looking For!'/>
            <Button className="main-button" htmlType="submit" type="dashed">Search</Button>
          </form>
          <div className="err-loader">
            {dataLoading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}

            {errorMsg && <p className="error-message">{errorMsg}</p>}
          </div>
          <p className="prompt-text">Try seaching a keyboard part and we will check KBD, Apex and Mino for the part you want.(eg: "Gateron Black Inks") </p>
        </Content>
      </Layout>
    )
}