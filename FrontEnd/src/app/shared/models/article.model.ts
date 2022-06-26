import { OrderList } from "../enums/order.enum";

export interface ArticleCreator {
    titleArticle: string,
    priceArticle: number,
    descriptionArticle: string,
}

export interface Article {
    idArticle: number,
    titleArticle: string,
    priceArticle: number,
    descriptionArticle: string,
    
}

export interface ArticleQuery {
    idArticle: number | '', 
    id_User: number | '' ,
    titleArticle: string | '', 
    addressArticle: string | '', 
    latitude: number | '', 
    longitude: number |'',
    sort: string | '', 
    order: OrderList | '', 
    activateArticle: 0 | 1 | ''
}