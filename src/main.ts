import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { boardsReducer } from './app/store/boards.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ boards : boardsReducer }),
    provideEffects([]),
    ...appConfig.providers,
  ],
}).catch((err) => console.error(err));
