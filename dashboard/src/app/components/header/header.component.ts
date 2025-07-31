import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true
})
export class HeaderComponent {
  isDarkMode = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isBrowser) {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }

  toggleMobileMenu() {
    if (this.isBrowser) {
      // Trigger sidebar toggle by dispatching a custom event
      const event = new CustomEvent('toggleSidebar');
      document.dispatchEvent(event);
    }
  }
}
