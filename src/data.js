export const navLinks = [
  { id: 1, name: 'promotion', path: '/promotion' },
  {
    id: 2,
    name: 'products',
    path: '/products',
    subLinks: [
      { id: 1, name: 'clothes', path: '/products/clothes' },
      { id: 2, name: 'bags', path: '/products/bags' },
      { id: 3, name: 'accessories', path: '/products/accessories' },
    ],
  },
  { id: 3, name: 'checkout', path: '/checkout' },
  { id: 4, name: 'orders', path: '/orders' },
];
