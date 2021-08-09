import { Component, OnInit } from '@angular/core';
import { PlaneteService } from 'src/app/services/planete/planete.service';
import { JoueurService } from 'src/app/services/joueur/joueur.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  canvas: any;
  ctx: any;
  raf: number;
  path: any[];

  private ville = {
    plan: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    planEnvironment: [],
    planBuilds: [],
    height: 20,
    width: 20,
    environment: this.getEnvironment(),
    builds: this.getBuilds(),
    createEnvironment() {
      let arr = JSON.parse(JSON.stringify(this.plan))

      for (let r = 0; r < arr.length; r++) {
        let row = arr[r];
        for (let c = 0; c < row.length; c++) {
          let col = row[c];

          // Herbe
          if (col == 1 || col == 2 || col == 3) {
            let height = 20
            let width = 20
            let choices = {
              1: ['environment', 2, 2, height, width],
              2: ['environment', 2, 3, height, width],
              3: ['environment', 3, 3, height, width],
              4: ['environment', 4, 7, height, width],
              5: ['environment', 4, 7, height, width],
              6: ['environment', 4, 7, height, width],
              7: ['environment', 4, 7, height, width],
              8: ['environment', 4, 7, height, width],
              9: ['environment', 4, 7, height, width],
              10: ['environment', 4, 7, height, width],
              11: ['environment', 4, 7, height, width],
              12: ['environment', 4, 7, height, width],
              13: ['environment', 4, 7, height, width],
              14: ['environment', 4, 7, height, width],
              15: ['environment', 4, 7, height, width],
              16: ['environment', 4, 7, height, width],
              17: ['environment', 4, 7, height, width],
              18: ['environment', 4, 7, height, width],
              19: ['environment', 4, 7, height, width],
              20: ['environment', 4, 7, height, width],
              21: ['environment', 4, 7, height, width],
              22: ['environment', 4, 7, height, width],
              23: ['environment', 4, 7, height, width],
              24: ['environment', 4, 7, height, width],
              25: ['environment', 4, 7, height, width],
              26: ['environment', 4, 7, height, width],
              27: ['environment', 4, 7, height, width],
            }

            arr[r][c] = choices[random(1, 27)]
          }

          // Chemins + bordure
          if (col == 0) {
            let height = 20
            let width = 20
            let choices = {
              1: ['environment', 5, 1, height, width],
              2: ['environment', 5, 2, height, width],
              3: ['environment', 5, 3, height, width],
              4: ['environment', 5, 4, height, width],
            }

            arr[r][c] = choices[random(1, 4)]

            // Bordures haut
            if (this.plan[r - 1][c] != 0) {
              arr[r - 1][c] = ['environment', 10, 2, height, width]
              // Angle ext haut-gauche // Si a gauche ya pas de terre
              if (this.plan[r][c - 1] != 0) arr[r - 1][c - 1] = ['environment', 6, 1, height, width]
              // Angle ext haut-droite // Si a droite ya pas de terre
              if (this.plan[r][c + 1] != 0) arr[r - 1][c + 1] = ['environment', 6, 2, height, width]


              // Angle int haut-droit // Si a gauche ya pas de terre
              if (this.plan[r - 1][c - 1] == 0) arr[r - 1][c] = ['environment', 4, 1, height, width]
              // Angle int haut-gauche // Si a gauche ya pas de terre
              if (this.plan[r - 1][c + 1] == 0) arr[r - 1][c] = ['environment', 4, 4, height, width]

            }
            // Bordures bas
            if (this.plan[r + 1][c] != 0) {
              arr[r + 1][c] = ['environment', 1, 2, height, width]
              // Angle bas-gauche // Si a gauche ya pas de terre
              if (this.plan[r][c - 1] != 0) arr[r + 1][c - 1] = ['environment', 7, 1, height, width]
              // // Angle bas-droite // Si a droite ya pas de terre
              if (this.plan[r][c + 1] != 0) arr[r + 1][c + 1] = ['environment', 7, 2, height, width]
            }
            // Bordures droite
            if (this.plan[r][c + 1] != 0) {
              arr[r][c + 1] = ['environment', 3, 1, height, width]
              // Angle int haut-gauche // Si a gauche ya pas de terre
              if (this.plan[r - 1][c + 1] == 0) arr[r][c + 1] = ['environment', 1, 1, height, width]

            }
            // Bordures gauche
            if (this.plan[r][c - 1] != 0) {
              arr[r][c - 1] = ['environment', 3, 4, height, width]
              // Angle int haut-gauche // Si a gauche ya pas de terre
              if (this.plan[r - 1][c - 1] == 0) arr[r][c - 1] = ['environment', 1, 4, height, width]
            }
          }
        }
      }

      this.planEnvironment = arr

    },
    createBuilds() {
      let arr = JSON.parse(JSON.stringify(this.plan))

      for (let r = 0; r < arr.length; r++) {
        let row = arr[r];
        for (let c = 0; c < row.length; c++) {
          let col = row[c];

          // Arbre
          if (col == 2) {
            let height = random(55, 63)
            let width = random(74, 76)

            let choices = {
              1: ['builds', 1, 1, height, width],
              2: ['builds', 1, 2, height, width],
            }
            let rnd = random(1, 2)

            arr[r - 3][c - 1] = choices[rnd]
          }
          // Maison
          if (col == 3) {
            let height = 110
            let width = 96

            let choices = {
              1: ['builds', 2, 1, height, width],
            }
            let choices2 = {
              1: ['builds', 3, 2, 30, 30],
              2: ['builds', 3, 1, 30, 30],
            }

            arr[r - 4][c - 2] = choices[random(1, 1)]
            arr[r - 1][c - 3] = choices2[random(1, 2)]

          }

        }
      }

      this.planBuilds = arr

    },
    drawEnvironment(that) {
      for (let l = 0; l < this.planEnvironment.length; l++) {
        const ligne = this.planEnvironment[l];
        for (let c = 0; c < ligne.length; c++) {
          const casee = ligne[c];
          if (casee[0] == null) continue
          that.ctx.drawImage(this[casee[0]][casee[1]][casee[2]], this.width * c, this.height * l, casee[3], casee[4]);
        }
      }
    },
    drawBuilds(that) {

      for (let l = 0; l < this.planBuilds.length; l++) {
        const ligne = this.planBuilds[l];
        for (let c = 0; c < ligne.length; c++) {
          const casee = ligne[c];
          if (casee[0] == null) continue
          that.ctx.drawImage(this[casee[0]][casee[1]][casee[2]], this.width * c, this.height * l, casee[3], casee[4]);
        }
      }

    }
  }

  private villageois = {
    x: 780,
    y: 130,
    height: 30,
    width: 30,
    currentStep: 0,
    currentPixel: 0,
    img: this.getVilllageois(),
    draw(that) {
      that.ctx.drawImage(this.img, (this.x + (that.ville.width / 2) - (this.width / 2)), (this.y + (that.ville.height / 2) - (this.height / 2)), this.height, this.width);
      this.move(that)
    },
    move(that) {
      if (this.currentPixel == 20) {
        this.currentStep++
        this.currentPixel = 0
      }

      if (this.currentStep < that.path.length) {

        let xCible = (that.path[this.currentStep][0] * 20)
        let yCible = (that.path[this.currentStep][1] * 20)

        let direction

        if (this.y < yCible) direction = 'Bas'
        if (this.y > yCible) direction = 'Haut'
        if (this.x < xCible) direction = 'Droite'
        if (this.x > xCible) direction = 'Gauche'
        // console.log(direction)

        if (this.y < yCible) this.y++
        if (this.y > yCible) this.y--

        if (this.x < xCible) this.x++
        if (this.x > xCible) this.x--

        this.currentPixel++

      }

    }

  }

  private fin = {
    x: 700,
    y: 400,
    height: 20,
    width: 20,
    img: this.getFin(),
    draw(that) {
      that.ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
    }
  }


  public menus = {
    current : null,
    liste : [{
      label : 'ressources',
      color: 'orange'
    }, {
      label : 'craft',
      color: 'orange'
    }, {
      label : 'updates',
      color: 'orange'
    }, {
      label : 'managers',
      color: 'orange'
    }],
    opened : false,
    select(menu){

      if(this.current != null && menu.label == this.current.label){
        this.current = null
      }else this.current = menu
    }
  }

  constructor(public planeteService: PlaneteService, public joueurService: JoueurService) {
    // Generation de la map
    this.ville.createEnvironment()
    
    this.ville.createBuilds()

  }

  ngOnInit() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }


  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


    // La ville
    this.ville.drawEnvironment(this)


    // Planetes
    this.planeteService.liste.map(planet => planet.draw(this))

    
    this.fin.draw(this)

    // La ville
    this.ville.drawBuilds(this)

    // Fin de boucle
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  getEnvironment() {
    let imgs = []
    for (let y = 1; y <= 17; y++) {
      for (let x = 1; x <= 9; x++) {
        let img = new Image();
        img.src = "assets/pack/environment/row-" + y + "-col-" + x + ".png";
        if (imgs[y] == undefined) imgs[y] = []
        imgs[y][x] = img
      }
    }
    return imgs
  }
  getBuilds() {
    let imgs = []
    for (let y = 1; y <= 3; y++) {
      for (let x = 1; x <= 3; x++) {
        let img = new Image();
        img.src = "assets/pack/builds/row-" + y + "-col-" + x + ".png";
        if (imgs[y] == undefined) imgs[y] = []
        imgs[y][x] = img
      }
    }
    return imgs
  }
  getHouse() {
    let img = new Image();
    img.src = "assets/house.png";
    return img
  }
  getVilllageois() {
    let img = new Image();
    img.src = "assets/Vaisseau/petit.png";
    return img
  }
  getFin() {
    let img = new Image();
    img.src = "assets/Vaisseau/1.png";
    return img
  }

}


// world is a 2d array of integers (eg world[10][15] = 0)
// pathStart and pathEnd are arrays like [5,10]
function findPath(world, pathStart, pathEnd) {
  // shortcuts for speed
  var abs = Math.abs;
  var max = Math.max;
  var pow = Math.pow;
  var sqrt = Math.sqrt;

  // the world data are integers:
  // anything higher than this number is considered blocked
  // this is handy is you use numbered sprites, more than one
  // of which is walkable road, grass, mud, etc
  var maxWalkableTileNum = 0;

  // keep track of the world dimensions
  // Note that this A-star implementation expects the world array to be square: 
  // it must have equal height and width. If your game world is rectangular, 
  // just fill the array with dummy values to pad the empty space.
  var worldWidth = world[0].length;
  var worldHeight = world.length;
  var worldSize = worldWidth * worldHeight;

  // which heuristic should we use?
  // default: no diagonals (Manhattan)
  var distanceFunction = EuclideanDistance;
  var findNeighbours = function () { }; // empty

	/*

	// alternate heuristics, depending on your game:

	// diagonals allowed but no sqeezing through cracks:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighbours;

	// diagonals and squeezing through cracks allowed:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighboursFree;

	// euclidean but no squeezing through cracks:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighbours;

	// euclidean and squeezing through cracks allowed:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighboursFree;

	*/

  // distanceFunction functions
  // these return how far away a point is to another

  function ManhattanDistance(Point, Goal) { // linear movement - no diagonals - just cardinal directions (NSEW)
    return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
  }

  function DiagonalDistance(Point, Goal) { // diagonal movement - assumes diag dist is 1, same as cardinals
    return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
  }

  function EuclideanDistance(Point, Goal) { // diagonals are considered a little farther than cardinal directions
    // diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
    // where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
    return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
  }

  // Neighbours functions, used by findNeighbours function
  // to locate adjacent available cells that aren't blocked

  // Returns every available North, South, East or West
  // cell that is empty. No diagonals,
  // unless distanceFunction function is not Manhattan
  function Neighbours(x, y) {
    var N = y - 1,
      S = y + 1,
      E = x + 1,
      W = x - 1,
      myN = N > -1 && canWalkHere(x, N),
      myS = S < worldHeight && canWalkHere(x, S),
      myE = E < worldWidth && canWalkHere(E, y),
      myW = W > -1 && canWalkHere(W, y),
      result = [];
    if (myN)
      result.push(
        {
          x: x,
          y: N
        });
    if (myE)
      result.push(
        {
          x: E,
          y: y
        });
    if (myS)
      result.push(
        {
          x: x,
          y: S
        });
    if (myW)
      result.push(
        {
          x: W,
          y: y
        });
    // findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
    return result;
  }

  // returns every available North East, South East,
  // South West or North West cell - no squeezing through
  // "cracks" between two diagonals
  function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
    if (myN) {
      if (myE && canWalkHere(E, N))
        result.push(
          {
            x: E,
            y: N
          });
      if (myW && canWalkHere(W, N))
        result.push(
          {
            x: W,
            y: N
          });
    }
    if (myS) {
      if (myE && canWalkHere(E, S))
        result.push(
          {
            x: E,
            y: S
          });
      if (myW && canWalkHere(W, S))
        result.push(
          {
            x: W,
            y: S
          });
    }
  }

  // returns every available North East, South East,
  // South West or North West cell including the times that
  // you would be squeezing through a "crack"
  function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result) {
    myN = N > -1;
    myS = S < worldHeight;
    myE = E < worldWidth;
    myW = W > -1;
    if (myE) {
      if (myN && canWalkHere(E, N))
        result.push(
          {
            x: E,
            y: N
          });
      if (myS && canWalkHere(E, S))
        result.push(
          {
            x: E,
            y: S
          });
    }
    if (myW) {
      if (myN && canWalkHere(W, N))
        result.push(
          {
            x: W,
            y: N
          });
      if (myS && canWalkHere(W, S))
        result.push(
          {
            x: W,
            y: S
          });
    }
  }

  // returns boolean value (world cell is available and open)
  function canWalkHere(y, x) {
    if (x == 2 && y == 1) {
      console.log(x, y, ((world[x] != null) &&
        (world[x][y] != null) &&
        (world[x][y] <= maxWalkableTileNum)))

      console.log(world[2][1])

    }



    return ((world[x] != null) &&
      (world[x][y] != null) &&
      (world[x][y] <= maxWalkableTileNum));
  };

  // Node function, returns a new object with Node properties
  // Used in the calculatePath function to store route costs, etc.
  function Node(Parent, Point) {
    var newNode = {
      // pointer to another Node object
      Parent: Parent,
      // array index of this Node in the world linear array
      value: Point.x + (Point.y * worldWidth),
      // the location coordinates of this Node
      x: Point.x,
      y: Point.y,
      // the heuristic estimated cost
      // of an entire path using this node
      f: 0,
      // the distanceFunction cost to get
      // from the starting point to this node
      g: 0
    };

    return newNode;
  }

  // Path function, executes AStar algorithm operations
  function calculatePath() {
    // create Nodes from the Start and End x,y coordinates
    var mypathStart = Node(null,
      {
        x: pathStart[0],
        y: pathStart[1]
      });
    var mypathEnd = Node(null,
      {
        x: pathEnd[0],
        y: pathEnd[1]
      });
    // create an array that will contain all world cells
    var AStar = new Array(worldSize);
    // list of currently open Nodes
    var Open = [mypathStart];
    // list of closed Nodes
    var Closed = [];
    // list of the final output array
    var result = [];
    // reference to a Node (that is nearby)
    var myNeighbours;
    // reference to a Node (that we are considering now)
    var myNode;
    // reference to a Node (that starts a path in question)
    var myPath;
    // temp integer variables used in the calculations
    var length, max, min, i, j;
    // iterate through the open list until none are left
    while (length = Open.length) {
      max = worldSize;
      min = -1;
      for (i = 0; i < length; i++) {
        if (Open[i].f < max) {
          max = Open[i].f;
          min = i;
        }
      }
      // grab the next node and remove it from Open array
      myNode = Open.splice(min, 1)[0];
      // is it the destination node?
      if (myNode.value === mypathEnd.value) {
        myPath = Closed[Closed.push(myNode) - 1];
        do {
          result.push([myPath.x, myPath.y]);
        }
        while (myPath = myPath.Parent);
        // clear the working arrays
        AStar = Closed = Open = [];
        // we want to return start to finish
        result.reverse();
      }
      else // not the destination
      {
        // find which nearby nodes are walkable
        myNeighbours = Neighbours(myNode.x, myNode.y);
        // test each one that hasn't been tried already
        for (i = 0, j = myNeighbours.length; i < j; i++) {
          myPath = Node(myNode, myNeighbours[i]);
          if (!AStar[myPath.value]) {
            // estimated cost of this particular route so far
            myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
            // estimated cost of entire guessed route to the destination
            myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
            // remember this new path for testing above
            Open.push(myPath);
            // mark this node in the world graph as visited
            AStar[myPath.value] = true;
          }
        }
        // remember this route as having no more untested options
        Closed.push(myNode);
      }
    } // keep iterating until the Open list is empty
    return result;
  }

  return calculatePath();
}


function random(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}