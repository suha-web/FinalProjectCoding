let img1, img2, img3, img4, img5;
let Sound;

let scaleFactor = 0.5; //current zoom
let minScale = 0.5; //min zoom
let maxScale = 4; //max zoom

let worldOffsetX = 0;
let worldOffsetY = 0; //moves the world instead of the screen 

let canvasW = 2000;
let canvasH = 2000; //canavs width and hight

let Zoom1 = 1; //switch img1 and img2
let Zoom2 = 1.5;
let Zoom3 = 2;
let Zoom4 = 2.5;

let dragging = false; //are you currently zooming 
let lastMouseX, lastMouseY; //kast mouse position

function preload() {
  img1 = loadImage("Layer1.png"); 
  img2 = loadImage("Layer2.png");
  img3 = loadImage("Layer3.png");
  img4 = loadImage("Layer4.png");
  img5 = loadImage("Layer5.png");
  Sound = loadSound("WhiteNoise.mp3");
  //loads the images and sound
}

function setup() {
  createCanvas(windowWidth, windowHeight);
} //creates canvas 

function draw() {
  background(16, 12, 23); //colour of the background 
  constrainPan(); // camera doesnt go outside of the bounds (contraint the drag)
 
  translate(width / 2, height / 2); //center of the canavs

  scale(scaleFactor); //zoom into the center

  translate(worldOffsetX, worldOffsetY); //moves the world baes on the drag

  imageMode(CENTER); //centers the image

  if (scaleFactor < Zoom1) {
    image(img1, 0, 0, 2000, 2000);
  }
   else if (scaleFactor < Zoom2) {
    image(img2, 0, 0, 2000, 2000); //changes the image based on the zoom
  } 
  else if (scaleFactor < Zoom3) {
    image(img3, 0, 0, 2000, 2000); 
  }
  else if (scaleFactor < Zoom4) {
    image(img4, 0, 0, 2000, 2000); 
  }
  else {
     image(img5, 0, 0, 2000, 2000); 
  }
}

function mouseWheel(event) {
  let zoomSpeed = 0.001; //controls the zoom speed
  let oldScale = scaleFactor; //restore the original zoom

  scaleFactor -= event.delta * zoomSpeed; // adjust the zoom based on zoom direction
  scaleFactor = constrain(scaleFactor, minScale, maxScale); //keeps zoom within limits

  let scaleChange = scaleFactor / oldScale; //calculates how much zoom 

  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  worldOffsetX -= mx * (scaleChange - 1) / scaleFactor;
  worldOffsetY -= my * (scaleChange - 1) / scaleFactor; //zoom towards the mouse cursor


  return false; // prevents page scrolling
}

function mousePressed() {
    userStartAudio(); // unlocks audio

  if (!Sound.isPlaying()) {
    Sound.loop(); // Loops the audio
  }
  
  dragging = true;
  lastMouseX = mouseX;
  lastMouseY = mouseY; //starts dragining and stores mouse position
}

function mouseReleased() {
  dragging = false; //stops draginig
}

function mouseDragged() {
  if (dragging) { //Only move if dragging
    let dx = mouseX - lastMouseX;
    let dy = mouseY - lastMouseY; //how much the mouse has moved 

    worldOffsetX += dx / scaleFactor;
    worldOffsetY += dy / scaleFactor; //move by that amount

    lastMouseX = mouseX;
    lastMouseY = mouseY; //update mouse position
  }
}


function constrainPan() {
  let scaledW = canvasW * scaleFactor;
  let scaledH = canvasH * scaleFactor;

  let limitX = max(0, (scaledW - width) / 2) / scaleFactor;
  let limitY = max(0, (scaledH - height) / 2) / scaleFactor;

  worldOffsetX = constrain(worldOffsetX, -limitX, limitX);
  worldOffsetY = constrain(worldOffsetY, -limitY, limitY); // prevents dragginig of the edge and zooming of the edge
}


