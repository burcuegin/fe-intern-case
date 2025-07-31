import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  openProducts = true;
  openOrders = false;
  isMobileMenuOpen = false;
  private eventListener: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Listen for toggle events from header
      this.eventListener = (event: CustomEvent) => {
        if (event.type === 'toggleSidebar') {
          this.toggleMobileMenu();
        }
      };
      document.addEventListener('toggleSidebar', this.eventListener as EventListener);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser && this.eventListener) {
      document.removeEventListener('toggleSidebar', this.eventListener as EventListener);
    }
  }

  toggleProducts() {
    this.openProducts = !this.openProducts;
  }

  toggleOrders() {
    this.openOrders = !this.openOrders;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (this.isBrowser) {
      // Add/remove classes to body for overlay
      if (this.isMobileMenuOpen) {
        document.body.classList.add('sidebar-open');
      } else {
        document.body.classList.remove('sidebar-open');
      }
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    if (this.isBrowser) {
      document.body.classList.remove('sidebar-open');
    }
  }
}
