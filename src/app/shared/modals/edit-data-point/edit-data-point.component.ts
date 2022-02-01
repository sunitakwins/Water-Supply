import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-data-point',
  templateUrl: './edit-data-point.component.html',
  styleUrls: ['./edit-data-point.component.scss']
})
export class EditDataPointComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDataPointComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
