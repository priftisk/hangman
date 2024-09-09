export default function CanvasFigure() {
  return (
    <svg width="120" height="80" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="10"
        y="10"
        width="90"
        height="60"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        rx="10" ry="10"
      />

      <polyline
        points="20,60 40,20 60,60 70,20 80,50 90,40"
        fill="none"
        stroke="#66ba56"
        strokeWidth="3"
      />
    </svg>
  );
}
