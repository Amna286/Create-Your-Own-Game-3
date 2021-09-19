var alien, alienImage, asteroid, asteroidImage, comet, cometImage, meteor, meteorImage;
var spaceship, spaceshipImage;
var backgroundImage, bg;
var alienGroup, asteroidGroup, meteorGroup;
var play, end;
var gameState = "play";
var score = 0;

function preload() {
  spaceshipImage = loadImage("images/spaceship.png");
  alienImage = loadImage("images/alien.png");
  asteroidImage = loadImage("images/asteroid.png");
  backgroundImage = loadImage("images/background1.jpg");
  cometImage = loadImage("images/comet.png");
  meteorImage = loadImage("images/meteor.png");
}

function setup() {
  createCanvas(1000, 850);
  bg = createSprite(500, 450, 1000, 900);
  bg.addImage(backgroundImage);
  bg.velocityY = 5;

  spaceship = createSprite(600, 650);
  spaceship.addImage(spaceshipImage);
  spaceship.scale = 0.4;

  alienGroup = new Group();
  asteroidGroup = new Group();
  meteorGroup = new Group();
}

function draw() {
  background(255, 255, 255);

  if(bg.y > 500) {
    bg.y = 250;
  }

  text("Score: " + score, 10, 10);

  if(gameState === "play") {
    if(keyDown("LEFT_ARROW")) {
      spaceship.x = spaceship.x - 5;
    }
    if(keyDown("RIGHT_ARROW")) {
      spaceship.x = spaceship.x + 5;
    }
 
    if(meteorGroup.isTouching(spaceship) || alienGroup.isTouching(spaceship)) {
      gameState = "end";
    }

    spawnAliens();
    spawnAsteroids();
    spawnMeteors();
  }
  else if(gameState === "end") {
    meteorGroup.destroyEach();
    alienGroup.destroyEach();
    meteorGroup.setVelocityYEach(0);
    alienGroup.setVelocityYEach(0);
  }

  drawSprites();
}

function spawnMeteors() {
  if(frameCount % 180 === 0) {
    meteor = createSprite(Math.round(random(100, 900)), -50);
    meteor.addImage(meteorImage);
    meteor.velocityY = 3;
    meteor.scale = 0.1;
    meteor.lifetime = 800;
    meteorGroup.add(meteor);
  }
}

function spawnAliens() {
  if(frameCount % 150 === 0) {
    alien = createSprite(Math.round(random(0, 1000)), -50);
    alien.addImage(alienImage);
    alien.velocityY = 4;
    alien.scale = 0.1;
    alien.lifetime = 800;
    alienGroup.add(alien);
  }
}

function spawnAsteroids() {
  if(frameCount % 150 === 0) {
    asteroid = createSprite(Math.round(random(100, 900)), -50);
    asteroid.addImage(asteroidImage);
    asteroid.velocityY = 2;
    asteroid.scale = 0.1;
    asteroid.lifetime = 800;
    asteroidGroup.add(asteroid);
  }
}