import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Sponsor {
  name: string;
  src: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  sponsors: Sponsor[] = [
    {
      src: './assets/sponsors/adecco.png',
      name: '藝珂集團',
      link: 'https://www.adecco.com.tw/',
    },
    {
      src: './assets/sponsors/apmic.png',
      name: '亞太智能機器',
      link: 'https://www.ap-mic.com/',
    },
    {
      src: './assets/sponsors/天瓏書局.jpg',
      name: '天瓏書局',
      link: 'https://www.tenlong.com.tw/',
    },
    {
      src: './assets/sponsors/jetbrains.png',
      name: 'JetBrains',
      link: 'https://www.jetbrains.com/',
    },
    {
      src: './assets/sponsors/TaipeiComputerAssociation.svg',
      name: '台北市電腦商業同業公會',
      link: 'https://www.tca.org.tw/',
    },
  ];
}
