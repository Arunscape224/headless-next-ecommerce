import Link from "next/link";
import Image from "next/image";
import { showSFPricing } from "../helper";
const ProductCard = ({ product, i }) => {
  return (
    <Link key={i} href={`/shop/${product.sys.id}`}>
      <div
        className="card grid-item"
        style={{
          boxShasdow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Image
          src={product.productImage[0].public_id}
          alt={product.name}
          layout="responsive"
          width={200}
          height={200}
        />
        <span
          className="mt-2"
          style={{ fontSize: "0.9rem", lineHeight: "1em" }}
        >
          {product.name}
        </span>
        <span className="mt-2 text-muted" style={{ fontSize: "0.8rem" }}>
          ${showSFPricing(product)} / sf
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
