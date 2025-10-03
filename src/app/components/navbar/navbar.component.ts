import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;

  ngOnInit() {
    // Animation d'entrée de la navbar
    gsap.from('.navbar', {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'power3.out'
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    if (this.isMenuOpen) {
      gsap.to(navLinks, { duration: 0.5, height: 'auto', opacity: 1, display: 'flex' });
    } else {
      gsap.to(navLinks, { duration: 0.5, height: 0, opacity: 0, display: 'none' });
    }
  }

  animateLink(event: MouseEvent) {
    const link = event.target as HTMLElement;
    gsap.to(link, { duration: 0.3, scale: 1.1, color: '#10B981', ease: 'power1.out' });
  }

  resetLink(event: MouseEvent) {
    const link = event.target as HTMLElement;
    gsap.to(link, { duration: 0.3, scale: 1, color: '#FFFFFF', ease: 'power1.out' });
  }

  ngAfterViewInit() {
    const logo = document.querySelector('.logo') as HTMLElement;
    logo.addEventListener('mouseenter', () => gsap.to(logo, { duration: 0.3, scale: 1.05, ease: 'power1.out' }));
    logo.addEventListener('mouseleave', () => gsap.to(logo, { duration: 0.3, scale: 1, ease: 'power1.out' }));
  }
}