import { Component, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('element', { static: true }) element: any;
  position: any;

  constructor(private zone: NgZone) {}

  /**
   * register mouse move event outside angular
   * bind the mouse move to this (App component) 
   * @param event 
   */
  mouseDown(event: any) {
    this.zone.runOutsideAngular(() => {
      window.document.addEventListener('mousemove', this.mouseMove.bind(this));
    });
  }

  mouseMove(event: any) {
    this.element.nativeElement.setAttribute('x', event.clientX);
    this.element.nativeElement.setAttribute('y', event.clientY);
  }

  /**
   * reenter Angular zone from a task that was executed outside of the Angular zone
   * @param event  
   */
  mouseUp(event: any) {
    this.zone.run(() => {
      this.position = {
        x: this.element.nativeElement.getAttribute('x'),
        y: this.element.nativeElement.getAttribute('y'),
      };
    });

    window.document.removeEventListener('mousemove', this.mouseMove);
  }
}
