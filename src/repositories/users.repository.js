const UsersModel = require('../models/users.model');
const BorrowedBooks = require('../models/borrowed.model');

UsersModel.hasMany(BorrowedBooks, {
    foreignKey: 'borrowed_by',
    sourceKey: 'id',
    as: 'booksBorrowed',
});

module.exports = class UsersRepository extends UsersModel {
    /**
     * update user data
     * @param {*} data
     * @param {*} uuid
     */
    static async allUsersBorrowedBooks() {
       return await this.findAll({
           include: [{
                model: BorrowedBooks,
                as: 'booksBorrowed',
           }],
       })
    }
};