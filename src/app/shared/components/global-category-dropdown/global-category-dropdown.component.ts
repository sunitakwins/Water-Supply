import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownCategoryName } from 'src/app/core/enums';
import { GlobalCodeResponseModel } from 'src/app/core/models';
import { ComponentService } from '../../services/component.service';

 
@Component({
  selector: 'global-category-dropdown',
  templateUrl: './global-category-dropdown.component.html',
  styleUrls: ['./global-category-dropdown.component.scss']
})
export class GlobalCategoryDropdownComponent implements OnInit {
  @Input() requestBody!: DropdownCategoryName;  
  @Input() globalCodeName: string = ''; 
  @Input() val: string = '';
  @Input() placeholderText: string = '';
  @Input() disabled: boolean = false;
  @Input() submitted: boolean = false;
  @Input() hasRequired: boolean = false;
  @Input() requiredMessage: string = '';

  @Output() dropdownSelectedValue : EventEmitter<string> = new EventEmitter();
  
  globalCodesData: GlobalCodeResponseModel[] = [];

  constructor(
    private commonService: ComponentService
  ) { }

  ngOnInit(): void {
    this.getGlobalCodes();
  }

  public getGlobalCodes(){
    let categoryName = this.requestBody; 

    this.commonService.getGlobalCodeData(categoryName).subscribe(res => {
      this.globalCodesData = res;
    })
  }

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.dropdownSelectedValue.emit(val);
  }


}
