import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {createRoot} from "react-dom/client";
import * as React from "react";

const containerElementName: string = "popularTagsRef";
@Component({
  selector: 'app-popular-tags',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #${containerElementName}></div>
  `,
})
export class PopularTagsComponent implements AfterViewInit, OnDestroy {

  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;
  root!: any;

  ngAfterViewInit() {
    this.root = createRoot(this.containerRef.nativeElement);
    this.root.render("Loading script...");
    try {
      import("react_components/PopularTagsComponent").then((val) => {
        this.root.render(
          React.createElement(val.PopularTagsComponent)
        );
      });
    } catch (error) {
      console.log("Erorr", error);
    }
  }

  ngOnDestroy() {
    this.root.unmountComponentAtNode(this.containerRef.nativeElement);
  }

}
