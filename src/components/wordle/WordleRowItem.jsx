import PropTypes from "prop-types";
export default function WordleGridItem({
  content,
  isCurrentRow,
  setRowGuess,
  row,
  rowGuess,
}) {

  
  const handleChange = (e) => {
    if (e.target.value.length <= 1) {
      setRowGuess((prev) => ({
        ...prev,
        [row]: e.target.value,
      }));
    }
  };

  if (isCurrentRow) {
    return (
      <input
        className="w-20 h-20 bg-slate-500 rounded-lg text-white font-serif flex items-center justify-center text-2xl px-8 uppercase"
        value={rowGuess[row]}
        onChange={(e) => handleChange(e)}
      />
    );
  }
  return (
    <div className="w-20 h-20 bg-slate-700 rounded-lg">
      <span className="text-white font-serif h-full flex items-center justify-center text-2xl uppercase">
        {/* {content} */}
      </span>
    </div>
  );
}

WordleGridItem.propTypes = {
  content: PropTypes.string,
  isCurrentRow: PropTypes.bool,
  setRowGuess: PropTypes.func,
  row: PropTypes.number,
  rowGuess: PropTypes.string,
};
