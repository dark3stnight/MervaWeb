import { Component } from '@angular/core';

@Component({
  selector: 'app-charts',
  standalone: true,
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  categories = [
    { name: 'Food & Dining', pct: 38, amount: '$479.80', color: '#F472B6' },
    { name: 'Transport',     pct: 24, amount: '$303.60', color: '#60A5FA' },
    { name: 'Shopping',      pct: 16, amount: '$202.30', color: '#FBBF24' },
    { name: 'Bills',         pct: 12, amount: '$151.40', color: '#A78BFA' },
    { name: 'Other',         pct: 10, amount: '$126.40', color: '#34D399' },
  ];

  // Donut chart: circumference of r=65 circle = 408.41
  donutSegments = [
    { color: '#F472B6', dash: '151.2 257.2', rotate: -90 },
    { color: '#60A5FA', dash:  '94.0 314.4', rotate:  46.8 },
    { color: '#FBBF24', dash:  '61.3 347.1', rotate: 133.2 },
    { color: '#A78BFA', dash:  '45.0 363.4', rotate: 190.8 },
    { color: '#34D399', dash:  '36.8 371.6', rotate: 234.0 },
  ];

  linePoints = '50,149 79,143 107,139 136,132 150,125 179,129 208,111 236,83 251,72 280,90 294,97 323,101 351,90 380,83 394,79 423,73 437,69 466,62 480,56';
  areaPoints  = '50,149 79,143 107,139 136,132 150,125 179,129 208,111 236,83 251,72 280,90 294,97 323,101 351,90 380,83 394,79 423,73 437,69 466,62 480,56 480,160 50,160';
}
