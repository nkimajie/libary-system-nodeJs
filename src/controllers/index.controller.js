module.exports = class IndexController {
    /**
     * IndexController Constructor
     * @param {{indexService: indexService}} param0
     */
    constructor({ indexService }) {
        this.indexService = indexService;
    };

    /**
     * get all cart
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
    async getAllCartItem(req, res) {
        const cart = await this.indexService.getAllCartItem();
        const total = await this.indexService.getCartBalance();
        return res.data({ totalAmount: total, cartItems: cart });
    }

    /**
     * add to cart
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
    async addCartItem(req, res) {
        return res.data(await this.indexService.addCartItem(req.body));
    }

    /**
     * add to coupon rules
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
    async addCouponRules(req, res) {
        return res.data(await this.indexService.addCouponRules(req.body));
    }

    /**
     * apply coupon to cart
     * @param {express.object} req
     * @param {express.object} res
     * @return {object} json  with user data
     */
     async applyCouponToCart(req, res) {
         const { coupon } = req.query;
        return res.data(await this.indexService.applyCouponToCart(coupon));
    }
};