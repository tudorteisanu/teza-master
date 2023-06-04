import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

const containerVueElementName = 'feedRef';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #${containerVueElementName}></div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class FeedComponent implements AfterViewInit {
  @ViewChild(containerVueElementName, { static: true })
containerVueRef!: ElementRef;

  root!: any;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    try {
      import("settings_user/Feed").then((val) => {
        this.renderer.appendChild(
          this.containerVueRef.nativeElement,
          new val.default()
        );
      });
    } catch {}
  }
}
