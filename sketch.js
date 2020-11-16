
var monkey , monkey_running;
var bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var ground;
var survivalTime = 0;
var PLAY =1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(500,500);
  //creating monkey
  monkey = createSprite(100,315,10,10)
  monkey.scale = 0.1;
  monkey.addAnimation("moving",monkey_running);
 
  //creatimg ground
  ground = createSprite(400,350,1000,10);
  ground.shapeColor = "black"
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
  //creating groups
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
 // monkey.debug = true;
  monkey.setCollider("circle",0,0,300);
  
  
  
  
}


function draw() {
  background("lightblue");
  
  
  if(gameState === PLAY){
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  OBSTACLES();
  BANANA();
    
    //adding function jump
  if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12;
        
    }
  //adding gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    survivalTime = Math.ceil(frameCount/frameRate());
    
    if(bananaGroup.isTouching(monkey)){
       bananaGroup.destroyEach();
       score = score+40;
       }
    if(obstaclesGroup.isTouching(monkey)){
       gameState = END;
       }
  }
  else if(gameState === END){
           ground.velocityX = 0;
           monkey.velocityY = 0;
           obstaclesGroup.setVelocityXEach(0);
           bananaGroup.setVelocityXEach(0);
           obstaclesGroup.setLifetimeEach(-1);
           bananaGroup.setLifetimeEach(-1);
           textSize(30);
           textFont("algeria")
           fill("green");
           text("GAMEOVER!!!",250,250);
           fill("blue");
           text("press  R   to restart",0,280);
    
           if(keyDown("R")){
              restart();
              }
           }
  stroke("purple");
  textSize(15);
  fill("purple");
  text("score :  " + score,400,50)
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("survivalTime :  "+ survivalTime,100,50)
  
  
  
    
    
    monkey.collide(ground);
  
  drawSprites();
  
}

//function to create banana
function  BANANA(){
 
  if(frameCount % 130 === 0){
    var banana = createSprite(500,120,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
     }
}

//function to create obstacles

function OBSTACLES(){
  if(frameCount % 150 === 0){
    var obstacles = createSprite(500,320,10,10);
    obstacles.velocityX = -7;
    obstacles.addImage("obstacles",obstacleImage);
    obstacles.scale = 0.2;
    obstacles.lifetime = 200;
    //obstacles.debug = true;
    obstacles.setCollider("circle",0,0,200);
    obstaclesGroup.add(obstacles);
     }
}
function restart(){
  gameState = PLAY;
  text.visible = false; 
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  survivalTime = 0;
  score = 0;
}



