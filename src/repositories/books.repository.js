const BooksModel = require('../models/books.model');

module.exports = class BooksRepository extends BooksModel {
    /**
     * update book data
     * @param {*} data
     * @param {*} uuid
     */
     static async updateData(data, id) {
        await this.update({...data }, { where: { id } });
    }
};