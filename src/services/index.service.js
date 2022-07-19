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
    * cart balance
    * @return {object} data
    */
    async getCartBalance() {
        return await this.cartRepository.getCartBalance();
    }

    /**
     * apply coupon to cart
     * @return {object} data
     */
    async applyCouponToCart(couponId) {
        let coupon = await this.couponRepository.findOne({
            where: {
                name: couponId
            }
        });
        if (!coupon) {
            return Promise.reject(
                new AppError({
                    statusCode: 400,
                    name: 'CoupoonNotFound',
                    message: 'Coupon does not exist. Try again!',
                }),
            );
        }
        let cartTotal = await this.cartRepository.getCartBalance();
        cartTotal = cartTotal * 1;
        let cart = await this.cartRepository.findAndCountAll();
        if (cartTotal > coupon.cart_total && cart.count >= coupon.cart_item) {
            let newBalance = cartTotal;
            if (coupon.discount_amount > 0) {
                newBalance = cartTotal - coupon.discount_amount;
            }
            if (coupon.discount_percent > 0) {
                let discount_percent = parseFloat(coupon.discount_percent) / 100;
                discount_percent = newBalance * discount_percent;
                newBalance = newBalance - discount_percent;
            }
            return { newBalance, cartTotal, cartItems: cart };
        }
    }

};