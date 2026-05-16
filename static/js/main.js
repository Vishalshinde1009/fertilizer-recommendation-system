// Main browser behavior for validation, language switching, weather, and voice input.
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("pageLoader");
    if (loader) {
        window.setTimeout(() => loader.classList.add("hidden"), 350);
    }

    // Bootstrap validation keeps empty and invalid fields from submitting.
    document.querySelectorAll(".needs-validation").forEach((form) => {
        form.addEventListener("submit", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add("was-validated");
        });
    });

    setupLanguageToggle();
    setupThemeToggle();
    setupScrollReveal();
    setupWeatherAutofill();
    setupVoiceInput();
});

// Small translation dictionary for English and Marathi labels.
const translations = {
    en: {
        nav_home: "Home",
        nav_predict: "Predict",
        nav_dashboard: "Dashboard",
        nav_about: "About",
        nav_contact: "Contact",
        hero_title: "Smart AI Fertilizer Recommendation System",
        hero_text: "Analyze soil nutrients, weather, crop type, and moisture to recommend the best fertilizer with machine learning.",
        get_recommendation: "Get Recommendation",
        learn_more: "Learn More",
    },
    mr: {
        nav_home: "मुख्यपृष्ठ",
        nav_predict: "शिफारस",
        nav_dashboard: "डॅशबोर्ड",
        nav_about: "माहिती",
        nav_contact: "संपर्क",
        hero_title: "स्मार्ट AI खत शिफारस प्रणाली",
        hero_text: "मातीतील पोषकद्रव्ये, हवामान, पीक प्रकार आणि ओलावा वापरून योग्य खताची शिफारस मिळवा.",
        get_recommendation: "शिफारस मिळवा",
        learn_more: "अधिक जाणून घ्या",
    },
};

function setupLanguageToggle() {
    const button = document.getElementById("languageToggle");
    if (!button) return;

    let currentLanguage = localStorage.getItem("fertiaiLanguage") || "en";
    applyLanguage(currentLanguage);

    button.addEventListener("click", () => {
        currentLanguage = currentLanguage === "en" ? "mr" : "en";
        localStorage.setItem("fertiaiLanguage", currentLanguage);
        applyLanguage(currentLanguage);
    });
}

function applyLanguage(language) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    const button = document.getElementById("languageToggle");
    if (button) {
        button.textContent = language === "en" ? "मराठी" : "English";
    }
}

function setupThemeToggle() {
    const button = document.getElementById("themeToggle");
    if (!button) return;

    const savedTheme = localStorage.getItem("fertiaiTheme") || "light";
    applyTheme(savedTheme);

    button.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        localStorage.setItem("fertiaiTheme", nextTheme);
        applyTheme(nextTheme);
    });
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const button = document.getElementById("themeToggle");
    if (button) {
        const icon = theme === "dark" ? "fa-sun" : "fa-moon";
        button.innerHTML = `<i class="fa-solid ${icon}"></i>`;
        button.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
}

function setupScrollReveal() {
    const revealItems = document.querySelectorAll(".scroll-reveal, .feature-card, .insight-tile, .advice-card, .glass-panel, .side-panel");
    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => observer.observe(item));
}

function setupWeatherAutofill() {
    const button = document.getElementById("weatherButton");
    const cityInput = document.getElementById("weatherCity");
    const message = document.getElementById("weatherMessage");
    if (!button || !cityInput || !message) return;

    document.querySelectorAll(".quick-city").forEach((quickButton) => {
        quickButton.addEventListener("click", () => {
            cityInput.value = quickButton.dataset.city || "";
            button.click();
        });
    });

    button.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) {
            message.textContent = "Please enter a city.";
            message.className = "small mt-2 text-danger";
            return;
        }

        button.disabled = true;
        message.textContent = "Fetching weather...";
        message.className = "small mt-2 text-muted";

        try {
            const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Weather request failed.");

            document.getElementById("Temperature").value = Number(data.temperature).toFixed(1);
            document.getElementById("Humidity").value = Number(data.humidity).toFixed(1);
            const place = [data.city, data.admin, data.country].filter(Boolean).join(", ");
            message.textContent = `Filled weather for ${place} using ${data.source}.`;
            message.className = "small mt-2 text-success";
        } catch (error) {
            message.textContent = error.message;
            message.className = "small mt-2 text-danger";
        } finally {
            button.disabled = false;
        }
    });
}

function setupVoiceInput() {
    const button = document.getElementById("voiceButton");
    if (!button) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        button.disabled = true;
        button.innerHTML = '<i class="fa-solid fa-microphone-slash me-2"></i>Voice Unavailable';
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    button.addEventListener("click", () => {
        button.innerHTML = '<i class="fa-solid fa-wave-square me-2"></i>Listening...';
        recognition.start();
    });

    recognition.addEventListener("result", (event) => {
        const text = event.results[0][0].transcript.toLowerCase();
        fillNumberFromSpeech(text, "nitrogen", "Nitrogen");
        fillNumberFromSpeech(text, "phosphorus", "Phosphorus");
        fillNumberFromSpeech(text, "potassium", "Potassium");
        fillNumberFromSpeech(text, "temperature", "Temperature");
        fillNumberFromSpeech(text, "humidity", "Humidity");
        fillNumberFromSpeech(text, "moisture", "Moisture");
    });

    recognition.addEventListener("end", () => {
        button.innerHTML = '<i class="fa-solid fa-microphone me-2"></i>Voice Input';
    });
}

function fillNumberFromSpeech(text, spokenLabel, inputId) {
    const pattern = new RegExp(`${spokenLabel}\\s+(\\d+(?:\\.\\d+)?)`);
    const match = text.match(pattern);
    const input = document.getElementById(inputId);
    if (match && input) {
        input.value = match[1];
    }
}
