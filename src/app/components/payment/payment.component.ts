import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { gsap } from 'gsap';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  article: { id: string; name: string; description: string; price: number } | null = null;
  paymentUrl: string = '';
  paymentId: string = '';
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('🔧 PaymentComponent initialized');
    this.route.queryParams.subscribe(params => {
      const articleId = params['articleId'];
      if (articleId) {
        console.log('📥 Query param articleId:', articleId);
        this.loadArticle(articleId);
      } else {
        this.error = 'Aucun article sélectionné.';
      }
    });


    gsap.from('.payment-container', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
  }

  loadArticle(articleId: string) {
    console.log('🔎 loadArticle - requesting', `${environment.apiUrl}/articles/${articleId}`);
    this.http.get<any>(`${environment.apiUrl}/articles/${articleId}`).subscribe({
      next: (data) => {
        console.log('📦 Article loaded:', data);
        this.article = data;
        this.createPayment();
      },
      error: (err) => {
        console.error('❌ loadArticle error:', err);
        this.error = 'Erreur chargement article.';
      }
    });
  }

  createPayment() {
    if (!this.article) return;
    this.loading = true;

    console.log('🚀 PaymentComponent.createPayment - Début de la création');
    console.log('📦 Article:', this.article);
    console.log('🌐 API URL:', `${environment.apiUrl}/create-payment`);

    this.http.post<any>(`${environment.apiUrl}/create-payment`, { articleId: this.article.id }).subscribe({
      next: (response) => {
        console.log('✅ PaymentComponent.createPayment - Réponse reçue du backend');
        console.log('📋 Response:', response);
        console.log('🆔 Article ID envoyé:', this.article?.id);

        // backend renvoie : { hosted: boolean, paymentUrl, paymentId, orderId, ... }
        this.paymentUrl = response.paymentUrl || null;
        this.paymentId = response.paymentId || null;

        console.log('🔗 Payment URL:', this.paymentUrl);
        console.log('🆔 Payment ID:', this.paymentId);

        // persist local pour vérification ultérieure
        if (this.paymentId) {
          localStorage.setItem(`payment_${this.paymentId}`, JSON.stringify({
            orderId: response.orderId,
            articleId: this.article?.id,
            createdAt: Date.now()
          }));
        }

        this.loading = false;
        // si hosted ou paymentUrl present -> rediriger/ouvrir automatiquement (optionnel)
        if (response.hosted || this.paymentUrl) {
          // ouvrir dans un nouvel onglet / rediriger selon UX
          window.open(this.paymentUrl, '_blank');
          // ou pour redirection same tab: window.location.href = this.paymentUrl;
        } else {
          // afficher le bouton "Payer Maintenant" si l'utilisateur doit copier l'adresse
          gsap.from('.pay-button', { duration: 0.5, scale: 0, ease: 'back.out' });
        }
      },
      error: (err) => {
        console.error('❌ PaymentComponent.createPayment - Erreur:', err);
        console.error('📊 Error details:', {
          status: err.status,
          statusText: err.statusText,
          message: err.message,
          url: err.url
        });
        this.error = 'Erreur création paiement.';
        this.loading = false;
      }
    });
  }

  openPayment() {
    if (this.paymentUrl) {
      window.open(this.paymentUrl, '_blank');
    }
  }
}