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
}