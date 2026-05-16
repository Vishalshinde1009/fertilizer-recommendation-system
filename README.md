# 🌱 AI-Powered Fertilizer Recommendation System

An intelligent smart farming web application that recommends the best fertilizer based on soil nutrients, weather conditions, moisture level, soil type, and crop type using Machine Learning and Flask.

🔗 **Live Demo:**  
https://fertilizer-recommendation-system-xvo0.onrender.com

🔗 **GitHub Repository:**  
https://github.com/Vishalshinde1009/fertilizer-recommendation-system

---

# 📌 Project Overview

The Fertilizer Recommendation System is an AI-powered agriculture platform developed using Flask and Machine Learning. The system analyzes soil nutrients and environmental conditions to recommend the most suitable fertilizer for crops.

This project helps farmers make better fertilizer decisions, improve crop productivity, and support smart farming practices.

---

# 🚀 Features

## 🌾 Core Features

- AI-based fertilizer recommendation
- Crop recommendation system
- Soil nutrient analysis
- Weather-based recommendations
- Moisture analysis
- Fertilizer prediction using Random Forest Classifier

---

## 🔐 Authentication Features

- User Registration
- Login & Logout
- Forgot Password
- Secure Password Hashing

---

## 🌍 Smart Farming Features

- OpenWeather API Integration
- Weather Autofill
- Soil Type Selection
- Crop Type Selection
- Multi-language Support (English & Marathi)
- Voice Input Support

---

## 📊 Dashboard Features

- Prediction Analytics
- Fertilizer Usage Charts
- Interactive Dashboard
- Chart.js Graphs

---

## 📄 Additional Features

- PDF Report Download
- SQLite Database Integration
- Responsive Bootstrap 5 UI
- Modern Agriculture Theme
- Mobile Friendly Design
- Render Cloud Deployment

---

# 🛠️ Tech Stack

## Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- Chart.js

## Backend
- Python
- Flask

## Database
- SQLite

## Machine Learning
- Scikit-learn
- Random Forest Classifier
- Pandas
- NumPy

## Deployment
- GitHub
- Render

---

# 🧠 Machine Learning Models

## Fertilizer Recommendation Model

### Input Features
- Nitrogen
- Phosphorus
- Potassium
- Temperature
- Humidity
- Moisture
- Soil Type
- Crop Type

### Output
- Recommended Fertilizer

### Algorithm Used
- Random Forest Classifier

---

## Crop Recommendation Model

### Input Features
- Nitrogen
- Phosphorus
- Potassium
- Temperature
- Humidity
- Rainfall

### Output
- Recommended Crop

### Algorithm Used
- Random Forest Classifier

---

# 📂 Project Structure

```text
fertilizer-recommendation-system/
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── templates/
│   ├── index.html
│   ├── predict.html
│   ├── result.html
│   ├── dashboard.html
│   ├── login.html
│   ├── register.html
│   ├── contact.html
│   └── about.html
│
├── model/
│   ├── fertilizer_dataset.csv
│   ├── crop_dataset.csv
│   ├── train_model.py
│   ├── train_crop_model.py
│   ├── model.pkl
│   └── crop_model.pkl
│
├── database/
│   └── fertilizer.db
│
├── static/
├── app.py
├── requirements.txt
├── Procfile
├── render.yaml
├── runtime.txt
└── README.md
