const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

const RAYON_SEARCH_CATALOG = 10000;

class CatalogModel {
  catalogTable = 'catalogs';
  catalogHasArticleTable = 'catalog_has_articles';

  add = async (params) => {
    const { columnSet, values } = multipleColumnSet(params)
    console.log(" catalogs : " + JSON.stringify(params) + " values : " + JSON.stringify(values));
    const sql = `INSERT INTO ${this.catalogTable} SET ${columnSet}`;

    const result = await query(sql, [...values]);
    const affectedRows = result ? result.affectedRows : 0;

    // return back the first row (user)
    return { affectedRows, idCatalog: result.insertId };
  }

  addArticle = async (params) => {
    const { columnSet, values } = multipleColumnSet(params)
    console.log(" catalogs : " + JSON.stringify(params) + " values : " + JSON.stringify(values));
    const sql = `INSERT INTO ${this.catalogHasArticleTable} SET ${columnSet}`;

    const result = await query(sql, [...values]);
    const affectedRows = result ? result.affectedRows : 0;

    // return back the first row (user)
    return { affectedRows, idCatalog: result.insertId };
  }
/* 
  findByIdUser = async (existingParams = {}) => {

    let reqDistance = "";
    if (existingParams.latitude && existingParams.longitude) {
      reqDistance = ` ,LTRIM(ROUND(get_distance_metres(?, ? , latitude, longitude))) AS distance `;
      params.push(existingParams.latitude, existingParams.longitude);
    }

    const distance = reqDistance;

    customQuery.reqSql = `select * ${distance} from catalogs c inner join users u where `+
    `c.id_User = u.idUser `;

    customQuery = this.formatQueryCatalog(existingParams,customQuery);

    // add distance km customQuery.params
    let havingUsed = 'HAVING';

    customQuery.reqSql += distance ? ` ${havingUsed} get_distance_metres(${existingParams.latitude}, ${existingParams.longitude}, latitude, longitude) < ${RAYON_SEARCH_CATALOG} ` : '';

    customQuery = this.formatEndQuery(existingParams,customQuery);

    console.log("customQuery.reqSql : ", JSON.stringify(customQuery.reqSql));
    console.log("parameters : ", JSON.stringify(customQuery.params));

    return await query(customQuery.reqSql, [...customQuery.params]);
  }
 */
  find = async (existingParams = {}) => {
    let customQuery = {
      reqSql : '',
      params : []
    }

    let reqDistance = "";
    if (existingParams.latitude && existingParams.longitude) {
      reqDistance = ` ,LTRIM(ROUND(get_distance_metres(?, ? , latitude, longitude))) AS distance `;
      params.push(existingParams.latitude, existingParams.longitude);
    }

    const distance = reqDistance;

    customQuery.reqSql = `select * ${distance} from catalogs where 1=1 `;

    customQuery = this.formatQueryCatalog(existingParams,customQuery);

    // add distance km customQuery.params
    let havingUsed = 'HAVING';

    customQuery.reqSql += distance ? ` ${havingUsed} get_distance_metres(${existingParams.latitude}, ${existingParams.longitude}, latitude, longitude) < ${RAYON_SEARCH_CATALOG} ` : '';

    customQuery = this.formatEndQuery(existingParams,customQuery);

    console.log("customQuery.reqSql : ", JSON.stringify(customQuery.reqSql));
    console.log("parameters : ", JSON.stringify(customQuery.params));

    return await query(customQuery.reqSql, [...customQuery.params]);
  }


  findById = async (idCatalog) => {
    
    const sql = `SELECT * FROM ${this.catalogTable}
    WHERE idCatalog = ? `;

    const result = await query(sql, [idCatalog]);
        
    //console.log(sql+"Catalog result",result)
    
    return result[0];
  }


  /*
      update = async (params, idCatalog) => {
        const { columnSet, values } = multipleColumnSet(params)
        
        const sql = `UPDATE ${this.catalogTable} SET ${columnSet} WHERE idCatalog = ?`;
        
        const result = await query(sql, [...values, idCatalog]);
        
        return result;
    }
    
    delete = async (idCatalog) => {
        
        const sql = `DELETE FROM ${this.catalogTable}
        WHERE idCatalog = ?`;
        const result = await query(sql, [idCatalog]);
        const affectedRows = result ? result.affectedRows : 0;
        console.log(" delete id : "+idCatalog)
  
        console.log("req > : "+sql)
        return affectedRows;
    }
    
   */

    formatQueryCatalog(existingParams = {},customQuery){

      //  formatQueryArticle(existingParams);
      if (existingParams.idCatalog) {
        customQuery.reqSql += ' AND idCatalog = ? ';
        customQuery.params.push(existingParams.idCatalog);
      }

      if (existingParams.id_User) {
        customQuery.reqSql += ' AND id_User = ? ';
        customQuery.params.push(existingParams.id_User);
      }
      
      if (existingParams.titleCatalog) {
        customQuery.reqSql += ` AND titleCatalog LIKE '%${existingParams.titleCatalog}%' `;
        //customQuery.params.push(existingParams.titleCatalog);
      }

      if (existingParams.addressCatalog) {
        customQuery.reqSql += ` AND addressCatalog LIKE '%${existingParams.addressCatalog}%' `;
        //customQuery.params.push(existingParams.addressCatalog);
      }

      if (existingParams.activateCatalog) {
        customQuery.reqSql += ' AND activateCatalog = ? ';
        customQuery.params.push(existingParams.activateCatalog);
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
      customQuery.reqSql += ' idCatalog ';
    }

    if (existingParams.order) {
      customQuery.reqSql += existingParams.order + ' ';
    }
    else{
      customQuery.reqSql += ' DESC ';
    }

    customQuery.reqSql += existingParams.page;


    return customQuery;
}
}

module.exports = new CatalogModel;