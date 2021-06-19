const AppError = require('../utils/appError');
const BaseModel = require('./baseModel');


class Cart extends BaseModel {
    async addItem(userId, tshirtOptionsId, quantity) {        
        const result = await this._query(`
            UPDATE Cart
            SET quantity = '${quantity}' 
            WHERE user_id = '${userId}'
            AND tshirtOptions_id = '${tshirtOptionsId}'
        `);
        
        if (result.affectedRows < 1) {
            await this._query(`
                INSERT INTO Cart (user_id, tshirtOptions_id, quantity) 
                VALUES ('${userId}', '${tshirtOptionsId}', '${quantity}')
            `);
        }
    }

    async removeItem(userId, itemId) {
        const result = await this._query(`
            DELETE
            FROM Cart
            WHERE id = '${itemId}'
            AND user_id = '${userId}'
        `);

        if (result.affectedRows < 1) throw new AppError('This item is no longer exist..', 410);
    }

    async removeAll(userId) {
        const result = await this._query(`
            DELETE
            FROM Cart
            WHERE user_id = '${userId}'
        `);
    }

    async getAll(userId) {
        const result = await this._query(`
            SELECT Cart.id, Cart.tshirtOptions_id as tshirtOptionsId, Cart.quantity, Tshirt.id as tshirtId, Tshirt.name, Tshirt.price, Color.value as color, Size.value as size
            FROM Cart, TshirtOptions, Tshirt, Color, Size
            WHERE Cart.user_id = '${userId}'
            AND Cart.tshirtOptions_id = TshirtOptions.id
            AND TshirtOptions.tshirt_id = Tshirt.id
            AND TshirtOptions.color_id = Color.id
            AND TshirtOptions.size_id = Size.id
        `);

        return result;
    }
};

module.exports = new Cart();