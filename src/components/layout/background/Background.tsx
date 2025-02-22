import bgImage from '../../../assets/background.jpg';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

function Background() {
    return (
      <div
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
          background: `
            linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)),
            url(${bgImage}) center / cover no-repeat
          `,
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'transparent'
        }}>
          <Header title="Recipe Master" />
  
          <div style={{ display: 'flex', flex: 1 }}>
            <Sidebar />
            <div style={{
              flex: 1,
              overflow: 'auto',
              backgroundColor: 'transparent'
            }}>
              {"Content will display here"}
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Background;