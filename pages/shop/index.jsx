import { GET_ALL_PRODUCTS } from "../../apollo/queries/products";
import { useState, useEffect, useRef, useContext } from "react";
import ProductCard from "../../components/shop/ProductCard.component";
import FilterBar from "../../components/shop/FilterBar.component";
import { ParamsContext } from "../../context/params.context";
import { FilterContext } from "../../context/filterbar.context";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { Form } from "react-bootstrap";

export default function Shop({
  data: {
    productCollection: { total, items: products },
  },
  loading,
}) {
  const [allProducts, setAllProducts] = useState(products);
  const isInitialMount = useRef(true);

  const { state } = useContext(ParamsContext);
  const {
    state: { opened },
    dispatch: filterDispatch,
  } = useContext(FilterContext);
  const router = useRouter();
  useEffect(() => {
    setAllProducts(products);
  }, [products, state.limit]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      router.push(
        `/shop?${state.material ? "&material=" + state.material : ""}${
          state.finish ? "&finish=" + state.finish : ""
        }${state.soldByThe ? "&soldByThe=" + state.soldByThe : ""}${
          state.limit ? "&limit=" + state.limit : ""
        }${!state.frostProof ? "&frostProof=" + state.frostProof : ""}${
          state.order ? "&order=" + state.order : ""
        }`
      );
    }
  }, [state, state.frostProof, state.limit]);

  return (
    <>
      <NextSeo
        title="shop"
        openGraph={{
          url: `https://flamboyant-mcclintock-010ddc.netlify.app${router.asPath}`,
          title: "Surface Group - Shop",
          locale: "en_US",
          images: [
            {
              url:
                "https://cdn.shopify.com/s/files/1/0265/0039/9213/files/logo-w-bordere.png?v=1613663816",
              width: 400,
              height: 400,
              alt: "product-image",
            },
          ],
        }}
      />
      <div className="container-fluid">
               {" "}	
        <Form>	
          <Form.Check	
            onChange={() => {	
              filterDispatch({	
                type: "TOGGLE_OPEN",	
                payload: !opened,	
              });	
            }}	
            checked={opened}	
            type="switch"	
            id="custom-switch"	
            label={opened ? "hide filter bar" : "show filter bar"}	
          />	
        </Form>
      </div>
      <div className="d-flex border-top">
        <div>
          <FilterBar
            total={total}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
          />
        </div>
        <div className="grid-container">
          {loading ? (
            <div>...loading</div>
          ) : allProducts.length === 0 ? (
            <div className="container-center">no results found.</div>
          ) : (
            allProducts.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

Shop.getInitialProps = async (ctx) => {
  const {
    apolloClient,
    query: {
      limit,
      material,
      tags_contains_some,
      soldByThe,
      frostProof,
      frostProof_not,
      order,
      finish,
    },
  } = ctx;
  const { data, loading, error } = await apolloClient.query({
    query: GET_ALL_PRODUCTS,
    variables: {
      limit: parseInt(limit),
      material: material,
      soldByThe: soldByThe,
      tags_contains_some: tags_contains_some,
      frostProof: Boolean(frostProof),
      frostProof_not: Boolean(frostProof_not),
      order: order,
      finish: finish,
    },
  });

  return {
    data,
    loading,
    error,
  };
};
