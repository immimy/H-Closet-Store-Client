export const navLinks = [
  { id: 1, name: 'promotion', path: '/promotion' },
  {
    id: 2,
    name: 'products',
    path: '/products',
    subLinks: [
      { id: 1, name: 'clothes', path: '/products?category=clothes' },
      { id: 2, name: 'bag', path: '/products?category=bag' },
      { id: 3, name: 'accessory', path: '/products?category=accessory' },
    ],
  },
  { id: 3, name: 'checkout', path: '/checkout' },
  { id: 4, name: 'orders', path: '/orders' },
];
