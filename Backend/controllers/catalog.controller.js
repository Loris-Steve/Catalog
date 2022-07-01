const CatalogModel = require('../models/Catalog.model');
const HttpException = require('../utils/HttpException.utils');
const {checkValidation} = require('../middleware/checkValidation')
const dotenv = require('dotenv');
dotenv.config();
const { matchedData } = require('express-validator');
const userModel = require('../models/user.model');

module.exports = NUMBER_CATALOG_PAGE = 10;

/******************************************************************************
 *                              Catalog Controller
 ******************************************************************************/
class CatalogController {

    createCatalog = async (req, res, next) => {
        
        //Ne prendre que les données du body mentionnées dans validator
        const matched = matchedData(req, {
            includeOptionals: true,
        });

        checkValidation(req);

        // on enleve la variable userId de matched
        const { userId : id_User,...rest} = matched;
        
        console.log('matched :>> ', matched);
        const result = await CatalogModel.add({id_User,...rest});

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send({ message : 'Catalog was created!', idCatalog : result.idCatalog });

    };

    addArticleInCatalog = async (req, res, next) => {
        
        //Ne prendre que les données du body mentionnées dans validator
        const matched = matchedData(req, {
            includeOptionals: true,
        });
        checkValidation(req);

        //const userId = req.currentUser.idUser;
        console.log("article in catalog");
        const result = await CatalogModel.addArticle({
            id_Catalog: req.params.catalogId,
            id_Article : req.params.articleId,
            ...matched});

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send({ message : 'article add at Catalog'});

    };

    getAllCatgory = async (req, res, next) => {

        let categorys = await CatalogModel.findCategorys();

        if (!categorys) {
            throw new HttpException(404, 'categorys not found');
        }

        res.send(categorys[0]);
    };

    getCatalogById = async (req, res, next) => {
        const idCatalog = req.params.idCatalog;

        let catalog = await CatalogModel.find({ idCatalog });

        if (!catalog) {
            throw new HttpException(404, 'Catalogs not found');
        }

        res.send(catalog[0]);
    };

    getCatalogsByIdUser = async (req, res, next) => {

        const matched = matchedData(req, {
            includeOptionals: true,
        });

        checkValidation(req);

        let params = {} ; // 

        params = this.formatCatalogParams(params,matched);
        params = this.formatEndFilter(params,matched);
        
        let CatalogList = await CatalogModel.find(params);

        //console.log("get All Catalogs params : "+JSON.stringify(params));
        //console.log(page + " Catalog list : "+JSON.stringify(CatalogList));
        
        if (!CatalogList) {
            throw new HttpException(404, 'Catalogs not found');
        }

        res.send(CatalogList);
    };

    getCatalogsByParams = async (req, res, next) => {

        const matched = matchedData(req, {
            includeOptionals: true,
        });

        checkValidation(req);

        let params = {} ;

        params = this.formatCatalogParams(params,matched);
        params = this.formatEndFilter(params,matched);
        
        let CatalogList = await CatalogModel.find(params);

        //console.log("get All Catalogs params : "+JSON.stringify(params));
        //console.log(page + " Catalog list : "+JSON.stringify(CatalogList));
        
        if (!CatalogList) {
            throw new HttpException(404, 'Catalogs not found');
        }

        res.send(CatalogList);
    };
/* 
    updateCatalog = async (req, res, next) => {
        console.log(" check query : "+ JSON.stringify(req.body));
        
        checkValidation(req);
        console.log(" update Catalog : ")
        
        const result = await CatalogModel.update(req.body, req.params.id);
        
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Catalog not found' :
            affectedRows && changedRows ? 'Catalog updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteCatalog = async (req, res, next) => {
        const result1 = await deleteFile("/Catalogs/","image1_id"+req.params.id);
        if(result1.error ){
            res.status(500).send(error);
        }
        const result2 = await deleteFile("/Catalogs/","image2_id"+req.params.id);
        if(result2.error ){
            res.status(500).send(error);
        }
        const result3 = await deleteFile("/Catalogs/","image3_id"+req.params.id);
        if(result3.error ){
            res.status(500).send(error);
        }

        const result = await CatalogModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Catalog not found');
        }
        res.send('Catalog has been deleted');
    };
 */

    constructorCatalog = (newCatalog) => {
        console.log(">>newCatalog : " + JSON.stringify(newCatalog));
        return {
            idCatalog: newCatalog.idCatalog,
            id_User: newCatalog.id_User, // siren with companys
            titleCatalog: newCatalog.titleCatalog,
            addressCatalog: newCatalog.addressCatalog ,
            latitude: newCatalog.latitude,
            longitude : newCatalog.longitude ,
            activateCatalog : newCatalog.activateCatalog ,
        };
    }

    formatCatalogParams(params = {},matched){
        
        params.idCatalog = matched.idCatalog && matched.idCatalog ;

        params.id_User = matched.id_User && matched.id_User ;

        params.titleCatalog = matched.titleCatalog && matched.titleCatalog ;

        params.addressCatalog = matched.addressCatalog && matched.addressCatalog ;
        params.latitude = matched.latitude && parseFloat(matched.latitude) ;
        params.longitude = matched.longitude && parseFloat(matched.longitude) ;
      
        params.activateCatalog = matched.activateCatalog && matched.activateCatalog ;

        return params;

    }

    formatEndFilter(params = {},matched){

        params.sortCatalog = matched.sortCatalog && matched.sortCatalog ;
      
        params.orderCatalog = matched.orderCatalog && matched.orderCatalog ;      

        const page = matched.page ? NUMBER_CATALOG_PAGE*(matched.page) : 0;

        params.page = ' LIMIT '+ (page+','+NUMBER_CATALOG_PAGE);
        // LIMIT a,b <=> LIMIT a offset b (a = page & b = number element )

        return params;
    }

}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new CatalogController;