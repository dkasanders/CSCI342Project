import "./MetricItem.css";

const MetricItem = ({ number }) => {
  return (
    <div className="metric-item">
      <div className="number-and-text">
        <div className="number">{number}</div>
        <div className="text33">Countries</div>
      </div>
    </div>
  );
};

export default MetricItem;
