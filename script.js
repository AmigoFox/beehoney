const beeSounds = [
    "ввзззз",
    "жжжжж",
    "ззззз",
    "бзззз",
    "жужжу",
    "жжж-жжж",
    "ззз-ззз",
    "бзз-бзз"
];

function getRandomBeeSound() {
    const randomIndex = Math.floor(Math.random() * beeSounds.length);
    return beeSounds[randomIndex];
}

const titles = document.querySelectorAll('.grid__title');


titles.forEach(title => {
    title.addEventListener('click', () => {
        title.textContent = getRandomBeeSound();
    });
});
