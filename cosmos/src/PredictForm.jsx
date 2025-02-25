import React, { useState } from "react";

export default function PredictForm() {
  const [formData, setFormData] = useState({
    radius_mean: "",
    texture_mean: "",
    perimeter_mean: "",
    area_mean: "",
    smoothness_mean: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Convert form data to expected format
    const features = Object.values(formData).map(Number); // Convert values to numbers

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),  // ✅ Correct format
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPrediction("Error: Unable to fetch prediction");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Breast Cancer Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium">{key.replace("_", " ")}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Predict
        </button>
      </form>
      {prediction !== null && (
        <p className="mt-4 font-semibold text-lg">
          Prediction: {prediction === 1 ? "Cancerous" : "Non-Cancerous"}
        </p>
      )}
    </div>
  );
}