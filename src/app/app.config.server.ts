import { mergeApplicationConfig, ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { LoadSpeakersService } from './load-speakers.service';
import { LoadScheduleService } from './load-schedule.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: APP_INITIALIZER,
      useFactory: (service: LoadSpeakersService) => () => service.load(),
      deps: [LoadSpeakersService],
      multi: true
    },{
      provide: APP_INITIALIZER,
      useFactory: (service: LoadScheduleService) => () => service.load(),
      deps: [LoadScheduleService],
      multi: true
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
