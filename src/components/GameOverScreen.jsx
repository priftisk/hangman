export default function GameOver({ visible, setRestartGame }) {
  if (visible)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center flex-col z-50">
        <h1 className="text-white text-6xl font-serif font-bold">GAME OVER</h1>
        <button onClick={() => setRestartGame(true)} className="bg-slate-500 p-0 rounded-md text-xl w-32 mt-12 h-14 font-serif text-white font-bold hover:bg-slate-800">RESTART</button>
      </div>
    );
}
