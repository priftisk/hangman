import PropType from "prop-types";
export default function KeyboardLetter({ letter, disabled, selected }) {
  const bgColor = selected ? "bg-green-400" : "bg-slate-700";
  
  if (letter) {
    return (
      <div
        id={`letter-${letter}`}
        className={`${bgColor} w-14 h-14 bg-slate-700 flex items-center justify-center border-r-2 ${
          disabled ? "hidden" : "visible"
        }`}
      >
        <span className="font-bold text-2xl text-white font-serif">
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
