import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleSearchStyle } from 'src/app/shared/enums/article-search-style.enum';
import { Article } from 'src/app/shared/models/article.model';

const DEFAULT_ARTICLE_IMAGE_LINK = "https://www.ecommercemag.fr/Assets/Img/BREVE/2016/4/303588/est-chef-produit-VPC--F.jpg";
const DEFAULT_POFIL_IMAGE_LINK = "https://us.123rf.com/450wm/imagevectors/imagevectors1606/imagevectors160600227/58872995-profil-blanc-ic%C3%B4ne-sur-le-bouton-bleu-isol%C3%A9-sur-blanc.jpg?ver=6";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article: any = <any>{};
  @Input() typeList: ArticleSearchStyle = ArticleSearchStyle.CARD;
  types = Object(ArticleSearchStyle);
  imageLink : string  = DEFAULT_ARTICLE_IMAGE_LINK;
  imageProfil : string  = DEFAULT_POFIL_IMAGE_LINK;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('object :>> ', this.article.photo);
    if(this.article.imagesArticle[0]){
      this.imageLink = this.article.imagesArticle[0];
    }
    else{
      this.imageLink = DEFAULT_ARTICLE_IMAGE_LINK;
    }


    if(this.article.photo){
      console.log('enter this.article :>> ', this.article);
      this.imageProfil = this.article.photo;
    }
    else{
      console.log("exit");
      this.imageProfil = DEFAULT_POFIL_IMAGE_LINK;
    }
  }
  

  navigate(id_Catalog : number,idArticle:number){
    console.log('"object" :>> ', "object");
    this.router.navigate([`/search/article-details/${id_Catalog}/${idArticle}`]);
  }
}
