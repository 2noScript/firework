var fireworks = [];
var gravity;
var active = false;
var count = 0;
var tx = 2;
var ty = 10;

var xClock = 10;
const clock = document.querySelector(".clock");
console.log(clock);
const color = [
  "red",
  "blue",
  "green",
  "yellow",
  "violet",
  "orange",
  "brown",
  "white",
  "cyan",
  "pink",
];

function setup() {
  // audio.play();
  const _bg = createCanvas(windowWidth, windowHeight);
  _bg.parent("myContainer");
  gravity = createVector(0, 0.1); // khởi tạo trọng lực pháo
  colorMode(HSB);
  stroke(255);
  strokeWeight(4);
  background(0);
}

//draw là 1 vòng lặp
function draw() {
  // background(0);
  if (active) {
    colorMode(RGB);
    background(0, 0, 0, 25);
    // background("rgba(0,0,0, 0.30)");
    if (random(1) < 0.1) {
      fireworks.push(new Firework()); // 1 pháo vào trong mảng pháo
    }
    //xử lý pháo
    for (var i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();
      if (fireworks[i].done()) fireworks.splice(i, 1);
    }
  }
}

function Firework() {
  this.hu = random(255);

  // height and width default canvas
  this.firework = new Particle(random(width), height, this.hu, true);
  this.exploded = false;
  this.particles = [];

  // khi pháo hoa nổ xong
  this.done = function () {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  // cập nhật trạng thái của pháo hoa
  this.update = function () {
    //firstUpdate
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  };
  // xử lý pháo hoa nổ
  this.explode = function () {
    for (var i = 0; i < 100; i++) {
      var p = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        this.hu,
        false
      );
      this.particles.push(p);
    }
  };

  // hiển thị pháo hoa
  this.show = function () {
    if (!this.exploded) {
      this.firework.show();
    }
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].show();
    }
  };
}

/*

vector
mult 
add 
 */

setInterval(function () {
  if (xClock < 0) {
    clock.style.fontSize = 100 + "px";
    active = true;
    xClock--;
    if (xClock < -4) {
      clock.innerHTML = "";
    } else {
      clock.innerHTML = "Happy New Year 2022";
    }
  } else {
    clock.style.color = `${color[xClock - 1]}`;
    clock.innerHTML = `${xClock}`;
    xClock = xClock - 1;
  }
}, 1000);
setInterval(function () {
  count++;
  if (count > 6) count = 0;
}, 500);
function Particle(x, y, hu, firework) {
  this.pos = createVector(x, y); //vị trí cua của hạt pháo hoa

  this.firework = firework; // pháo hoa

  this.lifespan = 255; // thời gian tồn tại

  this.hu = hu;
  // this.hu = 255;

  if (this.firework) {
    this.vel = createVector(0, random(-12, -8));
  } else {
    this.vel = p5.Vector.random2D();
    if (count == 0) {
      this.vel.mult(random(0, 12));
    } else if (count == 1) {
      this.vel.mult(random(2, 12));
    } else if (count == 2) {
      this.vel.mult(random(4, 12));
    } else if (count == 3) {
      this.vel.mult(random(6, 12));
    } else if (count == 4) {
      this.vel.mult(random(8, 12));
    } else if (count == 5) {
      this.vel.mult(random(12, 12));
    } else if (count == 6) {
      this.vel.mult(random(10, 12));
    }
  }

  // print(this.vel);
  this.acc = createVector(0, 0);

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.update = function () {
    //second update
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.done = function () {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  };

  this.show = function () {
    colorMode(HSB);
    if (!this.firework) {
      strokeWeight(2);
      stroke(hu, 255, 255, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(hu, 255, 255);
    }
    point(this.pos.x, this.pos.y);
  };
}
