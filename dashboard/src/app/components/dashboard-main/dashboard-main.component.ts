import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.css'
})
export class DashboardMainComponent implements AfterViewInit {
  stats = [
    { title: 'Active Products', value: 247384, change: 4.5, trend: [220000, 230000, 240000, 247384] },
    { title: 'New Products', value: 2368, change: 2.1, trend: [1800, 2000, 2200, 2368] },
    { title: 'Completed Order', value: 33847, change: -3.2, trend: [35000, 34500, 34000, 33847] },
    { title: 'Pending Payment', value: 1284, change: 5.0, trend: [1100, 1200, 1250, 1284] },
    { title: 'Canceled Order', value: 836, change: -1.1, trend: [900, 870, 850, 836] }
  ];

  products = [
    { name: 'Mouse Blue Pro', transactionId: 'TR-001-123456', date: 'Dec 12, 2023', price: 154, status: 'Completed' },
    { name: 'Smartphone Silver', transactionId: 'TR-001-123457', date: 'Dec 12, 2023', price: 962, status: 'Completed' },
    { name: 'Bluetooth Keyboard', transactionId: 'TR-001-123458', date: 'Dec 12, 2023', price: 84, status: 'Pending' },
    { name: 'Retro Radio', transactionId: 'TR-001-123459', date: 'Dec 12, 2023', price: 45, status: 'Completed' },
    { name: 'Electronic Heater', transactionId: 'TR-001-123460', date: 'Dec 12, 2023', price: 65, status: 'Completed' },
    { name: 'Laptop Pro', transactionId: 'TR-001-123461', date: 'Dec 12, 2023', price: 1243, status: 'Cancelled' },
    { name: 'Cool Earphones', transactionId: 'TR-001-123462', date: 'Dec 12, 2023', price: 220, status: 'Cancelled' },
    { name: 'Clear LED Monitor', transactionId: 'TR-001-123463', date: 'Dec 12, 2023', price: 799, status: 'Pending' },
    { name: 'Electronic Microphone', transactionId: 'TR-001-123464', date: 'Dec 12, 2023', price: 129, status: 'Completed' },
    { name: 'USB Flashdisk 16GB', transactionId: 'TR-001-123465', date: 'Dec 12, 2023', price: 67, status: 'Completed' }
  ];

  @ViewChildren('statValue') statValueEls!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.statValueEls.forEach((el, i) => {
      const countUp = new CountUp(el.nativeElement, this.stats[i].value, {
        duration: 1.2,
        separator: ',',
      });
      countUp.start();
    });
  }

  getCardAnimationDelay(index: number): string {
    return `${index * 80}ms`;
  }

  getTrendString(stat: { trend: number[] }): string {
    const min = Math.min(...stat.trend);
    const max = Math.max(...stat.trend);
    return stat.trend.map((v, idx) => {
      const y = 28 - ((v - min) / (max - min + 1e-6) * 24);
      return `${idx * 26},${y.toFixed(2)}`;
    }).join(' ');
  }

  getNormalizedValue(v: number, stat: { trend: number[] }): number {
    const min = Math.min(...stat.trend);
    const max = Math.max(...stat.trend);
    return 28 - ((v - min) / (max - min + 1e-6) * 24);
  }
}
