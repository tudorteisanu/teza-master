import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {createRoot} from "react-dom/client";
import * as React from "react";
import {Router} from "@angular/router";
import {NewArticleService} from "./new-article.service";

const containerElementName: string = "newArticleRef";
@Component({
  selector: 'app-popular-tags',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #${containerElementName}></div>
  `,
})
export class NewArticleComponent implements AfterViewInit, OnDestroy {

  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;
  root!: any;

  errors: any = null;

  constructor(private router: Router, private newArticleService: NewArticleService) {
  }

  setErrors(errors: any) {
    this.errors = errors;
  }

  onSubmit(data: any) {
    this.newArticleService.createArticle(data).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (e) => {
        if(e.error.hasOwnProperty('errors')) {
          console.log(e.error.errors)
          const errors = Object.entries( e.error.errors)
                                  .map(([key, value]: any) => `${key}: ${value.join(', ')}`);
          this.setErrors(errors);
        }
      }
    })
  }

  ngAfterViewInit() {
    this.root = createRoot(this.containerRef.nativeElement);
    this.root.render("Loading script...");
    try {
      const props = {
        onSubmit: this.onSubmit.bind(this),
      }
      import("react_components/NewArticleComponent").then((val) => {
        this.root.render(
          React.createElement(val.NewArticleComponent,  props),
        );
      });
    } catch (error) {
      console.log("Erorr", error);
    }
  }

  ngOnDestroy() {
    try {
      this.root.unmountComponentAtNode(this.containerRef.nativeElement);
    } catch (e) {
      console.error(e)
    }
  }

}
