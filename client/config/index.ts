import { Path } from "react-hook-form";

// Define a generic option type for select dropdowns
type OptionType<T = string> = {
  id: T;
  label: string;
};

// Define form control properties
export type FormControlProps<T> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  componentType: 'input' | 'textarea' | 'select';
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  options?: OptionType[];
};

// Sidebar menu items
// type MenuItem<T = string> = {
//   id: T;
//   label: string;
//   icon?: string;
//   path: string;
//   children?: MenuItem[];
// };

// Define type for initial form data
export type AddProductType = {
  image: null | File,
  title: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  salePrice: string;
  totalStock: string;
};

export type RegisterType = {
  userName: string;
  email: string;
  password: string;
}

export const registerFormControls: FormControlProps<RegisterType>[] = [
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Enter your user name',
    componentType: 'input',
    type: 'text'
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    componentType: 'input',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    componentType: 'input',
    type: 'password'
  }
]

export type LoginType = {
  email: string;
  password: string;
}

export const loginFromControls: FormControlProps<LoginType>[] = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    componentType: 'input',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    componentType: 'input',
    type: 'password'
  }
]

export type AdminSidebarMenuItems = {
  id: string,
  label: string,
  icon: string,
  path: string,
  children: AdminSidebarMenuItems[]
}

export const adminSidebarMenuItems: AdminSidebarMenuItems[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: 'MdOutlineDashboard',
    children: []
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: 'SlBasket',
    children: []
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: 'LuBadgeCheck',
    children: []
  }
]

export const addProductFormElements: FormControlProps<Omit<AddProductType, 'image'>>[] = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    placeholder: "Enter category",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    placeholder: "Enter brand",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
]
