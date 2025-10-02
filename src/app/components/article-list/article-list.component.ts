import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Ajout de CommonModule
import { environment } from '../../../environment/environment';
import { gsap } from 'gsap';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: { id: string; name: string; description: string; price: number }[] = [];
  selectedArticle: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    console.log('✅ ngOnInit - PaymentComponent démarré');
    // Récupérer les articles depuis l'API backend
    this.http.get<any[]>(`${environment.apiUrl}/articles`).subscribe({
      next: (data) => {
        this.articles = data;
        this.animateArticles();
      },
      error: (err) => console.error('Erreur chargement articles:', err)
    });

    // Animation initiale de la page
    gsap.from('.articles-container', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
  }

  animateArticles() {
    gsap.from('.article-card', {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2, // Décalage entre chaque carte
      ease: 'power3.out'
    });
  }

  selectArticle(articleId: string) {
    this.selectedArticle = this.selectedArticle === articleId ? null : articleId;
    gsap.to(`.article-card[data-id="${articleId}"]`, {
      duration: 0.3,
      scale: this.selectedArticle === articleId ? 1.05 : 1,
      boxShadow: this.selectedArticle === articleId ? '0 10px 20px rgba(212, 164, 255, 0.5)' : 'none'
    });
  }

  navigateToPayment() {
    if (this.selectedArticle) {
      this.router.navigate(['/payment'], { queryParams: { articleId: this.selectedArticle } });
    }
  }
}