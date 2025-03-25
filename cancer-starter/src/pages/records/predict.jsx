import { useState } from "react";

export default function Predict() {
  const [features, setFeatures] = useState(Array(31).fill("")); // Store 31 inputs
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change for each feature
  const handleChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert inputs to numbers, use 0 if empty
      const numericFeatures = features.map((val) =>
        val.trim() ? parseFloat(val.trim()) : 0
      );

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: numericFeatures }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch prediction: ${response.statusText}`);
      }

      const data = await response.json();
      setPrediction(data.prediction === 1 ? "Cancerous" : "Non-Cancerous");
    } catch (error) {
      console.error("Error predicting:", error);
      setPrediction(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-white text-center">
       put the correct data 
      </h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Grid layout for inputs */}
        <div className="grid grid-cols-4 gap-2">
          {features.map((value, index) => (
            <input
              key={index}
              type="number"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`F${index + 1}`}
              className="p-2 border rounded text-center w-full"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-700 mt-3"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>
      {prediction && (
        <div
          className={`mt-4 p-3 text-lg font-bold text-center border rounded
          ${prediction === "Cancerous" ? "text-red-500 border-red-500 bg-red-300" : "text-green-500 border-green-500 bg-green-200"}`}
        >
          Prediction: {prediction}
        </div>
      )}
    </div>
  );
}
