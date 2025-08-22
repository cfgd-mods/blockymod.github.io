// Ad data
const ads = [
    { name: "TEMU", color1: "#ff6b6b", color2: "#4ecdc4" },
    { name: "Alibaba", color1: "#ff7e29", color2: "#ffbf19" },
    { name: "Amazon", color1: "#ff9900", color2: "#146eb4" },
    { name: "Shein", color1: "#d60270", color2: "#f05a28" },
    { name: "Wish", color1: "#2ab1f2", color2: "#d42f77" }
];

// Track ad views and revenue
function trackView() {
    // In a real implementation, this would connect to your database
    const revenue = Math.random() * 0.5 + 0.1; // Random value between $0.10 and $0.60
    console.log(`Ad view tracked. Revenue: $${revenue.toFixed(2)}`);
    return revenue;
}

// Client-side ad functionality
document.addEventListener('DOMContentLoaded', function() {
    const supportBtn = document.getElementById('support-btn');
    const adContainer = document.getElementById('ad-container');
    const countdownEl = document.getElementById('countdown');
    const progressEl = document.getElementById('progress');
    const thankYouEl = document.getElementById('thank-you');
    const adTitleEl = document.getElementById('ad-title');
    const adLogoEl = document.getElementById('ad-logo');
    const adCounterEl = document.getElementById('ad-counter');
    
    let currentAd = 0;
    let countdown;
    let secondsLeft = 5;
    
    supportBtn.addEventListener('click', function() {
        // Hide the button and show first ad
        supportBtn.style.display = 'none';
        document.querySelector('.support-text').style.display = 'none';
        adContainer.style.display = 'block';
        
        // Show first random ad
        showRandomAd();
    });
    
    function showRandomAd() {
        // Select a random ad
        const randomAd = ads[Math.floor(Math.random() * ads.length)];
        
        // Update ad content
        adTitleEl.textContent = randomAd.name;
        adLogoEl.textContent = randomAd.name;
        adLogoEl.style.background = `linear-gradient(45deg, ${randomAd.color1}, ${randomAd.color2})`;
        
        // Update counter
        adCounterEl.textContent = `Ad ${currentAd + 1} of 2`;
        
        // Reset countdown
        secondsLeft = 5;
        countdownEl.textContent = secondsLeft + ' seconds remaining';
        progressEl.style.width = '0%';
        
        // Start the countdown
        clearInterval(countdown);
        let width = 0;
        const interval = 50;
        const totalTime = secondsLeft * 1000;
        const increment = (interval / totalTime) * 100;
        
        countdown = setInterval(function() {
            secondsLeft--;
            width += increment;
            progressEl.style.width = width + '%';
            
            if (secondsLeft >= 0) {
                countdownEl.textContent = secondsLeft + ' seconds remaining';
            }
            
            if (secondsLeft < 0) {
                clearInterval(countdown);
                
                // Send data to server to track ad view
                fetch('/api/ad-view', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                currentAd++;
                
                if (currentAd < 2) {
                    // Show next ad after a brief pause
                    setTimeout(showRandomAd, 1000);
                } else {
                    // All ads watched, show thank you message
                    setTimeout(function() {
                        adContainer.style.display = 'none';
                        thankYouEl.style.display = 'block';
                    }, 1000);
                }
            }
        }, interval);
    }
});

module.exports = { trackView };
