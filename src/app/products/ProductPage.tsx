import { useContext, useRef, useState } from "react";
import { Product } from "../utils/Product";
import styles from "./ProductPage.module.css";
import { useDraggable } from "react-use-draggable-scroll";
import { useCartStore } from "../lib/store/useCartStore";

interface Props {
    product: Product
}


function ProductPage(props : Props) : JSX.Element {
    const [activeImageLink,setActiveImageLink] = useState(props.product.images[0]);
    const imageClicked = (imageLink : string) => {
        setActiveImageLink(imageLink);
    }

    const addProductToCart = useCartStore(state => state.addToCart);
    const removeProductFromCart = useCartStore(state => state.removeFromCart);
      // We will use React useRef hook to reference the wrapping div:
    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true
    }); // Now we pass the reference to the useDraggable hook:


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
                <h2 className={styles.productName}>{props.product.name}</h2>
                <p className={styles.productPrice}>${props.product.price}</p>
                <div>
                    <p className={styles.infoText}>Size</p>
                    <div>
                        
                    </div>
                </div>
                <div>
                    <p className={styles.infoText}>Color</p>
                    <div>

                    </div>
                </div>
                <div>
                    <p className={styles.infoText}>Shipping</p>
                    <div>

                    </div>
                </div>
                <div>
                    <p className={styles.infoText}>Quantity</p>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
                <div>
                    <p>${props.product.price}</p>
                    <div>
                        <div>

                        </div>
                        <p>Add shipping insurance for $9( declared value  only if the package gets lost, stolen or damaged.)</p>
                    </div>
                </div>
                <div>
                    <button type='button'>Shop Now</button>
                    <button onClick={() => addProductToCart(props.product)} type='button'>Add to Cart</button>
                </div>
            </div>
        </div>
        <div className={styles.productInfoSection}>
            <div className={styles.buttonContainer}>
                <button className={styles.detailSectionButton} type='button'>PRODUCT DETAILS</button>
                <button className={styles.detailSectionButton} type='button'>REVIEWS</button>
                <button className={styles.detailSectionButton} type='button'>SHIPPING & PAYMENT</button>
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
            </div>
        </div>
    </div>);
}

export default ProductPage;