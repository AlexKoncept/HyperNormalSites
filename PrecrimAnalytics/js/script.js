document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll for navigation links
    document.querySelectorAll('header a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for sticky header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dashboard Simulations ---

    // Simulate Risk Score Update
    const riskScoreElement = document.getElementById('risk-score');
    const riskIconElement = riskScoreElement ? riskScoreElement.nextElementSibling : null;

    if (riskScoreElement && riskIconElement) {
        setInterval(() => {
            let currentScore = parseInt(riskScoreElement.textContent);
            let change = Math.floor(Math.random() * 5) - 2; // -2 to +2
            let newScore = Math.min(100, Math.max(0, currentScore + change)); // Keep between 0-100

            riskScoreElement.textContent = newScore + '%';

            // Update class and icon based on score
            riskScoreElement.classList.remove('risk-high', 'risk-medium', 'risk-low');
            riskIconElement.classList.remove('fa-arrow-up', 'fa-arrow-down', 'fa-minus');

            if (newScore > 75) {
                riskScoreElement.classList.add('risk-high');
                if (change > 0) riskIconElement.classList.add('fa-arrow-up');
                else if (change < 0) riskIconElement.classList.add('fa-arrow-down');
                else riskIconElement.classList.add('fa-minus');
            } else if (newScore > 40) {
                riskScoreElement.classList.add('risk-medium');
                 if (change > 0) riskIconElement.classList.add('fa-arrow-up');
                else if (change < 0) riskIconElement.classList.add('fa-arrow-down');
                else riskIconElement.classList.add('fa-minus');
            } else {
                riskScoreElement.classList.add('risk-low');
                 if (change > 0) riskIconElement.classList.add('fa-arrow-up');
                else if (change < 0) riskIconElement.classList.add('fa-arrow-down');
                else riskIconElement.classList.add('fa-minus');
            }
        }, 3000); // Update every 3 seconds
    }

    // Simulate Stats Update
    const monitoredIndividualsElem = document.getElementById('monitored-individuals');
    const activeAlertsElem = document.getElementById('active-alerts');
    const highRiskCountElem = document.getElementById('high-risk-count');

    if (monitoredIndividualsElem && activeAlertsElem && highRiskCountElem) {
        setInterval(() => {
            monitoredIndividualsElem.textContent = (parseInt(monitoredIndividualsElem.textContent) + Math.floor(Math.random() * 3) -1).toLocaleString();
            activeAlertsElem.textContent = Math.max(0, parseInt(activeAlertsElem.textContent) + Math.floor(Math.random() * 3) -1);
            highRiskCountElem.textContent = Math.max(0, parseInt(highRiskCountElem.textContent) + Math.floor(Math.random() * 2) -1);
        }, 5000); // Update every 5 seconds
    }

    // Simulate Alert Feed Update
    const alertFeedElement = document.getElementById('alert-feed');
    if (alertFeedElement) {
        const sampleAlerts = [
            "Analyse de sentiment négatif détectée pour Sujet #55XG02.",
            "Sujet #91HY12 : Augmentation de la fréquence de posts sur forums marginaux.",
            "Déplacement non autorisé de Sujet #33LK89 en zone Z-4.",
            "Pic d'activité nocturne pour Sujet #02MN65.",
            "Interaction nouvelle entre Sujet #77VB34 et individu à risque connu."
        ];
        setInterval(() => {
            const newAlertText = sampleAlerts[Math.floor(Math.random() * sampleAlerts.length)];
            const newLi = document.createElement('li');
            const time = new Date();
            const timestamp = `${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}`;
            newLi.innerHTML = `<span class="timestamp">${timestamp}</span> ${newAlertText}`;
            
            alertFeedElement.prepend(newLi); // Add to top
            if (alertFeedElement.children.length > 5) {
                alertFeedElement.removeChild(alertFeedElement.lastChild); // Keep feed size limited
            }
        }, 7000); // New alert every 7 seconds
    }

    // Simulate Heatmap (very basic CSS grid version if no image is used)
    const heatmapContainer = document.getElementById('heatmap-container');
    if (heatmapContainer && !heatmapContainer.style.backgroundImage) { // Only if no placeholder image
        heatmapContainer.innerHTML = ''; // Clear "loading" text
        for (let i = 0; i < 100; i++) { // 10x10 grid
            const cell = document.createElement('div');
            heatmapContainer.appendChild(cell);
        }
        const cells = heatmapContainer.children;
        setInterval(() => {
            for (let i = 0; i < cells.length; i++) {
                const randomValue = Math.random();
                let color;
                if (randomValue > 0.9) color = 'rgba(255, 0, 0, 0.8)';   // Hot
                else if (randomValue > 0.7) color = 'rgba(255, 165, 0, 0.7)'; // Warm
                else if (randomValue > 0.4) color = 'rgba(255, 255, 0, 0.6)'; // Medium
                else color = 'rgba(0, 128, 0, 0.5)';    // Cool
                cells[i].style.backgroundColor = color;
            }
            // Add a more prominent "hotspot"
            const hotIndex = Math.floor(Math.random() * cells.length);
            cells[hotIndex].style.backgroundColor = 'rgba(255,0,0,1)';
            cells[hotIndex].style.transform = 'scale(1.1)';
            setTimeout(() => { cells[hotIndex].style.transform = 'scale(1)';}, 200);

        }, 2500); // Update heatmap colors
    } else if (heatmapContainer) {
        // If using an image, clear loading text after a delay
        setTimeout(() => {
            heatmapContainer.querySelector('p').style.display = 'none';
        }, 1500);
    }

    console.log("PreCrime Analytics Mockup Initialized.");
});