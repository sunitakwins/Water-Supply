import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services';


@Component({
  selector: 'app-loader',
  template: `
  <ngx-spinner bdColor="rgba(51,51,51,0.8)" size="medium" color="#fff" type="ball-scale-multiple" [fullScreen]="fullScreen">
    <p style="font-size: 20px; color: white">Loading...</p>
  </ngx-spinner>
  `,
  styles: []
})
export class PageLoaderComponent implements OnInit {
  @Input() showSpinner: boolean = false;

  // <ngx-loader [show]="showSpinner" [fullScreen] = "fullScreen"> Loading... </ngx-loader>
  
  fullScreen = true;
  constructor(private loader: LoaderService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loader.spinnerObservable$.subscribe(
      (result) => {
        if (result !== undefined) {
          this.showSpinner = result;
          this.cd.detectChanges();
        }
      },
      (error) => {
        console.error('Error in subscription for loader ' + error);
        this.showSpinner = false;
        this.cd.detectChanges();
      }
    );
  }

}
