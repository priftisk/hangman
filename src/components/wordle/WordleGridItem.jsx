import PropTypes from 'prop-types';
export default function WordleGridItem({ content }) {
  return (
    <div className="w-20 h-20 bg-slate-700 rounded-lg">
      <span className="text-white font-serif h-full flex items-center justify-center text-2xl">
        {content}
      </span>
    </div>
  );
}

WordleGridItem.propTypes = {
    content: PropTypes.string
}
