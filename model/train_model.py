"""Train and save the fertilizer recommendation model.

This script is intentionally beginner-friendly: it loads the CSV dataset,
encodes text columns, trains a Random Forest model, and saves every artifact
Flask needs inside model.pkl.
"""

from pathlib import Path
import pickle

import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder


# Paths are resolved from this file so the script works from any terminal folder.
BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "fertilizer_dataset.csv"
MODEL_PATH = BASE_DIR / "model.pkl"


def train_model() -> dict:
    """Train the RandomForestClassifier and return training metadata."""
    data = pd.read_csv(DATASET_PATH)

    # Split input features from the fertilizer label.
    target_column = "Fertilizer_Name"
    X = data.drop(columns=[target_column])
    y = data[target_column]

    numeric_features = [
        "Nitrogen",
        "Phosphorus",
        "Potassium",
        "Temperature",
        "Humidity",
        "Moisture",
    ]
    categorical_features = ["Soil_Type", "Crop_Type"]

    # OneHotEncoder converts soil/crop text into model-readable numeric columns.
    preprocessor = ColumnTransformer(
        transformers=[
            ("categorical", OneHotEncoder(handle_unknown="ignore"), categorical_features),
            ("numeric", "passthrough", numeric_features),
        ]
    )

    # A pipeline keeps preprocessing and prediction together in one artifact.
    model = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("classifier", RandomForestClassifier(n_estimators=180, random_state=42)),
        ]
    )

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, random_state=42, stratify=y
    )
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)

    artifact = {
        "model": model,
        "accuracy": round(float(accuracy), 4),
        "features": list(X.columns),
        "soil_types": sorted(data["Soil_Type"].unique().tolist()),
        "crop_types": sorted(data["Crop_Type"].unique().tolist()),
        "fertilizers": sorted(data[target_column].unique().tolist()),
    }

    with MODEL_PATH.open("wb") as file:
        pickle.dump(artifact, file)

    return artifact


if __name__ == "__main__":
    result = train_model()
    print(f"Model saved to {MODEL_PATH}")
    print(f"Validation accuracy: {result['accuracy'] * 100:.2f}%")
