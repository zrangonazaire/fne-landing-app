import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly slides = [
    {
      eyebrow: 'FNE - Facturation Electronique CI',
      title: 'Un partenaire unique pour votre mise en conformite FNE.',
      lede:
        'Diagnostic, inscription, paramétrage (logo, timbre, stickers) et conduite du changement, avec un logiciel de facturation conforme FNE inclus.',
      cards: [
        { label: 'Support hotline', strong: '+225 07 08 77 13 17 / +225 07 77 88 08 85', note: 'Appel direct' },
        { label: 'Integrations API', strong: 'ERP & apps internes', note: 'Connexion FNE + logiciel' },
      ],
    },
    {
      eyebrow: 'Integration rapide',
      title: 'Connectez vos outils a la FNE et a notre logiciel conforme.',
      lede:
        'Inscription FNE, OTP, changement de mot de passe, interfaçage ERP/API et paramétrage des établissements et caisses.',
      cards: [
        { label: 'Support hotline', strong: '+225 07 08 77 13 17 / +225 07 77 88 08 85', note: 'Appel direct' },
        { label: 'Integrations API', strong: 'ERP & apps internes', note: 'Connexion FNE + logiciel' },
      ],
    },
    {
      eyebrow: 'Support et evolution',
      title: 'Maintenez la conformite et faites evoluer vos flux.',
      lede:
        'Surveillance des rejets, achats de stickers, mises a jour FNE, hotline prioritaire et evolutions de votre logiciel de facturation.',
      cards: [
        { label: 'Support hotline', strong: '+225 07 08 77 13 17 / +225 07 77 88 08 85', note: 'Appel direct' },
        { label: 'Run', strong: 'Monitoring 24/7', note: 'KPIs et reporting mensuel' },
        { label: 'Logiciel', strong: 'Facturation FNE', note: 'Licences et mises a jour' },
      ],
    },
  ];

  protected readonly currentSlide = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startAuto();
  }

  ngOnDestroy(): void {
    this.stopAuto();
  }

  protected nextSlide(): void {
    this.currentSlide.update((idx) => (idx + 1) % this.slides.length);
    this.restartAuto();
  }

  protected prevSlide(): void {
    this.currentSlide.update((idx) => (idx - 1 + this.slides.length) % this.slides.length);
    this.restartAuto();
  }

  protected goToSlide(idx: number): void {
    this.currentSlide.set(idx % this.slides.length);
    this.restartAuto();
  }

  protected carouselTransform(): string {
    return `translateX(-${this.currentSlide() * 100}%)`;
  }

  private startAuto(): void {
    this.stopAuto();
    this.intervalId = setInterval(() => this.nextSlide(), 6000);
  }

  private stopAuto(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private restartAuto(): void {
    this.startAuto();
  }
}
