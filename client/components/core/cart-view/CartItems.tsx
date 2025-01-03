import Counter from "@/components/core/cart-view/Counter";
import Image from "next/image";
import noImage from '../../../assets/images/noImage.jpg'


export type CartWrapperProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

const CartItem = ({ item }: { item: any }) => (
  <li className="flex justify-between items-center mb-4 mt-8">
    <div className="flex items-center gap-4">
      <Image
        src={item.productId.image || noImage}
        width={80}
        height={80}
        alt={item.productId.title || 'Product Image'}
        className="rounded-lg"
      />
      <div>
        <h1 className="h3">{item.productId.title}</h1>
        <Counter />
      </div>
    </div>
    <div>${item.productId.salePrice.toFixed(2)}</div>
  </li>
);

export default CartItem;