export const ROUTES = {
  home: '/',
  shop: '/shop',
  product: (slug: string) => `/shop/${slug}`,
  productDetail: (slug: string) => `/shop/${slug}`,
  story: '/story',
  about: '/story',
  journal: '/journal',
  journalArticle: (slug: string) => `/journal/${slug}`,
  donate: '/donate',
  contact: '/contact',
  wishlist: '/wishlist',
} as const

export const NAV_LINKS = [
  { to: ROUTES.home, label: 'Home' },
  { to: ROUTES.shop, label: 'Shop Archive' },
  { to: ROUTES.story, label: 'Our Story' },
  { to: ROUTES.journal, label: 'Journal' },
  { to: ROUTES.donate, label: 'Donate & Circularity' },
  { to: ROUTES.contact, label: 'Atelier & Contact' },
] as const

export const CONTACT = {
  phone: '+91 9526597260',
  phoneHref: 'tel:+919526597260',
  email: 'prastharaventures@gmail.com',
  emailHref: 'mailto:prastharaventures@gmail.com',
  location: 'Kasaragod, Kerala, India',
  instagram: 'https://www.instagram.com/PRASTHARA_/',
  instagramHandle: '@PRASTHARA_',
  instagramLabel: 'Instagram',
  whatsappHref: 'https://wa.me/919526597260?text=Hello%20Prasthara%20team,%20I%20would%20like%20to%20inquire%20about%20your%20textile%20pieces',
} as const

export const BRAND_STATS = [
  { value: '100%', label: 'Zero Virgin Polyester', sub: 'Pure natural fibers only' },
  { value: '18,500 L', label: 'Freshwater Conserved', sub: 'Prevented via circular curation' },
  { value: '420 kg', label: 'Textile Scraps Rescued', sub: 'Diverted from cutting rooms' },
  { value: '1-of-1', label: 'Unique Architecture', sub: 'Every piece has a distinct story' },
] as const

export const MESSAGES = {
  brandTagline: 'Giving Textiles a Second Life',
  brandSupport:
    'A contemporary Indian textile atelier reimagining pre-loved garments and cutting-room remnants into enduring everyday heirlooms.',
  cartEmpty: 'Your textile bag is empty. Discover an intentional piece with a living story.',
  checkoutSoon: 'Simulate Secure Checkout',
  addedToCart: 'Added to your textile bag',
  contactSent: 'Thank you for reaching out — our Kerala studio will reply within 24 hours.',
  formError: 'Please complete all required fields.',
  donationSent: 'Thank you for pledging your textiles! We will connect for pickup logistics.',
} as const

export const CART_STORAGE_KEY = 'prasthara-cart'
export const FREE_SHIPPING_THRESHOLD = 1499
export const FLAT_SHIPPING_FEE = 99
export const PINCODE_STORAGE_KEY = 'prasthara-user-pincode'

