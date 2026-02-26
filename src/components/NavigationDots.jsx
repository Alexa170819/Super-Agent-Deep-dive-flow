import './agent.css';

export default function NavigationDots({ total, current }) {
  return (
    <div className="navigation-dots">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`dot ${index === current ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}

