import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  openProducts = true;
  openAnalytics = false;
  openApps = false;
  openSettings = false;

  toggleProducts() {
    this.openProducts = !this.openProducts;
  }
  toggleAnalytics() {
    this.openAnalytics = !this.openAnalytics;
  }
  toggleApps() {
    this.openApps = !this.openApps;
  }
  toggleSettings() {
    this.openSettings = !this.openSettings;
  }
}
