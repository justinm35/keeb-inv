import React from 'react'
import './search.css'
import blob1 from './images/blob1.svg';
import blob2 from './images/blob2.svg';
import { Layout, Input, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default function SearchPage (props) {
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
      const [whatToSearch, setWhatToSearch] = React.useState([""])
        const handleChange = (event) => {
            const {name, value} = event.target
            setWhatToSearch(prevData => {return {[name] : value}})
        } 
    return(
        <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <p className="nav-title">Keebinv</p>
        </Header>
        <Content style={mainStyle}>
         <img className="main-bg-img" src={blob1} /> 
         <img className="main-bg-img" src={blob2} /> 
          <h2 className="main-header">We will search the web and find keyboard stock for you!</h2>
          <form for="" className="main-form" onSubmit={(e)=> {e.preventDefault(); return props.clickSearch(whatToSearch.search)}}>
            <Input type="text" name="search" value={whatToSearch.search} onChange={handleChange} className="main-search" placeholder='Tell Us What Your Looking For!'></Input>
            <Button className="main-button" htmlType="submit" type="dashed">Search</Button>
          </form>
        </Content>
      </Layout>
    )
}