const AppError = require('../utils/appError');
const BaseModel = require('./baseModel');


class Tshirt extends BaseModel {
    async getAll() {
        const tshirts = await this._query(`
        	SELECT 
                Tshirt.id, 
                Tshirt.name, 
                Tshirt.price, 
                Type.value as type, 
                Material.value as material
        	FROM Tshirt, Type, Material
        	WHERE Tshirt.type_id = Type.id
        	AND Tshirt.material_id = Material.id
        `);

        return tshirts;
    };

    async getOneByOptions(optionsId) {
        const tshirt = await this._query(`
            SELECT
                Tshirt.id,
                Tshirt.name,
                Tshirt.price,
                Type.value as type,
                Color.value as color,
                Size.value as size
            FROM Tshirt, Type, Color, Size, TshirtOptions
            WHERE TshirtOptions.id = '${optionsId}'
            AND TshirtOptions.tshirt_id = Tshirt.id
            AND TshirtOptions.color_id = Color.id
            AND TshirtOptions.size_id = Size.id
            AND Tshirt.type_id = Type.id
        `);

        return tshirt;
    };

    async getOneById(id) {
        const tshirt = await this._query(`
            SELECT 
                Tshirt.id, 
                Tshirt.name, 
                Tshirt.price, 
                Type.value as type, 
                Material.value as material
            FROM Tshirt, Type, Material
            WHERE Tshirt.id = '${id}'
            AND Tshirt.type_id = Type.id
            AND Tshirt.material_id = Material.id
        `);

        if (tshirt.length < 1) throw new AppError('This product does not exist.', 503);

    	const categories = await this._query(`
    		SELECT Categories.value
    		FROM Categories, TshirtCategories
    		WHERE Categories.id = TshirtCategories.category_id
    		AND TshirtCategories.tshirt_id = '${id}'
    	`);

        const options = await this._query(`
            SELECT 
                Size.value as size, 
                Color.value as color, 
                TshirtOptions.quantity as quantity, 
                TshirtOptions.id as tshirtOptionsId
            FROM Size, Color, TshirtOptions
            WHERE Size.id = TshirtOptions.size_id
            AND Color.id = TshirtOptions.color_id
            AND TshirtOptions.tshirt_id = '${id}'
        `);

        tshirt[0].categories = categories.map(item => item.value);
        tshirt[0].options = options.map(item => {
            return {
                tshirtOptionsId: item.tshirtOptionsId,
                size: item.size, 
                color: item.color,
                quantity: item.quantity,
            }
        });

        return tshirt;
    };
};

module.exports = new Tshirt();