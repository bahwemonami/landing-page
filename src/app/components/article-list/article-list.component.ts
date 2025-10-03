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
  allArticles: { id: string; name: string; description: string; price: number }[] = [];
  selectedArticle: { id: string; name: string; description: string; price: number } | null = null;
  currentFilter: string = 'all';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    console.log('✅ ngOnInit - ArticleListComponent démarré');
    this.http.get<any[]>(`${environment.apiUrl}/articles`).subscribe({
      next: (data) => {
        this.articles = data;
        this.allArticles = data;
        this.animateArticles();
      },
      error: (err) => console.error('Erreur chargement articles:', err)
    });

    gsap.from('.articles-container', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
  }

  filterBy(category: string) {
    this.currentFilter = category;
    
    if (category === 'all') {
      this.articles = this.allArticles;
    } else {
      this.articles = this.allArticles.filter(article => 
        article.name.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    gsap.fromTo('.article-card',
      { opacity: 0, y: 20, scale: 0.95 },
      {
        duration: 0.5,
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }
    );
  }

  animateArticles() {
    gsap.from('.article-card', {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }

  selectArticle(articleId: string) {
    const article = this.articles.find(a => a.id === articleId);
    this.selectedArticle = this.selectedArticle?.id === articleId ? null : article || null;
    gsap.to(`.article-card[data-id="${articleId}"]`, {
      duration: 0.3,
      scale: this.selectedArticle?.id === articleId ? 1.05 : 1,
      boxShadow: this.selectedArticle?.id === articleId ? '0 10px 20px rgba(212, 164, 255, 0.5)' : 'none'
    });
  }

  navigateToPayment() {
    if (this.selectedArticle) {
      this.router.navigate(['/payment'], { queryParams: { articleId: this.selectedArticle.id } });
    }
  }
}