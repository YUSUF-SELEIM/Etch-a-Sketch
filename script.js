// Globals
var mode = "normal";
// DOMS
var gridContainer = document.getElementById("grid-container");
var sliderOutput = document.getElementById("slider");
var sliderValue = document.getElementById("sliderValue");
var colorPickerValue = document.getElementById("picker-value");
var eraserButton = document.getElementById("eraser-button");
var randomButton = document.getElementById("random-button");
var colorModeButton = document.getElementById("color-button");
var checkBoxButton = document.getElementById("checkbox-value");

var mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//Actions
sliderOutput.oninput = function () {
    gridContainer.innerHTML = "";
    sliderValue.innerHTML = this.value + " X " + this.value;
    setupGrid(this.value);
};

eraserButton.onclick = () => (mode = "erase");
colorModeButton.onclick = () => (mode = "normal");
randomButton.onclick = () => (mode = "random");
checkBoxButton.onchange = () => {
    if (checkBoxButton.checked) {
        gridContainer.classList.add("border-the-children");
    } else {
        gridContainer.classList.remove("border-the-children");
    }
};

// functions
function setupGrid(size) {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement("div");
        gridElement.addEventListener("mouseover", changeColor);
        gridElement.addEventListener("mousedown", changeColor);
        gridContainer.appendChild(gridElement);
    }
}
function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) {
        return; // do not draw if mouse is not down whilst it is over the grid
        // draw only when mouse is pressed and on the grid
    } else if (mode === "erase") {
        e.target.style.background = "white";
    } else if (mode === "normal") {
        e.target.style.background = colorPickerValue.value;
    } else if (mode === "random") {
        e.target.style.background = getRandomColor();
    }
}
function setGridByDefaultSize() {
    setupGrid(16);
    sliderValue.innerHTML = "16 X 16";
}
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
setGridByDefaultSize();
