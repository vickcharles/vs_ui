import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ScrollTopService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router) {}

  setScrollTop() {
    if (isPlatformBrowser(this.platformId)) {
        let scrollToTop = window.setInterval(() => {
          let pos = window.pageYOffset;
          if (pos > 0) {
            window.scrollTo(0, pos - 50); // how far to scroll on each step
          } else {
            window.clearInterval(scrollToTop);
          }
        }, 16);
      }
    }
  }
