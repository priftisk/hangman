import PropTypes from "prop-types";

export default function Letter({ data, idx }) {
  const isFound = data.found;
  const animate = isFound ? "animate-flipRight origin-center" : "";
  if (data) {
    return (
      <div className="flex flex-col items-center">
        <div
          className={`bg-slate-600 lg:w-20 lg:h-32 md:w-12 md:h-20 rounded-lg items-center flex justify-center  ${animate}`}
        >
          <span
            className={`font-bold font-serif ${
              isFound ? "text-green-400" : "text-white"
            } uppercase text-[4rem]`}
          >
            {isFound ? data.letter : "?"}
          </span>
        </div>
        <span className="text-white font-bold text-lg">{idx + 1}</span>
      </div>
    );
  }
}

Letter.propTypes = {
  data: PropTypes.object,
  idx: PropTypes.number,
};
