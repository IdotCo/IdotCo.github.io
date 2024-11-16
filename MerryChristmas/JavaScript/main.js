// JavaScript to reveal the special Christmas message
function showSpecialMessage() {
    const messageDiv = document.getElementById('special-message');
    messageDiv.classList.toggle('hidden');
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
    snowflake.style.animationDuration = Math.random() * 5 + 2 + 's'; // Random fall duration
    snowflake.style.opacity = Math.random(); // Random opacity
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px'; // Random size

    snowflake.innerHTML = '❄'; // Snowflake symbol
    document.body.appendChild(snowflake);

    // Remove the snowflake after the animation ends
    setTimeout(() => {
        snowflake.remove();
    }, parseFloat(snowflake.style.animationDuration) * 1000); // Matches animation duration
}

setInterval(createSnowflake, 150); // Create a new snowflake every 300ms
