import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Generate Dummy Data (Replace with Supabase Data)
np.random.seed(500)
data = pd.DataFrame({
    "years_of_experience": np.random.randint(1, 10, 1000),
    "age": np.random.randint(18, 50, 1000),
    "event_capacity": np.random.randint(50, 500, 1000),
    "is_virtual": np.random.choice([0, 1], 1000),
    "rsvp_yes": np.random.choice([0, 1], 1000)  # Target variable
})

# Train-Test Split
X = data.drop(columns=["rsvp_yes"])
y = data["rsvp_yes"]
# Convert back to numpy arrays for better matrix operations
X = X.to_numpy()
y = y.to_numpy()
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = xgb.XGBClassifier(use_label_encoder=False, eval_metric="logloss")
model.fit(X_train, y_train)

# Evaluate Model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Save Model
model.save_model("xgboost_rsvp_model.json")
