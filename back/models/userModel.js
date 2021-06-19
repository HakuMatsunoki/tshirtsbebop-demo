const bcrypt = require('bcryptjs');

const AppError = require('../utils/appError');
const BaseModel = require('./baseModel');

class User extends BaseModel {
    async createOne(userData) {
        const { name, phone, email, passwd } = userData;
        const formattedEmail = email.toLowerCase();
        const anyUserWithEmail = await this._query(`SELECT id FROM Users WHERE email = '${formattedEmail}'`);

        if (anyUserWithEmail.length > 0) throw new AppError('User with this email already exists', 409);

        const passwdEncrypted = await bcrypt.hash(passwd, 12);
        await this._query(
            `INSERT INTO Users (name, phone, email, passwd) VALUES ('${name}', '${phone}', '${formattedEmail}', '${passwdEncrypted}')`
        );

        const user = await this._query(
            `SELECT id FROM Users WHERE email = '${formattedEmail}'`
        );

        return user[0];
    };

    async correctPasswd(passwd, candidate) {
    	return await bcrypt.compare(candidate, passwd);
    };

    async getOne(userData) {
        const { email, passwd } = userData;
        const formattedEmail = email.toLowerCase();
        const user = await this._query(`SELECT id, name, email, passwd FROM Users WHERE email = '${formattedEmail}'`);

        return user[0];
    };

    async findById(id) {
    	const user = await this._query(`SELECT id, name, email, passwd FROM Users WHERE id = '${id}'`);
    	
    	return user[0];
    };

    async getMe(id) {
        const user = await this._query(`SELECT id, name, email, phone FROM Users WHERE id = '${id}'`);
        
        return user[0];
    }
};

module.exports = new User();