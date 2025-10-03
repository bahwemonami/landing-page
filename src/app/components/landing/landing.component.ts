import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    // Animation titre
    gsap.from('.title', {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });

    // Animation sous-titre
    gsap.from('.subtitle', {
      duration: 1.5,
      delay: 0.3,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    });

    // Animation bouton
    gsap.from('.cta-button', {
      duration: 1.5,
      delay: 0.6,
      y: 20,
      opacity: 0,
      ease: 'power3.out'
    });

    // Animation "Pourquoi nous ?"
    gsap.from('.why-us-item', {
      duration: 1.2,
      delay: 0.9,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Animation scroll-down
    gsap.from('.scroll-down', {
      duration: 1.5,
      delay: 1.2,
      y: 20,
      opacity: 0,
      ease: 'power3.out',
      repeat: -1,
      yoyo: true
    });

    // Parallax léger
    gsap.to('.landing-container', {
      scrollTrigger: {
        trigger: '.landing-container',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      backgroundPositionY: '20%',
      ease: 'none'
    });

    // Animation particules (simulée avec GSAP)
    const particles = gsap.utils.toArray('.particle') as HTMLElement[];
    particles.forEach((particle: HTMLElement, i: number) => {
      gsap.fromTo(particle, {
        x: gsap.utils.random(-100, 100),
        y: gsap.utils.random(-100, 100),
        opacity: 0.5
      }, {
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-50, 50),
        opacity: 0,
        duration: gsap.utils.random(2, 5),
        repeat: -1,
        yoyo: true,
        delay: i * 0.1,
        ease: 'power1.inOut'
      });
    });
    gsap.utils.toArray('.why-us-item').forEach((item: any) => {
      gsap.to(item, {
        scale: 1.05,
        duration: 0.3,
        paused: true,
        ease: 'power1.out'
      }).pause();
      item.addEventListener('mouseenter', () => gsap.to(item, { scale: 1.05, duration: 0.3 }));
      item.addEventListener('mouseleave', () => gsap.to(item, { scale: 1, duration: 0.3 }));
    });
  }

  navigateToArticles() {
    this.router.navigate(['/articles']);
  }

  ngAfterViewInit() {
    // Ajout dynamique des particules (simulées)
    const container = document.querySelector('.landing-container') as HTMLElement;
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute w-2 h-2 bg-white rounded-full';
      particle.style.left = `${gsap.utils.random(0, 100)}%`;
      particle.style.top = `${gsap.utils.random(0, 100)}%`;
      container.appendChild(particle);
    }
  }
}