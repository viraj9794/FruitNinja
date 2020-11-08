  //FRUIT NINJA

  //Variables

  var PLAY=9;
  var END=7;
  
  var fruit;
  var fruitGroup;
  var fruit1Image, fruit2Image, fruit3Image, fruit4Image;
  
  var alien, alienGroup;
  var killing_alien;

  var sword;
  var swordImage;
  var swordSound;

  var gameOverImage;
  var gameOvereSound;
  
  var bg, backgroundImage;
   
  var score=0;
  
  var gameState=PLAY;

function preload(){
  
//adding fruits animated image
fruit1Image=loadImage("fruit1.png");
fruit2Image=loadImage("fruit2.png");
fruit3Image=loadImage("fruit3.png");
fruit4Image=loadImage("fruit4.png");
  
//adding alien animation
killing_alien=loadAnimation("alien1.png", "alien2.png");

//adding gameover image and sound
gameOverImage=loadImage("gameOver.jpg");
gameOverSound=loadSound("gameover.mp3");

//adding backGround image
backgroundImage=loadImage("fruitninja.jpg");
  
//adding sword image and sound
swordImage=loadImage("sword.png");
swordSound=loadSound("knifeSwooshSound.mp3");
}

  function setup(){
  createCanvas(600, 400);
    
  bg=createSprite(300, 200, 12, 12);
  bg.addImage(backgroundImage);
  bg.scale=2.2;
  
  fruitGroup=createGroup();
  alienGroup=createGroup();
  
  sword=createSprite(300, 200, 10, 10);
  sword.addImage("cutter", swordImage);
  sword.addImage("over", gameOverImage);
  //sword.addImage(gameOverImage);
  sword.scale=0.5;
  sword.setCollider("rectangle",0,0, sword.width,sword.hieght);
  
  }

    function draw(){
    background(5, 242, 250);
      
    if(gameState === PLAY){
      
      sword.x=mouseX;  
      sword.y=mouseY;
     
      if(fruitGroup.isTouching(sword)){
       fruitGroup.destroyEach();
       swordSound.play();
       score=score+1
       }
      
      fruits();
      
      alien();
      
    }  
  else if(gameState === END){
    sword.changeImage("over", gameOverImage);
    fruitGroup.setVelocityXEach=0;
    alienGroup.setVelocityXEach=0;
    alienGroup.destroyEach();
    fruitGroup.destroyEach();
    sword.x=300;
    sword.y=200;
    if(mousePressedOver(sword)){
    gameState = PLAY;
    sword.changeImage("cutter", swordImage);
    score=0;
    }
  }
    
     if(alienGroup.isTouching(sword) && gameState === PLAY){
       gameState = END;
     }
      
    drawSprites();
    fill("white");
    textSize(20);
    text("fruit sliced = ", 215, 55);
    text(score, 330, 55)
    }

function fruits(){

if(frameCount % 70 === 0){
  fruit=createSprite(615, 12, 120, 120);
  fruit.y = Math.round(random(10,390));
  fruit.velocityX=-(4+1.5*(score/5));
  fruit.lifetime=200;
  
  var rand= Math.round(random(1, 4));
  switch(rand){
    
    case 1:fruit.addImage(fruit1Image);
           fruit.scale=0.3;
           break;
    case 2:fruit.addImage(fruit2Image);
           fruit.scale=0.3;
           break;
    case 3:fruit.addImage(fruit3Image);
           fruit.scale=0.4;
           break;
    case 4:fruit.addImage(fruit4Image);
           fruit.scale=0.25;
           break;
    default: break;
  }
  fruitGroup.add(fruit);
}
}

function alien(){
  if(frameCount % 200 === 0){
  var alien=createSprite(615, 12, 120, 120);
  alien.y = Math.round(random(10,390));
  alien.velocityX = -(3+1.5*(score/5));
  alien.lifetime=200;
  alien.addAnimation("killer", killing_alien);
  alienGroup.add(alien);
  }
}