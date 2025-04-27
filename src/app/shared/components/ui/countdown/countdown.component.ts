import { Component, Input } from '@angular/core';
import { interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {

  @Input() duration: number = 300; // duration in seconds (default 5 minutes)
  remainingTime: number = 0;
  displayTime: string = '00:00';
  private sub?: Subscription;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private startCountdown() {
    this.remainingTime = this.duration;
    this.updateDisplayTime();

    this.sub = interval(1000).pipe(
      take(this.duration)
    ).subscribe(() => {
      this.remainingTime--;
      this.updateDisplayTime();
    });
  }

  private updateDisplayTime() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    this.displayTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

}
