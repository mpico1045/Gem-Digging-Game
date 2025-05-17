// ----------------
// UI Elements
// ----------------
let input, button;


// ----------------
// Game State
// ----------------
let dirtY = 110;     // top of light brown dirt layer
let targetY = 200;     // dig to 1st rock 
let digging = false;     // whether it's currently digging
let stage = 0;     // tracks position: 0 = pre, 1 = Q1
let hasClicked = false;


// ----------------
// User Input
// ----------------
let userAnswer = "";


// ----------------
// Setup UI
// ----------------
function setup() {
  createCanvas(400, 400);
  
  input = createInput();
  input.position(120,150);
  input.hide(); // hidden by default
  
  button = createButton("submit");
  button.position(270,150);
  button.mousePressed(checkAnswer);
  button.hide(); // hidden by default
}


// ----------------
// Drawing Helpers
// ----------------
function drawCrystal (x , y, size){
  quad(
  x, y - size, // top
  x - size, y, // left
  x, y + size, // bottom
  x + size, y // right
  );
}

function drawRock (x, y, size) {
  fill(100);
  ellipse(x,y,size*0.7);
}


// ----------------
// Mouse Controls
// ----------------
function mousePressed() {
  if (stage === 0 && !digging){
  digging = true; // start digging animation
  hasClicked = true;
  }
}

// ----------------
// Check Answer for Each Stage
// ----------------
function checkAnswer(){
  userAnswer = input.value();

  if (stage === 1 && (userAnswer === "3.5m" || userAnswer ===   "3.5 m")){
    stage = 2;
    digging = true; 
    targetY = 250;
  }
  
  
else if
  (stage === 3 && (userAnswer ==="3" || userAnswer ===         "one")){
  stage = 4;
  targetY = 350;
  digging = true;
}

  else if
    (stage === 5 && (userAnswer === "5.6e-4" || userAnswer       === "5.6x10^-4" || userAnswer === "5.6 x 10^-4" ||           userAnswer === "5.6 e-4" || userAnswer === "5.6 e -4")) {
    stage = 6;
    targetY = 400;
    digging = true;
    }
  
}


// ----------------
// Main Game Loop
// ----------------
function draw() {
  background(220);
  let crystalSize = 15;
  
  // --- Deep Layer ---
  fill(101,67,33);
  rect(0,110,400,400);
  
  // --- Dirt Digging Animation ---
  if(digging && dirtY < targetY) {
  dirtY+=1;
  }
  else if (digging && dirtY >= targetY){
  digging = false; 
    
    // stage progression
  if (stage === 0) { 
    stage = 1;}
  else if (stage === 2) { 
      stage = 3;}   
  else if(stage === 4) { 
      stage = 5;}
}
  
 // --- Questions ---
  if(stage === 1) {
    fill (0);
    textSize(17);
    text("BONK. Rock in the way... solve to dig!",70,80);
    fill (255);
    text("convert 350 cm to m", 120, 140);}
  
  
  if(stage === 3) {
    
    fill (0);
    textSize(17);
    text("THUNK. Another one. You got this!",70,80);
    fill (255);
    text("how many sig figs are in 7.00 X 10^2?", 90, 140);
  }
  
  if(stage === 5) {
    
    fill (0);
    textSize(17);
    text("Third time is the charm.",70,100);
    fill (255);
    text("write 0.00056 in scientific notation", 120, 140);
  }
  
  // --- Victory Message
  if (stage > 5){    
    fill (0);
    text("Congrats! You're a gem genius.", 100, 50);
    fill (0);
    text("Sparkle on, legend.", 100, 90);
  }
  
  // --- Input Visibility Control
  if (stage === 1 || stage === 3 || stage === 5){
    input.show();
    button.show();}
  else {
    input.hide();
    button.hide();}
  
  // --- surface layer (light brown)
  fill(210,180,140);
  rect(0,dirtY,400,400-dirtY);
  
  
  
  // Rock 1 & Green Crystal
  if (stage < 2) {
    drawRock(100,215,50);
  }
  
  if (stage >=2){
  fill(85, 170, 85); // green
  drawCrystal(100,215,crystalSize);
  fill(255);
  ellipse(random(95, 105), random(200, 230), 0.4, 0.4); //     sparkles
}
  
  
  // --- Rock 2 & Green Crystal
  if (stage <= 3) {
    drawRock(340,255,50); // rock 2
  }
  
  if (stage > 3){
  fill(130, 216, 230); // blue
  drawCrystal(340,255,crystalSize);
  fill(255);
  ellipse(random(335, 345), random(240, 270), 0.4, 0.4);       //sparkles
  }
  
  
  // --- Rock 3 & Green Crystal
  if (stage <= 5){
    drawRock(200,355,50);
  }
  if (stage > 5){
  fill(224, 17, 95); // red
  drawCrystal(200,355,crystalSize);
  fill(255);
  ellipse(random(195, 205), random(340, 370), 0.4, 0.4);       //sparkles
  }
  
  
  // --- Start Prompt
  if (!hasClicked){
   fill(0);
   textSize(17);
   text("Click to dig for hidden crystals!",90,80);
  }
}