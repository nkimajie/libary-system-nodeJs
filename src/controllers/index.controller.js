module.exports = class IndexController {
    /**
     * IndexController Constructor
     * @param {{indexService: indexService}} param0
     */
    constructor({ indexService }) {
        this.indexService = indexService;
    };

    /**
     * add new user
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
    async enrollUser(req, res) {
        return res.data(await this.indexService.enrollUser(req.body));
    }

    /**
     * borrow Book
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
     async borrowBook(req, res) {
        return res.data(await this.indexService.borrowBook(req.body));
    }

    /**
     * get all books
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
    async getAllBooks(req, res) {
        return res.data(await this.indexService.getAllBooks());
    }

    /**
     * get Book By Id
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
    async getBookById(req, res) {
        const { bookId } = req.query;
        return res.data(await this.indexService.getBookById(bookId));
    }

    /**
     * Fetch/List users and the books they have borrowed
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
     async allUsersBorrowedBooks(req, res) {
        return res.data(await this.indexService.allUsersBorrowedBooks());
    }

    /**
     * Fetch/List the books that are not available for borrowing (showing the day it will be available)
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
     async booksNotAvailiable(req, res) {
        return res.data(await this.indexService.booksNotAvailiable());
    }

    /**
     * filter Book By
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
    async filterBookBy(req, res) {
        const { publisher, category } = req.query;
        if (typeof publisher !== 'undefined') {
            return res.data(await this.indexService.filterBookByPublisher(publisher));
        }
        if (typeof category !== 'undefined') {
            return res.data(await this.indexService.filterBookByCategory(category));
        }
        return Promise.reject(new AppError({
            name: 'undefinedQuery',
            statusCode: 401,
            message: 'Publisher or Category is undefined!',
        }));
    }


    /**
     * add books
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
    async addBooks(req, res) {
        return res.data(await this.indexService.addBooks(req.body));
    }

    /**
    * add books
    * @param {express.object} req
    * @param {express.object} res
    * @return {object} json  with user data
    */
    async allUsers(req, res) {
        return res.data(await this.indexService.allUsers());
    }
};