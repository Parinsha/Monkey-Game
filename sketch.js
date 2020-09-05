var back,backImg;
var ground;
var player,player_running;
var banana,bananaImage,bananaGroup;
var stone,obstacleImage,obstacleGroup;
var score;
function preload()
{
  backImg = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup() 
{
  
  createCanvas(500, 400);
  
  back = createSprite(0,0,500,400);
  back.addImage("jungle.jpg",backImg);
  back.x = back.width/2;
  back.velocityX = -6;

  ground = createSprite(250,380,500,10);
  
  player= createSprite(10,360,10,10);
  player.addAnimation("running",player_running);
  player.scale = 0.1
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
}

function draw() 
{
  
  background(220);
  //player collide with ground
  player.collide(ground);
  //score depth more than background depth
  back.depth = score.depth;
  score.depth = score.depth + 1;
  //moving background
  if (back.x < 0)
  {
    back.x = back.width/2;
  }
  //making player jump
  if(keyDown("space"))
  {
    player.velocityY = -12;
  }
  //adding gravity when monkey jumps
  player.velocityY = player.velocityY + 0.8;
  //adding score
  if (player.isTouching(bananaGroup))
  {
    score = score + 1;
    bananaGroup.destroyEach();
  }
  //resetting player size
  if(obstacleGroup.isTouching(player))
  {
    player.scale = 0.08;
  }
  //adding to player's size
  switch(score)
  {
    case 10: player.scale = 0.12;
             break;
    case 20: player.scale = 0.14;
             break;
    case 30:player.scale = 0.16;
             break;
    case 40:player.scale = 0.18;
             break;
    default:break;
  }
   
  SpawnObstacles();
  SpawnBananas();
  drawSprites();
  //text color,size,and message
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score, 400,20);
}
function SpawnObstacles()
{
   if(frameCount % 100 === 0) 
   {
    stone = createSprite(500,360,70,30);
    stone.velocityX = -4;
    stone.addImage("stone.png",obstacleImage);
    stone.scale = 0.1;
    stone.lifetime = 300;
    obstacleGroup.add(stone);
   }  
} 

function SpawnBananas()
{
   if(frameCount % 125 === 0) 
   {
    banana = createSprite(500,250,70,30);
    banana.velocityX = -4;
    banana.addImage("banana.png",bananaImage);
    banana.scale = 0.05;
    banana.lifetime = 300;
    bananaGroup.add(banana);
   }  
} 