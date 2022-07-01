import { ArticleType } from "../enums/article.enum";
import { OrderList } from "../enums/order.enum";

export interface ArticleCreator {
    id_SubCategory: number | '',
    titleArticle: string,
    priceArticle: number,
    descriptionArticle: string,
    imagesArticle : string[],
    typeArticle : ArticleType
}

export interface Article {
    idArticle: number,
    titleArticle: string,
    priceArticle: number,
    descriptionArticle: string,
    images : string[],
    id_Catalog : number
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