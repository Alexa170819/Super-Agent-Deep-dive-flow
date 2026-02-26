import ModalHeader from '../components/ModalHeader';
import '../components/agent.css';

export default function GetMoneyTemplate({ 
  data, 
  currentPage, 
  totalPages 
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '0px',
      paddingBottom: '60px',
      boxSizing: 'border-box'
    }}>
      <ModalHeader title={data.title} subtitle={data.subtitle} />
      
      <div style={{ padding: '24px', paddingTop: '16px' }}>
        {/* Main Title */}
        {data.mainTitle && (
          <div style={{
            marginBottom: '24px'
          }}>
            <div style={{
              color: 'white',
              fontSize: '20px',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: '510',
              lineHeight: '22px',
              wordWrap: 'break-word'
            }}>
              {data.mainTitle}
            </div>
          </div>
        )}

        {/* List Items */}
        {data.items && data.items.map((item, index) => (
          <div key={index} style={{
            marginBottom: '24px'
          }}>
            {/* Label */}
            <div style={{
              paddingTop: '8px',
              paddingBottom: '8px'
            }}>
              <div style={{
                color: '#48FF9B',
                fontSize: '24px',
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: '400',
                lineHeight: '26.40px',
                wordWrap: 'break-word'
              }}>
                {item.label}
              </div>
            </div>
            
            {/* Description */}
            <div style={{
              color: 'white',
              fontSize: '20px',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: '510',
              lineHeight: '22px',
              wordWrap: 'break-word'
            }}>
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
