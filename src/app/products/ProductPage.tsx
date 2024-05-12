import { useContext, useEffect, useRef, useState } from "react";
import { Product } from "../utils/Product";
import styles from "./ProductPage.module.css";
import { useDraggable } from "react-use-draggable-scroll";
import { useCartStore } from "../lib/store/useCartStore";
import QuantityManagingCard from "./QuantityManagingCard";

interface Props {
    product: Product
}

function ProductPage(props : Props) {
    const [activeImageLink,setActiveImageLink] = useState(props.product.images[0]);
    const imageClicked = (imageLink : string) => {
        setActiveImageLink(imageLink);
    }

    const addProductToCart = useCartStore(state => state.addToCart);
    const removeProductFromCart = useCartStore(state => state.removeFromCart);
      // We will use React useRef hook to reference the wrapping div:
    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: false
    }); // Now we pass the reference to the useDraggable hook:

    useEffect(() => {
        console.log(activeImageLink);
        const setMainImage = () => {
            setActiveImageLink(props.product.images[0]);
        }

        setTimeout(setMainImage,10000);
    },[])

    return (<div className={styles.container}>
        <div className={styles.linkHierarchyContainer}>

        </div>
        <div className={styles.productInfo}>
            <div className={styles.imageSection}>
                <div className={styles.imagesContainer} {...events} ref={ref}>
                        {props.product.images.map((image) => (<div draggable={false} className={styles.smallImageParent}>
                            <img className={styles.smallImage} onClick={imageClicked.bind(null,image)} src={image}/>
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
                     <div className={styles.productFavoriteButton}>
                        <img src="/images/product/emptyHeart.svg"/>
                     </div>
                </div>
                <div className={styles.detailContainer}>
                    <p className={styles.infoText}>Size</p>
                    <div className={styles.sizesContainer}>
                        {props.product.sizes.map((item) => (
                            <p className={styles.sizeTag}>{item}</p>
                        ))}
                    </div>
                </div>
                <div className={styles.detailContainer}>
                    <p className={styles.infoText}>Color</p>
                    <div>
                        {<div className={styles.colorMarker} style={{backgroundColor: `${props.product.color}`}}></div>}
                    </div>
                </div>
                <div className={styles.detailContainer}>
                    <p className={styles.infoText}>Quantity</p>
                    <div className={styles.detailContainerContent}>
                        <div className={styles.quantityContainer}>
                            <QuantityManagingCard quantity={1} setQuantity={function (quantity: number): void {} }/>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.shopButton} type='button'>Shop Now</button>
                    <button className={styles.addToCartButton} onClick={() => addProductToCart(props.product)} type='button'>
                        <img className={styles.cartBtnImage} src="/images/product/tocart.svg"/> Add to Cart</button>
                </div>
            </div>
        </div>
        <div className={styles.productInfoSection}>
            <div className={styles.detailButtonContainer}>
                <button className={styles.detailSectionButton} type='button'>PRODUCT DETAILS</button>
                <button className={styles.detailSectionButton} type='button'>REVIEWS</button>
            </div>
            <div>
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
                        <h4 className={styles.descriptionHeading}>Composition</h4>
                        <div>
                            <div className={styles.careInfoPoint}>
                                <div>
                                    <img src="/laundryIcon.svg"/>
                                </div>
                                <p>Machine wash at max. 30ºC/86ºF with short spin cycle</p>
                            </div>
                            <div className={styles.careInfoPoint}>
                            <div>
                                <img src="/laundryIcon.svg"/>
                            </div>
                            <p>Iron at a maximum of 110ºC/230ºF</p>
                        </div>
                        <div className={styles.careInfoPoint}>
                            <div>
                                <img src="/laundryIcon.svg"/>
                            </div>
                            <p>Do not dry clean</p>
                        </div>
                        <div className={styles.careInfoPoint}>
                            <div>
                                <img src="/laundryIcon.svg"/>
                            </div>
                            <p>Do not tumble dry</p>
                        </div>
                        <div className={styles.careInfoPoint}>
                            <div>
                                <img src="/laundryIcon.svg"/>
                            </div>
                            <p>Wash inside out</p>
                        </div>
                        <div className={styles.careInfoPoint}>
                            <div>
                                <img src="/laundryIcon.svg"/>
                            </div>
                            <p>Wash separately</p>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
                <div>
                    <div>
                        <div>
                            <p>Total Reviews</p>
                            <p>{props.product.reviews?.length}</p>
                            {}
                        </div>
                        <div>
                            <div>
                                <p>5 stars</p>
                                <div></div>
                            </div>
                            <div>
                                <p>4 stars</p>
                                <div></div>
                            </div>
                            <div>
                                <p>3 stars</p>
                                <div></div>
                            </div>
                            <div>
                                <p>2 stars</p>
                                <div></div>
                            </div>
                            <div>
                                <p>1 stars</p>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default ProductPage;