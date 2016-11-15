···javascript
<form #heroForm="ngForm"  (ngSubmit)="onValueChanged(heroForm)">
  <div class="form-group" [ngClass]="{'has-error': name.errors && (name.dirty || name.touched)}">
      <input type="text" id="name" class="form-control"
           required [pattern]="v.email"
           name="name" ngModel
           #name="ngModel" >
      <span class="help-block" *ngIf="name.errors?.pattern">请填写正确的email</span>
      <span class="help-block" *ngIf="name.errors?.required">email不能为空</span>
  </div>

  <div class="form-group" [ngClass]="{'has-error': number.errors && (number.dirty || number.touched)}">
      <input type="text" id="number" class="form-control"
           required [pattern]="v.number"
           minlength="4" maxlength="24"
           name="number" ngModel
           #number="ngModel" >
      <span class="help-block" *ngIf="number.errors?.pattern">必须为数字</span>
      <span class="help-block" *ngIf="number.errors?.minlength">不小于4个字</span>
      <span class="help-block" *ngIf="number.errors?.maxlength">不能超过24个字</span>
      <span class="help-block" *ngIf="number.errors?.required">不能为空</span>
  </div>

  <button type="submit" class="btn btn-default"
             [disabled]="!heroForm.form.valid">Submit</button>

</form>

···