// app.routes.ts
import { Routes } from '@angular/router';

// Importa tus componentes standalone
import { ChatPageComponent } from './chat/pages/chat-page/chat-page.component';
import { LoginPageComponent } from './chat/pages/login-page/login-page.component';
import { RegisterPageComponent } from './chat/pages/register-page/register-page.component';
import { HomePageComponent } from './chat/pages/home-page/home-page.component';
import { NosotrosPageComponent } from './chat/pages/nosotros-page/nosotros-page.component';
import { LegalPageComponent } from './chat/pages/legal-page/legal-page.component';
import { ContactanosPageComponent } from './chat/pages/contactanos-page/contactanos-page.component';
import { NavegationMenuComponent } from './chat/components/navegation-menu/navegation-menu.component';

export const routes: Routes = [
  { path: 'chat', component: ChatPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'nosotros', component: NosotrosPageComponent },
  { path: 'legal', component: LegalPageComponent },
  { path: 'contactanos', component: ContactanosPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
