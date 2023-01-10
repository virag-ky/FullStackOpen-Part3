const Info = ({ name, number, deletePerson, id }) => {
  return (
    <div className="person-info">
      {name}: {number}
      <button className="delete" onClick={() => deletePerson(id, name)}>
        Delete
      </button>
    </div>
  );
};

export default Info;
