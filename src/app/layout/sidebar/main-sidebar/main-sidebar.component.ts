import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss']
})
export class MainSidebarComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    
  }

  toggleMenu(): void {
    if (document.body.classList.contains('show')) {

      this.renderer.removeClass(document.body, 'show');

    } else {
      this.renderer.addClass(document.body, 'show');
    }
    if (document.body.classList.contains('show')) {
      this.renderer.removeClass(document.body, 'aside-fixed');
    }
    else {
      return
    }

  }


}
