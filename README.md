# Memory Card game

## Components:

- App
- CurrentScore
- BestScore
- Cards (where Cards are rendered)
- Card

## useState:

- App:
  - score, setScore (pass prop to CurrentScore and BestScore components)

## useEffect:
- App:
  - when the component mounts, use axios to fetch 12 images from the api and then send it as props to the card components

  - when score changes, setScore and update the CurrentScore and BestScore components