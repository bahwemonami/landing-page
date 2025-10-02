import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: LandingComponent },
      { path: 'articles', component: ArticleListComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'order-confirmation', component: OrderConfirmationComponent }
    ], withComponentInputBinding())
  ]
};