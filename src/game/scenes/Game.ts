import { Input, Scene } from 'phaser';
import { ambientMusic } from '../ambientMusic';

type Enemy = Phaser.Physics.Arcade.Sprite & { patrolLeft?: number; patrolRight?: number };
type Obstacle = Phaser.Physics.Arcade.Sprite & { kind?: 'pipe' | 'brick' | 'question'; used?: boolean; mark?: Phaser.GameObjects.Text };
type PlatformSpec = { x: number; y: number; width: number; height: number };
type LevelSpec = {
    name: string; sky: number; far: number; near: number; ground: number; trim: number; sun: number;
    platforms: PlatformSpec[]; coins: [number, number][]; enemies: [number, number, number][];
    obstacles: { x: number; y: number; kind: 'pipe' | 'brick' | 'question' | 'spikes' }[];
    spinners: [number, number];
};

const LEVELS: LevelSpec[] = [
    {
        name: 'ZIELONA DOLINA', sky: 0x86ddff, far: 0x9ad49c, near: 0x61bd79, ground: 0x8a512f, trim: 0x56c96c, sun: 0xffe27a,
        platforms: [
            { x: 480, y: 520, width: 960, height: 40 }, { x: 1480, y: 520, width: 1040, height: 40 }, { x: 2510, y: 520, width: 380, height: 40 },
            { x: 290, y: 395, width: 150, height: 24 }, { x: 680, y: 330, width: 145, height: 24 }, { x: 1030, y: 425, width: 150, height: 24 },
            { x: 1260, y: 350, width: 140, height: 24 }, { x: 1690, y: 405, width: 150, height: 24 }, { x: 1980, y: 325, width: 150, height: 24 }, { x: 2290, y: 405, width: 150, height: 24 },
        ],
        coins: [[240, 450], [300, 350], [360, 278], [650, 390], [700, 285], [750, 390], [1010, 370], [1070, 380], [1250, 305], [1300, 305], [1660, 350], [1720, 350], [1960, 280], [2020, 280], [2260, 350], [2320, 350], [2440, 440]],
        enemies: [[560, 500, 760], [1810, 1580, 1900]],
        obstacles: [{ x: 440, y: 476, kind: 'pipe' }, { x: 820, y: 360, kind: 'question' }, { x: 870, y: 360, kind: 'brick' }, { x: 2050, y: 476, kind: 'pipe' }, { x: 2380, y: 502, kind: 'spikes' }],
        spinners: [1450, 2700],
    },
    {
        name: 'PUSTYNIA SŁOŃCA', sky: 0xffbd75, far: 0xf1a05e, near: 0xd77b49, ground: 0xb56b3b, trim: 0xf1c167, sun: 0xfff0ac,
        platforms: [
            { x: 470, y: 520, width: 940, height: 40 }, { x: 1480, y: 520, width: 880, height: 40 }, { x: 2560, y: 520, width: 480, height: 40 },
            { x: 270, y: 420, width: 130, height: 24 }, { x: 570, y: 350, width: 135, height: 24 }, { x: 850, y: 285, width: 130, height: 24 },
            { x: 1110, y: 390, width: 150, height: 24 }, { x: 1350, y: 315, width: 135, height: 24 }, { x: 1710, y: 405, width: 145, height: 24 },
            { x: 1980, y: 335, width: 145, height: 24 }, { x: 2240, y: 270, width: 135, height: 24 }, { x: 2490, y: 395, width: 145, height: 24 },
        ],
        coins: [[240, 465], [270, 375], [570, 305], [600, 305], [830, 240], [870, 240], [1080, 350], [1140, 350], [1340, 270], [1380, 270], [1680, 360], [1740, 360], [1960, 290], [2010, 290], [2220, 225], [2260, 225], [2470, 350], [2520, 350], [2640, 450]],
        enemies: [[520, 460, 730], [1830, 1660, 1920]],
        obstacles: [{ x: 440, y: 476, kind: 'pipe' }, { x: 900, y: 502, kind: 'spikes' }, { x: 1430, y: 355, kind: 'question' }, { x: 1750, y: 476, kind: 'pipe' }, { x: 2080, y: 502, kind: 'spikes' }, { x: 2480, y: 476, kind: 'pipe' }],
        spinners: [1500, 2700],
    },
    {
        name: 'ZAMEK NA KSIĘŻYCU', sky: 0x202c59, far: 0x354277, near: 0x414c87, ground: 0x525b76, trim: 0x87d4ce, sun: 0xe0edff,
        platforms: [
            { x: 470, y: 520, width: 940, height: 40 }, { x: 1480, y: 520, width: 880, height: 40 }, { x: 2560, y: 520, width: 480, height: 40 },
            { x: 290, y: 395, width: 135, height: 24 }, { x: 540, y: 325, width: 130, height: 24 }, { x: 800, y: 390, width: 125, height: 24 },
            { x: 1030, y: 305, width: 135, height: 24 }, { x: 1280, y: 370, width: 130, height: 24 }, { x: 1640, y: 405, width: 140, height: 24 },
            { x: 1900, y: 330, width: 140, height: 24 }, { x: 2170, y: 265, width: 135, height: 24 }, { x: 2430, y: 390, width: 140, height: 24 },
        ],
        coins: [[265, 350], [300, 350], [520, 280], [560, 280], [790, 345], [830, 345], [1010, 260], [1050, 260], [1260, 330], [1300, 330], [1610, 360], [1660, 360], [1870, 285], [1920, 285], [2130, 220], [2180, 220], [2400, 350], [2450, 350], [2640, 455]],
        enemies: [[620, 480, 740], [1760, 1600, 1900]],
        obstacles: [{ x: 440, y: 476, kind: 'pipe' }, { x: 900, y: 502, kind: 'spikes' }, { x: 1380, y: 360, kind: 'question' }, { x: 1710, y: 476, kind: 'pipe' }, { x: 2070, y: 502, kind: 'spikes' }, { x: 2470, y: 476, kind: 'pipe' }],
        spinners: [1480, 2700],
    },
];

export class Game extends Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private solidObstacles!: Phaser.Physics.Arcade.StaticGroup;
    private hazards!: Phaser.Physics.Arcade.StaticGroup;
    private enemies!: Phaser.Physics.Arcade.Group;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private keys!: { a: Phaser.Input.Keyboard.Key; d: Phaser.Input.Keyboard.Key; w: Phaser.Input.Keyboard.Key };
    private coins!: Phaser.Physics.Arcade.Group;
    private score = 0;
    private lives = 3;
    private invulnerableUntil = 0;
    private scoreLabel!: Phaser.GameObjects.Text;
    private livesLabel!: Phaser.GameObjects.Text;
    private readonly levelWidth = 4700;
    private levelIndex = 0;
    private level!: LevelSpec;

    constructor() {
        super('Game');
    }

    create(data: { levelIndex?: number; score?: number } = {}) {
        this.levelIndex = Math.max(0, Math.min(data.levelIndex ?? 0, LEVELS.length - 1));
        this.level = LEVELS[this.levelIndex];
        ambientMusic.setTheme(this.levelIndex);
        this.score = data.score ?? 0;
        this.lives = 3;
        this.invulnerableUntil = 0;
        this.createTextures();
        this.physics.world.setBounds(0, 0, this.levelWidth, 540);
        this.physics.world.gravity.y = 1050;
        this.cameras.main.setBounds(0, 0, this.levelWidth, 540);
        this.cameras.main.setBackgroundColor(this.color(this.level.sky));
        this.drawBackground();

        this.platforms = this.physics.add.staticGroup();
        this.level.platforms.forEach(({ x, y, width, height }) => this.addPlatform(x, y, width, height));
        // A long final stretch gives each world room for a second wave of hazards and rewards.
        this.addPlatform(3200, 520, 1000, 40);
        this.addPlatform(4200, 520, 1000, 40);
        this.createObstacles();

        this.player = this.physics.add.sprite(90, 430, 'hero').setDepth(5);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.02);
        this.player.setSize(28, 40).setOffset(10, 8);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.solidObstacles, this.handleBlockHit, undefined, this);
        this.physics.add.overlap(this.player, this.hazards, () => this.loseLife());
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);

        this.coins = this.physics.add.group({ allowGravity: false, immovable: true });
        this.level.coins.forEach(([x, y]) => this.coins.create(x, y, 'bitcoin-token'));
        [[2920, 430], [2990, 360], [3060, 430], [3200, 350], [3370, 290], [3540, 430], [3710, 360], [3890, 300], [4050, 430], [4280, 360], [4440, 300], [4570, 430]].forEach(([x, y]) => this.coins.create(x, y, 'bitcoin-token'));
        this.tweens.add({ targets: this.coins.getChildren(), scaleX: 0.55, duration: 520, yoyo: true, repeat: -1, ease: 'Sine.InOut' });
        this.physics.add.overlap(this.player, this.coins, (_player, coin) => {
            coin.destroy();
            ambientMusic.playCoin();
            this.score += 10;
            this.updateScoreLabel();
        });

        this.enemies = this.physics.add.group({ allowGravity: true });
        this.level.enemies.forEach(([x, left, right]) => this.addEnemy(x, 475, left, right));
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.enemies, this.solidObstacles);
        this.physics.add.collider(this.player, this.enemies, this.handleEnemyContact, undefined, this);

        this.add.image(4610, 434, 'flag').setDepth(2);
        this.add.text(4580, 370, 'META', { fontFamily: 'Arial Black, sans-serif', fontSize: '16px', color: '#fff', stroke: '#704525', strokeThickness: 4 }).setOrigin(0.5).setDepth(3);

        this.cursors = this.input.keyboard!.createCursorKeys();
        this.keys = {
            a: this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.A),
            d: this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.D),
            w: this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.W),
        };
        this.scoreLabel = this.add.text(24, 20, `ETAP ${this.levelIndex + 1}/3  •  ${this.score.toString().padStart(3, '0')}`, { fontFamily: 'Arial Black, sans-serif', fontSize: '19px', color: '#fff', stroke: '#352b45', strokeThickness: 5 }).setScrollFactor(0).setDepth(20);
        this.livesLabel = this.add.text(936, 20, '♥ ♥ ♥', { fontFamily: 'Arial Black, sans-serif', fontSize: '20px', color: '#ff4f67', stroke: '#563226', strokeThickness: 4 }).setOrigin(1, 0).setScrollFactor(0).setDepth(20);
        this.add.text(480, 20, this.level.name, { fontFamily: 'Arial Black, sans-serif', fontSize: '17px', color: '#fff8d8', stroke: '#352b45', strokeThickness: 5 }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(20);
        const musicButton = this.add.text(838, 22, '♫ ON', { fontFamily: 'Arial Black, sans-serif', fontSize: '14px', color: '#fff', stroke: '#352b45', strokeThickness: 4 }).setOrigin(1, 0).setScrollFactor(0).setDepth(20).setInteractive({ useHandCursor: true });
        musicButton.on('pointerdown', () => musicButton.setText(ambientMusic.toggle() ? '♫ ON' : '♫ OFF'));
        this.add.text(480, 510, '← → / A D  RUCH     SPACJA / ↑ / W  SKOK', { fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#fff', stroke: '#315f82', strokeThickness: 4 }).setOrigin(0.5, 1).setScrollFactor(0).setDepth(20);
    }

    update(time: number) {
        if (!this.player.active) return;

        const left = this.cursors.left.isDown || this.keys.a.isDown;
        const right = this.cursors.right.isDown || this.keys.d.isDown;
        const jumpPressed = Input.Keyboard.JustDown(this.cursors.up!) || Input.Keyboard.JustDown(this.cursors.space!) || Input.Keyboard.JustDown(this.keys.w);
        const body = this.player.body as Phaser.Physics.Arcade.Body;
        const step = body.width / 2 + 6;
        const canWalkLeft = !body.blocked.down || this.hasFloorAt(this.player.x - step, body.bottom + 4, 250);
        const canWalkRight = !body.blocked.down || this.hasFloorAt(this.player.x + step, body.bottom + 4, 250);

        if (left && canWalkLeft) {
            this.player.setVelocityX(-250).setFlipX(true);
        } else if (right && canWalkRight) {
            this.player.setVelocityX(250).setFlipX(false);
        } else {
            this.player.setVelocityX(0);
        }

        if (jumpPressed && body.blocked.down) this.player.setVelocityY(-510);
        this.enemies.getChildren().forEach((object) => {
            const enemy = object as Enemy;
            const enemyBody = enemy.body as Phaser.Physics.Arcade.Body;
            if (!enemy.active || !enemyBody) return;
            if (enemy.x <= enemy.patrolLeft! || enemy.x >= enemy.patrolRight!) enemy.setVelocityX(enemy.x <= enemy.patrolLeft! ? 65 : -65);
            if (enemyBody.blocked.left) enemy.setVelocityX(65);
            if (enemyBody.blocked.right) enemy.setVelocityX(-65);
            if (enemyBody.blocked.down) {
                const direction = Math.sign(enemyBody.velocity.x) || 1;
                if (!this.hasFloorAt(enemy.x + direction * (enemyBody.width / 2 + 6), enemyBody.bottom + 4)) {
                    enemy.setVelocityX(-direction * 65);
                }
            }
        });

        if (time < this.invulnerableUntil) this.player.setAlpha(Math.floor(time / 90) % 2 ? 0.35 : 1);
        else this.player.setAlpha(1);
        if (this.player.y > 590) this.loseLife();
        if (this.player.x > 4580) this.scene.start('GameOver', { won: true, levelIndex: this.levelIndex, score: this.score });
    }

    private createTextures() {
        const g = this.make.graphics({ x: 0, y: 0 });
        if (!this.textures.exists('hero')) {
            g.fillStyle(0x342b3d).fillRoundedRect(10, 37, 14, 13, 5).fillRoundedRect(27, 37, 14, 13, 5);
            g.fillStyle(0x286da5).fillRoundedRect(10, 30, 30, 17, 7);
            g.fillStyle(0x54a7d9).fillRoundedRect(13, 33, 24, 8, 4);
            g.fillStyle(0xf4bd8c).fillRoundedRect(10, 13, 30, 25, 9);
            g.fillStyle(0xe49a74).fillEllipse(13, 27, 7, 10);
            g.fillStyle(0x342b3d).fillCircle(29, 24, 2).fillCircle(35, 24, 2);
            g.fillStyle(0xf6f2df).fillCircle(29, 23, 0.8).fillCircle(35, 23, 0.8);
            g.fillStyle(0x714235).fillEllipse(29, 31, 13, 5);
            g.fillStyle(0xd94b44).fillRoundedRect(7, 5, 36, 13, 6).fillRoundedRect(2, 13, 25, 6, 3);
            g.fillStyle(0xf4cf75).fillRoundedRect(23, 12, 19, 5, 3);
            g.fillStyle(0xf4bd8c).fillRoundedRect(5, 24, 8, 13, 4).fillRoundedRect(38, 24, 8, 13, 4);
            g.fillStyle(0xffe7c0).fillCircle(8, 37, 3).fillCircle(42, 37, 3);
            g.generateTexture('hero', 48, 52);
        }
        g.clear();
        if (!this.textures.exists('bitcoin-token')) {
            g.fillStyle(0x874312).fillEllipse(20, 21, 38, 38);
            g.fillStyle(0xffb521).fillEllipse(20, 19, 36, 36);
            g.fillStyle(0xffe071).fillEllipse(18, 17, 27, 29);
            g.lineStyle(2, 0xfff3b4, 0.9).strokeEllipse(20, 19, 29, 31);
            // A bold, engraved B with the pair of vertical strokes used by Bitcoin.
            g.fillStyle(0x9c5b16).fillRect(15, 8, 2, 7).fillRect(20, 8, 2, 7);
            g.fillRoundedRect(16, 11, 13, 9, 4).fillRoundedRect(16, 18, 15, 12, 5);
            g.fillStyle(0xffdf70).fillCircle(20, 15.5, 2.2).fillCircle(20, 24, 2.6);
            g.fillStyle(0x9c5b16).fillRect(15, 28, 2, 7).fillRect(20, 29, 2, 7);
            g.fillStyle(0xffffff, 0.45).fillEllipse(11, 10, 5, 8);
            g.generateTexture('bitcoin-token', 40, 40);
        }
        g.clear();
        if (!this.textures.exists('enemy')) {
            // Glossy biomechanical alien silhouette: smooth cranial dome, ribbed torso, claws and a segmented tail.
            g.fillStyle(0x081218).fillEllipse(48, 55, 26, 34);
            g.fillStyle(0x182c34).fillEllipse(47, 52, 19, 29);
            g.fillStyle(0x34515a, 0.9).fillEllipse(44, 50, 6, 23);
            g.fillStyle(0x071116).fillEllipse(49, 24, 24, 36);
            g.fillStyle(0x1d343d).fillEllipse(47, 21, 18, 29);
            g.fillStyle(0x49616a, 0.9).fillEllipse(43, 16, 7, 21);
            g.fillStyle(0x0c171d).fillTriangle(39, 34, 50, 31, 46, 43);
            g.fillStyle(0x7bc0bd, 0.8).fillEllipse(49, 38, 4, 2);
            g.fillStyle(0x090f15).fillTriangle(45, 39, 53, 39, 49, 48);
            g.fillStyle(0x81b7b4, 0.85).fillRect(48, 39, 2, 7);

            // Segmented shoulder pipes and the raised dorsal ridges.
            g.lineStyle(5, 0x0a151b, 1);
            g.lineBetween(36, 46, 30, 52); g.lineBetween(31, 51, 35, 58); g.lineBetween(60, 46, 67, 52); g.lineBetween(67, 52, 63, 60);
            g.lineStyle(2, 0x567078, 0.95);
            g.lineBetween(37, 45, 32, 51); g.lineBetween(60, 45, 65, 51);
            for (let i = 0; i < 4; i++) {
                const y = 48 + i * 6;
                g.lineStyle(2, 0x0a151b, 1); g.lineBetween(39, y, 57, y + 1);
                g.lineStyle(1, 0x628087, 0.9); g.lineBetween(41, y - 1, 56, y);
            }
            g.fillStyle(0x101d24).fillTriangle(39, 39, 35, 27, 43, 36).fillTriangle(50, 37, 53, 24, 56, 39).fillTriangle(59, 43, 65, 34, 62, 47);
            g.fillStyle(0x526c72, 0.8).fillTriangle(38, 35, 36, 29, 41, 37).fillTriangle(52, 35, 54, 28, 55, 37);

            // Long arms with hooked fingers.
            g.lineStyle(7, 0x091419, 1); g.lineBetween(34, 51, 25, 65); g.lineBetween(25, 65, 21, 76); g.lineBetween(61, 51, 70, 64); g.lineBetween(70, 64, 74, 75);
            g.lineStyle(2, 0x405960, 0.95); g.lineBetween(32, 53, 24, 65); g.lineBetween(63, 53, 71, 64);
            g.fillStyle(0x0a1319).fillTriangle(18, 74, 23, 75, 17, 84).fillTriangle(22, 74, 26, 75, 24, 84);
            g.fillStyle(0x0a1319).fillTriangle(72, 74, 77, 74, 79, 83).fillTriangle(68, 73, 72, 74, 73, 82);

            // Digitigrade legs and small polished armor plates.
            g.lineStyle(10, 0x091419, 1); g.lineBetween(41, 66, 35, 77); g.lineBetween(35, 77, 29, 89); g.lineBetween(55, 66, 61, 77); g.lineBetween(61, 77, 68, 89);
            g.lineStyle(3, 0x405960, 1); g.lineBetween(40, 67, 34, 77); g.lineBetween(56, 67, 62, 77);
            g.fillStyle(0x111f26).fillEllipse(28, 89, 14, 6).fillEllipse(69, 89, 14, 6);
            g.fillStyle(0x789096, 0.9).fillTriangle(22, 89, 27, 88, 23, 94).fillTriangle(64, 88, 70, 89, 72, 94);

            // Tail arcs behind the body; individual joints catch a cold blue highlight.
            g.lineStyle(8, 0x091419, 1); g.lineBetween(43, 62, 30, 67); g.lineBetween(30, 67, 19, 74); g.lineBetween(19, 74, 12, 82); g.lineBetween(12, 82, 14, 89); g.lineBetween(14, 89, 23, 92);
            g.lineStyle(2, 0x4b6870, 0.95); g.lineBetween(42, 61, 29, 66); g.lineBetween(29, 66, 18, 73); g.lineBetween(18, 73, 12, 81); g.lineBetween(12, 81, 14, 88);
            [[30, 67], [19, 74], [12, 82], [14, 89]].forEach(([x, y]) => g.fillStyle(0x769097).fillCircle(x, y, 1.5));
            g.generateTexture('enemy', 88, 98);
        }
        g.clear();
        if (!this.textures.exists('flag')) {
            g.fillStyle(0x594139).fillRoundedRect(17, 65, 30, 10, 4);
            g.fillStyle(0xfff2cf).fillRoundedRect(28, 2, 6, 67, 3);
            g.fillStyle(0xf14e5c).fillRoundedRect(34, 7, 43, 29, 5);
            g.fillStyle(0xffa250).fillCircle(31, 3, 5);
            g.fillStyle(0xffe69a).fillCircle(50, 17, 5);
            g.generateTexture('flag', 80, 78);
        }
        g.clear();
        if (!this.textures.exists('cloud')) {
            g.fillStyle(0xffffff).fillEllipse(42, 32, 84, 31).fillEllipse(27, 34, 42, 25).fillEllipse(57, 35, 47, 24);
            g.fillStyle(0xe8faff).fillEllipse(43, 39, 53, 9);
            g.generateTexture('cloud', 84, 52);
        }
        if (!this.textures.exists('spikes')) {
            g.clear();
            g.fillStyle(0x442d43).fillRect(0, 25, 72, 9);
            g.fillStyle(0xe5edf0).fillTriangle(2, 27, 12, 3, 22, 27).fillTriangle(19, 27, 31, 0, 43, 27).fillTriangle(40, 27, 51, 4, 62, 27).fillTriangle(57, 27, 66, 9, 72, 27);
            g.fillStyle(0x92a9b2).fillTriangle(12, 3, 12, 23, 19, 27).fillTriangle(31, 0, 31, 23, 40, 27).fillTriangle(51, 4, 51, 23, 58, 27);
            g.generateTexture('spikes', 72, 36);
        }
        if (!this.textures.exists('used-block')) {
            g.clear();
            g.fillStyle(0x9d603b).fillRoundedRect(2, 2, 42, 42, 4);
            g.fillStyle(0xc58a58).fillRect(6, 6, 34, 4).fillRect(6, 8, 4, 30);
            g.fillStyle(0x6f493e).fillRect(8, 23, 29, 4);
            g.generateTexture('used-block', 46, 46);
        }
        for (let index = 0; index < LEVELS.length; index++) {
            if (!this.textures.exists(`pipe-${index}`)) {
                const pipeColors = [0x40b95d, 0xd28b47, 0x6979a3];
                const pipeLips = [0x78e284, 0xffcc75, 0xa7d9dc];
                g.clear();
                g.fillStyle(0x25343d).fillRoundedRect(8, 19, 60, 74, 7);
                g.fillStyle(pipeColors[index]).fillRect(13, 26, 50, 67);
                g.fillStyle(pipeLips[index]).fillRoundedRect(3, 12, 70, 23, 6);
                g.fillStyle(0xffffff, 0.24).fillRoundedRect(10, 17, 56, 5, 3);
                g.fillStyle(0x1b2932, 0.3).fillRect(53, 37, 7, 52);
                g.fillStyle(0xffffff, 0.16).fillRect(18, 39, 5, 48);
                g.generateTexture(`pipe-${index}`, 76, 96);
            }
        }
        if (!this.textures.exists('brick')) {
            g.clear();
            g.fillStyle(0x9b4d39).fillRoundedRect(2, 2, 44, 44, 4);
            g.fillStyle(0xe18a58).fillRect(5, 5, 38, 3).fillRect(5, 7, 3, 17);
            g.fillStyle(0x763d39).fillRect(4, 23, 42, 4).fillRect(22, 6, 3, 17).fillRect(13, 28, 3, 15).fillRect(34, 28, 3, 15);
            g.fillStyle(0xf6bb75, 0.65).fillRect(8, 11, 11, 3).fillRect(28, 31, 6, 3);
            g.generateTexture('brick', 48, 48);
        }
        if (!this.textures.exists('question')) {
            g.clear();
            g.fillStyle(0x9b5c19).fillRoundedRect(1, 1, 46, 46, 7);
            g.fillStyle(0xffc83f).fillRoundedRect(4, 4, 40, 40, 6);
            g.fillStyle(0xffe88a).fillRoundedRect(8, 7, 30, 5, 3).fillRect(8, 11, 4, 23);
            g.fillStyle(0xd88721).fillRect(4, 40, 40, 4).fillRect(40, 7, 4, 34);
            g.generateTexture('question', 48, 48);
        }
        LEVELS.forEach((level, index) => {
            const key = `ground-${index}`;
            if (this.textures.exists(key)) return;
            g.clear();
            g.fillStyle(level.ground).fillRoundedRect(0, 4, 64, 60, 6);
            g.fillStyle(level.trim).fillRoundedRect(0, 0, 64, 15, 5);
            g.fillStyle(0xffffff, 0.16).fillRect(5, 6, 54, 2).fillRect(4, 18, 56, 3);
            g.fillStyle(0x291f33, 0.18).fillRect(0, 55, 64, 9);
            if (index === 0) {
                g.fillStyle(0x87e286).fillTriangle(8, 3, 12, 11, 16, 3).fillTriangle(42, 2, 47, 12, 51, 2);
                g.fillStyle(0xa96337).fillRect(10, 29, 15, 4).fillRect(39, 44, 18, 4);
            } else if (index === 1) {
                g.fillStyle(0xffdd8c, 0.75).fillEllipse(17, 30, 17, 7).fillEllipse(49, 46, 20, 8);
                g.fillStyle(0x9e5938, 0.6).fillRect(6, 18, 10, 3).fillRect(37, 24, 17, 3);
            } else {
                g.fillStyle(0x9eb9d8, 0.65).fillRect(7, 22, 22, 4).fillRect(38, 43, 18, 4);
                g.fillStyle(0x312b49, 0.45).fillRect(0, 54, 64, 10);
                g.fillStyle(0xffe6a4, 0.8).fillRect(12, 32, 5, 8).fillRect(45, 30, 5, 8);
            }
            g.generateTexture(key, 64, 64);
        });
        g.destroy();
    }

    private drawBackground() {
        const bg = this.add.graphics().setDepth(-10);
        bg.fillStyle(this.level.sky).fillRect(0, 0, this.levelWidth, 540);
        bg.fillStyle(this.level.sun).fillCircle(this.levelIndex === 2 ? 2130 : 820, 95, this.levelIndex === 2 ? 34 : 47);
        if (this.levelIndex === 2) {
            for (let x = 140; x < this.levelWidth; x += 150) {
                const y = 45 + ((x * 17) % 140);
                bg.fillStyle(0xe6f0ff, 0.75).fillCircle(x, y, 1.4).fillCircle(x + 31, y + 21, 1).fillCircle(x - 19, y + 44, 0.8);
            }
        }
        for (let x = -100; x < this.levelWidth + 300; x += 360) {
            const peak = 290 + ((x * 13) % 90);
            bg.fillStyle(this.level.far).fillTriangle(x, 535, x + 180, peak, x + 390, 535);
            bg.fillStyle(this.level.near).fillEllipse(x + 150, 520, 390, 140);
            if (this.levelIndex === 0) {
                bg.fillStyle(0x694b3d).fillRoundedRect(x + 70, 420, 18, 100, 6);
                bg.fillStyle(0x3a9b67).fillCircle(x + 78, 407, 38).fillCircle(x + 54, 425, 25).fillCircle(x + 101, 428, 24);
                bg.fillStyle(0xf7f0d3).fillCircle(x + 235, 454, 4).fillCircle(x + 253, 459, 4);
                bg.fillStyle(0xee7182).fillCircle(x + 235, 449, 2).fillCircle(x + 253, 454, 2);
            } else if (this.levelIndex === 1) {
                bg.fillStyle(0x9a5e42).fillTriangle(x + 35, 530, x + 155, 315, x + 280, 530);
                bg.fillStyle(0xf8cd91).fillTriangle(x + 155, 315, x + 205, 442, x + 124, 416);
                bg.fillStyle(0x378b62).fillRoundedRect(x + 270, 405, 15, 100, 6).fillRoundedRect(x + 248, 424, 54, 13, 6).fillRoundedRect(x + 255, 450, 44, 12, 6);
            } else {
                bg.fillStyle(0x222642).fillRect(x + 100, 325, 74, 210).fillRect(x + 91, 314, 92, 24);
                bg.fillStyle(0x252942).fillRect(x + 205, 375, 84, 160).fillRect(x + 196, 363, 102, 24);
                bg.fillStyle(0xffd887, 0.85).fillRect(x + 116, 355, 10, 24).fillRect(x + 148, 355, 10, 24).fillRect(x + 221, 401, 10, 22).fillRect(x + 256, 401, 10, 22);
            }
        }
        if (this.levelIndex !== 2) {
            for (let x = 120; x < this.levelWidth; x += 440) this.add.image(x, 115 + (x % 3) * 16, 'cloud').setAlpha(0.9).setDepth(-4);
        }
    }

    private createObstacles() {
        this.solidObstacles = this.physics.add.staticGroup();
        this.hazards = this.physics.add.staticGroup();
        this.level.obstacles.forEach(({ x, y, kind }) => {
            if (kind === 'spikes') {
                const spikes = this.hazards.create(x, y, 'spikes') as Phaser.Physics.Arcade.Sprite;
                spikes.setSize(64, 25).setOffset(4, 7).refreshBody();
                return;
            }
            const texture = kind === 'pipe' ? `pipe-${this.levelIndex}` : kind;
            const obstacle = this.solidObstacles.create(x, y, texture) as Obstacle;
            obstacle.kind = kind;
            obstacle.setDepth(1);
            if (kind === 'pipe') {
                obstacle.setDisplaySize(76, 96).refreshBody();
            } else {
                obstacle.setDisplaySize(48, 48).refreshBody();
            }
            if (kind === 'question') {
                obstacle.mark = this.add.text(x, y - 2, '?', {
                    fontFamily: 'Arial Black, sans-serif', fontSize: '31px', color: '#fff7cf',
                    stroke: '#9b5c19', strokeThickness: 3,
                }).setOrigin(0.5).setDepth(2);
            }
        });

        // Add a few more classic block and pipe challenges to the longer final stretch.
        [[2940, 352], [2990, 352], [3040, 352]].forEach(([x, y], index) => {
            const kind = index === 1 ? 'question' : 'brick';
            const block = this.solidObstacles.create(x, y, kind) as Obstacle;
            block.kind = kind;
            block.setDisplaySize(48, 48).refreshBody().setDepth(1);
            if (kind === 'question') {
                block.mark = this.add.text(x, y - 2, '?', { fontFamily: 'Arial Black, sans-serif', fontSize: '31px', color: '#fff7cf', stroke: '#9b5c19', strokeThickness: 3 }).setOrigin(0.5).setDepth(2);
            }
        });
        [[3210, 476], [3760, 476], [4290, 476]].forEach(([x, y]) => {
            const pipe = this.solidObstacles.create(x, y, `pipe-${this.levelIndex}`) as Obstacle;
            pipe.kind = 'pipe';
            pipe.setDisplaySize(76, 96).refreshBody().setDepth(1);
        });
        [[3500, 502], [4010, 502], [4480, 502]].forEach(([x, y]) => {
            const spikes = this.hazards.create(x, y, 'spikes') as Phaser.Physics.Arcade.Sprite;
            spikes.setSize(64, 25).setOffset(4, 7).refreshBody();
        });
        this.createSpinners();
    }

    private createSpinners() {
        this.level.spinners.forEach((x, index) => {
            // Keep the full sweep above a standing character; jumping still reaches it.
            const y = 380;
            const hitArea = this.hazards.create(x, y, `ground-${this.levelIndex}`) as Phaser.Physics.Arcade.Sprite;
            hitArea.setDisplaySize(116, 116).refreshBody().setVisible(false);

            const colors = [0xff654d, 0x89d9e4];
            const shade = colors[index];
            this.add.rectangle(x, y - 68, 9, 26, 0x25303b).setDepth(3);
            this.add.circle(x, y - 54, 7, 0x71808a).setDepth(3);
            const rotor = this.add.container(x, y).setDepth(4);
            const bar = this.add.rectangle(0, 0, 20, 112, 0x283440).setStrokeStyle(2, shade);
            const gleam = this.add.rectangle(-4, 0, 3, 101, 0xc9d5d7, 0.8);
            const topCap = this.add.triangle(0, -53, 0, 10, 9, 0, 18, 10, shade);
            const bottomCap = this.add.triangle(0, 53, 0, -10, 9, 0, 18, -10, shade);
            const hub = this.add.circle(0, 0, 14, 0x1b2630).setStrokeStyle(4, shade);
            const hubLight = this.add.circle(-3, -3, 4, 0xe9f1e8);
            rotor.add([bar, gleam, topCap, bottomCap, hub, hubLight]);
            this.tweens.add({ targets: rotor, angle: index % 2 ? -360 : 360, duration: 2200 + index * 260, repeat: -1, ease: 'Linear' });
        });
    }

    private handleBlockHit(playerObject: object, obstacleObject: object) {
        const player = playerObject as Phaser.Physics.Arcade.Sprite;
        const obstacle = obstacleObject as Obstacle;
        const playerBody = player.body as Phaser.Physics.Arcade.Body;
        if (obstacle.kind !== 'question' || obstacle.used || !playerBody.blocked.up) return;

        obstacle.used = true;
        obstacle.setTexture('used-block');
        obstacle.mark?.setVisible(false);
        this.score += 50;
        this.updateScoreLabel();
        this.tweens.add({ targets: obstacle, y: obstacle.y - 8, duration: 75, yoyo: true, ease: 'Quad.Out' });
    }

    private addPlatform(x: number, y: number, width: number, height: number) {
        const platform = this.platforms.create(x, y, `ground-${this.levelIndex}`) as Phaser.Physics.Arcade.Sprite;
        platform.setDisplaySize(width, height).refreshBody();
    }

    private hasFloorAt(x: number, feetY: number, maxDrop = 10) {
        const supports = [...this.platforms.getChildren(), ...this.solidObstacles.getChildren()];
        return supports.some((object) => {
            const body = (object as Phaser.Physics.Arcade.Sprite).body as Phaser.Physics.Arcade.StaticBody | null;
            const drop = body ? body.top - feetY : Infinity;
            return Boolean(body && body.enable && x >= body.left && x <= body.right && drop >= -10 && drop <= maxDrop);
        });
    }

    private addEnemy(x: number, y: number, left: number, right: number) {
        const enemy = this.enemies.create(x, y, 'enemy') as Enemy;
        enemy.setDisplaySize(66, 74);
        enemy.setSize(42, 66).setOffset(23, 20);
        enemy.patrolLeft = left;
        enemy.patrolRight = right;
        enemy.setCollideWorldBounds(true).setBounce(0);
        enemy.setVelocityX(65);
        return enemy;
    }

    private handleEnemyContact(
        playerObject: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile,
        enemyObject: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile,
    ) {
        const player = playerObject as Phaser.Physics.Arcade.Sprite;
        const enemy = enemyObject as Phaser.Physics.Arcade.Sprite;
        const playerBody = player.body as Phaser.Physics.Arcade.Body;
        if (playerBody.velocity.y > 80 && playerBody.bottom < enemy.y + 12) {
            enemy.disableBody(true, true);
            player.setVelocityY(-330);
            this.score += 20;
            this.updateScoreLabel();
            return;
        }
        this.loseLife();
    }

    private updateScoreLabel() {
        this.scoreLabel.setText(`ETAP ${this.levelIndex + 1}/3  •  ${this.score.toString().padStart(3, '0')}`);
    }

    private color(value: number) {
        return `#${value.toString(16).padStart(6, '0')}`;
    }

    private loseLife() {
        if (this.time.now < this.invulnerableUntil) return;
        this.lives -= 1;
        this.playDeathLine();
        this.livesLabel.setText('♥ '.repeat(this.lives).trim());
        if (this.lives <= 0) {
            this.scene.start('GameOver', { won: false, levelIndex: this.levelIndex, score: this.score });
            return;
        }
        this.invulnerableUntil = this.time.now + 1500;
        this.player.setPosition(Math.max(90, this.player.x - 120), 420).setVelocity(0, 0);
    }

    private playDeathLine() {
        if (!('speechSynthesis' in window)) return;

        const speech = new SpeechSynthesisUtterance('Ale urwał!');
        speech.lang = 'pl-PL';
        speech.rate = 1.08;
        speech.pitch = 0.82;
        speech.volume = 0.95;
        speech.voice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('pl')) ?? null;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    }
}
