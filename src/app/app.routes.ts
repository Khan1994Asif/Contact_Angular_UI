import { Routes } from '@angular/router';
import { Contact } from './contact/contact';



export const routes: Routes = [

  // 2. Default route with strict 'full' matching
  { path: '', redirectTo: 'contact', pathMatch: 'full' }, 

  // 1. Specific routes always go FIRST!
  { path: 'contact', component: Contact }, 

  // 3. Wildcard / Fallback route MUST be LAST
  { path: '**', redirectTo: 'home' } 
];
