import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CustomProductCard from "components/CustomProductCard";
const styles = (theme) => ({
    root:{
        width:'100%',
        paddingTop:theme.spacing(2)
    },
    title:theme.typography.title1,
    productList:{
        display:'grid',
        gap:'15px',
        gridAutoFlow:'column',
        overflowX:'scroll',
        // scrollbarWidth:'none',
        justifyContent:'flex-start',
        gridAutoColumns:'minmax(180px,180px)'
    }
});
const products = [
    {
        "_id": "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6TGNrM2lmcWk4eXNncVE4dXI=",
              "title": "6 mini full choco",
              "productId": "cmVhY3Rpb24vcHJvZHVjdDpMY2szaWZxaTh5c2dxUTh1cg==",
              "slug": "6-mini-full-choco",
              "description": "Deliciosas galletas de chocolate",
              "vendor": null,
              "isLowQuantity": false,
              "isSoldOut": false,
              "isBackorder": false,
              "tagIds": [
                "cmVhY3Rpb24vdGFnOmFDQVg0dU40cFFKRjh2TE5U"
              ],
              "metafields": null,
              "shop": {
                "currency": {
                  "code": "USD"
                }
              },
              "pricing": [
                {
                  "compareAtPrice": null,
                  "currency": {
                    "code": "USD"
                  },
                  "displayPrice": "$15.00",
                  "minPrice": 15,
                  "maxPrice": 15
                }
              ],
              "primaryImage": {
                "URLs": {
                  "thumbnail": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/thumbnail/6 mini full choco.png",
                  "small": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/small/6 mini full choco.png",
                  "medium": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/medium/6 mini full choco.jpg",
                  "large": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/large/6 mini full choco.jpg"
                }
              }
    },{
        "_id": "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6TGNrM2lmcWk4eXNncVE4dXI=",
              "title": "6 mini full choco",
              "productId": "cmVhY3Rpb24vcHJvZHVjdDpMY2szaWZxaTh5c2dxUTh1cg==",
              "slug": "6-mini-full-choco",
              "description": "Deliciosas galletas de chocolate",
              "vendor": null,
              "isLowQuantity": false,
              "isSoldOut": false,
              "isBackorder": false,
              "tagIds": [
                "cmVhY3Rpb24vdGFnOmFDQVg0dU40cFFKRjh2TE5U"
              ],
              "metafields": null,
              "shop": {
                "currency": {
                  "code": "USD"
                }
              },
              "pricing": [
                {
                  "compareAtPrice": null,
                  "currency": {
                    "code": "USD"
                  },
                  "displayPrice": "$15.00",
                  "minPrice": 15,
                  "maxPrice": 15
                }
              ],
              "primaryImage": {
                "URLs": {
                  "thumbnail": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/thumbnail/6 mini full choco.png",
                  "small": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/small/6 mini full choco.png",
                  "medium": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/medium/6 mini full choco.jpg",
                  "large": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/large/6 mini full choco.jpg"
                }
              }
    },{
        "_id": "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6TGNrM2lmcWk4eXNncVE4dXI=",
              "title": "6 mini full choco",
              "productId": "cmVhY3Rpb24vcHJvZHVjdDpMY2szaWZxaTh5c2dxUTh1cg==",
              "slug": "6-mini-full-choco",
              "description": "Deliciosas galletas de chocolate",
              "vendor": null,
              "isLowQuantity": false,
              "isSoldOut": false,
              "isBackorder": false,
              "tagIds": [
                "cmVhY3Rpb24vdGFnOmFDQVg0dU40cFFKRjh2TE5U"
              ],
              "metafields": null,
              "shop": {
                "currency": {
                  "code": "USD"
                }
              },
              "pricing": [
                {
                  "compareAtPrice": null,
                  "currency": {
                    "code": "USD"
                  },
                  "displayPrice": "$15.00",
                  "minPrice": 15,
                  "maxPrice": 15
                }
              ],
              "primaryImage": {
                "URLs": {
                  "thumbnail": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/thumbnail/6 mini full choco.png",
                  "small": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/small/6 mini full choco.png",
                  "medium": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/medium/6 mini full choco.jpg",
                  "large": "http://localhost:3000/assets/files/Media/zwkZ2EQwpmbhvRDdt/large/6 mini full choco.jpg"
                }
              }
    },{
      "_id": "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6WDRaaFNEdXBYWUVDZGprV0I=",
      "title": "Empanada Dip Alcachofa",
      "productId": "cmVhY3Rpb24vcHJvZHVjdDpYNFpoU0R1cFhZRUNkamtXQg==",
      "slug": "empanada-dip-alcachofa",
      "description": "Empanada de alcachofas y espinaca acompañada de Spicy Ranch",
      "vendor": null,
      "isLowQuantity": false,
      "isSoldOut": false,
      "isBackorder": false,
      "tagIds": [
        "cmVhY3Rpb24vdGFnOjc1R0ZtQWdTZHlGdkFzV2t5"
      ],
      "metafields": null,
      "shop": {
        "currency": {
          "code": "USD"
        }
      },
      "pricing": [
        {
          "compareAtPrice": null,
          "currency": {
            "code": "USD"
          },
          "displayPrice": "$25.00",
          "minPrice": 25,
          "maxPrice": 25
        }
      ],
      "primaryImage": {
        "URLs": {
          "thumbnail": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/thumbnail/Empanada dip alcachofa 1.png",
          "small": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/small/Empanada dip alcachofa 1.png",
          "medium": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/medium/Empanada dip alcachofa 1.jpg",
          "large": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/large/Empanada dip alcachofa 1.jpg"
        }
      }
    },{
      "_id": "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6WDRaaFNEdXBYWUVDZGprV0I=",
      "title": "Empanada Dip Alcachofa",
      "productId": "cmVhY3Rpb24vcHJvZHVjdDpYNFpoU0R1cFhZRUNkamtXQg==",
      "slug": "empanada-dip-alcachofa",
      "description": "Empanada de alcachofas y espinaca acompañada de Spicy Ranch",
      "vendor": null,
      "isLowQuantity": false,
      "isSoldOut": false,
      "isBackorder": false,
      "tagIds": [
        "cmVhY3Rpb24vdGFnOjc1R0ZtQWdTZHlGdkFzV2t5"
      ],
      "metafields": null,
      "shop": {
        "currency": {
          "code": "USD"
        }
      },
      "pricing": [
        {
          "compareAtPrice": null,
          "currency": {
            "code": "USD"
          },
          "displayPrice": "$25.00",
          "minPrice": 25,
          "maxPrice": 25
        }
      ],
      "primaryImage": {
        "URLs": {
          "thumbnail": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/thumbnail/Empanada dip alcachofa 1.png",
          "small": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/small/Empanada dip alcachofa 1.png",
          "medium": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/medium/Empanada dip alcachofa 1.jpg",
          "large": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/large/Empanada dip alcachofa 1.jpg"
        }
      }
    },{
      "_id": "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6WDRaaFNEdXBYWUVDZGprV0I=",
      "title": "Empanada Dip Alcachofa",
      "productId": "cmVhY3Rpb24vcHJvZHVjdDpYNFpoU0R1cFhZRUNkamtXQg==",
      "slug": "empanada-dip-alcachofa",
      "description": "Empanada de alcachofas y espinaca acompañada de Spicy Ranch",
      "vendor": null,
      "isLowQuantity": false,
      "isSoldOut": false,
      "isBackorder": false,
      "tagIds": [
        "cmVhY3Rpb24vdGFnOjc1R0ZtQWdTZHlGdkFzV2t5"
      ],
      "metafields": null,
      "shop": {
        "currency": {
          "code": "USD"
        }
      },
      "pricing": [
        {
          "compareAtPrice": null,
          "currency": {
            "code": "USD"
          },
          "displayPrice": "$25.00",
          "minPrice": 25,
          "maxPrice": 25
        }
      ],
      "primaryImage": {
        "URLs": {
          "thumbnail": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/thumbnail/Empanada dip alcachofa 1.png",
          "small": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/small/Empanada dip alcachofa 1.png",
          "medium": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/medium/Empanada dip alcachofa 1.jpg",
          "large": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/large/Empanada dip alcachofa 1.jpg"
        }
      }
    },{
      "_id": "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6WDRaaFNEdXBYWUVDZGprV0I=",
      "title": "Empanada Dip Alcachofa",
      "productId": "cmVhY3Rpb24vcHJvZHVjdDpYNFpoU0R1cFhZRUNkamtXQg==",
      "slug": "empanada-dip-alcachofa",
      "description": "Empanada de alcachofas y espinaca acompañada de Spicy Ranch",
      "vendor": null,
      "isLowQuantity": false,
      "isSoldOut": false,
      "isBackorder": false,
      "tagIds": [
        "cmVhY3Rpb24vdGFnOjc1R0ZtQWdTZHlGdkFzV2t5"
      ],
      "metafields": null,
      "shop": {
        "currency": {
          "code": "USD"
        }
      },
      "pricing": [
        {
          "compareAtPrice": null,
          "currency": {
            "code": "USD"
          },
          "displayPrice": "$25.00",
          "minPrice": 25,
          "maxPrice": 25
        }
      ],
      "primaryImage": {
        "URLs": {
          "thumbnail": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/thumbnail/Empanada dip alcachofa 1.png",
          "small": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/small/Empanada dip alcachofa 1.png",
          "medium": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/medium/Empanada dip alcachofa 1.jpg",
          "large": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/large/Empanada dip alcachofa 1.jpg"
        }
      }
    },{
      "_id": "cmVhY3Rpb24vY2F0YWxvZ1Byb2R1Y3Q6WDRaaFNEdXBYWUVDZGprV0I=",
      "title": "Empanada Dip Alcachofa",
      "productId": "cmVhY3Rpb24vcHJvZHVjdDpYNFpoU0R1cFhZRUNkamtXQg==",
      "slug": "empanada-dip-alcachofa",
      "description": "Empanada de alcachofas y espinaca acompañada de Spicy Ranch",
      "vendor": null,
      "isLowQuantity": false,
      "isSoldOut": false,
      "isBackorder": false,
      "tagIds": [
        "cmVhY3Rpb24vdGFnOjc1R0ZtQWdTZHlGdkFzV2t5"
      ],
      "metafields": null,
      "shop": {
        "currency": {
          "code": "USD"
        }
      },
      "pricing": [
        {
          "compareAtPrice": null,
          "currency": {
            "code": "USD"
          },
          "displayPrice": "$25.00",
          "minPrice": 25,
          "maxPrice": 25
        }
      ],
      "primaryImage": {
        "URLs": {
          "thumbnail": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/thumbnail/Empanada dip alcachofa 1.png",
          "small": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/small/Empanada dip alcachofa 1.png",
          "medium": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/medium/Empanada dip alcachofa 1.jpg",
          "large": "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/large/Empanada dip alcachofa 1.jpg"
        }
      }
    }
]
const RelatedProducts = props => {
    const {classes} = props;
    return(
       <React.Fragment>
        <div className={classes.root}>
            <div className={classes.title}>{"Productos Relacionados"}</div>
            <br></br>
            <div className={classes.productList}>
                {products.map((product)=>< CustomProductCard product={product}/>)}
            </div>
            {/* <DesktopVerticalScroll {...props}/> */}
        </div>
       </React.Fragment>
    );
}
export default withStyles(styles)(RelatedProducts);