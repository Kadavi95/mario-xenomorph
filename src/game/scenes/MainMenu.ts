import { Scene } from 'phaser';
import { ambientMusic } from '../ambientMusic';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        this.cameras.main.setBackgroundColor('#79d8ff');
        const sky = this.add.graphics();
        sky.fillStyle(0xfff0ab, 0.25).fillCircle(785, 112, 72);
        sky.fillStyle(0xffdf72).fillCircle(785, 112, 45);
        sky.fillStyle(0x9de6e2, 0.55).fillEllipse(160, 145, 190, 58).fillEllipse(196, 135, 94, 58);
        sky.fillStyle(0xffffff, 0.8).fillEllipse(164, 139, 158, 38).fillEllipse(198, 130, 75, 48);
        sky.fillStyle(0x83d79b).fillEllipse(175, 486, 510, 180).fillEllipse(730, 500, 540, 190);
        sky.fillStyle(0x5fbd7b).fillEllipse(475, 530, 660, 170);
        this.add.rectangle(480, 525, 960, 30, 0x56c96c);
        this.add.rectangle(480, 544, 960, 12, 0x8a512f);
        this.add.text(480, 98, 'MARIO XENOMORPH', {
            fontFamily: 'Arial Black, sans-serif', fontSize: '53px', color: '#fff4d2',
            stroke: '#d83b36', strokeThickness: 12, shadow: { color: '#62392d', blur: 0, fill: true, offsetX: 5, offsetY: 7 }
        }).setOrigin(0.5);
        this.add.text(480, 168, 'TRZY ŚWIATY • JEDNA WIELKA PRZYGODA', {
            fontFamily: 'Arial Black, sans-serif', fontSize: '17px', color: '#2474b7',
            stroke: '#ffffff', strokeThickness: 5, letterSpacing: 2
        }).setOrigin(0.5);
        const cards = [
            { x: 265, color: 0x69c785, title: 'DOLINA', note: 'zielone wzgórza' },
            { x: 480, color: 0xe99a5d, title: 'PUSTYNIA', note: 'gorące piaski' },
            { x: 695, color: 0x384574, title: 'ZAMEK', note: 'nocna wyprawa' },
        ];
        cards.forEach((card) => {
            this.add.rectangle(card.x, 268, 190, 93, card.color).setStrokeStyle(3, 0xffffff, 0.9);
            this.add.rectangle(card.x, 294, 190, 42, 0x18233c, 0.22);
            this.add.text(card.x, 254, card.title, { fontFamily: 'Arial Black, sans-serif', fontSize: '17px', color: '#fff', stroke: '#33334a', strokeThickness: 4 }).setOrigin(0.5);
            this.add.text(card.x, 319, card.note, { fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#fff7dc', stroke: '#33334a', strokeThickness: 3 }).setOrigin(0.5);
        });
        this.add.text(480, 365, 'Zbieraj monety  •  przeskakuj stworki  •  dotrzyj do mety', {
            fontFamily: 'Arial, sans-serif', fontSize: '17px', color: '#fff', stroke: '#315f82', strokeThickness: 5
        }).setOrigin(0.5);
        const start = this.add.text(480, 432, '▶  START PRZYGODY', {
            fontFamily: 'Arial Black, sans-serif', fontSize: '23px', color: '#fff',
            backgroundColor: '#e84b42', padding: { x: 26, y: 13 },
            stroke: '#783126', strokeThickness: 5
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        start.on('pointerover', () => start.setScale(1.06));
        start.on('pointerout', () => start.setScale(1));
        start.on('pointerdown', () => this.launchGame());
        this.input.keyboard?.once('keydown-SPACE', () => this.launchGame());
        this.input.keyboard?.once('keydown-ENTER', () => this.launchGame());
    }

    private launchGame() {
        ambientMusic.start();
        this.scene.start('Game');
    }
}
