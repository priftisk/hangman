export default function HangmanFigure({ attemptsRemaining }) {
    const scaleFactor = 0.6;
  const gallowsColor = '#805730'
  const  bodyColor = '#d99e1e'
    return (
      <svg width={200 * scaleFactor} height={250 * scaleFactor} xmlns="http://www.w3.org/2000/svg">
        {/* Draw the gallows */}
        <line x1={50 * scaleFactor} y1={240 * scaleFactor} x2={150 * scaleFactor} y2={240 * scaleFactor} stroke={gallowsColor} strokeWidth={4 * scaleFactor} />
        <line x1={100 * scaleFactor} y1={240 * scaleFactor} x2={100 * scaleFactor} y2={40 * scaleFactor} stroke={gallowsColor}strokeWidth={4 * scaleFactor} />
        <line x1={100 * scaleFactor} y1={40 * scaleFactor} x2={150 * scaleFactor} y2={40 * scaleFactor} stroke={gallowsColor} strokeWidth={4 * scaleFactor} />
        <line x1={150 * scaleFactor} y1={40 * scaleFactor} x2={150 * scaleFactor} y2={60 * scaleFactor} stroke={gallowsColor} strokeWidth={4 * scaleFactor} />
  
        {/* Draw the head */}
        {attemptsRemaining <= 4 && (
          <circle cx={150 * scaleFactor} cy={80 * scaleFactor} r={20 * scaleFactor} stroke={ bodyColor} strokeWidth={4 * scaleFactor} fill="none" />
        )}
  
        {/* Draw the body */}
        {attemptsRemaining <= 3 && (
          <line x1={150 * scaleFactor} y1={100 * scaleFactor} x2={150 * scaleFactor} y2={160 * scaleFactor} stroke={ bodyColor} strokeWidth={4 * scaleFactor} />
        )}
  
        {/* Draw the arms */}
        {attemptsRemaining <= 2 && (
          <line x1={150 * scaleFactor} y1={120 * scaleFactor} x2={130 * scaleFactor} y2={140 * scaleFactor} stroke={ bodyColor} strokeWidth={4 * scaleFactor} />
        )}
  
        {attemptsRemaining <= 1 && (
          <line x1={150 * scaleFactor} y1={120 * scaleFactor} x2={170 * scaleFactor} y2={140 * scaleFactor} stroke={ bodyColor} strokeWidth={4 * scaleFactor} />
        )}
  
        {/* Draw the legs */}
        {attemptsRemaining === 0 && (
          <>
            <line x1={150 * scaleFactor} y1={160 * scaleFactor} x2={130 * scaleFactor} y2={200 * scaleFactor} stroke={ bodyColor} strokeWidth={4 * scaleFactor} />
            <line x1={150 * scaleFactor} y1={160 * scaleFactor} x2={170 * scaleFactor} y2={200 * scaleFactor} stroke={ bodyColor} strokeWidth={4 * scaleFactor} />
          </>
        )}
      </svg>
    );
  }
  