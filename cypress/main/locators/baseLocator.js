class BaseLocator {
    #locator;

    constructor(locator) {
        this.#locator = locator;
    }

    get locator() {
        return this.#locator;
	}
}

module.exports = BaseLocator;