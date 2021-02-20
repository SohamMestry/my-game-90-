var gamestate="start"
var score=0;
var scoreboard;
function preload(){

  backGround= loadImage (
   "sprites/defaultBackground.png" 
  )

 Redninja= loadAnimation (
   "sprites/run00.png",
 "sprites/run01.png",
 "sprites/run02.png",
 "sprites/run03.png",
 "sprites/run04.png",
 "sprites/run05.png",
 "sprites/run06.png",
 "sprites/run07.png",
 "sprites/run08.png",
 "sprites/run09.png")
 red_ninja_jump_img=loadAnimation("sprites/jump00.png",
                              "sprites/jump01.png",
                              "sprites/jump02.png",
                              "sprites/jump03.png",
                              "sprites/jump04.png",
                              "sprites/jump05.png",
                              "sprites/jump06.png",
                              "sprites/jump07.png",
                              "sprites/jump08.png",
                              "sprites/jump09.png")

 obstacle1= loadImage (
   "sprites/defaultPlatform.png"
 )
 
 Gameover= loadImage(
  "sprites/blue-1278829_1920.jpg"
 )
 death= loadSound(
"sprites/death sound.mp3"
 )
 jump= loadSound(
  "sprites/jumpsound.mp3"
   )
}
function setup() {
  createCanvas(1000,600);
  Background=createSprite(500,300,1000,600)
  Background.addImage("mountain",backGround)
  Background.scale=2
  redninja=createSprite(200,400,70,70);
  redninja.addAnimation("red",Redninja)
  redninja.addAnimation("redjump",red_ninja_jump_img)
  redninja.scale= 2 ;
  redninja.setCollider("circle",0,0,20)
  redninja.debug = true

  gameoverBackground=createSprite(500,300,1000,600)
  gameoverBackground.addImage("mountain",Gameover)
  gameoverBackground.scale=1 
  gameoverBackground.visible=false

obstacleGroup=new Group()

}


function draw() {
  background(75, 255, 255);  
  text("score"+score,500,300)
  
  if (gamestate==="start"){
    redninja.visible=false
    if (keyDown("down")){
      gamestate="play"
    }
  }
  if (gamestate==="play"){
    redninja.visible=true
    spawnObstacles();
  if (keyDown("space")&&redninja.y>=350){
  redninja.changeAnimation("redjump",red_ninja_jump_img)  
  redninja.velocityY=-10
  jump.play()
  }
  //gravity
  redninja.velocityY=redninja.velocityY+0.5

if (redninja.isTouching(obstacleGroup)){
    //redninja.velocityY=0;
    redninja.velocityX=0;
    redninja.collide(obstacleGroup)
    score=score+1;
  }
  if (redninja.y>550){
    death.play()
    gamestate="end"
  }
}
if (gamestate==="end"){
redninja.destroy();
//obstacleGroup.setVelocityXEach(0)
gameoverBackground.visible=true
}
  drawSprites();
  textSize(30)
  text("score "+score,450,50)
}




function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(1000,550,10,10);
    obstacle.velocityX =-6
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1 :obstacle.y = 520;
       obstacle.scale = 0.3;
       break;
       case 2 :obstacle.y = 470;
       obstacle.scale = 0.3;
       break;
       case 3 :obstacle.y = 430;
       obstacle.scale = 0.3;
       break;
       default: break;
     }

     //assign scale and lifetime to the obstacle           
     obstacle.addImage(obstacle1);
     obstacleGroup.add(obstacle)

    obstacle.depth=redninja.depth
    redninja.depth=redninja.depth+1
    obstacle.setCollider("rectangle",0,-120,1100,50);
    obstacle.debug = true
    }


  }