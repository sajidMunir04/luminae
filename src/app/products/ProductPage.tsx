import { useContext, useEffect, useRef, useState } from "react";
import { Product, ProductInventoryCategory } from "../utils/Product";
import styles from "./ProductPage.module.css";
import { useDraggable } from "react-use-draggable-scroll";
import { useCartStore } from "../lib/store/useCartStore";
import ProductReviewCard from "./ProductReviewCard";
import ProductReviewForm from "./ProductReviewForm";
import { useFavoritesStore } from "../lib/store/useFavoritesStore";
import {motion} from "framer-motion";
import { ProductReviewData } from "./ProductReviewData";
import { ProductReview } from "./ProductReview";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface Props {
    product: Product
}

enum InfoSection {
    Description,
    Reviews
}

interface ReviewData {
    totalReviews : number,
    fiveStarReviews: number,
    fourStarReviews: number,
    threeStarReviews: number,
    twoStarReviews: number,
    oneStarReviews: number,
    totalRating: number
}

function ProductPage(props : Props) {
    const [activeImageLink,setActiveImageLink] = useState<string>(props.product.images[0]);
    const [selectedSizeIndex,setSelectedSizeIndex] = useState(0);
    const [showReviewForm,setReviewFormStatus] = useState(false);
    const [productReviews,setProductReviews] = useState<ProductReview[]>([]);

    useEffect(() => {
        if (typeof(props.product._id) === 'string' && props.product._id.length > 0){
            const fetchProductReviews = async() => {
                const response = await fetch('/api/getProductReviews/' + props.product._id);
                const data = await response.json();
                console.log(data);
    
                if (Array.isArray(data.data)) {
                    const productReviews : ProductReview[] = data.data.map((item : ProductReview) => {
                        const review : ProductReview = {
                            _id: item._id,
                            reviewerName: item.reviewerName,
                            rating: item.rating,
                            reviewText: item.reviewText,
                            reviewLikes: item.reviewLikes,
                            reviewDislikes: item.reviewDislikes,
                            productId: item._id,
                            headingText: item.headingText
                        }
        
                        return review;
                    })
                    
                    setProductReviews(productReviews);
    
                    productReviews.forEach((item) => {
                    if (item.rating === 5){
                        reviewData.fiveStarReviews++;
                    }
                    else if (item.rating === 4){
                        reviewData.fourStarReviews++;
                    }
                    else if (item.rating === 3){
                        reviewData.threeStarReviews++;
                    }
                    else if (item.rating === 2){
                        reviewData.twoStarReviews++;
                    }
                    else if (item.rating === 1){
                        reviewData.oneStarReviews++;
                    }})
                }
            }    
    
            fetchProductReviews();
        } 
    },[props.product._id]);

    const productSizesInventory : ProductInventoryCategory[] = [];
    props.product.sizes.map((size,index) =>{
        if (props.product.inventoryCount[index] > 0)
            productSizesInventory.push({
                size: size,
                stock: props.product.inventoryCount[index]
            })    
    })

    const imageClicked = (imageLink : string) => {
        setActiveImageLink(imageLink);
    }

    const handleSizeSelect = (size : string) => {
        productSizesInventory.forEach((item,index) => {
            if (item.size === size) {
                setSelectedSizeIndex(index);
            }
        })
    }

    const [infoSection,setInfoSection] = useState<InfoSection>(InfoSection.Description);

    useEffect(() => {
        setActiveImageLink(props.product.images[0]);
    },[props.product.images.length]);


    const reviewData : ReviewData = {
        totalReviews: 0,
        fiveStarReviews: 0,
        fourStarReviews: 0,
        threeStarReviews: 0,
        twoStarReviews: 0,
        oneStarReviews: 0,
        totalRating: 0
    }

    const setDescriptionSectionInfo = () => {
        setInfoSection(InfoSection.Description);
    }

    const setReviewsSectionInfo = () => {
        setInfoSection(InfoSection.Reviews);
    }

    reviewData.totalRating = reviewData.fiveStarReviews + reviewData.fourStarReviews + reviewData.threeStarReviews 
    + reviewData.twoStarReviews + reviewData.oneStarReviews;
    reviewData.totalRating /= 5;

    const addProductToCart = useCartStore(state => state.addToCart);

    const addToFavorites = useFavoritesStore(state => state.addToFavorites);
    const removeFromFavorites = useFavoritesStore(state => state.removeFromFavorites);
    const isAddedToFavorites = useFavoritesStore(state => state.isAddedToFavorites);

    const[favoriteStatus,setFavoriteStatus] = useState(false);

    useEffect (() => {
        if (isAddedToFavorites(props.product._id)){
            setFavoriteStatus(true);
        }
    },[])

    const handleProductFavorite = () => {
        if (favoriteStatus === false)
        {
            addToFavorites(props.product);
            setFavoriteStatus(true);
        }
        else{
            removeFromFavorites(props.product);
            setFavoriteStatus(false);
        }
    }

    const onReviewFormBackButton = () => {
        setReviewFormStatus(false);
    }

    return (<div className={styles.container}>
        {props.product === undefined || props.product === null && <div className={styles.progressContainer}>
        <Box sx={{ margin: 'auto', display: 'flex', height: '100px', width : '100px' }}>
            <CircularProgress />
        </Box>
        </div>}
        <div className={styles.productInfo}>
            <div className={styles.imageSection}>
                <div className={styles.imagesContainer}>
                        {props.product.images.map((image) => (<div draggable={false} key={image} className={styles.smallImageParent}>
                            <img className={`${styles.smallImage} ${false && styles.smallImageSelected}`} onClick={() => imageClicked(image)} src={image}/>
                        </div>))}
                </div>
                <div className={styles.mainImageContainer}>
                    <img className={styles.mainImage} src={activeImageLink}/>
                </div>
            </div>
            <div className={styles.productDetails}>
                <div className={styles.productDetailHeader}>
                     <div className={styles.productHeadInfoContainer}>
                        <h2 className={styles.productName}>{props.product.name}</h2>
                        <p className={styles.productPrice}>${props.product.price}</p>
                     </div>
                     <div className={styles.productFavoriteButton} onClick={handleProductFavorite}>
                        <img src={favoriteStatus ? "/images/product/redHeart.svg" : "/images/product/emptyHeart.svg"}/>
                     </div>
                </div>
                <div className={styles.detailContainer}>
                    <p className={styles.infoText}>Select Color</p>
                    <div>
                        <div className={styles.colorMarker} style={{backgroundColor: `${props.product.color}`}}></div>
                    </div>
                </div>
                <div className={styles.detailContainer}>
                    <p className={styles.infoText}>Choose Size</p>
                    <div className={styles.sizesContainer}>
                        {productSizesInventory.map((item,index) => (
                            <motion.p key={item + 'asd'} whileTap={{scale: 1.5}} onClick={() => setSelectedSizeIndex(index)} className={`${styles.sizeTag} ${selectedSizeIndex === index && styles.selectedTag}`}>{item.size}</motion.p>                        ))}
                    </div>
                </div>
                <div className={styles.detailContainer}>
                    <p className={styles.infoText}>In Stock</p>
                    <div className={styles.detailContainerContent}>
                        <div className={styles.quantityContainer}>
                            {selectedSizeIndex < productSizesInventory.length && <p className={styles.stockCountText}>{productSizesInventory[selectedSizeIndex].stock}</p>}
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <motion.button whileHover={{scale: 1.1}} className={styles.shopButton} onClick={() => addProductToCart(props.product,productSizesInventory[selectedSizeIndex].size)} type='button'>
                        <img className={styles.cartBtnImage} src="/images/common/shopping cart.svg"/> Add to Cart</motion.button>
                    {/*<button className={styles.addToCartButton} type='button'>Add to Favorites</button>*/}
                </div>
            </div>
        </div>
        <div className={styles.productInfoSection}>
            <div className={styles.detailButtonContainer}>
                <button className={`${styles.detailSectionButton} ${infoSection === InfoSection.Description && styles.detailSectionButtonActive}`} onClick={setDescriptionSectionInfo} type='button'>PRODUCT DETAILS</button>
                <button className={`${styles.detailSectionButton} ${infoSection === InfoSection.Reviews && styles.detailSectionButtonActive}`} onClick={setReviewsSectionInfo} type='button'>REVIEWS</button>
            </div>
            {infoSection === InfoSection.Description &&
                <div className={styles.productDetailSection}>
                <div className={styles.detailSectionHalf}>
                    <div>
                        <h4 className={styles.descriptionHeading}>Product Description</h4>
                        <p>{props.product.description}</p>
                    </div>
                    <div>
                        <h4 className={styles.descriptionHeading}>Product Dimensions</h4>
                        <ul>
                            <li>Length | Regular</li>
                            <li>Pattern | Floral</li>
                            <li>Size | 38</li>
                            <li>Fit | Regular fit</li>
                            <li>Age group | Adult</li>
                            <li>Leg opening | Wide leg</li>
                            <li>Sleeve length | Long sleeve</li>
                            <li>Package contents | 1 pcs</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.detailSectionHalf}>
                    <div>
                        <h4 className={styles.descriptionHeading}>Composition</h4>
                        <ul>
                            <li>50% Cotton</li>
                            <li>50% Polyester</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={styles.descriptionHeading}>Instructions</h4>
                        <ul className={styles.instructionsList}>
                            <li className={styles.careInfoPoint}>
                                <p className={styles.washInfoText}>Machine wash at max. 30ºC/86ºF with short spin cycle</p>
                            </li>
                            <li className={styles.careInfoPoint}>
                            <p className={styles.washInfoText}>Iron at a maximum of 110ºC/230ºF</p>
                            </li>
                            <li className={styles.careInfoPoint}>
                            <p className={styles.washInfoText}>Do not dry clean</p>
                            </li>
                            <li className={styles.careInfoPoint}>
                            <p className={styles.washInfoText}>Do not tumble dry</p>
                            </li>
                            <li className={styles.careInfoPoint}>
                            <p className={styles.washInfoText}>Wash inside out</p>
                            </li>
                            <li className={styles.careInfoPoint}>
                            <p className={styles.washInfoText}>Wash separately</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>}
            {infoSection === InfoSection.Reviews && <div className={styles.reviewsSection}>
                    <div className={styles.reviewStatsContainer}>
                        <div className={styles.reviewMajorInfoContainer}>
                            <p>Total Reviews</p>
                            <p>{reviewData.totalRating}</p>
                            <button className={styles.writeReviewButton} onClick={() => {setReviewFormStatus(!showReviewForm)}}>Write a Review</button>
                        </div>
                        <div className={styles.reviewInfoContainer}>
                            <div className={styles.reviewRatingStat}>
                                <p>5 stars</p>
                                <div className={styles.ratingStatBar}></div>
                                <div>{reviewData.fiveStarReviews}</div>
                            </div>
                            <div className={styles.reviewRatingStat}>
                                <p>4 stars</p>
                                <div className={styles.ratingStatBar}></div>
                                <div>{reviewData.fourStarReviews}</div>
                            </div>
                            <div className={styles.reviewRatingStat}>
                                <p>3 stars</p>
                                <div className={styles.ratingStatBar}></div>
                                <div>{reviewData.threeStarReviews}</div>
                            </div>
                            <div className={styles.reviewRatingStat}>
                                <p>2 stars</p>
                                <div className={styles.ratingStatBar}></div>
                                <div>{reviewData.twoStarReviews}</div>
                            </div>
                            <div className={styles.reviewRatingStat}>
                                <p>1 stars</p>
                                <div className={styles.ratingStatBar}></div>
                                <div>{reviewData.oneStarReviews}</div>
                            </div>
                        </div>
                    </div>
                    {showReviewForm && <ProductReviewForm productId={props.product._id} onBackButton={onReviewFormBackButton}/>}
                    <div className={styles.reviewCardSection}>
                        <div className={styles.reviewCardsContainer}>
                            {productReviews?.map((review) => <ProductReviewCard key={review._id} reviewHeading={review.headingText}
                            reviewText={review.reviewText} reviewerName={review.reviewerName} likeCount={review.reviewLikes}
                            dislikeCount={review.reviewDislikes} rating={review.rating} reviewId={review._id}/>)}
                        </div>
                    </div>
            </div>}
        </div>
    </div>);
}

export default ProductPage;