export default function GeneralInstructions() {
  return (
    <div className="general-instructions">
      <section className="instruction-section">
        <h2>📌 General Instructions</h2>
        <p>
          Please read the following instructions carefully before starting the
          quiz. These instructions are designed to help you understand the quiz
          structure, navigation, and scoring rules.
        </p>
      </section>
      <section className="instruction-section">
        <h3>🧭 Question Status Legend</h3>
        <p>
          The question palette on the right side of the screen displays the
          status of each question using different colored buttons:
        </p>
        <ul className="status-legend-info">
          <li>
            <button
              type="button"
              className="nav-btn not-visited"
              aria-label="Question not visited"
              disabled
            >
              34
            </button>
            <span>Question not visited</span>
          </li>
          <li>
            <button
              type="button"
              className="nav-btn not-answered"
              aria-label="Question visited but not answered"
              disabled
            >
              1
            </button>
            <span>Question visited but not answered</span>
          </li>
          <li>
            <button
              type="button"
              className="nav-btn answered"
              aria-label="Question answered"
              disabled
            >
              0
            </button>
            <span>Question answered</span>
          </li>
        </ul>
      </section>
      <section className="instruction-section">
        <h3>🧮 Marking Scheme & Negative Marking</h3>
        <ul>
          <li>
            Each question carries a specific number of points, which may vary
            (10, 20, 30, or 50 points).
          </li>
          <li>
            A negative marking of <strong>30%</strong> is applied for every
            incorrect answer.
            <br />
            <em>
              Example: If a question is worth 10 points, then 3 points will be
              deducted for an incorrect answer.
            </em>
          </li>
          <li>No marks are deducted for unattempted questions.</li>
        </ul>
      </section>
      <section className="instruction-section">
        <h3>⚠️ Answer Submission Rules</h3>
        <ul>
          <li>Once you select an option, you cannot change your answer.</li>
          <li>
            All options will be disabled immediately after selection, so choose
            carefully.
          </li>
          <li>
            After selecting an option:
            <ul>
              <li>
                The correct answer will be highlighted in this&nbsp;
                <strong className="btn-option correct">color.</strong>
              </li>
              <li>
                Incorrect option(s) will be highlighted in this&nbsp;
                <strong className="btn-option wrong">color.</strong>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section className="instruction-section">
        <h3>🎯 Difficulty Level Selection</h3>
        <ul>
          <li>
            You can choose the difficulty level based on your proficiency in
            React:
            <strong> Easy, Medium, Hard, Very Hard</strong>.
          </li>
          <li>
            Each level is designed to test different depths of understanding.
          </li>
        </ul>
      </section>
      <section className="instruction-section">
        <h3>⏱️ Quiz Duration & Questions</h3>
        <ul>
          <li>
            Each section contains a total of <strong>15 questions</strong>.
          </li>
          <li>
            A time limit of <strong>7 minutes 30 seconds</strong> is associated
            with every section.
          </li>
          <li>
            When the timer expires, the quiz will end automatically and your
            responses will be submitted.
          </li>
        </ul>
      </section>
      <section className="instruction-section">
        <h3>📊 Progress Tracking</h3>
        <ul>
          <li>
            A progress bar is displayed at the top of the screen and moves
            forward as you navigate to the next question.
          </li>
          <li>
            Below the progress bar, you can see the current question number and
            your live score updated in real time.
          </li>
        </ul>
      </section>
      <section className="instruction-section">
        <h3>🔁 Navigation Controls</h3>
        <ul>
          <li>
            You can navigate between questions using the <strong>Next</strong>{" "}
            and
            <strong> Previous</strong> buttons.
          </li>
          <li>
            You may move back and forth between questions within the allotted
            time.
          </li>
          <li>
            Once an answer is submitted, it cannot be modified even if you
            return to that question.
          </li>
        </ul>
      </section>
      <section className="instruction-section final-note">
        <h3>✅ Final Note</h3>
        <p>
          Manage your time effectively and review the question palette to avoid
          missing any questions.
        </p>
        <p>
          Click <strong>Start Quiz</strong> only when you are ready.
        </p>
        <p>
          <strong>Best of luck, and happy coding! 🚀</strong>
        </p>
      </section>
    </div>
  );
}
