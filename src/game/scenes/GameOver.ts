import { Scene } from 'phaser';

type ResultData = { won?: boolean; levelIndex?: number; score?: number };

const STAGES = ['ZIELONA DOLINA', 'PUSTYNIA SŁOŃCA', 'ZAMEK NA KSIĘŻYCU'];

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create(data: ResultData = {}) {
        const won = Boolean(data.won);
        const stage = Math.max(0, Math.min(data.levelIndex ?? 0, STAGES.length - 1));
        const final = won && stage === STAGES.length - 1;
        const title = final ? 'WIELKIE ZWYCIĘSTWO!' : won ? 'ETAP UKOŃCZONY!' : 'KONIEC GRY';
        this.cameras.main.setBackgroundColor(final ? '#202c59' : won ? '#e7a66a' : '#333955');

        const backdrop = this.add.graphics();
        backdrop.fillStyle(won ? 0xffd781 : 0x414a70, 0.75).fillRoundedRect(120, 78, 720, 390, 30);
        backdrop.lineStyle(5, won ? 0xfff0c2 : 0x7f8bb7, 0.9).strokeRoundedRect(120, 78, 720, 390, 30);
        for (let i = 0; i < 3; i++) {
            const x = 355 + i * 125;
            this.add.circle(x, 140, 8, i <= stage && won ? 0xfff2c7 : 0x667095);
            if (i < 2) this.add.rectangle(x + 62, 140, 70, 3, 0x8b8ba0);
        }
        this.add.text(480, 202, title, {
            fontFamily: 'Arial Black, sans-serif', fontSize: final ? '39px' : '43px', color: '#fff7dc',
            stroke: won ? '#9a503d' : '#242940', strokeThickness: 8,
            shadow: { color: '#20223a', blur: 0, fill: true, offsetX: 4, offsetY: 6 },
        }).setOrigin(0.5);
        this.add.text(480, 264, `${STAGES[stage]}   •   WYNIK  ${String(data.score ?? 0).padStart(3, '0')}`, {
            fontFamily: 'Arial Black, sans-serif', fontSize: '17px', color: '#fff2c7', stroke: '#39364c', strokeThickness: 4,
        }).setOrigin(0.5);

        const label = won && !final ? '▶  NASTĘPNY ETAP' : final ? '↻  ZAGRAJ OD POCZĄTKU' : '↻  SPRÓBUJ PONOWNIE';
        const button = this.add.text(480, 355, label, {
            fontFamily: 'Arial Black, sans-serif', fontSize: '22px', color: '#fff',
            backgroundColor: won ? '#d95045' : '#5868a8', padding: { x: 24, y: 15 },
            stroke: '#383047', strokeThickness: 4,
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        button.on('pointerover', () => button.setScale(1.05));
        button.on('pointerout', () => button.setScale(1));
        button.on('pointerdown', () => this.continueGame(data, stage, final));
        this.input.keyboard?.once('keydown-SPACE', () => this.continueGame(data, stage, final));
        this.input.keyboard?.once('keydown-ENTER', () => this.continueGame(data, stage, final));
    }

    private continueGame(data: ResultData, stage: number, final: boolean) {
        const levelIndex = data.won ? (final ? 0 : stage + 1) : stage;
        const score = final ? 0 : (data.score ?? 0);
        this.scene.start('Game', { levelIndex, score });
    }
}
