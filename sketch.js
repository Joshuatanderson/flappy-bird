new p5();

let bird;
let pipes = [];
let animationCount = 0;
let gamePlaying = true;


//add game playing variable to the global scale
    //if bird hits a pipe, gamePlaying = false
    //wrap whole draw function contents in an if statement for gamePlaying

function setup(){
    createCanvas(500, 500);
    
    bird = new Bird();
    pipes.push(new Pipe())
}

function draw(){
    if(gamePlaying){
        background(50);

            //add new pipes
        if(animationCount % 70 === 0){
            pipes.push(new Pipe());
        }
            //update onscreen && remove offscreen
        for(let i = pipes.length - 1; i >= 0; i--){
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
    }
            //increment animationCount
    animationCount++;
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
        this.x = 50;
        this.r = 16

        this.gravity = .6 ;
        this.lift = -25;
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
                this.velocity *= 0.9;
                this.y += this.velocity;
            }
                //kills bird if it hits the ground
            else if(this.y > height - this.r){
                killBird();
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
        this.bottom = random(height / 2);
        this.top = random(height / 2);
        this.x = width;
        this.w = 20;
        this.speed = 5;
        this.animationCount = 0;

        this.hits = (bird) => {
                //y is in hit range
            if(bird.y < this.top || bird.y > height - this.bottom){
                    //bird x hits the x coordinate of a pipe
                if(bird.x > this.x && bird.x < this.x +this.w){
                        //highlight hit
                    bird.highlight = true;
                    setGameOver();
                    console.log(`gamePlaying: ${gamePlaying}`);
                    return true
                }
                bird.highlight = false;
            }
            bird.highlight = false;
        }

        this.update = () => {
            this.x -= this.speed;
        }

        this.show = function(){
            fill(255);
                //bottom rectangle (starts at top of screen, ends at this.bottom )
            rect(this.x, 0, this.w, this.top);
            fill('red');
                //draws rect that starts at bottom of screen, ends at the length of this.bottom
            rect(this.x, height - this.bottom, this.w, this.bottom);
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
}

killBird = () => {
    bird.velocity = 0;
}


//how to import/export?