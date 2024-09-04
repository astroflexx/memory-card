import Card from "./Card";

function Cards({ images, handleClick }) {
  return (
    <div
      className="cards"
      style={{
        flexGrow: "1",
        padding: "1rem",
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: "16px",
      }}
    >
      {images.map((img) => (
        <Card key={img.id} {...img} onClick={handleClick} />
      ))}
    </div>
  );
}

export default Cards;
