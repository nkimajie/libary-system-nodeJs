const AppError = require('../../helpers/error');

module.exports = class EnrollmentService {
    /**
     * app service constructor
     * @param { `cartRepository` } cartRepository
     */
    constructor({ cartRepository, couponRepository }) {
        this.cartRepository = cartRepository;
        this.couponRepository = couponRepository;
    };



    /**
     * get all cart item
     * @return {object} data
     */
    async getAllCartItem() {
        return await this.cartRepository.findAll();
    }

    /**
     * add cart item
     * @return {object} data
     */
    async addCartItem(data) {
        return await this.cartRepository.create({...data});
    }

     /**
     * add coupon rules
     * @return {object} data
     */
      async addCouponRules(data) {
        return await this.couponRepository.create({...data});
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
        cartTotal = cartTotal*1;
        let cart = await this.cartRepository.findAndCountAll();
        if (cartTotal > coupon.cart_total && cart.count >= coupon.cart_item) {
           let newBalance = cartTotal;
           if (coupon.discount_amount > 0) {
            newBalance = cartTotal - coupon.discount_amount;
           }
           if (coupon.discount_percent > 0) {
                let discount_percent = parseFloat(coupon.discount_percent)/100;
                discount_percent = newBalance*discount_percent;
                newBalance = newBalance-discount_percent;
            }
           return {newBalance, cartTotal, cartItems: cart};
        }
    }

};