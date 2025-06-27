import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { boardsReducer } from './store/boards.reducer';
import { loadStateFromLocalStorage } from './utils/local-storage';
import { metaReducers } from './store/meta-reducers';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(
      { boards: boardsReducer },
      {
        initialState: {
          boards: loadStateFromLocalStorage()?? undefined,
        },
        metaReducers: metaReducers,
      }
    ),
    provideEffects([]),
    ...appConfig.providers,
  ],
}).catch((err) => console.error(err));
