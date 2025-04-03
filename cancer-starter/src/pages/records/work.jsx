import { useState } from "react";

const work = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: "What is React?", answer: "React is a JavaScript library for building user interfaces.", open: false },
    { id: 2, question: "How does useState work?", answer: "useState is a Hook that allows you to manage state in a functional component.", open: false },
  ]);

  const toggleAnswer = (id) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, open: !q.open } : q));
  };

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const addQuestion = () => {
    if (newQuestion && newAnswer) {
      setQuestions([...questions, { id: questions.length + 1, question: newQuestion, answer: newAnswer, open: false }]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Q&A Section</h2>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Enter a question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Enter an answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded">Add Question</button>
      </div>
      <div>
        {questions.map(({ id, question, answer, open }) => (
          <div key={id} className="border-b py-2">
            <button className="text-left w-full font-semibold text-lg" onClick={() => toggleAnswer(id)}>
              {question}
            </button>
            {open && <p className="text-gray-700 mt-2">{answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default work;
