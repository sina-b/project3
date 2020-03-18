class Element {
    constructor(x = 0, y = 0, sprite = '') {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


class Enemy extends Element {
    constructor(x , y, sprite, speed) {
        super(x, y)
        this.speed = speed;
        this.sprite = sprite;
        this.collisionDistance = 75;
    }

    render() {
        super.render();
    }

    checkCollision(enemy) {
        if ((Math.pow((enemy.x - player.x), 2) + Math.pow((enemy.y - player.y), 2)) < Math.pow((this.collisionDistance), 2)) {
            currentScore -= 1;
            score.innerHTML = currentScore;
        }
    }

    update(dt) {
        if (!pause) {
            this.x += dt * this.speed
            if (this.x >= 510) {
                this.x = -100;
            }
            this.checkCollision(this);
        }
    }
}


class Player extends Element {
    constructor(x , y, sprite) {
        super(x, y)
        this.sprite = sprite;
    }

    render() {
        super.render();
    }

    checkWin(player) {
        if (player.y === 0){
            pause = true;
            modalAppear('Good game, you won!');
        }
    }

    checkDeath() {
        if (currentScore <= 0) {
            pause = true;
            modalAppear('Oh no, you lost');
        }
    }

    update(dt) {
        this.checkWin(this);
        this.checkDeath();
    }

    handleInput(key) {
        switch(key) {
            case 'up':
                this.y -= 20;
                if (this.y < 0) {
                    this.y = 0;
                }
                break

            case 'down':
                this.y += 20;
                if (this.y > 420 ) {
                    this.y = 420;
                }
                break

            case 'left':
                this.x -= 20;
                if (this.x < 0) {
                    this.x = 0;
                }
                break

            case 'right':
                this.x += 20;
                if (this.x > 420) {
                    this.x = 420;
                }
                break
            case 'space':
                pauseGame();
                break;
        }
    }
}

//create the modal
let modalAppear = function(message) {
    $(document).ready(function () {
        $('#modal-popup').modal('show');
        });
    document.querySelector(".message").innerHTML = message;
    document.querySelector(".currentScore").innerHTML = currentScore;
    closeModal();
  };

let pauseGame = function() {
    if (!pause) {
        pause = true;
    }
    else {
        pause = false;
    }
};

//close modal
function closeModal() {
    button.addEventListener("click", function() {
      $('#modal-popup').modal('hide');
      location.reload()
    });
  }


let allEnemies = [];

const player = new Player(200, 300, 'images/char-boy.png')
const enemy1 = new Enemy(Math.random() * 184 + 50, Math.random() * 256, 'images/enemy-bug.png', 500)
const enemy2 = new Enemy(Math.random() * 184 + 50, Math.random() * 256, 'images/enemy-bug.png', 300)
const score = document.querySelector(".score");
const button = document.querySelector(".play-again");

let pause = false;
let currentScore = 10;

allEnemies.push(enemy1)
allEnemies.push(enemy2)


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
    };

    player.handleInput(allowedKeys[e.keyCode], pause);
});
