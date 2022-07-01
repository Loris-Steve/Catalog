const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const CatalogModel = require('./Catalog.model');

const RAYON_SEARCH_CATALOG = 30000;//10 km

class ArticleModel {
  articleTable = 'articles';
  userTable = 'users';
  catalogTable = 'catalogs';
  categoryTable = 'categorys';
  subCategoryTable = 'sub_categorys';
  catalogHasArticleTable = 'catalog_has_articles';

  add = async (params) => {
    const { columnSet, values } = multipleColumnSet(params)
    console.log(" catalog : " + JSON.stringify(params) + " values : " + JSON.stringify(values));
    const sql = `INSERT INTO ${this.articleTable} SET ${columnSet}`;

    const result = await query(sql, [...values]);
    const affectedRows = result ? result.affectedRows : 0;

    // return back the first row (user)
    return { affectedRows, idArticle: result.insertId };
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
    console.log(" delete id : " + idArticle)

    console.log("req > : " + sql)
    return affectedRows;
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

  // get article according all article params
  find = async (existingParams = {}) => {
    let customQuery = {
      reqSql: '',
      params: []
    }

    customQuery.reqSql =
      `select * from ${this.articleTable} a inner join ${this.categoryTable} cat 
      inner join ${this.subCategoryTable} subCat 
      WHERE a.id_SubCategory = subCat.idSubCategory AND subCat.id_Category = cat.idCategory `;

    customQuery = this.formatQueryArticle(existingParams, customQuery);

    customQuery = this.formatEndQuery(existingParams, customQuery);

    console.log("customQuery.reqSql : ", JSON.stringify(customQuery.reqSql));
    console.log("parameters : ", JSON.stringify(customQuery.params));

    return await query(customQuery.reqSql, [...customQuery.params]);

  }

  // get article according all article params
  findNotAlreadyAdd = async (id_Catalog, existingParams = {}) => {
    let customQuery = {
      reqSql: '',
      params: []
    }

    console.log("already use function ");
    customQuery.reqSql = `select * , 
      (select count(*) > 0 from ${this.catalogHasArticleTable} ch WHERE
       ch.id_Catalog = ? AND ch.id_Article = a.idArticle ) 
      as alreadyUse FROM
      ${this.articleTable} a inner join ${this.categoryTable} cat 
      inner join ${this.subCategoryTable} subCat 
            WHERE a.id_SubCategory = subCat.idSubCategory AND subCat.id_Category = cat.idCategory
      `
    customQuery = this.formatQueryArticle(existingParams, customQuery);

    customQuery = this.formatEndQuery(existingParams, customQuery);

    console.log("customQuery.reqSql : ", JSON.stringify(customQuery.reqSql));
    console.log("parameters : ", JSON.stringify(customQuery.params));

    return await query(customQuery.reqSql, [id_Catalog, ...customQuery.params]);

  }

  // To accueil search 
    findInCatalogs = async (existingParams = {}) => {
       let customQuery = {
         reqSql : '',
         params : []
       }
       customQuery.reqSql = 
       `select *  from ${this.userTable} u inner join ${this.catalogTable} cl inner join
       ${this.catalogHasArticleTable} cha inner join ${this.articleTable} a inner join ${this.subCategoryTable} subCat 
       WHERE  u.idUser = cl.id_User AND cl.idCatalog = cha.id_Catalog AND 
       cha.id_Article = a.idArticle AND 
        a.id_SubCategory = subCat.idSubCategory AND
       ((quantityArticle = NULL OR quantityArticle > 0 ) OR availableArticle = 1) `;
       // AND availableArticle = 1 (for new database)
 
       customQuery = this.formatQueryArticle(existingParams,customQuery);
       
       customQuery = CatalogModel.formatQueryCatalog(existingParams, customQuery);
       
       customQuery = this.formatEndQuery(existingParams,customQuery);
       
       console.log("customQuery.reqSql : ", JSON.stringify(customQuery.reqSql));
       console.log("parameters : ", JSON.stringify(customQuery.params));
   
       return await query(customQuery.reqSql, [...customQuery.params]);
     
     }
  

  findArticleByIdCatalog = async (id_Catalog, existingParams = {}) => {

    let customQuery = {
      reqSql: '',
      params: []
    }
    customQuery.reqSql =
      `select *  from ${this.catalogTable} cl inner join
      ${this.catalogHasArticleTable} cha inner join ${this.articleTable} a inner join ${this.subCategoryTable} subCat 
      WHERE  cl.idCatalog = cha.id_Catalog AND 
      cl.idCatalog = ? AND cha.id_Article = a.idArticle AND 
       a.id_SubCategory = subCat.idSubCategory AND
      ((quantityArticle = NULL OR quantityArticle > 0 ) OR availableArticle = 1) `;
    // AND available = 1 (for new database)

    customQuery = this.formatQueryArticle(existingParams, customQuery);

    customQuery = CatalogModel.formatQueryCatalog(existingParams, customQuery);

    customQuery = this.formatEndQuery(existingParams, customQuery);

    console.log("customQuery.reqSql : ", JSON.stringify(customQuery.reqSql));
    console.log("parameters : ", JSON.stringify(customQuery.params));

    return await query(customQuery.reqSql, [id_Catalog, ...customQuery.params]);


  }

  // find 
  findArticleCatalogUserByIdCatalog = async (id_Catalog, id_Article) => {

    //console.log("enter !")

    const sql = `SELECT * FROM ${this.userTable} u inner join ${this.catalogTable} cl inner join 
      ${this.catalogHasArticleTable} cha inner join ${this.articleTable} a inner join ${this.subCategoryTable} subCat 
      WHERE  u.idUser = cl.id_User AND cl.idCatalog = cha.id_Catalog AND 
      cha.id_Catalog = ? AND cha.id_Article = ? AND a.idArticle = cha.id_Article AND
       a.id_SubCategory = subCat.idSubCategory`;

    return await query(sql, [id_Catalog, id_Article]);
  }

  /**** category functions ***/

  findCategory = async () => {

    const sql = `SELECT * FROM ${this.categoryTable}`;
    //console.log("enter");

    const result = await query(sql);

    return result;
  }

  findSubCategory = async () => {

    const sql = `SELECT * FROM ${this.subCategoryTable}`;

    const result = await query(sql);

    return result;
  }


  /*** Functions utils ***/
  formatQueryArticle(existingParams = {}, customQuery) {

    if (existingParams.idArticle) {
      customQuery.reqSql += ' AND idArticle = ? ';
      customQuery.params.push(existingParams.idArticle);
    }

    if (existingParams.idCatgory) {
      customQuery.reqSql += ' AND idCatgory = ? ';
      customQuery.params.push(existingParams.idCatgory);
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

  formatEndQuery(existingParams = {}, customQuery) {

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
    else {
      customQuery.reqSql += ' DESC ';
    }

    if (existingParams.page)
      customQuery.reqSql += existingParams.page;

    return customQuery;
  }

}

module.exports = new ArticleModel;