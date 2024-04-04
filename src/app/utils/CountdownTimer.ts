export class CountdownTimer {
    private readonly duration: number; // duration in seconds
    private intervalId: any| null = null;

    constructor(duration: number) {
        this.duration = duration;
    }

    start(onTick: (time: number[]) => void): void {
        let timeLeft = this.duration;

        this.intervalId = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            } else {
                timeLeft--;
                const { hours, minutes, seconds } = this.calculateTimeFromSeconds(timeLeft);
                //onTick([hours,minutes,seconds]);
            }
        }, 1000);
    }

    calculateTimeFromSeconds(totalSeconds: number): { hours: number, minutes: number, seconds: number } {
        const hours = Math.floor(totalSeconds / 3600);
        const remainingSeconds = totalSeconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        return { hours, minutes, seconds };
    }
}