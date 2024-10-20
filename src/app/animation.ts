import { animate, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);
