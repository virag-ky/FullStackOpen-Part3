const Notification = ({ message }) => {
  if (message === '') {
    return <div id="success-container"></div>;
  }
  return (
    <div id="success-container">
      <p id="success">{message}</p>
    </div>
  );
};

export default Notification;
