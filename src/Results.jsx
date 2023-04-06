import React from 'react'
import './results.css'
import { Layout, Input, Button } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const ResultModule = (props) => {
    return(
        <div className="result-module">
            <div className="result-img" style={{backgroundImage: `url(${props.result.imageContentParsed})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',}}></div>
                <h3 className="result-title">{props.result.titleContent}</h3>
                <p className="result-price">{props.result.priceContent}</p>
        </div>
    )
}

const ResultsPage = ({results, switchPage}) => {
    const layoutStyle = {
        backgroundColor:'rgb(255,255,255,0)'
      }
      const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor:'rgb(255,255,255,0)',
        padding:'10px',
      };


    return(
        <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <p className="nav-title" onClick={switchPage}>Keebinv</p>
          <SearchOutlined className="nav-search"/>
        </Header>

        <Content className="website-container">
          <h2 className="website-title">Mino Keys</h2><a className="website-title-link" >minokeys.com</a>
          <Content className="results-container">
              {results.mino.length > 0 ? results?.mino.map((x) => <ResultModule result={x}/>) :  <h3 className="website-title">Nothing Found</h3>}
          </Content>
        </Content>
        <Content className="website-container">
          <h2 className="website-title">KBD Fans</h2><a className="website-title-link" >kbdfans.com</a>
          <Content className="results-container">
              {results.kbd.length > 0 ? results?.kbd.map((x) => <ResultModule result={x}/>) : <h3 className="website-title">Nothing Found</h3>}
          </Content>
        </Content>
        <Content className="website-container">
          <h2 className="website-title">Apex Keyboards</h2><a className="website-title-link" >apexkeyboards.com</a>
          <Content className="results-container">
              {results.apex.length > 0 ? results?.apex.map((x) => <ResultModule result={x}/>) : <h3 className="website-title">Nothing Found</h3>}
          </Content>
        </Content>
      </Layout>
    )
}
export default ResultsPage