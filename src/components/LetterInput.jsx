export default function LetterInput({ onChange, value, onKeyUp }) {
  return (
    <input
      type="text"
      pattern="[A-Za-z]{1}"
      value={value}
      autoFocus
      onChange={(e) => onChange(e)}
      onKeyUp={(e) => onKeyUp(e)}
      className="bg-gray-700 rounded-lg lg:w-20 lg:h-20 md:h-14 md:w-14 text-2xl text-center text-white uppercase font-serif"
    />
  );
}
