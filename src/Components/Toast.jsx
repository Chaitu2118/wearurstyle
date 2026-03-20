function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast">
      {message}
      <button className="toast-close" onClick={onClose}>
        ✖
      </button>
    </div>
  );
}

export default Toast;
