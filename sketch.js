var die;
var dieImage;
var endLine;
var death = 0;
var life;
var death1,death2,death3;
var monkey_collided;
var peelImage;
var score = 0;
var jungle,jungleImage;
var play = 0;
var end= 1;
var gamestate = play;
var survivalTime = 0;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var invisibleground;
function preload(){
  
  monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("sprite_2.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
  peelImage = loadImage("peel.png");
  life = loadImage("life.png");
  dieImage = loadImage("die.png")
}

function setup() {
  createCanvas(displayWidth-100,displayHeight-40);
  
  jungle = createSprite(800,220);
  jungle.addImage(jungleImage);
  jungle.scale = 1.6;
  
  monkey = createSprite(displayHeight-700,200);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.4;
  //monkey.debug = true;
  monkey.setCollider("rectangle",0,0,300,550,40)
  
  invisibleground = createSprite(displayHeight/2,620,1000,5);
  invisibleground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  death1 = createSprite(20,20,10,10);
  death1.addImage(life);
  death1.scale = 0.25;
  death2 = createSprite(50,20,10,10);
  death2.addImage(life);
  death2.scale = 0.25;
  death3 = createSprite(80,20,10,10);
  death3.addImage(life);
  death3.scale = 0.25;
  
  endLine = createSprite(0,200,5,400);
  endLine.visible = false;
  
  die = createSprite(displayWidth/2,displayHeight/2);
  die.addImage(dieImage);
  die.visible = false;
  die.scale = 1;
}

function draw() {
  background(0);
  
  if(gamestate === play) {
    if(frameCount % 15 === 0) {
      survivalTime = survivalTime + 1;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
    
    jungle.velocityX = -7;
    
    food();
    obstacles();
    
    //console.log(monkey.y);
    if(keyDown("space") && monkey.y > 342) {
      monkey.velocityY = -19;
    }
  
    if(obstacleGroup.isTouching(monkey)) {
      gamestate = end;
      death1.visible = false;
      death2.visible = false;
      death3.visible = false;
      
      monkey.velocityY = 0;
    }
    
    if(foodGroup.isTouching(monkey)) {
      score = score + 1;
      foodGroup.destroyEach();
      var peel = createSprite(monkey.x+70,550);
      peel.addImage(peelImage);
      peel.scale = 0.5;
      peel.velocityX = -7;
      peel.lifetime = 50;
    }
    
    if(foodGroup.isTouching(endLine)) {
      foodGroup.destroyEach();
      death = death + 1;
    }
    
    if(death === 1) {
      death3.visible = false;
    } else if(death === 2) {
       death2.visible = false;
    } else if(death === 3) {
       death1.visible = false;
    } 
    
  } else if(gamestate === end) {
      jungle.velocityX = 0;
    
      monkey.changeAnimation("collided",monkey_collided);
    
      die.visible = true;
     
      foodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
    
      foodGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
    }
  
  monkey.collide(invisibleground);
  
  if(jungle.x < 550){
    jungle.x = 800;
  }
  
  drawSprites();
  
  stroke("black");
  fill("black");
  
  textSize(20);
  text("survival  time : " + survivalTime,220,50)
  text("score : " + score,10,50)
}

function food () {
  if(frameCount % 120 === 0) {
    var banana = createSprite(displayWidth+100,Math.round(random(130,200)))
    banana.velocityX = -18;
    banana.lifetime = 300;
    banana.scale = 0.2;
    banana.addImage(bananaImage);
    foodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount % 310 === 0) {
    var obstacle = createSprite(displayWidth+100,500)
    obstacle.velocityX = -18;
    obstacle.lifetime = 300;
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,185);  
    obstacle.scale = random(0.4,0.5);
    obstacle.addImage(obstaceImage);
    obstacleGroup.add(obstacle);
  }
}