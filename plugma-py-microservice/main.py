from fastapi import FastAPI, HTTPException
import pandas as pd
import numpy as np
import xgboost as xgb
from pydantic import BaseModel

app = FastAPI()

# 📌 Load Pre-trained XGBoost Model
model = xgb.XGBClassifier()
model.load_model("xgboost_rsvp_model.json")  # Ensure you save a trained model

# Sample Features (Modify to Match Supabase Schema)
features = ["years_of_experience", "age", "event_capacity", "is_virtual"]

# Request Model
class RSVPRequest(BaseModel):
    event_id: str

# Dummy Data (Replace with Supabase Query)
def get_event_data(event_id):
    """Simulated function to fetch event-related features from Supabase."""
    event_data = {
        "years_of_experience": np.random.randint(1, 10),
        "age": np.random.randint(18, 50),
        "event_capacity": np.random.randint(50, 500),
        "is_virtual": np.random.choice([0, 1])
    }
    return pd.DataFrame([event_data])

# Predict RSVP
@app.post("/predict")
def predict_rsvp(request: RSVPRequest):
    try:
        event_features = get_event_data(request.event_id)
        prediction = model.predict(event_features)[0]
        confidence = max(model.predict_proba(event_features)[0])  # Get highest probability
        return {"prediction": int(prediction), "confidence": round(float(confidence), 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run Server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)
