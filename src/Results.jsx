import React from 'react'
import './results.css'
import { Layout} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
import { Link } from 'react-router-dom';
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
          <Link to="/" className="nav-title">Keebinv</Link>
          <Link to="/" className="nav-search"><ArrowLeftOutlined style={{marginRight: '5px'}}/>Back to Search</Link>
        </Header>

        <Content className="website-container">
          <h2 className="website-title">Mino Keys<a className="website-title-link" href="minokeys.com">minokeys.com</a></h2>
          <Content className="results-container">
              {results.mino.length > 0 ? results?.mino.map((x) => <ResultModule result={x}/>) :  <h3 className="website-title">Nothing Found</h3>}
          </Content>
        </Content>
        <Content className="website-container">
          <h2 className="website-title">KBD Fans<a className="website-title-link" href="kbdfans.com">kbdfans.com</a></h2>
          <Content className="results-container">
              {results.kbd.length > 0 ? results?.kbd.map((x) => <ResultModule result={x}/>) : <h3 className="website-title">Nothing Found</h3>}
          </Content>
        </Content>
        <Content className="website-container">
          <h2 className="website-title">Apex Keyboards<a className="website-title-link" href="apexkeyboards.com">apexkeyboards.com</a></h2>
          <Content className="results-container">
              {results.apex.length > 0 ? results?.apex.map((x) => <ResultModule result={x}/>) : <h3 className="website-title">Nothing Found</h3>}
          </Content>
        </Content>
      </Layout>
    )
}
export default ResultsPage