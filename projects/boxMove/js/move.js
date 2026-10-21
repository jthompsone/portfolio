// Get Player area
const getElementPlayer = document.getElementById("player");
let playerStyle = window.getComputedStyle(getElementPlayer);
const playerWidth = getElementPlayer.clientWidth;
const playerHeight = getElementPlayer.clientHeight;

// Get Ground area
// Raw Ground Area
const getElementGround = document.getElementById("ground");
const elementRawGroundWidth = getElementGround.clientWidth;
const elementRawGroundHeight = getElementGround.clientHeight;
// Safe Ground Area
const elementSafeGroundWidth = elementRawGroundWidth - playerWidth;
const elementSafeGroundHeight = elementRawGroundHeight - playerHeight;

// Player Position Limits
const minXLeft = 0;
const maxXRight = elementSafeGroundWidth;
const minYTop = 0;
const maxYBottom = elementSafeGroundHeight;

// Movement Speed
const movementSpeed = 10;
const invertMovement = -1;
const setXMove = elementRawGroundWidth / movementSpeed;
const setYMove = elementRawGroundHeight / movementSpeed;

// Get Player Position
let getPlayerX = getElementPlayer.offsetLeft;
let getPlayerY = getElementPlayer.offsetTop;

// Set Player Position
const setPlayerLeft = (xMove) => {
    let leftValue = playerStyle.getPropertyValue("left").replace("px", "");
    let myLeft = Number(leftValue) + xMove;
    getElementPlayer.style.left = `${myLeft}px`;
    getPlayerX = getElementPlayer.offsetLeft;
};
const setPlayerTop = (yMove) => {
    let topValue = playerStyle.getPropertyValue("top").replace("px", "");
    let myTop = Number(topValue) + yMove;
    getElementPlayer.style.top = `${myTop}px`;
    getPlayerY = getElementPlayer.offsetTop;
};

// Movement
const moveUp = () => {
    if (getPlayerY <= minYTop) console.log("Up Limit Reached");
    else setPlayerTop(setYMove * invertMovement);
};

const moveDown = () => {
    if (getPlayerY >= maxYBottom) console.log("Down Limit Reached");
    else setPlayerTop(setYMove);
};

const moveLeft = () => {
    if (getPlayerX <= minXLeft) console.log("Left Limit Reached");
    else setPlayerLeft(setXMove * invertMovement);
};

const moveRight = () => {
    if (getPlayerX >= maxXRight) console.log("Right Limit Reached");
    else setPlayerLeft(setXMove);
};

const init = () => {
    document.body.addEventListener("keydown", function (event) {
        const key = event.key;
        switch (key) {
            case "ArrowUp":
            case "w":
            case "W":
                console.log("Move Up");
                moveUp();
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                console.log("Move Left");
                moveLeft();
                break;
            case "ArrowDown":
            case "s":
            case "S":
                console.log("Move Down");
                moveDown();
                break;
            case "ArrowRight":
            case "d":
            case "D":
                console.log("Move Right");
                moveRight();
                break;
        }
        console.log(`Player Coordinates: (${getPlayerX}, ${getPlayerY})`);
    });
};

window.onload = init;
