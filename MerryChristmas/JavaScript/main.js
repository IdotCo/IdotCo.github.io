function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Set random horizontal position and animation properties
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 5 + 2 + 's'; // Random duration
    snowflake.style.opacity = Math.random(); // Random opacity
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px'; // Random size

    snowflake.innerHTML = '❄'; // Snowflake symbol
    document.body.appendChild(snowflake);

    // Remove the snowflake after it completes its animation
    setTimeout(() => {
        snowflake.remove();
    }, parseFloat(snowflake.style.animationDuration) * 1000);
}

// Create snowflakes continuously
setInterval(createSnowflake, 150); // One snowflake every 150ms

const revealButton = document.getElementById("reveal-button");
const cardContainer = document.querySelector(".card-container");

// Show the second button when the first button is clicked
revealButton.addEventListener("click", () => {
    cardContainer.classList.add("flip"); // Add flip class to trigger the button swap
});

// Show the first button when the second button (code) is clicked
document.querySelector(".back").addEventListener("click", () => {
    cardContainer.classList.remove("flip"); // Remove flip class to revert to the original button
});


