import { useNavigate } from 'react-router-dom';
import ShareIcon from '../assets/share.svg';
import CloseIcon from '../assets/CloseIcon.svg';
import NotificationBadge from './NotificationBadge';
import { useInbox } from '../contexts/InboxContext';

export default function AgentHeader({ title, subtitle }) {
  const navigate = useNavigate();
  const { unreadCount = 0 } = useInbox();

  const handleInboxClick = () => {
    navigate('/inbox');
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '0px 16px',
      gap: subtitle ? '4px' : '8px',
      width: '375px',
      minHeight: '62px',
      flex: 'none',
      flexShrink: 0,
      flexGrow: 0
    }}>
      {/* Wrap */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '0px',
        gap: '16px',
        width: '343px',
        flex: 'none',
        alignSelf: 'stretch',
        flexGrow: 0
      }}>
        {/* Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '18px 0px 0px',
          flex: '1 1 0',
          order: 0,
          flexGrow: 1
        }}>
          {/* Dropdown */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '4px',
            height: '22px',
            flex: 'none',
            order: 0,
            alignSelf: 'stretch',
            flexGrow: 0
          }}>
            {/* Label */}
            <div style={{
              height: '22px',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: 510,
              fontSize: '20px',
              lineHeight: '110%',
              display: 'flex',
              alignItems: 'center',
              color: '#FFFFFF',
              flex: '1 1 0',
              order: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {title}
            </div>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div style={{
              color: '#A6A6A6',
              fontSize: '12px',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: '510',
              lineHeight: '21.60px'
            }}>
              {subtitle}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '4px 0px 0px',
          width: 'auto',
          minWidth: '92px',
          height: '52px',
          flex: 'none',
          order: 1,
          flexGrow: 0,
          gap: '8px'
        }}>
          {/* Notification Badge */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px',
            width: 'auto',
            height: '48px',
            flex: 'none',
            order: 0,
            flexGrow: 0
          }}>
            <NotificationBadge count={unreadCount} onClick={handleInboxClick} />
          </div>

          {/* Prototype Link (dev only) */}
          {process.env.NODE_ENV === 'development' && (
            <div
              onClick={() => navigate('/prototype')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#2a2a2a',
                cursor: 'pointer',
                marginLeft: '4px',
                fontSize: '12px',
                color: '#48FF9B',
                fontWeight: 600,
              }}
              title="Open Prototype"
            >
              🧪
            </div>
          )}

          {/* Share Button */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px',
            gap: '10px',
            width: '48px',
            height: '48px',
            flex: 'none',
            order: 1,
            flexGrow: 0,
            margin: '0px -4px'
          }}>
            <img 
              src={ShareIcon} 
              alt="Share" 
              style={{
                width: '15px',
                height: '15px',
                flex: 'none',
                order: 0,
                flexGrow: 0
              }}
            />
          </div>

          {/* Close Button */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            width: '48px',
            height: '48px',
            borderRadius: '100px',
            flex: 'none',
            order: 1,
            flexGrow: 0
          }}>
            {/* Bg */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              width: '40px',
              height: '40px',
              borderRadius: '100px',
              flex: 'none',
              order: 0,
              alignSelf: 'stretch',
              flexGrow: 1
            }}>
              <img 
                src={CloseIcon} 
                alt="Close" 
                style={{
                  width: '15px',
                  height: '15px',
                  flex: 'none',
                  order: 0,
                  flexGrow: 0
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
