# from fastapi import FastAPI
# import pickle
# import numpy as np
# from pydantic import BaseModel
# import os
# from fastapi.middleware.cors import CORSMiddleware
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Change this to your frontend URL for security
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # ✅ Corrected file path (use raw string or double backslashes)
# model_path = r"C:\Users\I3 10TH GEN\Desktop\cancerPrediction\model.pkl"

# # ✅ Load the trained model with error handling
# try:
#     with open(model_path, "rb") as file:
#         model = pickle.load(file)
#     print("✅ Model loaded successfully!")
# except Exception as e:
#     print(f"❌ Error loading model: {e}")
#     model = None  # Prevent crashes if model fails to load

# # ✅ Define input data model
# class InputData(BaseModel):
#     features: list[float]  # Expecting a list of numerical features

# # ✅ Initialize FastAPI app


# @app.get("/")
# def home():
#     return {"message": "Breast Cancer Prediction API is running!"}

# @app.post("/predict")
# def predict(data: InputData):
#     if model is None:
#         return {"error": "Model is not loaded. Check logs for errors."}

#     # ✅ Check if model has 'n_features_in_'
#     if not hasattr(model, "n_features_in_"):
#         return {"error": "Model does not have 'n_features_in_' attribute. Check your model!"}

#     # ✅ Validate feature count
#     if len(data.features) != model.n_features_in_:
#         return {"error": f"Expected {model.n_features_in_} features, but got {len(data.features)}"}

#     # ✅ Convert input to numpy array
#     input_array = np.array(data.features, dtype=np.float64).reshape(1, -1)

#     # ✅ Make prediction
#     prediction = model.predict(input_array)

#     return {"prediction": int(prediction[0])}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np
from pydantic import BaseModel
import os

# ✅ Initialize FastAPI
app = FastAPI()

# ✅ Add CORS Middleware (before defining routes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change this to your frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load model (ensure file exists)
model_path = r"C:\Users\I3 10TH GEN\Desktop\cancerPrediction\model.pkl"

if not os.path.exists(model_path):
    print(f"❌ Model file not found at {model_path}")
    model = None
else:
    try:
        with open(model_path, "rb") as file:
            model = pickle.load(file)
        print("✅ Model loaded successfully!")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        model = None

# ✅ Define input data model
class InputData(BaseModel):
    features: list[float]  # Expecting a list of numerical features

@app.get("/")
def home():
    return {"message": "Breast Cancer Prediction API is running!"}

@app.post("/predict")
def predict(data: InputData):
    if model is None:
        return {"error": "Model is not loaded. Check logs for errors."}

    # ✅ Validate feature count
    if len(data.features) != model.n_features_in_:
        return {"error": f"Expected {model.n_features_in_} features, but got {len(data.features)}"}

    # ✅ Convert input to numpy array
    input_array = np.array(data.features, dtype=np.float64).reshape(1, -1)

    # ✅ Make prediction
    prediction = model.predict(input_array)

    return {"prediction": int(prediction[0])}

