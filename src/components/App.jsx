import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect } from "react";
import CurrentScore from "./CurrentScore";
import BestScore from "./BestScore";
import Cards from "./Cards";

function shuffleImages(images) {
  const newImages = [...images];

  for (let i = newImages.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newImages[i], newImages[j]] = [newImages[j], newImages[i]];
  }

  return newImages;
}

function App() {
  const [score, setScore] = useState(0);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let maxScore = 0;

  // when the comp mounts, fetch the 12 images and store them

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const url = "https://pokeapi.co/api/v2/pokemon/";

        const response = await axios.get(url, {
          params: {
            limit: 12,
          },
        });

        const imagesData = response.data.results.map((result) => ({
          id: uuidv4(),
          name: result.name,
          src: result.url,
          clicked: false,
        }));

        setImages(imagesData);

        console.log(imagesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // when the score changes, update maxScore

  maxScore = Math.max(maxScore, score);

  // event handler to pass to the cards

  function handleClick(e) {
    const id = e.target.id;
    let gameOver = images.some((img) => img.id === id && img.clicked);

    console.log(id, gameOver);

    if (gameOver) {
      setImages((previousImages) =>
        previousImages.map((img) => ({ ...img, clicked: false }))
      );

      setScore(0);
    } else {
      setImages((previousImages) => {
        const newImages = previousImages.map((img) =>
          img.id === id ? { ...img, clicked: true } : { ...img }
        );

        return shuffleImages(newImages);
      });

      setScore(score + 1);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      style={{
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="container" style={{
          flexGrow: "1",
          padding: "1rem",
        }}>
          <h1 style={{ paddingBottom: "0.5rem" }}>Memory Game</h1>
          <p>
            Don&apos;t Cheat! Walter White is watching :)
          </p>
        </div>
        <section
          style={{
            padding: "1rem",
          }}
        >
          <CurrentScore score={score} />
          <BestScore score={maxScore} />
        </section>
      </div>

      <Cards images={[...images]} handleClick={handleClick} />
    </div>
  );
}

export default App;