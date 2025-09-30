import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactanos-page',
  standalone: true,
  imports: [
    CommonModule,   // para *ngIf, *ngFor, ngClass, etc.
    FormsModule,    // para ngModel // porque usas <app-side-menu>
  ],
  templateUrl: './contactanos-page.component.html',
  styleUrls: ['./contactanos-page.component.css']
})
export class ContactanosPageComponent {
  openFaq: number | null = null;

  toggleFaq(index: number) {
    this.openFaq = this.openFaq === index ? null : index;
  }
}
