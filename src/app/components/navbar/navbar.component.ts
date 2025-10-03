import { Component, OnInit, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  
  isMenuOpen = false;
  isDarkMode = false;
  isSearchOpen = false;
  isUserDropdownOpen = false;
  searchQuery = '';
  private scrollY = 0;

  ngOnInit() {
    gsap.from('.navbar', {
      duration: 0.8,
      y: -100,
      opacity: 0,
      ease: 'power3.out'
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
    }
  }

  ngAfterViewInit() {
    this.setupLogoAnimation();
    this.setupScrollAnimation();
  }

  private setupLogoAnimation() {
    const logo = document.querySelector('.logo') as HTMLElement;
    if (logo) {
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo, {
          duration: 0.4,
          scale: 1.05,
          ease: 'power2.out'
        });
      });

      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
          duration: 0.4,
          scale: 1,
          ease: 'power2.out'
        });
      });
    }
  }

  private setupScrollAnimation() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (navbar) {
      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        if (window.innerWidth > 768) {
          const parallaxOffset = currentScrollY * 0.3;
          gsap.to(navbar, {
            duration: 0.3,
            y: -parallaxOffset * 0.2,
            ease: 'power1.out'
          });
        }

        this.scrollY = currentScrollY;
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    const menuIcon = document.querySelector('.menu-icon') as HTMLElement;

    if (this.isMenuOpen) {
      gsap.fromTo(
        navLinks,
        { opacity: 0, y: -20 },
        {
          duration: 0.4,
          opacity: 1,
          y: 0,
          ease: 'power2.out'
        }
      );

      gsap.to(menuIcon, {
        duration: 0.3,
        rotation: 180,
        ease: 'power2.inOut'
      });
    } else {
      gsap.to(navLinks, {
        duration: 0.3,
        opacity: 0,
        y: -10,
        ease: 'power2.in'
      });

      gsap.to(menuIcon, {
        duration: 0.3,
        rotation: 0,
        ease: 'power2.inOut'
      });
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');

    const navbar = document.querySelector('.navbar') as HTMLElement;
    const darkModeToggle = document.querySelector('.dark-mode-toggle') as HTMLElement;

    gsap.to(darkModeToggle, {
      duration: 0.3,
      rotation: this.isDarkMode ? 360 : 0,
      scale: 1.2,
      ease: 'back.out(1.7)',
      onComplete: () => {
        gsap.to(darkModeToggle, {
          duration: 0.2,
          scale: 1,
          ease: 'power2.out'
        });
      }
    });

    gsap.to(navbar, {
      duration: 0.5,
      backgroundColor: this.isDarkMode ? '#0F172A' : 'transparent',
      ease: 'power2.out'
    });
  }

  animateLink(event: MouseEvent) {
    const link = event.target as HTMLElement;
    const icon = link.querySelector('.nav-icon') as HTMLElement;

    gsap.to(link, {
      duration: 0.3,
      y: -3,
      color: '#10B981',
      ease: 'power2.out'
    });

    if (icon) {
      gsap.to(icon, {
        duration: 0.3,
        scale: 1.15,
        rotation: 5,
        ease: 'back.out(1.7)'
      });
    }
  }

  resetLink(event: MouseEvent) {
    const link = event.target as HTMLElement;
    const icon = link.querySelector('.nav-icon') as HTMLElement;

    if (!link.classList.contains('active')) {
      gsap.to(link, {
        duration: 0.3,
        y: 0,
        color: '#FFFFFF',
        ease: 'power2.out'
      });
    }

    if (icon) {
      gsap.to(icon, {
        duration: 0.3,
        scale: 1,
        rotation: 0,
        ease: 'power2.out'
      });
    }
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    
    if (this.isSearchOpen) {
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      }, 100);
      
      gsap.to('.search-input', {
        duration: 0.3,
        width: '200px',
        opacity: 1,
        ease: 'power2.out'
      });
    } else {
      gsap.to('.search-input', {
        duration: 0.3,
        width: '0',
        opacity: 0,
        ease: 'power2.in'
      });
    }
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      console.log('Recherche:', this.searchQuery);
    }
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
    
    if (this.isUserDropdownOpen) {
      gsap.fromTo('.dropdown-menu',
        { opacity: 0, y: -10, scale: 0.95 },
        { 
          duration: 0.3,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'back.out(1.7)'
        }
      );
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (this.isUserDropdownOpen && !target.closest('.user-dropdown')) {
      this.isUserDropdownOpen = false;
    }
    if (this.isSearchOpen && !target.closest('.search-bar')) {
      this.isSearchOpen = false;
      gsap.to('.search-input', {
        duration: 0.3,
        width: '0',
        opacity: 0,
        ease: 'power2.in'
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.isMenuOpen = false;
      const navLinks = document.querySelector('.nav-links') as HTMLElement;
      if (navLinks) {
        navLinks.style.display = '';
      }
    }
  }
}
