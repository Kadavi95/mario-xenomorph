class PlatformMusic {
    enabled = false;
    private context?: AudioContext;
    private master?: GainNode;
    private stepTimer?: number;
    private step = 0;
    private theme = 0;

    private readonly melody: Array<number | null> = [
        74, null, 78, 81, null, 78, 76, null,
        74, 76, 78, null, 81, 83, 81, null,
        79, null, 78, 76, 74, null, 76, 78,
        81, null, 79, 78, 76, 73, 74, null,
    ];
    private readonly bassRoots = [50, 55, 57, 52];
    private readonly themeOffsets = [0, 2, -2];
    private readonly stepSeconds = 60 / 126 / 2;

    start() {
        const AudioContextClass = window.AudioContext;
        if (!AudioContextClass) return;

        this.context ??= new AudioContextClass();
        if (this.context.state === 'suspended') void this.context.resume();
        if (!this.master) {
            this.master = this.context.createGain();
            this.master.gain.value = 0;
            this.master.connect(this.context.destination);
        }

        this.enabled = true;
        this.master.gain.setTargetAtTime(0.55, this.context.currentTime, 0.3);
        if (this.stepTimer === undefined) {
            this.playStep();
            this.stepTimer = window.setInterval(() => this.playStep(), this.stepSeconds * 1000);
        }
    }

    toggle() {
        if (this.enabled) {
            this.enabled = false;
            if (this.context && this.master) this.master.gain.setTargetAtTime(0, this.context.currentTime, 0.18);
            return false;
        }
        this.start();
        return this.enabled;
    }

    setTheme(level: number) {
        this.theme = Math.max(0, Math.min(2, level));
    }

    playCoin() {
        if (!this.context) return;

        const now = this.context.currentTime;
        [[987.77, 0], [1318.51, 0.075]].forEach(([frequency, delay], index) => {
            const oscillator = this.context!.createOscillator();
            const envelope = this.context!.createGain();
            const startAt = now + delay;
            oscillator.type = index === 0 ? 'triangle' : 'sine';
            oscillator.frequency.value = frequency;
            envelope.gain.setValueAtTime(0.0001, startAt);
            envelope.gain.exponentialRampToValueAtTime(0.16, startAt + 0.008);
            envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.16);
            oscillator.connect(envelope).connect(this.context!.destination);
            oscillator.start(startAt);
            oscillator.stop(startAt + 0.18);
        });
    }

    private playStep() {
        if (!this.context || !this.master) return;
        const index = this.step % this.melody.length;
        const offset = this.themeOffsets[this.theme];
        const melodyNote = this.melody[index];
        const now = this.context.currentTime;

        if (melodyNote !== null) this.playNote(melodyNote + offset, now, this.stepSeconds * 0.72, 'square', 0.075);

        if (index % 8 === 0) {
            const bar = Math.floor(index / 8);
            const root = this.bassRoots[(bar + this.theme) % this.bassRoots.length] + offset - 12;
            this.playNote(root, now, this.stepSeconds * 2.7, 'triangle', 0.11);
        }

        if (index % 4 === 2) {
            const chordTone = [62, 66, 69, 74][Math.floor(index / 4) % 4] + offset;
            this.playNote(chordTone, now, this.stepSeconds * 0.9, 'triangle', 0.027);
        }

        this.step += 1;
    }

    private playNote(midi: number, startAt: number, duration: number, shape: OscillatorType, volume: number) {
        const oscillator = this.context!.createOscillator();
        const envelope = this.context!.createGain();
        oscillator.type = shape;
        oscillator.frequency.value = 440 * Math.pow(2, (midi - 69) / 12);
        envelope.gain.setValueAtTime(0.0001, startAt);
        envelope.gain.exponentialRampToValueAtTime(volume, startAt + 0.012);
        envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
        oscillator.connect(envelope).connect(this.master!);
        oscillator.start(startAt);
        oscillator.stop(startAt + duration + 0.02);
    }
}

export const ambientMusic = new PlatformMusic();
