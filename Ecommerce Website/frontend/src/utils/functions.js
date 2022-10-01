export const getDiscount = (price, cuttedPrice) => {
    return (((cuttedPrice - price) / cuttedPrice) * 100).toFixed();
}

export const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(new Date().getDate() + 7)
    return deliveryDate.toUTCString().substring(0, 11);
}

export const formatDate = (dt) => {
    return new Date(dt).toUTCString().substring(0,16);
}

export const getRandomProducts = (prodsArray, n) => {
    return prodsArray.sort(() => 0.5 - Math.random()).slice(0, n)
}

export const getOfferProducts = (prodsArray,n) => {
    return prodsArray.sort((a,b) => (a.cuttedPrice - a.price > b.cuttedPrice - b.price ? -1 : 1)).slice(0,n)
    // return prodsArray.sort((a,b) => prodsArray.cuttedPrice - prodsArray.price).slice(0,n)
}

export const getTopProducts = (prodsArray) => {
    return prodsArray.sort((a, b) => (a.views > b.views ? -1 : 1));
}