import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  ngOnInit() {
    // Animation d'entrée du footer
    gsap.from('.footer', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });

    // Animation des sections au hover (typé correctement)
    const sections = gsap.utils.toArray('.footer-section') as HTMLElement[];
    sections.forEach((section: HTMLElement, index: number) => {
      section.addEventListener('mouseenter', () => {
        gsap.to(section, { duration: 0.3, scale: 1.02, ease: 'power1.out' });
      });
      section.addEventListener('mouseleave', () => {
        gsap.to(section, { duration: 0.3, scale: 1, ease: 'power1.out' });
      });
    });
  }
}