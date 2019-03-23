new p5();

let bird;
let pipes = [];
let animationCount = 0;
let gamePlaying = true;


//add game playing variable to the global scale
    //if bird hits a pipe, gamePlaying = false
    //wrap whole draw function contents in an if statement for gamePlaying

//fix bird hitbox
//add score window that shows animation count
//add gameOver screen
//add increasing difficulty

function setup(){
    createCanvas(500, 500);
    
    bird = new Bird();
    pipes.push(new Pipe());
    scoreBoard = new ScoreBoard('inGame');

    textFont();
    textSize(20);
    textAlign(CENTER, CENTER);
}

function draw(){
    if(gamePlaying){
        background(50);

            //add new pipes
        if(animationCount % 70 === 0 && animationCount !== 0){
            pipes.push(new Pipe());
        }
            //update onscreen && remove offscreen
        for(let i = pipes.length - 1; i >= 0; i--){
                //run hit function
            if(pipes[i].hits(bird)){
                console.log('HIT');
            }

            pipes[i].show();
            pipes[i].update();
            if(pipes[i].offScreen()){
                pipes.splice(i, 1);
            }
            
        }
            //bird
        bird.update();
        bird.show(); 

            //scoreboard
        scoreBoard.update();
        scoreBoard.show();

        //increment animationCount
        animationCount++;
    } 
        //endGame
        else {
        background(50);
        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
        }
        bird.update();
        bird.show();
        gameOverBoard();
    }
            
}

        //listens for space, activates bird.up
    function keyPressed() {
        if(key === ' '){
            bird.up();
            console.log('space');
        }
    }

    function Bird() {
        this.y = height / 2;
        this.x = 75;
        this.r = 16;

        this.gravity = .6 ;
        this.lift = -23;
        this.velocity = 0;

        this.highlight = false;

        this.setFill = function (){
            if(this.highlight){
                fill('red');
            }
            else{
                fill(200);
            }
        }

        this.up = function(){
            this.velocity = 0;
            this.velocity += this.lift;
            // console.log(this.velocity);
        }

            //shows bird
        this.show = () => {
            noStroke();
            this.setFill();
            circle(this.x, this.y, this.r)
        }
            //updates bird's position and velocity
        this.update = () => {
                //if bird is flying, sets stats
            if(this.y < height - this.r && this.y > 0 + this.r ){
                this.velocity += this.gravity;
                    //adds air resistance
                this.velocity *= 0.91;
                this.y += this.velocity;
            }
                //kills bird if it hits the ground
            else if(this.y > height - this.r){
                setGameOver();
            } 
                //makes bird bounce off ceiling
            else if (this.y < 0 + this.r){
                this.velocity = 1;
                this.velocity *= 0.9;
                this.y += this.velocity;
            }
        }
    }

    function Pipe(){
        this.space = 150;
        this.top = random(height / 2);
        console.log(this.top);
            //sets this.bottom
        this.bottom = this.top + this.space;
        console.log(this.bottom);
        this.x = width;
        this.w = 20;
        this.speed = 5;
         
        this.hits = (bird) => {
                //y is in hit range
            if(bird.y + bird.r < this.top || bird.y + bird.r > this.bottom){
                    //end game if bird hits
                if(bird.x + bird.r > this.x && bird.x + bird.r < this.x + this.w){
                        //highlight hit
                    bird.highlight = true;
                    setGameOver();

                    let hitCoordinates = {
                        birdX: bird.x,
                        birdY: bird.y,
                        pBottom: this.bottom,
                        pTop: this.top,
                    }
                    console.log(hitCoordinates);
                    return true;
                }
                bird.highlight = false;
                    //didn't hit
                return false;
            }
            bird.highlight = false;
                //didn't hit
            return false;
        }

        this.update = () => {
            this.x -= this.speed;
        }

        this.show = function(){
            fill(200);
                //top rectangle (starts at top of screen, ends at this.bottom )
            rect(this.x, 0, this.w, this.top);
            fill(200); 
                //draws bottom rectangloe
            rect(this.x, this.bottom, this.w, height - this.bottom);
        }
            //removes offscreen pipe
        this.offScreen = () => {
            if(this.x < 0 - this.w){
                return true;
            }
        }
        //a pipe has a width set to a const var
        //a pipe pair has a height set to random * height / 2

        //each pipe pair should contain two objects that 
}

setGameOver = () =>{
    gamePlaying = false;
    // bird.velocity = -1;
}

function ScoreBoard(state){
    this.w = 100;
    this.h = 80;
    this.padding = 20;
    this.points = 0;
    
    this.setText = function(state){
        if (state === 'inGame' || state === 'gameOver'){
            this.text = this.points;
        }
        else{
            this.text = 'new game';
        }
    }
    
        //set inGame location
    if(state === 'inGame'){
        this.x = width - this.padding - this.w / 2;
        this.y = 0 + this.padding + this.h / 2;
    }
    else if(state === 'gameOver'){
        this.x = width / 2;
        this.y = height / 2;
        this.w = 120;
    }
    else if(state === 'gameOverText'){
        this.x = width / 2;
        this.y = height / 2 + this.h + this.padding;
        this.w = 120;
    }

    this.show = function(){
        this.setText(state);
        fill('rgba(0, 0, 0, .7)');
        rectMode(CENTER); //sets rect mode to be center based
        rect(this.x, this.y, this.w, this.h);
        rectMode(CORNER); //resets rectMode
        fill(255);
            //tick score up by one for each 5 animations
        text(`${this.text}`, this.x, this.y)
    }
        //tick up points
    this.update = function (){
        this.points = Math.floor(animationCount / 25);
            //sets text
        this.setText(state);
    }
}

function gameOverBoard(){
        //darken bg
    gameOverBG();
    
        //draw final scoreboard
    let score = new ScoreBoard('gameOver');
    score.update();
    score.show();

        //final score text
    text('final score:', score.x, score.y + score.h + score.padding);
    newGameBtn();

}

function gameOverBG(){
    fill('rgba(0, 0, 0, .5)');
    rect(0, 0, width, height);
}

function newGameBtn(){
    let btn = new ScoreBoard('gameOverText');
    btn.show();
    //reset game
    mouseClicked = () => {
        if(gamePlaying === false){
            resetGame()
        }
    }
}

    //returns random integer between min and max
function getRandomIntInRange(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

//how to import/export?

//reset game
function resetGame(){
    pipes = [];
    animationCount = 0;
    gamePlaying = true;
    setup();
}