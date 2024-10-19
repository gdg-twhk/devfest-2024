import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoadSpeakersService } from './load-speakers.service';
import { LoadScheduleService } from './load-schedule.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withFetch()), {
    provide: APP_INITIALIZER,
    useFactory: (service: LoadSpeakersService) => () => service.load(),
    deps: [LoadSpeakersService],
    multi: true
  }, {
    provide: APP_INITIALIZER,
    useFactory: (service: LoadScheduleService) => () => service.load(),
    deps: [LoadScheduleService],
    multi: true
  }]
};
