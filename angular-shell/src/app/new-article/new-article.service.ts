import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewArticleService {

  constructor(private http: HttpClient) { }

  createArticle(article: any) {
    return this.http.post('/articles', {article})
  }

}
