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
    // Animation titre avec effet gradient
    gsap.from('.title', {
      duration: 1.5,
      y: 50,
      opacity: 0,
      rotationX: 90,
      ease: 'power3.out'
    });

    // Animation sous-titre
    gsap.from('.subtitle', {
      duration: 1.5,
      delay: 0.5,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    });

    // Animation bouton
    gsap.from('.cta-button', {
      duration: 1.5,
      delay: 1,
      y: 20,
      opacity: 0,
      ease: 'power3.out'
    });

    // Animation vague
    gsap.from('.wave-animation', {
      duration: 1.5,
      delay: 1.5,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });

    // Animation scroll-down
    gsap.from('.scroll-down', {
      duration: 1.5,
      delay: 2,
      y: 20,
      opacity: 0,
      ease: 'power3.out'
    });
  }

  navigateToArticles() {
    this.router.navigate(['/articles']);
  }
}