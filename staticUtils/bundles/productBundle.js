export default `
query productBundle($productId: ID, $shopId: ID!, $bundleId: ID){
	productBundle(productId: $productId, shopId: $shopId, bundleId: $bundleId){
    _id
    name
    limit
    subtitle
    description
    items{
      _id
      title
    }
    variantId
    productId
    product{
      ...Product
    }
      items{
        ...Product
      }
    shop{
      _id
      name
    }
  }
}
fragment Product on Product {
    _id
    currentProductHash
    description
    isDeleted
    isVisible
    metaDescription
    metafields {
      key
      value
    }
    originCountry
    pageTitle
    productType
    publishedAt
    publishedProductHash
    shop {
      _id
    }
    primaryImage {
      URLs {
        large
        medium
        original
        small
        thumbnail
      }
      priority
      productId
      variantId
    }
    media {
      priority
      productId
      variantId
      URLs {
        thumbnail
        small
        medium
        large
        original
      }
    }
    slug
    socialMetadata {
      message
      service
    }
    supportedFulfillmentTypes
    tagIds
    tags {
      nodes {
        _id
        name
      }
    }
    title
    updatedAt
    vendor
    variants {
      ...ProductVariant
      options {
        ...ProductVariant
      }
    }
  }
  fragment ProductVariant on ProductVariant {
    _id
    attributeLabel
    barcode
    height
    index
    odooProduct
    isDeleted
    isVisible
    length
    metafields {
      key
      value
    }
    minOrderQuantity
    optionTitle
    media {
      _id
      URLs {
        original
        small
      }
      priority
    }
    originCountry
    pricing {
      compareAtPrice {
        amount
      }
      displayPrice
      price
    }
    shop {
      _id
    }
    sku
    title
    updatedAt
    weight
    width
    isTaxable
    taxCode
    taxDescription
  }
`;