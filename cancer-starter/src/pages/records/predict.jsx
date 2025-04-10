import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Predict() {
  const [inputText, setInputText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null);
    setError(null);
    setLoading(true);

    try {
      // Split by comma and convert to numbers
      const numericFeatures = inputText
        .split(",")
        .map((val) => val.trim())
        .filter((val) => val !== "")
        .map((val) => parseFloat(val));

      if (numericFeatures.length !== 31) {
        throw new Error("Please enter exactly 31 numeric values, separated by commas.");
      }

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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="p-6 max-w-4xl mx-auto bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-2xl font-extrabold mb-4 text-white text-center">
    Predict Breast Cancer using AI
</h1>
      <h1 className="text-2xl font-thin mb-4 text-white text-center">
      Enter 31 feature values (comma-separated)
      </h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Test Yourself: Diagnosis - radius_mean, texture_mean, perimeter_mean, area_mean, 
smoothness_mean, compactness_mean, concavity_mean, concave points_mean, ... , 
 texture_worst, perimeter_worst, area_worst, smoothness_worst, compactness_worst, 
   concavity_worst, concave points_worst, symmetry_worst, fractal_dimension_worst, Unnamed: 32
   "
          rows="4"
          className="w-full p-20 border rounded text-gray-900"
        ></textarea>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {error && (
        <div className="mt-3 p-3 text-red-600 border border-red-500 bg-red-200 rounded">
          Error: {error}
        </div>
      )}

      {prediction && (
        <div
          className={`mt-4 p-3 text-lg font-bold text-center border rounded ${
            prediction === "Cancerous"
              ? "text-red-500 border-red-500 bg-red-300"
              : "text-green-500 border-green-500 bg-green-200"
          }`}
        >
          Prediction: {prediction}
        </div>
      )}
    {/* </div>
  );
} */}


<p>Click below to navigate to the home page:</p>

{/* Buttons for Navigation with Inline Styling */}
<button 
  onClick={() => navigate('/')} 
  className="w-full p-2 bg-purple-500 text-white rounded hover:bg-green-700"
>
  Go to Home Page
</button>
    </div>
  );
}