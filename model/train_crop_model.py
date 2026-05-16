"""Train and save the crop recommendation model."""

from pathlib import Path
import pickle

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "crop_dataset.csv"
MODEL_PATH = BASE_DIR / "crop_model.pkl"


def train_crop_model() -> dict:
    """Train a Random Forest crop classifier and save the model artifact."""
    data = pd.read_csv(DATASET_PATH)
    target_column = "Crop"
    X = data.drop(columns=[target_column])
    y = data[target_column]

    model = Pipeline(
        steps=[
            ("scaler", StandardScaler()),
            ("classifier", RandomForestClassifier(n_estimators=220, random_state=42)),
        ]
    )

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.34, random_state=42, stratify=y
    )
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)

    artifact = {
        "model": model,
        "accuracy": round(float(accuracy_score(y_test, predictions)), 4),
        "features": list(X.columns),
        "crops": sorted(data[target_column].unique().tolist()),
    }

    with MODEL_PATH.open("wb") as file:
        pickle.dump(artifact, file)

    return artifact


if __name__ == "__main__":
    result = train_crop_model()
    print(f"Crop model saved to {MODEL_PATH}")
    print(f"Validation accuracy: {result['accuracy'] * 100:.2f}%")
