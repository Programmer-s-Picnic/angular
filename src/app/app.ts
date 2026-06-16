 import { Component, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('programmers-picnic-angular-demo');

  currentIndex = signal(0);

  autoPlayDelay = 2500;
  private autoPlayId: ReturnType<typeof setInterval> | null = null;

  images = Array.from({ length: 17 }, (_, i) => ({
    src: `pics/${i}.png`,
    alt: `Programmers Picnic carousel image ${i}`,
    title: `Slide ${i + 1}`,
    caption: `Showing image pics/${i}.png`
  }));

  currentImage = computed(() => {
    return this.images[this.currentIndex()];
  });

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextSlide() {
    this.currentIndex.update(index => {
      return (index + 1) % this.images.length;
    });
  }

  previousSlide() {
    this.currentIndex.update(index => {
      return (index - 1 + this.images.length) % this.images.length;
    });
  }

  goToSlide(index: number) {
    this.currentIndex.set(index);
  }

  startAutoPlay() {
    if (this.autoPlayId) return;

    this.autoPlayId = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (!this.autoPlayId) return;

    clearInterval(this.autoPlayId);
    this.autoPlayId = null;
  }
}