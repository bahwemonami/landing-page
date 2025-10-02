import { provideRouter, withComponentInputBinding } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { LandingComponent } from './app/components/landing/landing.component';
import { ArticleListComponent } from './app/components/article-list/article-list.component';
import { PaymentComponent } from './app/components/payment/payment.component';
import { OrderConfirmationComponent } from './app/components/order-confirmation/order-confirmation.component';
import { provideHttpClient } from '@angular/common/http';

const routes = [
  { path: '', component: LandingComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient()
  ]
}).catch(err => console.error(err));