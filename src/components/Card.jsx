// the images are not working lol just play the game with the names, while Mr White watches you :)

function Card({ id, src, name, onClick }) {
  return (
    <div className="card" id={id} onClick={onClick} style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <img src="https://shorturl.at/UKcKf" alt={name} id={id} style={{
        height: "100%",
        width: "100%",
        objectFit: "contain",
      }}/>
      <h2 id={id}>{name[0].toUpperCase() + name.slice(1)}</h2>
    </div>
  );
}

export default Card;
