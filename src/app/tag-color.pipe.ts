import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagColorPipe',
  standalone: true,
})
export class TagColorPipe implements PipeTransform {
  transform(tag: string): string {
    switch (tag.toLowerCase()) {
      case 'ai/ml': // red
        return '#f8d8d8';
      case 'mobile': // yellow
      case 'flutter':
      case 'android':
      case 'kotlin':
        return '#ffe7a5';
      case 'angular': // green
      case 'web':
      case 'chrome':
        return '#ccf6c5';
      case 'cloud': // blue
      case 'devops':
      case 'data':
      case 'firebase':
      case 'golang':
        return '#c3ecf6';
      case 'design':
      case 'career development':
      case 'cyber security':
      case 'others':
        return '#e0e0e0';
    }
    return '#e0e0e0';
  }
}
