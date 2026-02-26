import '../components/agent.css';
import AIIcon from '../assets/AI.svg';

export default function ModalHeader({ title = "Impact Assessment", subtitle }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px 24px',
      gap: '4px',
      width: '375px',
      height: '37px',
      flex: 'none',
      order: 0,
      alignSelf: 'stretch',
      flexGrow: 0
    }}>
      {/* Frame 1984078059 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '0px',
        gap: '12px',
        width: '327px',
        height: '37px',
        flex: 'none',
        order: 0,
        flexGrow: 1
      }}>
        {/* Icons / ai */}
        <div style={{
          width: '28px',
          height: '28px',
          flex: 'none',
          order: 0,
          flexGrow: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={AIIcon} 
            alt="AI Icon" 
            style={{
              width: '28px',
              height: '28px'
            }}
          />
        </div>

        {/* facelift Text with icon */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '4px',
          width: '287px',
          height: '37px',
          flex: 'none',
          order: 1,
          flexGrow: 1
        }}>
          {/* Title + Subtitle */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '4px',
            width: '287px',
            height: '37px',
            flex: 'none',
            order: 0,
            flexGrow: 1
          }}>
            {/* Frame 26087949 */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '12px',
              width: '287px',
              height: '19px',
              flex: 'none',
              order: 0,
              alignSelf: 'stretch',
              flexGrow: 0
            }}>
              {/* ↪ Label - Title */}
              <div style={{
                width: '287px',
                height: '19px',
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '120%',
                display: 'flex',
                alignItems: 'center',
                color: '#FFFFFF',
                flex: 'none',
                order: 0,
                flexGrow: 1
              }}>{title}</div>
            </div>

            {/* Text with icon - Subtitle */}
            {subtitle && (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '4px',
                width: '100px',
                height: '14px',
                flex: 'none',
                order: 1,
                flexGrow: 0
              }}>
                {/* ↪ Label - Subtitle text */}
                <div style={{
                  width: '100px',
                  height: '14px',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 510,
                  fontSize: '12px',
                  lineHeight: '120%',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#FFFFFF',
                  flex: 'none',
                  order: 0,
                  flexGrow: 0,
                  whiteSpace: 'nowrap'
                }}>{subtitle}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
