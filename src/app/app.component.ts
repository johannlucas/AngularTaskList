import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'TaskList';
  constructor(private _router: Router,
  private _titleSerivce: Title) { }

  ngOnInit(): void {
    this._titleSerivce.setTitle(this.title);
  }
}