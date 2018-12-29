import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../service/api-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-insert-new-dialog',
  templateUrl: './insert-new-dialog.component.html',
  styleUrls: ['./insert-new-dialog.component.css']
})
export class InsertNewDialogComponent implements OnInit {

  public _addForm: FormGroup;
  tooltip: NgbTooltip;
  isDisable = false;
  constructor(
    private _apiService: ApiService,
    private _formBuilder: FormBuilder,
    private dialogref: MatDialogRef<InsertNewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit() {
    this._addForm = this._formBuilder.group({
      NameNews: ['', [Validators.required]],
      UserCreate: ['', ],
      NameRole: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      ImageNews: [, [Validators.required]],
      ViewMax: [1, [Validators.required, Validators.min]],
      DescriptionNews: ['', [Validators.required]],
    });
    this.dialogref.disableClose = true;
  }

  onSelectedFile(event) {

  }
  CheckValidate(tooltip: NgbTooltip, namecontrol: string) {
    if (!this._addForm.get('namecontrol').valid) {
      tooltip.open('Is is not emtry!');
      this.isDisable = true;
    } else {
      tooltip.close();
      this.isDisable = false;
    }
  }

  onLostFocus() {
    // this.CheckValidate(this.tooltip1);
  }






  onCancelClick() {
    this.dialogref.close();
  }
}
