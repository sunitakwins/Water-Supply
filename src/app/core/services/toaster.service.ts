import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastConfig, Toaster, ToastType } from 'ngx-toast-notifications';

enum ToasterType {
  Success = 'success',
  Error = 'danger',
  Warning = 'warning'
};


@Injectable({
  providedIn: 'root'
})
export class ToasterService {
    constructor(
        public translate: TranslateService,
        private toaster: Toaster
    ) { }

    successToast(text: string, translate: boolean = true, closeable: boolean = true, duration: number = 3000) {
        this.showToast(text, translate, closeable, ToasterType.Success, duration);
    }

    warningToast(text: string, translate: boolean = true, closeable: boolean = true, duration: number = 3000) {
        this.showToast(text, translate, closeable, ToasterType.Warning, duration);
    }

    errorToast(text: string, translate: boolean = true, closeable: boolean = true, duration: number = 3000) {
        this.showToast(text, translate, closeable, ToasterType.Error, duration);
    }

    private showToast(text: string, translate: boolean = true, closeable: boolean, type: ToasterType, duration: number) {
        const message = translate ? this.translate.instant(text) : text;


        let toasterProperties: ToastConfig = {
            text: message,
            duration: duration,
            type: type,
        };

        this.toaster.open(toasterProperties);
        // this.toastCtrl.create(toasterProperties).then(t => { t.present(); });
        // const toast = await this.toastCtrl.create(toasterProperties);
        // toast.present();
    }
}
