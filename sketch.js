let x = 0;
let r = 20;

function setup(){
    createCanvas(500, 500);
    background(50);
}

function draw(){
    background(50);
    noStroke();
    circle(50, val, r);
    fill('red');
    setDirection(x, 5);
}