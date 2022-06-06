const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const CatalogModel = require('./Catalog.model');

const RAYON_SEARCH_CATALOG = 30000;//10 km

class ArticleModel {
    articleTable = 'articles';
    userTable = 'users';
    catalogTable = 'catalogs';
    subCategoryTable = 'sub_categorys';
    catalogHasArticleTable = 'catalog_has_articles';

    add = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        console.log(" catalog : "+ JSON.stringify(params)+" values : "+JSON.stringify(values));
        const sql = `INSERT INTO ${this.articleTable} SET ${columnSet}`;

        const result = await query(sql, [...values]);
        const affectedRows = result ? result.affectedRows : 0;

        // return back the first row (user)
        return { affectedRows , idArticle : result.insertId };
    }
    
    update = async (params, idArticle) => {
        const { columnSet, values } = multipleColumnSet(params)
        
        const sql = `UPDATE ${this.articleTable} SET ${columnSet} WHERE idArticle = ?`;
        
        const result = await query(sql, [...values, idArticle]);
        
        return result;
    }
    
    delete = async (idArticle) => {
        
        const sql = `DELETE FROM ${this.articleTable}
        WHERE idArticle = ?`;
        const result = await query(sql, [idArticle]);
        const affectedRows = result ? result.affectedRows : 0;
        console.log(" delete id : "+idArticle)

        console.log("req > : "+sql)
        return affectedRows;
    }
    
    formatQueryArticle(existingParams = {},customQuery){

      if (existingParams.idArticle) {
        customQuery.reqSql += ' AND idArticle = ? ';
        customQuery.params.push(existingParams.idArticle);
      }
  
      if (existingParams.id_SubCategory) {
        customQuery.reqSql += ' AND id_SubCategory = ? ';
        customQuery.params.push(existingParams.id_SubCategory);
      }
      
      if (existingParams.titleArticle) {
        customQuery.reqSql += ` AND titleArticle LIKE '%${existingParams.titleArticle}%' `;
      }
  
      if (existingParams.descriptionArticle) {
        customQuery.reqSql += ` AND descriptionArticle LIKE '%${existingParams.descriptionArticle}%' `;
      }
      
      if (existingParams.priceMin) {
        customQuery.reqSql += ` AND priceArticle >= ? `;
        customQuery.params.push(existingParams.priceMin);
      }

      if (existingParams.priceMax) {
        customQuery.reqSql += ` AND priceArticle <= ? `;
        customQuery.params.push(existingParams.priceMax);
      }
      
      return customQuery;

    }

    formatEndQuery(existingParams = {},customQuery){

        customQuery.reqSql += ' ORDER BY '
    
        if (existingParams.sort) {
          customQuery.reqSql += ' ? ';
          customQuery.params.push(existingParams.sort);
        }
        else {
          customQuery.reqSql += ' idArticle ';
        }
    
        if (existingParams.order) {
          customQuery.reqSql += existingParams.order + ' ';
        }
        else{
          customQuery.reqSql += ' DESC ';
        }
    
        if(existingParams.page)
          customQuery.reqSql += existingParams.page;

        return customQuery;
    }

    findByCatalog = async (existingParams = {}) => {
      let customQuery = {
        reqSql : '',
        params : []
      }
  
      customQuery.reqSql = 
      `select *  from ${this.articleTable} a inner join ${this.catalogHasArticleTable} cha `+
      `inner join ${this.catalogTable} c where a.idArticle = cha.id_Article AND `+
      `c.idCatalog = cha.id_Catalog `;
  
      customQuery = this.formatQueryArticle(existingParams,customQuery);
      
      customQuery = CatalogModel.formatQueryCatalog(existingParams, customQuery);
      
      customQuery = this.formatEndQuery(existingParams,customQuery);
      
      console.log("customQuery.reqSql : ", JSON.stringify(customQuery.reqSql));
      console.log("parameters : ", JSON.stringify(customQuery.params));
  
      return await query(customQuery.reqSql, [...customQuery.params]);
    
    }


    find = async (existingParams = {}) => {
      let customQuery = {
        reqSql : '',
        params : []
      }
  
      customQuery.reqSql = `select *  from ${this.articleTable} where 1=1 `;
  
      customQuery = this.formatQueryArticle(existingParams,customQuery);
      
      customQuery = this.formatEndQuery(existingParams,customQuery);
  
      console.log("customQuery.reqSql : ", JSON.stringify(customQuery.reqSql));
      console.log("parameters : ", JSON.stringify(customQuery.params));
  
      return await query(customQuery.reqSql, [...customQuery.params]);
    
    }

    findById = async (idArticle) => {

        const sql = `SELECT * FROM ${this.articleTable}
        WHERE idArticle = ?`;
          
        const result = await query(sql, [idArticle]);
        const affectedRows = result ? result.affectedRows : 0;
        console.log('affectedRows :>> ', (result));
        // return back the first row (user)
        return result;
    }

    findArticleByIdCatalog = async (id_Catalog,id_Article) => {

      console.log("enter !")
      
      const sql = `SELECT * FROM ${this.userTable} u inner join ${this.catalogTable} cl inner join 
      ${this.catalogHasArticleTable} cha inner join ${this.articleTable} a inner join ${this.subCategoryTable} cy 
      WHERE  u.idUser = cl.id_User AND cl.idCatalog = cha.id_Catalog AND 
      cha.id_Catalog = ? AND cha.id_Article = ? AND a.idArticle = cha.id_Article AND
       a.id_SubCategory = cy.idSubCategory`;

      return await query(sql, [id_Catalog,id_Article]);
  }
}

module.exports = new ArticleModel;