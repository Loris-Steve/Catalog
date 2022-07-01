import { ArticleType } from "../enums/article.enum";
import { OrderList } from "../enums/order.enum";

export interface ArticleCreator {
    id_SubCategory: number | '',
    titleArticle: string,
    priceArticle: number,
    descriptionArticle: string,
    imagesArticle : string[],
    isProduct : 1 | 0
}

export interface Article {
    idArticle: number,
    titleArticle: string,
    priceArticle: number,
    descriptionArticle: string,
    imagesArticle : string[],
    id_Catalog : number,
    isProduct : 1 | 0
}

export interface ArticleQuery {
    idArticle: number | '', 
    id_User: number | '' ,
    titleArticle: string | '', 
    id_SubCategory: number | '',
    addressArticle: string | '', 
    latitude: number | '', 
    longitude: number |'',
    sort: string | '', 
    order: OrderList | '', 
    activateArticle: 0 | 1 | ''
}

export interface AddArticleQuery{
    quantityArticle : number | '',
    available : 1 | 0,
    rank : number | undefined
}