// const query = require('../db/db-connection');
// const { multipleColumnSet } = require('../utils/common.utils');
// const Role = require('../utils/userRoles.utils');
//import '@types/node';

// interface USER {
//     idUser: number, photo : string ,firstName : string ,lastName : string,email : string,role : string,password:string
// } 

var USER_TABLE = [
    { idUser : 0, photo : '', firstName:'test',lastName : 'test',email : 'test@gmail.com',role : 'user', password:'aaa' },

]

class UserModel {
    tableName = 'users';

    create = async ({ photo ,firstName,lastName,email,password}) => {
        if(!USER_TABLE.find(u => u.email)){
            USER_TABLE.push({ idUser:USER_TABLE.length, photo ,firstName,lastName,email,password, role:'user'})
            return { photo ,firstName,lastName,email,role : 'user' };
        }
        else
            return {error : 'user already exist'};
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