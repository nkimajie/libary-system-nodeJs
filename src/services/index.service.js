const AppError = require('../../helpers/error');
const moment = require('moment');

module.exports = class EnrollmentService {
    /**
     * app service constructor
     * @param { `cartRepository` } cartRepository
     */
    constructor({ UsersRepository, BooksRepository, BorrowedRepository }) {
        this.UsersRepository = UsersRepository;
        this.BooksRepository = BooksRepository;
        this.BorrowedRepository = BorrowedRepository;
    };



    /**
     * get all cart item
     * @return {object} data
     */
    async getAllBooks() {
        return await this.BooksRepository.findAndCountAll();
    }

    /**
    * get all users
    * @return {object} data
    */
    async allUsers() {
        return await this.UsersRepository.findAndCountAll();
    }

    /**
     * get Book By Id
     * @return {object} data
     */
    async getBookById(bookId) {
        return await this.BooksRepository.findOne({
            where: {
                id: bookId,
            }
        });
    }

    /**
     * filterBookBy
     * @return {object} data
     */
     async filterBookByPublisher(Publisher) {
        return await this.BooksRepository.findOne({
            where: {
                Publisher
            }
        });
    }

    async filterBookByCategory(Category) {
        return await this.BooksRepository.findOne({
            where: {
                Category
            }
        });
    }

    /**
     * enroll User
     * @return {object} data
     */
    async enrollUser(data) {
        const { email } = data;
        const [user, created] = await this.UsersRepository.findOrCreate({
            where: { email },
            defaults: {
                ...data,
            },
        });
        if (!created) {
            return Promise.reject(new AppError({
                name: 'UserExists',
                statusCode: 401,
                message: 'A user with this email already exists!',
            }));
        }
        return user;
    }

    /**
     * add book
     * @return {object} data
     */
    async addBooks(data) {
        return await this.BooksRepository.create({ ...data });
    }

     /**
     * borrowBook
     * @return {object} data
     */
      async borrowBook(data) {
        const { bookId, userId, days } = data;
        const user = await this.BooksRepository.findOne({
            where: {
                id: bookId,
            }
        });
        if (!user) {
            return Promise.reject(new AppError({
                name: 'UserExists',
                statusCode: 401,
                message: 'User not found!',
            }));
        }
        await this.BooksRepository.updateData({available: "0"}, bookId);

        const book = await this.UsersRepository.findOne({
            where: {
                id: bookId,
            }
        });
        if (!book) {
            return Promise.reject(new AppError({
                name: 'BookExists',
                statusCode: 401,
                message: 'Book not found!',
            }));
        }
        let borrowed_date = moment(new Date()).format("YYYY-MM-DD");
        let return_date = moment(borrowed_date, "YYYY-MM-DD").add(days, 'days');

        return await this.BorrowedRepository.create({ book_name:user.name,borrowed_by: book.id, borrowed_date, return_date });
    }


    /**
    *allUsersBorrowedBooks
    * @return {object} data
    */
    async allUsersBorrowedBooks() {
        return await this.UsersRepository.allUsersBorrowedBooks();
    }


     /**
    *booksNotAvailiable
    * @return {object} data
    */
    async booksNotAvailiable() {
        return await this.BorrowedRepository.findAndCountAll({
            where: {
                returned: '0',
            }
        });
    }


};