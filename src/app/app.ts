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
      eyebrow: 'E-facturation B2B - Cote d\'Ivoire',
      title: 'Protegez vos flux, une facture a la fois.',
      lede:
        'Orchestration complete : analyse, integration PPF/PDP, conduite du changement et support run pour des go-live rapides et conformes.',
      cards: [
        { label: 'Notre bureau', strong: 'Plateau, Abidjan', note: 'Visites sur rendez-vous' },
        { label: 'Contact direct', strong: '+225 07 00 00 00 00', note: 'contact@fne-ci.com' },
      ],
    },
    {
      eyebrow: 'Integration rapide',
      title: 'Connectez vos ERP aux plateformes PPF / PDP.',
      lede:
        'Connecteurs API, certificats, signature et archivage probant. Pilote controle puis bascule progressive.',
      cards: [
        { label: 'ERP couverts', strong: 'SAP, Dynamics, Odoo', note: 'Portails clients sur mesure' },
        { label: 'Equipe', strong: 'Finance + IT', note: 'Chef de projet dedie' },
      ],
    },
    {
      eyebrow: 'Support et evolution',
      title: 'Maintenez la conformite dans la duree.',
      lede:
        'Surveillance des rejets, mises a jour legales, hotline prioritaire et accompagnement des equipes internes.',
      cards: [
        { label: 'Run', strong: 'Monitoring 24/7', note: 'KPIs et reporting mensuel' },
        { label: 'Formation', strong: 'Finance & ventes', note: 'Sessions live et replays' },
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
