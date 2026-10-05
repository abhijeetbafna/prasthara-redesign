import type { JournalArticle } from '../types/product'

export const mockJournalArticles: JournalArticle[] = [
  {
    id: 'j-1',
    slug: 'anatomy-of-a-tailor-offcut',
    title: 'The Anatomy of an Offcut: Why Cutting Room Floors Hold the Future of Fashion',
    subtitle: 'Inside the Kasaragod studio turning 2-inch fabric discards into heirloom craft.',
    date: 'March 28, 2026',
    readTime: '5 min read',
    category: 'Circular Living',
    coverImage:
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85',
    excerpt:
      'In traditional bespoke tailoring, up to 18% of premium fabric is trimmed away as scrap. We map how mosaic piecing transforms industrial surplus into wearable poetry.',
    content: [
      'Walk into any traditional tailor shop across Kerala or Maharashtra, and you will find wicker baskets brimming with discarded selvedges, pocket cutouts, and bias trims. For generations, these remnants were treated as unavoidable industrial waste.',
      'At Prasthara, we view these textile remnants through an architectural lens. Each small scrap holds the original weaver’s energy, the farmer’s harvest, and the dye vat’s minerals. When pieced together with reinforced double-needle topstitching, these varying weaves form a tactile mosaic stronger than virgin single-ply yardage.',
      'Our patchwork aprons and utility totes are not just sustainable exercises — they are living archives of regional cottons, linen slubs, and heritage stripes existing in harmonious new utility.',
    ],
    author: {
      name: 'Ananya Nambiar',
      role: 'Atelier Design Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'j-2',
    slug: 'indigo-alchemy-and-longevity',
    title: 'Living Blues: The Ancient Alchemy and Emotional Longevity of Indigo',
    subtitle: 'Why naturally dyed textiles age with grace and grow more beautiful with every decade.',
    date: 'February 14, 2026',
    readTime: '6 min read',
    category: 'Craft & Weave',
    coverImage:
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=85',
    excerpt:
      'Unlike synthetic chemical dyes that fade into dull greys, natural fermented indigo oxidizes into rich celestial gradations, recording the life of the wearer.',
    content: [
      'Indigofera tinctoria is not a surface paint; it is an organic fermentation that breathes with atmospheric air. When a garment dyed in living indigo is exposed to sunlight, sweat, and gentle ocean breezes, the outer dye molecules gently yield while the core stays deeply saturated.',
      'This gentle wabi-sabi abrasion gives pre-loved indigo garments an unmistakable soul that fast-fashion distressing can never replicate. When we rescue an indigo khadi shirt or denim chore jacket, we celebrate every patina mark as an honorable timestamp.',
      'Caring for these pieces requires minimal intervention: cold spring water, pH-neutral soapberry cleansers, and the shade of a courtyard tree.',
    ],
    author: {
      name: 'Devraj Menon',
      role: 'Textile Conservator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 'j-3',
    slug: 'handloom-vs-landfill',
    title: 'Slow Weaves in a Fast World: Honoring the Pitloom in Modern Wardrobes',
    subtitle: 'How intentional thrifting preserves months of artisanal patience.',
    date: 'January 19, 2026',
    readTime: '4 min read',
    category: 'Artisan Voices',
    coverImage:
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1200&q=85',
    excerpt:
      'A single handloom stole can take up to 40 hours of manual shuttle work. Why circularity is the most sincere tribute to artisan heritage.',
    content: [
      'When an artisanal handloom piece is discarded after only three wears, we do not simply discard cloth — we discard forty hours of rhythmic shuttle work, generations of indigenous pattern knowledge, and pure natural raw silk fibers.',
      'Our mission at Prasthara is to build a circular infrastructure that keeps these exquisite textiles in circulation for forty years rather than forty days. By restoring hems, gently conditioning wild tussar silk, and offering transparent provenance, we invite collectors into a reverent dialogue with Indian craft.',
    ],
    author: {
      name: 'Pooja Hegde',
      role: 'Community & Craft Lead',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
  },
]
