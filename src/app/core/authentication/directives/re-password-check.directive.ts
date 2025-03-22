import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Directive({
  selector: '[RePasswordCheck]'
})
export class RePasswordCheckDirective {
  @Input() authForm!: AbstractControl;
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    let rePass = this.authForm.get('rePassword')!
    let pass = this.authForm.get('password')!

    rePass.valueChanges.subscribe({
      next: (val) => {
        console.log(this.authForm.errors);
        if (this.authForm.errors) {
          this.el.nativeElement.classList.add('is-invalid')
          this.el.nativeElement.classList.remove('is-valid')
        } else if (!this.authForm.errors) {
          console.log("object");
          this.el.nativeElement.classList.add('is-valid')
          this.el.nativeElement.classList.remove('is-invalid')
        }
      }
    })

  }

}
