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
    isProduct : 1 | 0,
    id_Category: number,
    nameSubCategory: string
}

export interface ArticleQuery {
    idArticle: number | '', 
    id_User: number | '' ,
    titleArticle: string | '', 
    id_SubCategory: number | '',
    addressArticle: string | '', 
    latitude: number | '', 
    longitude: number |'',
    priceMin: number |'',
    priceMax: number |'',
    sort: string | '', 
    order: OrderList | '', 
    activateArticle: 0 | 1 | '',
    page : number
}

export interface AddArticleQuery{
    quantityArticle : number | '',
    available : 1 | 0,
    rank : number | undefined
}