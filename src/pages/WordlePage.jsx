import WordleGrid from "../components/wordle/WordleGrid";
import WordleInputs from "../components/wordle/WordleInputs";
import WordleLogo from "../components/wordle/WordleLogo";

export default function WordlePage() {
  const wordToGuess = "TURTLE";
  return (
    <div
      id="container"
      className="flex items-center flex-col lg:min-h-[40rem] md:min-h-[20rem] font-serif"
    >
      <WordleLogo />
      <WordleGrid wordToGuess={wordToGuess} />
      <div className="mt-10">
        <WordleInputs wordToGuess={wordToGuess}/>
      </div>
      
    </div>
  );
}
