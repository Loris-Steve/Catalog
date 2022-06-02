// const query = require('../db/db-connection');
// const { multipleColumnSet } = require('../utils/common.utils');
// const Role = require('../utils/userRoles.utils');


class UserModel {
    tableName = 'users';

    create = async ({ firstName, lastName, email, password, photo = "", role = "" }) => {
        // console.log("user creation : "+photo);
 
         const sql = `INSERT INTO ${this.tableName}
         (firstName, lastName, email, password, photo , role) VALUES (?,?,?,?,?,?)`;
 
        try {
 
             //console.log(photo + ">model result : "+JSON.stringify(result));
             const result = await query(sql, [firstName, lastName, email, password, photo, role])
             
             const affectedRows = result ? result.affectedRows : 0;
 
             return { affectedRows, idUser: result.insertId };
 
         } catch (error) {
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


    find = async (params) => {
        const user = USER_TABLE.find(u => u.email == params.email && u.password == params.password)
        if(user)
            return user;
        else
            return {error : "user doesn't not exist"};
    }

}

module.exports = new UserModel;