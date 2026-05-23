function ProgressTracker({ current }) {
  return (
    <div className="progress-tracker">
      {[0, 1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`progress-node ${current >= step ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}

export default ProgressTracker;