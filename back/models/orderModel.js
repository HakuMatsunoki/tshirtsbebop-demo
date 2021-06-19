const AppError = require('../utils/appError');
const BaseModel = require('./baseModel');


class Order extends BaseModel {
    async createOne(userId, paymentsId, deliveryId, tshirtsList) {
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const statusId = 1;

        await this._query(`
            INSERT INTO 
                Orders (date, user_id, payments_id, status_id, delivery_id, tshirtsList) 
            VALUES 
                ('${date}', '${userId}', '${paymentsId}', '${statusId}', '${deliveryId}', '${JSON.stringify(tshirtsList)}')
        `);
    };

    async getOne(userId, orderId) {
        const result = await this._query(`
            SELECT 
                Orders.id, 
                Orders.date, 
                Payments.value as payments, 
                Status.value as status, 
                Delivery.value as delivery, 
                Orders.tshirtsList
            FROM Orders, Payments, Status, Delivery
            WHERE Orders.id = '${orderId}'
            AND Orders.user_id = '${userId}'
            AND Payments.id = Orders.payments_id
            AND Status.id = Orders.status_id
            AND Delivery.id = Orders.delivery_id
        `);

        return result;
    };

    async getAll(userId) {
        const result = await this._query(`
            SELECT 
                Orders.id, 
                Orders.date, 
                Payments.value as payments, 
                Status.value as status, 
                Delivery.value as delivery, 
                Orders.tshirtsList
            FROM Orders, Payments, Status, Delivery
            WHERE Orders.user_id = '${userId}'
            AND Payments.id = Orders.payments_id
            AND Status.id = Orders.status_id
            AND Delivery.id = Orders.delivery_id
        `);

        return result;
    };
};

module.exports = new Order();