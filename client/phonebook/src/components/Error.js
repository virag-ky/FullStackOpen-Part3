const Error = ({ error }) => {
  if (error === '') {
    return <div id="error-container"></div>;
  }
  return (
    <div id="error-container">
      <p id="error">{error}</p>
    </div>
  );
};

export default Error;
