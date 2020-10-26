//Create variables here
var sdog;
var dog,database,happyDog,foodS,foodStock;
function preload()
{
  //load images here
  dog=loadImage("images/dogImg1.png");
  happyDog=loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(500, 500);
  sdog=createSprite(250,250,20,20);
  sdog.addImage(dog);
  sdog.scale=0.25;
  database=firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  

}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(DOWN_ARROW)){
    writeStock(foodS);
    sdog.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  textSize(25);
  fill("blue");
  text("STOCK:"+ foodS,200,400);
  fill("yellow");
  text("Press Down Arrow To Feed Legend Milk!",30,50);
  if(foodS===0){
    fill("red");
    text("PLEASE REFILL!",150,100);
    sdog.addImage(dog);
  }
}


function readStock(data){
   foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}



