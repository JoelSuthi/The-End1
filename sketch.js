//Global Variables
var carrotImage,obstacleImage,GroundImage;
var obstacleGroup;
var background,score;
var gameState = "start";
var backImage,startIMG,finalIMG;
var carrotGroup;
function preload(){
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("walking1.png","walking2.png","walking3.png","walking4.png")
  
  carrotImage = loadImage("Carrot.png");
  obstacleImage = loadImage("Obstacle.png");
  GroundImage = loadImage("ground.jpg");
  startIMG = loadImage("bg.png");  
  finalIMG = loadImage("best.jpg");
}
function setup() {
  createCanvas(1000,600);
  backG = createSprite(300,30,20,20);
  backG.addImage(backImage);

  backG.velocityX = -6;
  backG.scale = 1.7;
  
  player = createSprite(100,50,10,10);
  player.addAnimation("running",player_running);
  player.scale = 0.6
  invisibleground = createSprite(90,500,30,5)
  invisibleground.visible = false; 
  score = 0;
 carrotGroup = new Group();
 obstacleGroup = new Group(); 
  
}


function draw(){
  if(gameState === "start"){
    image(startIMG,15,20,1500,1000);
    textSize(35);
    fill("#0020C2");
    text("Welcome To The Forest Of Life!!!",250,200);
    textSize(30);
    fill("#1B05FC");
    text("Press The Space Bar To Start",250,260);
    fill("#C70039");
    text("Collect 30 carrots to win!",250,340);
    text("and",350,385);
    text("avoid hitting rocks in a row!!",250,430);
  }
  if(gameState === "play"){
 background("white"); 
 if(score>4){
    image(finalIMG,0,0,1300,600);
    backG.destroy();
    player.destroy();
    backG.scale = 1.7;
    carrotGroup.destroyEach(); 
    obstacleGroup.destroyEach();  
    textSize(35);
    fill("blue");
    text("!!!Winner Winner Chicken Dinner!!!",400,260);
    textSize(35);
    text("Game Over",385,310);
}
if(player.scale<0.075){
  image(finalIMG,0,0,1300,600);
  backG.destroy();
  player.destroy();
  backG.scale = 1.7;
  carrotGroup.destroyEach(); 
  obstacleGroup.destroyEach();
  textSize(30);
  fill("red");
  text("You Lose!!!",400,260);
  textSize(35);
  text("GameOver",385,310);
}  
   if (backG.x < 350){
//  image(backImage,200,0,1600,400);
    backG.x = backG.width/2;
  }
   if(keyDown(UP_ARROW) && player.y >= 159){
    player.velocityY = -6 ;
  }
  player.velocityY = player.velocityY + 0.3; 
  player.collide(invisibleground);
  spawnObstacles();
  for (var i = 0; i < obstacleGroup.maxDepth(); i++) { 
    var obstacle = obstacleGroup.get(i);
    if (obstacle != null && obstacle.isTouching(player)) {
      obstacle.destroy();
       score = score-2; 
      obstacleGroup.velocityX = 0;
      }  
   }  
  carrots();
   for (var i = 0; i < carrotGroup.maxDepth(); i++) {
  var carrot = carrotGroup.get(i);
  if (carrot != null && carrot.isTouching(player)) {
    score = score + 1;
    carrot.destroy();
    
  }  

  }
  camera.position.x = player.x+400;
 //camera.position.y = backG.y+140; 
 if(gameState === "end"){
  backG.scale = 0.1;
  //carrotGroup.visibility = false;
  //obstacleGroup.visibility = false;
}
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:  "+score,player.x-100,50);
  count = 0;
  if(player.x >= 7000){
    if(score<29){
      text("!!!!!Winner Winner Chicken Dinner!!!!!",7300,200);
      player.velocityX = 2;
    }
    else{
      text("You Lose!!!!!",7300,200);
    player.velocityX = 0;
    }  
  }
 
}
}
function carrots(){

if (frameCount % 50 === 0) {
    var carrot = createSprite(1350,120,40,10);
    carrot.y = Math.round(random(200 ,600));

    carrot.addImage("carrot",carrotImage);
    carrot.scale = 0.05;
    carrot.velocityX = -7;
    carrotGroup.add(carrot);    
  }
}
function spawnObstacles(){
if(frameCount % 60 === 0){
   var obstacle = createSprite(1350,120,40,10)
    obstacle.y = Math.round(random(100,500));
    obstacle.scale = 0.2;
    obstacle.velocityX = -11;
    obstacle.addImage("obstacle",obstacleImage);
     //assign lifetime to the variable
     obstacle.setCollider("rectangle",0,0,15,15);
   
    obstacleGroup.add(obstacle);
    
}
}
function keyPressed(){
  if(keyCode = 32){
    gameState = "play";
  }
}