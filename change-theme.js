document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');

    // 1. Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        btn.textContent = '☀️';
    } else {
        btn.textContent = '🌙';
    }

    // 2. Listen for clicks to toggle the theme
    btn.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        
        const isDark = document.body.classList.contains('dark-mode');
        
        // Update button icon
        btn.textContent = isDark ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});