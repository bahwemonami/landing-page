import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
  features = [
    {
      title: 'Leads Ciblés & Qualifiés',
      description: 'Accédez à une base de données de prospects ultra-ciblés, filtrés selon vos critères spécifiques pour maximiser vos conversions.',
      color: 'linear-gradient(135deg, #10B981, #059669)',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'Automatisation Intelligente',
      description: 'Scrapers avancés et outils IA pour générer des leads en autopilot. Gagnez du temps et focalisez-vous sur la vente.',
      color: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
      iconPath: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    {
      title: 'Analytics & Reporting',
      description: 'Tableaux de bord détaillés pour suivre vos KPIs, analyser vos performances et optimiser votre ROI en temps réel.',
      color: 'linear-gradient(135deg, #7C3AED, #6d28d9)',
      iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    {
      title: 'Intégration CRM',
      description: 'Synchronisation automatique avec vos outils existants (Salesforce, HubSpot, Pipedrive) pour un workflow optimisé.',
      color: 'linear-gradient(135deg, #F59E0B, #d97706)',
      iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
    },
    {
      title: 'Support Expert 24/7',
      description: 'Équipe dédiée disponible à tout moment pour vous accompagner, résoudre vos problèmes et optimiser vos résultats.',
      color: 'linear-gradient(135deg, #EC4899, #db2777)',
      iconPath: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
    },
    {
      title: 'Sécurité & Conformité',
      description: 'Protection RGPD, chiffrement bout-en-bout et conformité totale pour sécuriser vos données et celles de vos clients.',
      color: 'linear-gradient(135deg, #06B6D4, #0891b2)',
      iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.initAnimations();
  }

  ngAfterViewInit() {
    this.createParticles();
    this.setupScrollTriggers();
  }

  private initAnimations() {
    gsap.from('.hero-badge', {
      duration: 0.8,
      y: -30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.from('.hero-title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.4
    });

    gsap.from('.hero-subtitle', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.6
    });

    gsap.from('.hero-cta-group .cta-button', {
      duration: 0.8,
      y: 20,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.8
    });

    gsap.from('.hero-stats', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 1
    });

    gsap.from('.scroll-indicator', {
      duration: 1,
      opacity: 0,
      ease: 'power3.out',
      delay: 1.2
    });
  }

  private setupScrollTriggers() {
    gsap.from('.section-badge', {
      scrollTrigger: {
        trigger: '.why-us-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    });

    gsap.from('.section-title', {
      scrollTrigger: {
        trigger: '.why-us-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      delay: 0.2,
      ease: 'power3.out'
    });

    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      y: 60,
      opacity: 0,
      stagger: 0.15,
      ease: 'power3.out'
    });

    gsap.from('.cta-section .cta-content', {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 1,
      y: 40,
      opacity: 0,
      ease: 'power3.out'
    });

    if (window.innerWidth > 768) {
      gsap.to('.hero-overlay', {
        scrollTrigger: {
          trigger: '.landing-container',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: '30%',
        opacity: 0.5,
        ease: 'none'
      });
    }
  }

  private createParticles() {
    const particlesBg = document.querySelector('.particles-bg') as HTMLElement;
    if (!particlesBg) return;

    const particleCount = window.innerWidth > 768 ? 30 : 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = `${gsap.utils.random(2, 6)}px`;
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      particle.style.background = 'rgba(255, 255, 255, 0.3)';
      particle.style.left = `${gsap.utils.random(0, 100)}%`;
      particle.style.top = `${gsap.utils.random(0, 100)}%`;
      particle.style.pointerEvents = 'none';

      particlesBg.appendChild(particle);

      gsap.to(particle, {
        x: gsap.utils.random(-100, 100),
        y: gsap.utils.random(-100, 100),
        opacity: gsap.utils.random(0.1, 0.5),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 2)
      });
    }
  }

  navigateToArticles() {
    this.router.navigate(['/articles']);
  }

  scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
