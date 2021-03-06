import gql from "graphql-tag";

export const GET_ALL_PRODUCTS = gql`
  query Products($limit: Int, $material: String, $finish: String, $tags_contains_some: [String], $soldByThe: String, $frostProof: Boolean, $frostProof_not: Boolean, $order: [ProductOrder] ) {
  productCollection(limit: $limit, where: { material: $material, finish: $finish, tags_contains_some: $tags_contains_some, soldByThe: $soldByThe, OR: [{frostProof: $frostProof}, {frostProof_not: $frostProof_not}]}, order: $order) {
    total
    items {
     	name
      productImage
      price
      length
      frostProof
      material
      width
      thickness
      piecesPerBox
      squareFootPerPiece
      squareFootPerBox
      soldByThe
      sys {
        id
      }
    }
  }
}
`;
