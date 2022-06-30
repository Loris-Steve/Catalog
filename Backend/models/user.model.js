const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles');


class UserModel {
    tableName = 'users';

    create = async ({ firstName, lastName, email, password, photo = "", role = Role.User }) => {
        
        const sql = `INSERT INTO ${this.tableName}
        (firstName, lastName, email, password, photo , role) VALUES (?,?,?,?,?,?)`;
        
        try {
            
            //console.log(photo + ">model result : "+JSON.stringify(result));
             const result = await query(sql, [firstName, lastName, email, password, photo, 'user'])
             
             const affectedRows = result ? result.affectedRows : 0;
             
             return { affectedRows, idUser: result.insertId };
             
            } catch (error) {
             console.log("erreur : ",error);
             // handle errors here
             return { error };
 
        }
/*         if(!USER_TABLE.find(u => u.email)){
            USER_TABLE.push({ idUser:USER_TABLE.length, photo ,firstName,lastName,email,password, role:'user'})
            return { photo ,firstName,lastName,email,role : 'user' };
        }
        else
            return {error : 'user already exist'}; */
    }


    update = async (params, idUser) => {

        return {}
    }

    delete = async () => {

    }


    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }
    
    findOne = async (params) => {
        // const user = USER_TABLE.find(u => u.email == params.email && u.password == params.password)
        // if(user)
        //     return user;
        // else
        //     return {error : "user doesn't not exist"};
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);
        //console.log("not find One : ",result)
        // return back the first row (user)
        return result[0];
    }

}

module.exports = new UserModel;