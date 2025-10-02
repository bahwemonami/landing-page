import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { gsap } from 'gsap';

@Component({
  selector: 'app-order-confirmation',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent implements OnInit {
  orderId: string | null = null;
  paymentId: string | null = null;
  paymentStatus: string = 'pending';
  paymentData: any = null;
  loading = true;
  error: string | null = null;
  checkInterval: any = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      this.paymentId = params['paymentId'];
      
      if (this.orderId) {
        this.checkPaymentStatus();
        // Vérifier le statut toutes les 5 secondes
        this.checkInterval = setInterval(() => {
          this.checkPaymentStatus();
        }, 5000);
      } else {
        this.error = 'Aucun numéro de commande fourni.';
        this.loading = false;
      }
    });

    gsap.from('.confirmation-container', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
  }

  ngOnDestroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  checkPaymentStatus() {
    if (!this.orderId) return;

    this.http.get<any>(`${environment.apiUrl}/payment-status/${this.orderId}`).subscribe({
      next: (response) => {
        this.paymentData = response;
        this.paymentStatus = response.status;
        this.loading = false;

        // Si le paiement est confirmé, arrêter la vérification
        if (response.status === 'confirmed' || response.status === 'completed') {
          if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
          }
        }
      },
      error: (err) => {
        console.error('Erreur vérification statut:', err);
        this.error = 'Erreur lors de la vérification du statut.';
        this.loading = false;
      }
    });
  }

  getStatusMessage(): string {
    switch (this.paymentStatus) {
      case 'pending':
        return 'Votre paiement est en cours de traitement...';
      case 'confirmed':
      case 'completed':
        return '✅ Paiement confirmé ! Votre commande a été traitée avec succès.';
      case 'failed':
      case 'cancelled':
        return '❌ Le paiement a échoué ou a été annulé.';
      default:
        return 'Statut inconnu';
    }
  }

  getStatusClass(): string {
    switch (this.paymentStatus) {
      case 'confirmed':
      case 'completed':
        return 'status-success';
      case 'failed':
      case 'cancelled':
        return 'status-error';
      default:
        return 'status-pending';
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  retryPayment() {
    if (this.paymentData?.paymentUrl) {
      window.open(this.paymentData.paymentUrl, '_blank');
    }
  }
}
