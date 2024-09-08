import PropType from "prop-types";
export default function KeyboardLetter({ letter, disabled, selected }) {
  const bgColor = selected ? "bg-green-400" : "bg-slate-700";
  const borderColor = disabled ? "border-red-400" : "border-black";
  if (letter) {
    return (
      <div
        id={`letter-${letter}`}
        className={`${bgColor} w-14 h-14 border-2 ${borderColor} flex items-center justify-center ${
          disabled ? "hidden" : "visible"
        }`}
      >
        <span className="font-bold text-lg text-white font-serif">
          {letter}
        </span>
      </div>
    );
  }
}
KeyboardLetter.propTypes = {
  letter: PropType.string.isRequired,
  disabled: PropType.bool,
  selected: PropType.bool,
};
