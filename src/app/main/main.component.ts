import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get('https://api-rwnpemxchq-uc.a.run.app/characters').subscribe(console.log);
  }
}
