import welcomeGlow from '../assets/welcome-glow.svg';
import '../components/agent.css';

export default function IntroTemplate({ data, currentPage, totalPages }) {
  return (
    <div className="agent-page welcome-page" style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '115px',
      paddingBottom: '100px',
      boxSizing: 'border-box'
    }}>
      {/* Glow Effect */}
      <div style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        display: 'flex'
      }}>
        <img 
          src={welcomeGlow} 
          alt="Welcome glow" 
          style={{
            width: '308px',
            height: '298px'
          }}
        />
      </div>

      {/* Welcome Text */}
      <div style={{
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '12px',
        display: 'flex',
        paddingLeft: '24px',
        paddingRight: '24px'
      }}>
        <div style={{
          alignSelf: 'stretch',
          height: '150px',
          maxHeight: '170px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          display: 'inline-flex'
        }}>
          <div style={{
            flex: '1 1 0',
            height: '100%',
            maxHeight: '150px',
            textAlign: 'center',
            color: 'white',
            fontSize: '20px',
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: '510',
            lineHeight: '22px',
            wordWrap: 'break-word'
          }}>
            {data?.subtitle} {data?.description}
          </div>
        </div>
      </div>
    </div>
  );
}
