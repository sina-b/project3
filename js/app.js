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
    }

    render() {
        super.render();
    }

    checkCollision(enemy) {
        if (enemy.y + 50 > player.y && enemy.y - 50 < player.y) {
            if (enemy.x + 50 > player.x && enemy.x - 50 < player.x) {
                score -= 1;
                console.log('oh noo')
            }
        }
    }

    update(dt) {
        this.x += dt * this.speed
        if (this.x >= 510) {
            this.x = -100;
        }
        this.checkCollision(this);
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

    update(dt) {
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

        }
    }
}


let allEnemies = [];

const player = new Player(200, 300, 'images/char-boy.png')
const enemy1 = new Enemy(Math.random() * 184 + 50, Math.random() * 256, 'images/enemy-bug.png', 500)
const enemy2 = new Enemy(Math.random() * 184 + 50, Math.random() * 256, 'images/enemy-bug.png', 300)
let score = 10;

allEnemies.push(enemy1)
allEnemies.push(enemy2)


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
