export default function StartScreen({ numQuestions, children }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      {children}
    </div>
  );
}
