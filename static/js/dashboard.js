// Dashboard chart renders fertilizer prediction counts from Flask-provided data.
document.addEventListener("DOMContentLoaded", () => {
    const chartCanvas = document.getElementById("fertilizerChart");
    if (!chartCanvas || !window.Chart) return;

    new Chart(chartCanvas, {
        type: "bar",
        data: {
            labels: window.fertilizerLabels || [],
            datasets: [
                {
                    label: "Predictions",
                    data: window.fertilizerCounts || [],
                    backgroundColor: ["#20a45a", "#8dc63f", "#14723f", "#7a5a32", "#66bb6a", "#0b321f"],
                    borderRadius: 8,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0 },
                },
            },
        },
    });
});
