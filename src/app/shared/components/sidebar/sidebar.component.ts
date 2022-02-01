import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  constructor(private renderer: Renderer2) {

  }


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
    else{
      return
    }

  }
}
