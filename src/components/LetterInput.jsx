export default function LetterInput({ onChange, value, onKeyUp }) {
  return (
    <input
      type="text"
      pattern="[A-Za-z]{1}"
      value={value}
      onChange={(e) => onChange(e)}
      onKeyUp={(e) => onKeyUp(e)}
      className="bg-gray-700 rounded-lg w-20 h-20 text-2xl text-center text-white uppercase"
    />
  );
}
