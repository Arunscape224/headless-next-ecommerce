import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function VariantSelect({
  product,
  options,
  selected,
  setSelected,
}) {
  const router = useRouter();
  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    router.push(selected);
  }, [selected]);

  return (
    <div className="form-group h-100 w-50">
      <label className="text-muted">options:</label>
      <select
        onChange={handleChange}
        className="form-control"
        value={router.query.id}
        id="exampleFormControlSelect1"
      >
        <option value={router.query.id} disabled>
          {product.name}
        </option>
        {options.map((item) => (
          <option key={item.sys.id} value={item.sys.id}>
            {item.fields.name}
          </option>
        ))}
      </select>
    </div>
  );
}
