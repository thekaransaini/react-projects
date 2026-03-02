import useQuiz from "../hooks/useQuiz";

export default function StartScreen({ children }) {
  const { numQuestions } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      {children}
    </div>
  );
}
