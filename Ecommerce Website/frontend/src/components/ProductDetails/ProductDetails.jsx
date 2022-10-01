import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  clearErrors,
  getProductDetails,
  getSimilarProducts,
  newReview,
} from "../../actions/productAction";
import { NextBtn, PreviousBtn } from "../Home/Banner/Banner";
import ProductSlider from "../Home/ProductSlider/ProductSlider";
import ProductSliderSpecial from "../Home/ProductSlider/ProductSliderSpecial";
import Loader from "../Layouts/Loader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { addItemsToCart } from "../../actions/cartAction";
import { getDeliveryDate, getDiscount } from "../../utils/functions";
import Modal from "react-modal";
import Product from "../Home/DealSlider/Product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../actions/wishlistAction";
import MinCategory from "../Layouts/MinCategory";
import MetaData from "../Layouts/MetaData";
const firebaseConfig = {
  apiKey: "AIzaSyCqJyW-mgSVClCOgHL6le8QwaaZHAIyeHU",
  authDomain: "recommendationyouthclub.firebaseapp.com",
  projectId: "recommendationyouthclub",
  storageBucket: "recommendationyouthclub.appspot.com",
  messagingSenderId: "520178963155",
  appId: "1:520178963155:web:c12841dea58718d3f7fa26",
};
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const navigate = useNavigate();
  // reviews toggle
  const [open, setOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
    );
    console.log(product)
    const [price, setPrice] = useState(product.price);
    
    const writeUserData = (val, id) => {
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      set(ref(db, "auction/" + `${id}`), {
        price: val,
        productid: id,
      });
    };
    const [realtimeprice, setrealtimeprice] = useState(null);
    useEffect(() => {
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const starCountRef = ref(db, "auction/" + `${product._id}`);
      console.log(product);
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        setrealtimeprice(data?.price);
        // console.log(data?.price);
        // console.log(realtimeprice);
        // updateStarCount(postElement, data);
      });
    }, [product]);

    useEffect(()=>{
      setrealtimeprice(realtimeprice)
      console.log(realtimeprice,"changed");
    },[realtimeprice])

    useEffect(()=>{
      setPrice(realtimeprice)
    },[realtimeprice])

    const { success, error: reviewError } = useSelector(
      (state) => state.newReview
      );
      const { cartItems } = useSelector((state) => state.cart);
      const { wishlistItems } = useSelector((state) => state.wishlist);
      
      const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
      };
      
      const productId = params.id;
      const itemInWishlist = wishlistItems.some((i) => i.product === productId);
      
      const addToWishlistHandler = () => {
        if (itemInWishlist) {
          dispatch(removeFromWishlist(productId));
          enqueueSnackbar("Remove From Wishlist", { variant: "success" });
        } else {
          dispatch(addToWishlist(productId));
          enqueueSnackbar("Added To Wishlist", { variant: "success" });
        }
      };
      
      const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
          enqueueSnackbar("Empty Review", { variant: "error" });
          return;
        }
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);
        dispatch(newReview(formData));
        setOpen(false);
      };
      
  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId));
    enqueueSnackbar("Product Added To Cart", { variant: "success" });
  };

  const handleDialogClose = () => {
    setOpen(!open);
  };

  const itemInCart = cartItems.some((i) => i.product === productId);

  const goToCart = () => {
    navigate("/cart");
  };

  const buyNow = () => {
    addToCartHandler();
    navigate("/shipping");
  };

  const bid = async () => {
    // console.log("function call")
    const datas = { productId: productId, bidVal: price };
    // console.log(datas, "data")
    const options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datas),
    }
    const data = await fetch('/api/v1/updatebid', options);
    const parsedData = await data.json();
    // console.log(parsedData);
  }
  // console.log(product.DTvalue);
  var currDate = new Date()
  const calculateTimeLeft = () => {
    const difference = product.DTvalue - currDate.getTime();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  var timeLeft = calculateTimeLeft();

  //   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  //   console.log(timeLeft,"jeet");
  //   useEffect(() => {
  //       setTimeout(() => {
  //         setTimeLeft(calculateTimeLeft());
  //       }, 1000);
  //     },[]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (reviewError) {
      enqueueSnackbar(reviewError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(productId));
    // eslint-disable-next-line
  }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

  useEffect(() => {
    dispatch(getSimilarProducts(product?.category));
  }, [dispatch, product, product.category]);

  const [ismodal, setIsmodal] = useState(false);
  const [products, setProducts] = useState([]);



  const fetchImages = async (id) => {
    const datas = { id }

    // console.log(datas,"jeet")
    const data = await fetch('/api/v1/get-recommandation', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datas)
    });
    const parsedData = await data.json();
    // console.log("ids : ",parsedData)
    const x = await fetchProductDetail(parsedData);
    // console.log(x,"xxx");

  }
  // const temp=async (ids)=>
  // {

  // }
  const fetchProductDetail = async (ids) => {
    let arr = [];
    for(let i=0;i<ids.length;i++)
    {
      const data = await fetch(`/api/v1/product/${ids[i]}`);
      const parsedData = await data.json();
      // console.log(parsedData.product,"Oza");
      arr.push(parsedData.product);
    }
    // console.log(arr,"arr");
    setProducts(arr);
  }

  useEffect(() => {
    fetchImages(productId);
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : product.type === "Simple" ? (
        <>
          <MetaData title={product.name} />
          <MinCategory />
          <main className="mt-12 sm:mt-0">
            {/* <!-- product image & description container --> */}
            <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">
              {/* <!-- image wrapper --> */}
              <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                {/* <!-- imgbox --> */}
                <div className="flex flex-col gap-3 m-3">
                  <div className="w-full h-full pb-6 border relative">
                    <Slider {...settings}>
                      {product.images &&
                        product.images.map((item, i) => (
                          <img
                            draggable="false"
                            className="w-full h-96 object-contain"
                            src={item.url}
                            alt={product.name}
                            key={i}
                          />
                        ))}
                    </Slider>
                    <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                      <span
                        onClick={addToWishlistHandler}
                        className={`${itemInWishlist
                          ? "text-red-500"
                          : "hover:text-red-500 text-gray-300"
                          } cursor-pointer`}
                      >
                        <FavoriteIcon sx={{ fontSize: "18px" }} />
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex gap-3">
                    {/* <!-- add to cart btn --> */}
                    {product.stock > 0 && (
                      <button
                        onClick={itemInCart ? goToCart : addToCartHandler}
                        className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-yellow rounded-sm shadow hover:shadow-lg"
                      >
                        <ShoppingCartIcon />
                        {itemInCart ? "GO TO CART" : "ADD TO CART"}
                      </button>
                    )}
                    <button
                      onClick={buyNow}
                      disabled={product.stock < 1 ? true : false}
                      className={
                        product.stock < 1
                          ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg"
                          : "p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg"
                      }
                    >
                      <FlashOnIcon />
                      {product.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                    </button>
                    {/* <!-- add to cart btn --> */}
                  </div>
                </div>
                {/* <!-- imgbox --> */}
              </div>
              {/* <!-- image wrapper --> */}

              {/* <!-- product desc wrapper --> */}
              <div className="flex-1 py-2 px-3">
                {/* <!-- whole product description --> */}
                <div className="flex flex-col gap-2 mb-4">
                  <h2 className="text-xl">{product.name}</h2>
                  {/* <!-- rating badge --> */}
                  <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                    <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
                      {product.ratings && product.ratings.toFixed(1)}{" "}
                      <StarIcon sx={{ fontSize: "12px" }} />
                    </span>
                    <span>{product.numOfReviews} Reviews</span>
                  </span>
                  {/* <!-- rating badge --> */}

                  {/* <!-- price desc --> */}
                  <span className="text-primary-green text-sm font-medium">
                    Special Price
                  </span>
                  <div className="flex items-baseline gap-2 text-3xl font-medium">
                    <span className="text-gray-800">
                      ₹{product.price?.toLocaleString()}
                    </span>
                    <span className="text-base text-gray-500 line-through">
                      ₹{product.cuttedPrice?.toLocaleString()}
                    </span>
                    <span className="text-base text-primary-green">
                      {getDiscount(product.price, product.cuttedPrice)}
                      %&nbsp;off
                    </span>
                  </div>
                  {product.stock <= 10 && product.stock > 0 && (
                    <span className="text-red-500 text-sm font-medium">
                      Hurry, Only {product.stock} left!
                    </span>
                  )}

                  {/* <!-- price desc --> */}

                  {/* <!-- banks offers --> */}
                  <p className="text-md font-medium">Available offers</p>
                  {Array(3)
                    .fill("")
                    .map((el, i) => (
                      <p className="text-sm flex items-center gap-1" key={i}>
                        <span className="text-primary-lightGreen">
                          <LocalOfferIcon sx={{ fontSize: "20px" }} />
                        </span>
                        <span className="font-medium ml-2">Bank Offer</span> 15%
                        Instant discount on first Sing Chana Pay Later order of
                        500 and above{" "}
                        <Link className="text-primary-blue font-medium" to="/">
                          T&C
                        </Link>
                      </p>
                    ))}
                  {/* <!-- banks offers --> */}

                  {/* <!-- warranty & brand --> */}
                  <div className="flex gap-8 mt-2 items-center text-sm">
                    <img
                      draggable="false"
                      className="w-20 h-8 p-0.5 border object-contain"
                      src={product.brand?.logo.url}
                      alt={product.brand && product.brand.name}
                    />
                    <span>
                      {product.warranty} Year Warranty{" "}
                      <Link className="font-medium text-primary-blue" to="/">
                        Know More
                      </Link>
                    </span>
                  </div>
                  {/* <!-- warranty & brand --> */}

                  {/* <!-- delivery details --> */}
                  <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                    <p className="text-gray-500">Delivery</p>
                    <span>Delivery by {getDeliveryDate()}</span>
                  </div>
                  {/* <!-- delivery details --> */}

                  {/* <!-- highlights & services details --> */}
                  <div className="flex flex-col sm:flex-row justify-between">
                    {/* <!-- highlights details --> */}
                    <div className="flex gap-16 mt-4 items-stretch text-sm">
                      <p className="text-gray-500 font-medium">Highlights</p>

                      <ul className="list-disc flex flex-col gap-2 w-64">
                        {product.highlights?.map((highlight, i) => (
                          <li key={i}>
                            <p>{highlight}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* <!-- highlights details --> */}

                    {/* <!-- services details --> */}
                    <div className="flex gap-16 mt-4 mr-6 items-stretch text-sm">
                      <p className="text-gray-500 font-medium">Services</p>
                      <ul className="flex flex-col gap-2">
                        <li>
                          <p className="flex items-center gap-3">
                            <span className="text-primary-blue">
                              <VerifiedUserIcon sx={{ fontSize: "18px" }} />
                            </span>{" "}
                            {product.warranty} Year
                          </p>
                        </li>
                        <li>
                          <p className="flex items-center gap-3">
                            <span className="text-primary-blue">
                              <CachedIcon sx={{ fontSize: "18px" }} />
                            </span>{" "}
                            7 Days Replacement Policy
                          </p>
                        </li>
                        <li>
                          <p className="flex items-center gap-3">
                            <span className="text-primary-blue">
                              <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />
                            </span>{" "}
                            Cash on Delivery available
                          </p>
                        </li>
                      </ul>
                    </div>
                    {/* <!-- services details --> */}
                  </div>
                  {/* <!-- highlights & services details --> */}

                  {/* <!-- seller details --> */}
                  <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                    <p className="text-gray-500">Seller</p>
                    <Link className="font-medium text-primary-blue ml-3" to="/">
                      {product.brand && product.brand.name}
                    </Link>
                  </div>
                  {/* <!-- seller details --> */}

                  {/* <!-- flipkart plus banner --> */}
                  {/* <div className="sm:w-1/2 mt-4 border">
                    <img
                      draggable="false"
                      className="w-full h-full object-contain"
                      src="https://rukminim1.flixcart.com/lockin/763/305/images/promotion_banner_v2_active.png"
                      alt=""
                    />
                  </div> */}
                  {/* <!-- flipkart plus banner --> */}

                  {/* <!-- description details --> */}
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                    <p className="text-gray-500 font-medium">Description</p>
                    <span>{product.description}</span>
                  </div>
                  {/* <!-- description details --> */}

                  {/* <!-- border box --> */}
                  <div className="w-full mt-6 rounded-sm border flex flex-col">
                    <h1 className="px-6 py-4 border-b text-2xl font-medium">
                      Product Description
                    </h1>
                    <div className="p-6">
                      <p className="text-sm">{product.description}</p>
                    </div>
                  </div>
                  {/* <!-- border box --> */}

                  {/* <!-- specifications border box --> */}
                  <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                    <h1 className="px-6 py-4 border-b text-2xl font-medium">
                      Specifications
                    </h1>
                    <h1 className="px-6 py-3 text-lg">General</h1>

                    {/* <!-- specs list --> */}
                    {product.specifications?.map((spec, i) => (
                      <div
                        className="px-6 py-2 flex items-center text-sm"
                        key={i}
                      >
                        <p className="text-gray-500 w-3/12">{spec.title}</p>
                        <p className="flex-1">{spec.description}</p>
                      </div>
                    ))}
                    {/* <!-- specs list --> */}
                  </div>
                  {/* <!-- specifications border box --> */}

                  {/* <!-- reviews border box --> */}
                  <div className="w-full mt-4 rounded-sm border flex flex-col">
                    <div className="flex justify-between items-center border-b px-6 py-4">
                      <h1 className="text-2xl font-medium">
                        Ratings & Reviews
                      </h1>
                      <button
                        onClick={handleDialogClose}
                        className="shadow bg-primary-yellow text-white px-4 py-2 rounded-sm hover:shadow-lg"
                      >
                        Rate Product
                      </button>
                    </div>

                    <Dialog
                      aria-labelledby="review-dialog"
                      open={open}
                      onClose={handleDialogClose}
                    >
                      <DialogTitle className="border-b">
                        Submit Review
                      </DialogTitle>
                      <DialogContent className="flex flex-col m-1 gap-4">
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large"
                          precision={0.5}
                        />
                        <TextField
                          label="Review"
                          multiline
                          rows={3}
                          sx={{ width: 400 }}
                          size="small"
                          variant="outlined"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <button
                          onClick={handleDialogClose}
                          className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={reviewSubmitHandler}
                          className="py-2 px-6 rounded bg-green-600 hover:bg-green-700 text-white shadow uppercase"
                        >
                          Submit
                        </button>
                      </DialogActions>
                    </Dialog>

                    <div className="flex items-center border-b">
                      <h1 className="px-6 py-3 text-3xl font-semibold">
                        {product.ratings && product.ratings.toFixed(1)}
                        <StarIcon />
                      </h1>
                      <p className="text-lg text-gray-500">
                        ({product.numOfReviews}) Reviews
                      </p>
                    </div>

                    {viewAll
                      ? product.reviews
                        ?.map((rev, i) => (
                          <div
                            className="flex flex-col gap-2 py-4 px-6 border-b"
                            key={i}
                          >
                            <Rating
                              name="read-only"
                              value={rev.rating}
                              readOnly
                              size="small"
                              precision={0.5}
                            />
                            <p>{rev.comment}</p>
                            <span className="text-sm text-gray-500">
                              by {rev.name}
                            </span>
                          </div>
                        ))
                        .reverse()
                      : product.reviews
                        ?.slice(-3)
                        .map((rev, i) => (
                          <div
                            className="flex flex-col gap-2 py-4 px-6 border-b"
                            key={i}
                          >
                            <Rating
                              name="read-only"
                              value={rev.rating}
                              readOnly
                              size="small"
                              precision={0.5}
                            />
                            <p>{rev.comment}</p>
                            <span className="text-sm text-gray-500">
                              by {rev.name}
                            </span>
                          </div>
                        ))
                        .reverse()}
                    {product.reviews?.length > 3 && (
                      <button
                        onClick={() => setViewAll(!viewAll)}
                        className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-primary-blue text-white"
                      >
                        {viewAll ? "View Less" : "View All"}
                      </button>
                    )}
                  </div>
                  {/* <!-- reviews border box --> */}
                </div>
              </div>
              {/* <!-- product desc wrapper --> */}
            </div>
            {/* <!-- product image & description container --> */}

            {/* Sliders */}
            <div className="flex flex-col gap-3 mt-6">
              {console.log(products,"jeet oza")}
              {products.length===0 ? (<>{console.log("empty")}</>):(
                <>
                <ProductSliderSpecial
                title={"Similar Products"}
                tagline={"Based on the category"}
                product={products}
              />
              {console.log("non empty")}
              </>
              
            
              )}
              
            </div>
          </main>
        </>
      ) : (
        <>
          <MetaData title={product.name} />
          <div className="App">
            <Modal
              style={{
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.75)",
                },
                content: {
                  height: 400,
                  position: "absolute",
                  top: "100px",
                  left: "40px",
                  right: "40px",
                  bottom: "40px",
                  border: "1px solid #ccc",
                  background: "#fff",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "4px",
                  outline: "none",
                  padding: "20px",
                },
              }}
              isOpen={ismodal}
            >
              <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                <h1 className="px-6 py-4 border-b text-2xl font-medium">
                  {product.name}
                </h1>
                <h1 className="px-6 py-3 text-lg">General</h1>

                <div className="px-6 py-2 flex items-center text-sm">
                  <p className="text-gray-500 w-3/12">Current Value</p>
                  <p className="flex-1">{realtimeprice?.toLocaleString()}</p>
                </div>
                
                <div className="px-6 py-2 flex items-center text-sm">
                  <p className="text-gray-500 w-3/12">Your Bid</p>
                  {/* <p className="flex-1">{product.price}</p> */}
                  <TextField
                    label="Price"
                    type="number"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                    }}
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div style={{color:"#900"}} className="px-6 py-2 flex items-center text-sm">
                Bid value must be greater than current price
                </div>
              </div>
              <div className="px-6 py-2 flex items-center text-sm">
                <button
                  style={{
                    margin: "5px",
                  }}
                  onClick={() => setIsmodal(!ismodal)}
                  className={
                    "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 rounded-sm shadow hover:shadow-lg"
                  }
                >
                  <FlashOnIcon />
                  CLOSE
                </button>
                <button
                  style={{
                    margin: "5px",
                  }}
                  onClick={() => {
                    writeUserData(price, product._id)
                    bid();
                    setIsmodal(!ismodal)
                  }}
                  className={
                    "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 rounded-sm shadow hover:shadow-lg"
                  }
                >
                  <FlashOnIcon />
                  BID
                </button>
              </div>
            </Modal>
          </div>
          <MinCategory />
          <main className="mt-12 sm:mt-0">
            {/* <!-- product image & description container --> */}
            <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">
              {/* <!-- image wrapper --> */}
              <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                {/* <!-- imgbox --> */}
                <div className="flex flex-col gap-3 m-3">
                  <div className="w-full h-full pb-6 border relative">
                    <Slider {...settings}>
                      {product.images &&
                        product.images.map((item, i) => (
                          <img
                            draggable="false"
                            className="w-full h-96 object-contain"
                            src={item.url}
                            alt={product.name}
                            key={i}
                          />
                        ))}
                    </Slider>
                    <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                      <span
                        onClick={addToWishlistHandler}
                        className={`${itemInWishlist
                          ? "text-red-500"
                          : "hover:text-red-500 text-gray-300"
                          } cursor-pointer`}
                      >
                        <FavoriteIcon sx={{ fontSize: "18px" }} />
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex gap-3">
                    {/* <!-- add to cart btn --> */}
                    <button
                      onClick={() => setIsmodal(!ismodal)}
                      className={
                        "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 rounded-sm shadow hover:shadow-lg"
                      }
                    >
                      <FlashOnIcon />
                      BID
                    </button>
                    {/* <!-- add to cart btn --> */}
                  </div>
                </div>
                {/* <!-- imgbox --> */}
              </div>
              {/* <!-- image wrapper --> */}

              {/* <!-- product desc wrapper --> */}
              <div className="flex-1 py-2 px-3">
                {/* <!-- whole product description --> */}
                <div className="flex flex-col gap-2 mb-4">
                  <h2 className="text-xl">{product.name}</h2>
                  <div className="flex items-baseline gap-2 text-3xl font-medium">
                    {loading?(<></>):(
                      <span className="text-gray-800">
                        {console.log(realtimeprice)}
                      ₹{realtimeprice?.toLocaleString()}
                    </span>
                    )}
                  </div>
                  <span className="text-red-500 text-sm font-medium">
                    <p>
                      <span>{timeLeft.hours}</span> Hours left for auction
                      {/* {console.log(timeLeft.hours)} */}
                      {/* <span>:</span> */}
                      {/* <span>{timeLeft.minutes}</span>
                    <span>:</span>
                    <span>{timeLeft.seconds}</span> */}
                    </p>
                  </span>


                  {/* <!-- price desc --> */}

                  {/* <!-- warranty & brand --> */}
                  <div className="flex gap-8 mt-2 items-center text-sm">
                    <img
                      draggable="false"
                      className="w-20 h-8 p-0.5 border object-contain"
                      src={product.brand?.logo.url}
                      alt={product.brand && product.brand.name}
                    />
                    <span>
                      {product.warranty} Year Warranty{" "}
                      <Link className="font-medium text-primary-blue" to="/">
                        Know More
                      </Link>
                    </span>
                  </div>
                  {/* <!-- warranty & brand --> */}

                  {/* <!-- delivery details --> */}
                  <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                    <p className="text-gray-500">Delivery</p>
                    <span>Delivery by {getDeliveryDate()}</span>
                  </div>
                  {/* <!-- delivery details --> */}

                  {/* <!-- highlights & services details --> */}
                  <div className="flex flex-col sm:flex-row justify-between">
                    {/* <!-- highlights details --> */}
                    <div className="flex gap-16 mt-4 items-stretch text-sm">
                      <p className="text-gray-500 font-medium">Highlights</p>

                      <ul className="list-disc flex flex-col gap-2 w-64">
                        {product.highlights?.map((highlight, i) => (
                          <li key={i}>
                            <p>{highlight}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* <!-- highlights details --> */}

                    {/* <!-- services details --> */}
                    <div className="flex gap-16 mt-4 mr-6 items-stretch text-sm">
                      <p className="text-gray-500 font-medium">Services</p>
                      <ul className="flex flex-col gap-2">
                        <li>
                          <p className="flex items-center gap-3">
                            <span className="text-primary-blue">
                              <VerifiedUserIcon sx={{ fontSize: "18px" }} />
                            </span>{" "}
                            {product.warranty} Year
                          </p>
                        </li>
                        <li>
                          <p className="flex items-center gap-3">
                            <span className="text-primary-blue">
                              <CachedIcon sx={{ fontSize: "18px" }} />
                            </span>{" "}
                            7 Days Replacement Policy
                          </p>
                        </li>
                        <li>
                          <p className="flex items-center gap-3">
                            <span className="text-primary-blue">
                              <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />
                            </span>{" "}
                            Cash on Delivery available
                          </p>
                        </li>
                      </ul>
                    </div>
                    {/* <!-- services details --> */}
                  </div>
                  {/* <!-- highlights & services details --> */}

                  {/* <!-- seller details --> */}
                  <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                    <p className="text-gray-500">Seller</p>
                    <Link className="font-medium text-primary-blue ml-3" to="/">
                      {product.brand && product.brand.name}
                    </Link>
                  </div>
                  {/* <!-- seller details --> */}

                  {/* <!-- flipkart plus banner --> */}
                  {/* <div className="sm:w-1/2 mt-4 border">
                    <img
                      draggable="false"
                      className="w-full h-full object-contain"
                      src="https://rukminim1.flixcart.com/lockin/763/305/images/promotion_banner_v2_active.png"
                      alt=""
                    />
                  </div> */}
                  {/* <!-- flipkart plus banner --> */}

                  {/* <!-- description details --> */}
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                    <p className="text-gray-500 font-medium">Description</p>
                    <span>{product.description}</span>
                  </div>
                  {/* <!-- description details --> */}

                  {/* <!-- border box --> */}
                  <div className="w-full mt-6 rounded-sm border flex flex-col">
                    <h1 className="px-6 py-4 border-b text-2xl font-medium">
                      Product Description
                    </h1>
                    <div className="p-6">
                      <p className="text-sm">{product.description}</p>
                    </div>
                  </div>
                  {/* <!-- border box --> */}

                  {/* <!-- specifications border box --> */}
                  <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                    <h1 className="px-6 py-4 border-b text-2xl font-medium">
                      Specifications
                    </h1>
                    <h1 className="px-6 py-3 text-lg">General</h1>

                    {/* <!-- specs list --> */}
                    {product.specifications?.map((spec, i) => (
                      <div
                        className="px-6 py-2 flex items-center text-sm"
                        key={i}
                      >
                        <p className="text-gray-500 w-3/12">{spec.title}</p>
                        <p className="flex-1">{spec.description}</p>
                      </div>
                    ))}
                    {/* <!-- specs list --> */}
                  </div>
                  {/* <!-- specifications border box --> */}

                  {/* <!-- reviews border box --> */}
                  <div className="w-full mt-4 rounded-sm border flex flex-col">
                    <div className="flex justify-between items-center border-b px-6 py-4">
                      <h1 className="text-2xl font-medium">
                        Ratings & Reviews
                      </h1>
                      <button
                        onClick={handleDialogClose}
                        className="shadow bg-primary-yellow text-white px-4 py-2 rounded-sm hover:shadow-lg"
                      >
                        Rate Product
                      </button>
                    </div>

                    <Dialog
                      aria-labelledby="review-dialog"
                      open={open}
                      onClose={handleDialogClose}
                    >
                      <DialogTitle className="border-b">
                        Submit Review
                      </DialogTitle>
                      <DialogContent className="flex flex-col m-1 gap-4">
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large"
                          precision={0.5}
                        />
                        <TextField
                          label="Review"
                          multiline
                          rows={3}
                          sx={{ width: 400 }}
                          size="small"
                          variant="outlined"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <button
                          onClick={handleDialogClose}
                          className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={reviewSubmitHandler}
                          className="py-2 px-6 rounded bg-green-600 hover:bg-green-700 text-white shadow uppercase"
                        >
                          Submit
                        </button>
                      </DialogActions>
                    </Dialog>

                    <div className="flex items-center border-b">
                      <h1 className="px-6 py-3 text-3xl font-semibold">
                        {product.ratings && product.ratings.toFixed(1)}
                        <StarIcon />
                      </h1>
                      <p className="text-lg text-gray-500">
                        ({product.numOfReviews}) Reviews
                      </p>
                    </div>

                    {viewAll
                      ? product.reviews
                        ?.map((rev, i) => (
                          <div
                            className="flex flex-col gap-2 py-4 px-6 border-b"
                            key={i}
                          >
                            <Rating
                              name="read-only"
                              value={rev.rating}
                              readOnly
                              size="small"
                              precision={0.5}
                            />
                            <p>{rev.comment}</p>
                            <span className="text-sm text-gray-500">
                              by {rev.name}
                            </span>
                          </div>
                        ))
                        .reverse()
                      : product.reviews
                        ?.slice(-3)
                        .map((rev, i) => (
                          <div
                            className="flex flex-col gap-2 py-4 px-6 border-b"
                            key={i}
                          >
                            <Rating
                              name="read-only"
                              value={rev.rating}
                              readOnly
                              size="small"
                              precision={0.5}
                            />
                            <p>{rev.comment}</p>
                            <span className="text-sm text-gray-500">
                              by {rev.name}
                            </span>
                          </div>
                        ))
                        .reverse()}
                    {product.reviews?.length > 3 && (
                      <button
                        onClick={() => setViewAll(!viewAll)}
                        className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-primary-blue text-white"
                      >
                        {viewAll ? "View Less" : "View All"}
                      </button>
                    )}
                  </div>
                  {/* <!-- reviews border box --> */}
                </div>
              </div>
              {/* <!-- product desc wrapper --> */}
            </div>
            {/* <!-- product image & description container --> */}

            {/* Sliders */}
            <div className="flex flex-col gap-3 mt-6">
              {console.log(products,"jeet oza")}
              {products.length===0 ? (<>{console.log("empty")}</>):(
                <>
                <ProductSliderSpecial
                title={"Similar Products"}
                tagline={"Based on the category"}
                product={products}
              />
              {console.log("non empty")}
              </>
              
            
              )}
              
            </div>


          </main>
        </>
      )}
    </>
  );
};

export default ProductDetails;
