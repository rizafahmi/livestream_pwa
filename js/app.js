console.log("PWA Livestreaming begin");

const COLORS = [
    '#c0ffee',
    '#cacaca',
    '#1ce',
    '#ee6e73',
    '#2a9d8f',
    '#7FFFD4'
];

const randomButton = document.querySelector("#randomButton");
const body = document.querySelector('body');

changeColor(COLORS[randomNumber()]);

randomButton.addEventListener('click', function(event) {
    const randomColor = COLORS[randomNumber()];
    changeColor(randomColor);
});

function randomNumber() {
    return Math.floor(Math.random() * Math.floor(COLORS.length));
}

function changeColor(color) {
    randomButton.innerHTML = color;
    body.style.backgroundColor = color;
}


