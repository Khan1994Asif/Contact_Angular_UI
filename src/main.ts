import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Contact } from './app/contact/contact';

bootstrapApplication(Contact, appConfig)
  .catch((err) => console.error(err));
