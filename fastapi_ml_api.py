from fastapi import FastAPI
import pickle
import numpy as np
from pydantic import BaseModel
import os

# ✅ Corrected file path (use raw string or double backslashes)
model_path = r"C:\Users\I3 10TH GEN\Desktop\cancerPrediction\model.pkl"

# ✅ Load the trained model with error handling
try:
    with open(model_path, "rb") as file:
        model = pickle.load(file)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None  # Prevent crashes if model fails to load

# ✅ Define input data model
class InputData(BaseModel):
    features: list[float]  # Expecting a list of numerical features

# ✅ Initialize FastAPI app
app = FastAPI()

@app.get("/")
def home():
    return {"message": "Breast Cancer Prediction API is running!"}

@app.post("/predict")
def predict(data: InputData):
    if model is None:
        return {"error": "Model is not loaded. Check logs for errors."}

    # ✅ Check if model has 'n_features_in_'
    if not hasattr(model, "n_features_in_"):
        return {"error": "Model does not have 'n_features_in_' attribute. Check your model!"}

    # ✅ Validate feature count
    if len(data.features) != model.n_features_in_:
        return {"error": f"Expected {model.n_features_in_} features, but got {len(data.features)}"}

    # ✅ Convert input to numpy array
    input_array = np.array(data.features, dtype=np.float64).reshape(1, -1)

    # ✅ Make prediction
    prediction = model.predict(input_array)

    return {"prediction": int(prediction[0])}
