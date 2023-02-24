import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
} from '@angular/core';

// @Directive({
//   selector: '[appDropdown]',
// })
// export class DropdownDirective {
//   // opened: boolean = false;
//   // constructor(private elRef: ElementRef, private renderer: Renderer2) {}
//   // @HostListener('click') click() {
//   //   if (!this.opened) {
//   //     this.renderer.addClass(this.elRef.nativeElement, 'open');
//   //     this.opened = true;
//   //   } else if (this.opened) {
//   //     this.renderer.removeClass(this.elRef.nativeElement, 'open');
//   //     this.opened = false;
//   //   }
//   // }

//   @HostBinding('class.open') isOpen = false;

//   @HostListener('click') toggle() {
//     this.isOpen = !this.isOpen;
//   }
// }

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpened: boolean = false;
  @HostListener('document:click', ['$event']) toggle(event: Event) {
    this.isOpened = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpened
      : false;
  }

  constructor(private elRef: ElementRef) {}
}
