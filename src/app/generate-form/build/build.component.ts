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

  getOptions(index: number) {  // acts as a getter for options
    return this.newForm.controls['questions'].controls[index].get('options') as FormArray;
  }

  ngOnInit(): void {
  }

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

}
