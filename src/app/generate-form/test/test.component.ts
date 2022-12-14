import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  testFormData: any;
  form: FormGroup = this.fb.group({});
  response: any = undefined;
  submitted: boolean = false;

  ngOnInit(): void {
    this.testFormData = JSON.parse(localStorage.getItem('testForm') || '');
    this.generateForm(this.testFormData);
  }

  /*
    for checkboxes form arrays are being used
    while for all other input types form controls are being used

    validator is being used whereable required
  */
  generateForm(testFormData: any): void {
    for(let qIndex = 0; qIndex <= (testFormData?.questions?.length - 1); qIndex++) {
      let controlName = testFormData?.questions[qIndex]?.label;
      if(testFormData?.questions[qIndex]?.type == 'checkbox') {
        this.form.addControl(controlName, this.fb.array([]));
        this.setCheckbox(controlName, testFormData?.questions[qIndex]?.options.length);
      } else {
        this.form.addControl(controlName, this.fb.control(''));
      }

      //validator block
      if(testFormData?.questions[qIndex]?.required) {
        this.form.controls[controlName].setValidators(Validators.required);
      }
    }
  }

  /*
    value for all the check boxes is set to blank
    adding form control acts as a placeholder
    helping further to ensure setting values easily
  */
  setCheckbox(parentControl: string, options: number): void {
    for(let o = 0; o < options; o++) {
      (this.form.controls?.[parentControl] as FormArray).push(this.fb.control(''))
    }
  }

  /*
    based on wheather user checked or unchecked the checkbox
    action is performed

    # parentControl is the 'Question' visible to the user
    # option is the value of the checkbox user checked or unchecked
    # oIndex is the index of option () it coincides with athe index in form array
    # event is the change in checked property of the checkbox
  */
  changeCheckboxValue(parentControl: string, option: string, oIndex: number, event: any): void {
    if(event.target.checked) {
      this.addSelectedOptions(parentControl, option, oIndex);
    }
    else {
      this.removeUnselectedOptions(parentControl, option, oIndex);
    }
  }

  addSelectedOptions(parentControl: string, option: string, oIndex: number): void {
    (this.form.controls?.[parentControl] as FormArray).controls[oIndex].patchValue(option);
  }

  removeUnselectedOptions(parentControl: string, option: string, oIndex: number): void {
    (this.form.controls?.[parentControl] as FormArray).controls[oIndex].patchValue('');
  }

  /* 
    checks validity of the controls set with required validator
  */
  checkValidity(control: string): boolean {
    if(this.form.controls?.[control].invalid && this.form.controls?.[control].touched) {
      return true;
    }
    return false;
  }

  submit(): void {
    this.response = this.form.value;
    for(const question in  this.response) {
      if(typeof this.response[question] == 'object') {
        this.response[question] = this.response[question].filter(Boolean);
      }
    }
    this.submitted = true;
  }

}