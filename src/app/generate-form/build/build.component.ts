import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit {
  multipleChoiceeQuestions: number[] = [0];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  //  initialising the form
  newForm = this.fb.group({
    formTitle : this.fb.control('Untitled Form'),
    formDescription : this.fb.control('Enter Description for your Form ....'),
    questions : this.fb.array([
      this.fb.group({
        label : this.fb.control('Enter Question'),
        required: this.fb.control(false),
        type : this.fb.control('radio', {nonNullable: true}),
        options : this.fb.array([ 
          this.fb.control('Option', Validators.required)
        ])
      })
    ])
  });

  get questions() {  // geter for questions array
    return this.newForm.get('questions') as FormArray;
  }

  getOptions(index: number) {  // acts as a getter for options  // index is required to identify the parent control
    return this.newForm.controls['questions'].controls[index].get('options') as FormArray;
  }

  ngOnInit(): void {
    this.checkExistingTestForm();
    // localStorage.clear();
  }

  /*
    if the user is testing his/ her form in preview component
    revisits this component
    following method will ensure that the form is intact
  */
  checkExistingTestForm(): void {
    if(localStorage.getItem('testForm')) {
      let testForm = JSON.parse(localStorage.getItem('testForm') || '');
      this.newForm.patchValue(testForm);
      if(testForm?.questions?.length > 1) {
        this.setExistingTestQuestions(testForm);
      }
    }
  }

  /*
    sets form controls for all the questions
    and sets value saved earlier for them
  */
  setExistingTestQuestions(testForm: any): void {
    for(let i = 0; i <= testForm?.questions?.length; i++) {
      this.addNewQuestion();
      this.newForm.controls.questions.controls[i].patchValue(testForm?.questions[i]);
      if(this.checkOptions(testForm, i)) { // checks if options are required to be added
        this.setExistingTestOptions(testForm, i);
      }
    }

    // removing unnecessary form controls which are biproducts of the above function
    this.removeQuestion(testForm?.questions?.length);
    this.removeQuestion(testForm?.questions?.length);
  }

  /*
    sets values for options
    testForm is the data stored for generating form
  */
  setExistingTestOptions(testForm: any, qIndex: number): void {
    for(let o = 1; o <= testForm?.questions[qIndex]?.options?.length; o++)  {
      this.addOption(qIndex);
      this.newForm.controls.questions.controls[qIndex].controls.options.controls[o].patchValue(testForm?.questions[qIndex]?.options[o]);
    }
    this.removeOption(qIndex, testForm?.questions[qIndex]?.options?.length);
  }


  /*
    creates a form group to add in form array
    initializes the form contronls within with default values
  */
  createQuestionBoilerPlate(): FormGroup {
    return this.fb.group({
      label : this.fb.control('Enter Question'),
      required: this.fb.control(false),
      type : this.fb.control('radio', {nonNullable: true}),
      options : this.fb.array([
        this.fb.control('Option')
      ])
    })
  }

  addNewQuestion(): void {
    this.questions.push(this.createQuestionBoilerPlate());
  }

  removeQuestion(index: number): void {
    this.newForm.controls.questions.removeAt(index);
  }


  /*
    checks if the required question has any options to be set
  */
  checkOptions(form: any, qIndex: number): boolean {
    if(form?.questions[qIndex]?.type == 'radio' || form?.questions[qIndex]?.type == 'checkbox') {
      return true;
    }
    return false;
  }

  addOption(index: number) {
    (this.questions.controls[index].get('options') as FormArray).push(this.fb.control('Option', Validators.required));
  }

  removeOption(qIndex: number, oIndex: number): void {
    this.newForm.controls.questions.controls[qIndex].controls.options.removeAt(oIndex);
  }

  isInvalid(qIndex: number, oIndex: number): boolean { // qIndex is index of Question, oIndex is index of Option
    let option = this.newForm.controls.questions.controls[qIndex].controls.options.controls[oIndex];
    if(option.invalid) {
      return true;
    }
    return false;
  }

  /*
  returns the type of input
  used in ngSwitch case to determine the input type
  */
  questionType(index: number): string {
    let type = this.newForm.controls.questions.controls[index].controls.type.value;
    return type;
  }

  preview(): void {
    let form = JSON.stringify(this.newForm.value);
    localStorage.setItem('testForm', form);
    this.router.navigateByUrl('build-form/preview');
  }

  submit(): void {
    console.log(this.newForm.value)    
  }

  toHomePage(): void {
    this.router.navigateByUrl('');
  }

}
