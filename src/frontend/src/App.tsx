import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  ChevronRight,
  Clock,
  Gift,
  GraduationCap,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Pencil,
  Phone,
  Shield,
  ShoppingBag,
  Smile,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import type { GalleryItem, ProductCategory, Review, ShopInfo } from "./backend";
import { useActor } from "./hooks/useActor";

/* ─── Constants / Fallbacks ─────────────────────────────────────── */

const FALLBACK_SHOP: ShopInfo = {
  name: "Hari Om Stationary Store",
  tagline:
    "Your one-stop shop for stationery, toys, gifts, and school supplies",
  address: "Sachiyay, Vadodara, Gujarat - 390019",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  timings: "Mon–Sat: 9:00 AM – 8:30 PM | Sun: 10:00 AM – 6:00 PM",
};

const FALLBACK_CATEGORIES: ProductCategory[] = [
  {
    name: "School Supplies",
    description:
      "Everything students need for school — geometry boxes, bags, and more.",
    exampleItems: [
      "Geometry Box",
      "School Bag",
      "Ruler",
      "Eraser",
      "Sharpener",
    ],
  },
  {
    name: "Notebooks & Books",
    description:
      "Wide range of notebooks, registers, and exercise books for all grades.",
    exampleItems: [
      "Ruled Notebooks",
      "Graph Books",
      "Drawing Books",
      "Registers",
    ],
  },
  {
    name: "Pens & Stationery",
    description:
      "Premium pens, pencils, and everyday stationery at great prices.",
    exampleItems: [
      "Ball Pens",
      "Gel Pens",
      "Pencils",
      "Markers",
      "Highlighters",
    ],
  },
  {
    name: "Toys",
    description: "Fun and educational toys for kids of all ages.",
    exampleItems: [
      "Toy Cars",
      "Dolls",
      "Board Games",
      "Puzzles",
      "Action Figures",
    ],
  },
  {
    name: "Gifts & Novelty Items",
    description: "Unique gifts and novelty items for every occasion.",
    exampleItems: [
      "Gift Wrap",
      "Greeting Cards",
      "Diaries",
      "Keychains",
      "Frames",
    ],
  },
  {
    name: "Art & Craft Supplies",
    description: "Quality art materials for students and creative enthusiasts.",
    exampleItems: [
      "Watercolors",
      "Sketch Pens",
      "Craft Paper",
      "Brushes",
      "Origami Sets",
    ],
  },
];

const FALLBACK_REVIEWS: Review[] = [
  {
    reviewerName: "Priya Sharma",
    rating: 5,
    reviewText:
      "Excellent shop! Very friendly staff and great variety of stationery. My kids love getting supplies from here.",
    date: "2 months ago",
  },
  {
    reviewerName: "Rahul Patel",
    rating: 4,
    reviewText:
      "Good collection of notebooks and pens at reasonable prices. Conveniently located in Sachiyay.",
    date: "3 months ago",
  },
  {
    reviewerName: "Meena Desai",
    rating: 5,
    reviewText:
      "Best stationery shop in the area! They have everything — from school supplies to gifts. Highly recommend.",
    date: "1 month ago",
  },
  {
    reviewerName: "Arjun Mehta",
    rating: 4,
    reviewText:
      "Nice selection of toys for my son. The owner is very helpful and prices are fair. Will visit again!",
    date: "4 months ago",
  },
  {
    reviewerName: "Kavita Joshi",
    rating: 5,
    reviewText:
      "Wonderful shop with a warm family atmosphere. Found some unique gift items here. Very happy with my purchase!",
    date: "2 weeks ago",
  },
];

const FALLBACK_GALLERY: GalleryItem[] = [
  { caption: "Our welcoming shop interior" },
  { caption: "Well-stocked stationery shelves" },
  { caption: "Colorful toys section" },
  { caption: "Your neighborhood shopkeeper" },
];

const CATEGORY_IMAGES: Record<string, string> = {
  "School Supplies": "/assets/generated/cat-school-supplies.dim_400x300.jpg",
  "Notebooks & Books": "/assets/generated/cat-notebooks.dim_400x300.jpg",
  "Pens & Stationery": "/assets/generated/cat-pens.dim_400x300.jpg",
  Toys: "/assets/generated/cat-toys.dim_400x300.jpg",
  "Gifts & Novelty Items": "/assets/generated/cat-gifts.dim_400x300.jpg",
  "Art & Craft Supplies": "/assets/generated/cat-art-craft.dim_400x300.jpg",
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "School Supplies": <GraduationCap className="w-5 h-5" />,
  "Notebooks & Books": <BookOpen className="w-5 h-5" />,
  "Pens & Stationery": <Pencil className="w-5 h-5" />,
  Toys: <Smile className="w-5 h-5" />,
  "Gifts & Novelty Items": <Gift className="w-5 h-5" />,
  "Art & Craft Supplies": <Palette className="w-5 h-5" />,
};

const GALLERY_IMAGES = [
  "/assets/generated/gallery-shop-interior.dim_600x400.jpg",
  "/assets/generated/gallery-shelf-stationery.dim_600x400.jpg",
  "/assets/generated/gallery-toys-shelf.dim_600x400.jpg",
  "/assets/generated/gallery-shopkeeper.dim_600x400.jpg",
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ─── Helpers ───────────────────────────────────────────────────── */

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"] as const;

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {STAR_KEYS.slice(0, max).map((key, i) => (
        <Star
          key={key}
          className={`w-4 h-4 ${i < Math.round(rating) ? "star-filled fill-current" : "star-empty"}`}
        />
      ))}
    </div>
  );
}

/* ─── SEO Meta Hook ──────────────────────────────────────────────── */

function useMetaTags() {
  useEffect(() => {
    document.title =
      "Hari Om Stationary Store - Stationery Shop in Vadodara, Gujarat";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };
    const setOg = (property: string, content: string) => {
      let el = document.querySelector(
        `meta[property="${property}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta(
      "description",
      "Hari Om Stationary Store in Sachiyay, Vadodara - your one-stop shop for stationery, notebooks, pens, toys, gifts and school supplies. Visit us today!",
    );
    setMeta(
      "keywords",
      "stationery shop Vadodara, stationery store Gujarat, school supplies Vadodara, toys Vadodara, gifts Sachiyay, Hari Om stationary",
    );
    setOg("og:title", "Hari Om Stationary Store - Stationery Shop in Vadodara");
    setOg(
      "og:description",
      "Your one-stop shop for stationery, toys, gifts, and school supplies in Sachiyay, Vadodara, Gujarat.",
    );
    setOg("og:type", "business.business");
    setOg(
      "og:image",
      `${window.location.origin}/assets/generated/hero-banner.dim_1200x500.jpg`,
    );
    setOg("twitter:card", "summary_large_image");
    setOg("twitter:title", "Hari Om Stationary Store - Vadodara");
    setOg(
      "twitter:description",
      "Best stationery and gift shop in Sachiyay, Vadodara, Gujarat.",
    );
  }, []);
}

/* ─── Navbar ────────────────────────────────────────────────────── */

function Navbar({ shopName: _shopName }: { shopName: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-9 h-9 rounded-xl bg-shop-blue flex items-center justify-center shadow-sm">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-foreground text-sm sm:text-base leading-tight">
            Hari Om
            <span className="text-shop-blue block sm:inline sm:ml-1">
              Stationary
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid="nav.link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:text-shop-blue hover:bg-shop-blue-light transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href="tel:+919876543210"
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-shop-blue text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Phone className="w-4 h-4" />
          Call Us
        </a>

        {/* Hamburger */}
        <button
          type="button"
          data-ocid="nav.toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white border-t border-border"
          >
            <ul className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="nav.link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-foreground font-medium hover:bg-shop-blue-light hover:text-shop-blue transition-colors"
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-shop-blue text-white rounded-xl font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Hero Section ──────────────────────────────────────────────── */

function HeroSection({
  shopInfo,
  loading,
}: {
  shopInfo: ShopInfo;
  loading: boolean;
}) {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-[88vh] flex items-center overflow-hidden pt-16"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1200x500.jpg"
          alt="Hari Om Stationary Store products"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Decorative dots */}
      <div className="absolute inset-0 pattern-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 text-shop-yellow" />
            Sachiyay, Vadodara, Gujarat
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-4"
          >
            {loading ? (
              <>
                <Skeleton className="h-14 w-80 mb-2 bg-white/20" />
                <Skeleton className="h-14 w-60 bg-white/20" />
              </>
            ) : (
              <>
                Hari Om
                <span className="block text-shop-yellow">Stationary Store</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
          >
            {loading ? (
              <Skeleton className="h-6 w-full bg-white/20" />
            ) : (
              shopInfo.tagline
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={scrollToProducts}
              className="flex items-center justify-center gap-2 px-7 py-4 bg-shop-orange text-white rounded-2xl font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Products
            </button>
            <a
              href={`https://wa.me/${shopInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.secondary_button"
              className="flex items-center justify-center gap-2 px-7 py-4 bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white rounded-2xl font-bold text-base hover:bg-white/25 active:scale-95 transition-all"
            >
              <SiWhatsapp className="w-5 h-5" />
              WhatsApp Us
            </a>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-6 mt-10"
          >
            {[
              { value: "1000+", label: "Happy Customers" },
              { value: "500+", label: "Products" },
              { value: "4.3★", label: "Google Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl text-white">
                  {stat.value}
                </div>
                <div className="text-white/70 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden="true"
          role="presentation"
        >
          <path
            d="M0,60 L0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 Z"
            fill="oklch(0.98 0.005 90)"
          />
        </svg>
      </div>
    </section>
  );
}

/* ─── Products Section ──────────────────────────────────────────── */

function ProductsSection({
  categories,
  loading,
}: { categories: ProductCategory[]; loading: boolean }) {
  const displayCategories = loading
    ? FALLBACK_CATEGORIES
    : categories.length > 0
      ? categories
      : FALLBACK_CATEGORIES;

  return (
    <section
      id="products"
      data-ocid="products.section"
      className="py-20 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-shop-blue-light text-shop-blue text-sm font-semibold mb-3">
            What We Offer
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Our Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From school essentials to creative art supplies — everything you
            need, all in one place.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayCategories.slice(0, 6).map((cat, idx) => {
            const markerIds = [
              "products.card.1",
              "products.card.2",
              "products.card.3",
              "products.card.4",
              "products.card.5",
              "products.card.6",
            ];
            const imgSrc =
              CATEGORY_IMAGES[cat.name] || CATEGORY_IMAGES["School Supplies"];
            const icon = CATEGORY_ICONS[cat.name] || (
              <ShoppingBag className="w-5 h-5" />
            );

            return (
              <motion.div
                key={cat.name}
                data-ocid={markerIds[idx]}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="product-card bg-card rounded-2xl overflow-hidden shadow-card border border-border"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  {loading ? (
                    <Skeleton className="w-full h-full" />
                  ) : (
                    <img
                      src={imgSrc}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-shop-blue text-xs font-semibold shadow-sm">
                    {icon}
                    <span className="hidden sm:inline">{cat.name}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-display font-bold text-base sm:text-lg text-foreground mb-1.5">
                    {loading ? <Skeleton className="h-5 w-36" /> : cat.name}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                    {loading ? (
                      <Skeleton className="h-4 w-full" />
                    ) : (
                      cat.description
                    )}
                  </p>

                  {/* Example items */}
                  <div className="flex flex-wrap gap-1.5">
                    {loading
                      ? [1, 2, 3].map((i) => (
                          <Skeleton key={i} className="h-5 w-16 rounded-full" />
                        ))
                      : cat.exampleItems.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-0.5 bg-shop-blue-light text-shop-blue text-xs font-medium rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery Section ───────────────────────────────────────────── */

function GallerySection({
  items,
  loading,
}: { items: GalleryItem[]; loading: boolean }) {
  const captions = items.length > 0 ? items : FALLBACK_GALLERY;

  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
      className="py-20 bg-muted"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-shop-orange-light text-shop-orange text-sm font-semibold mb-3">
            Photo Gallery
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Our Store
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Come visit us at Sachiyay — see our colorful collection in person!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((src, idx) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[3/2] shadow-card"
            >
              {loading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <>
                  <img
                    src={src}
                    alt={captions[idx]?.caption || `Gallery image ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {captions[idx]?.caption}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ─────────────────────────────────────────────── */

function AboutSection() {
  const highlights = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Quality Products",
      desc: "We stock trusted brands and carefully selected products to ensure you get the best quality every time.",
      color: "bg-shop-blue-light text-shop-blue",
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Affordable Prices",
      desc: "Great products shouldn't break the bank. We keep our prices fair so every student and family can afford what they need.",
      color: "bg-shop-orange-light text-shop-orange",
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Friendly Service",
      desc: "We know our customers by name. Come in for a chat, ask for advice — we're always happy to help!",
      color: "bg-accent/40 text-accent-foreground",
    },
  ];

  return (
    <section
      id="about"
      data-ocid="about.section"
      className="py-20 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-shop-blue-light text-shop-blue text-sm font-semibold mb-4">
              About Us
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-5 leading-tight">
              Your Neighborhood
              <span className="text-shop-blue block">Stationery Store</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
              Hari Om Stationary Store has been proudly serving the students,
              teachers, and families of Sachiyay, Vadodara for years. We started
              as a small shop with a big heart, and that spirit has never
              changed.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              From the first day of school pencils to birthday gift wraps, from
              art class supplies to festive cards — we've been part of every
              milestone in our community. Come visit us and experience the
              warmth of a true neighborhood store.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Trusted Since Years", "Local & Proud", "Family Friendly"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 px-4 py-2 bg-muted rounded-full text-sm font-medium text-foreground"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-shop-orange" />
                    {tag}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="flex flex-col gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border shadow-card"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${h.color}`}
                >
                  {h.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-1">
                    {h.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Reviews Section ───────────────────────────────────────────── */

function ReviewsSection({
  reviews,
  loading,
}: { reviews: Review[]; loading: boolean }) {
  const displayReviews = loading
    ? FALLBACK_REVIEWS
    : reviews.length > 0
      ? reviews
      : FALLBACK_REVIEWS;

  const markerIds = [
    "reviews.card.1",
    "reviews.card.2",
    "reviews.card.3",
    "reviews.card.4",
    "reviews.card.5",
  ];

  return (
    <section data-ocid="reviews.section" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-shop-yellow/30 text-accent-foreground text-sm font-semibold mb-3">
            Customer Reviews
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            What Our Customers Say
          </h2>

          {/* Overall rating */}
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-card rounded-2xl border border-border shadow-card mt-4">
            <div className="text-center">
              <div className="font-display font-bold text-4xl text-foreground">
                4.3
              </div>
              <div className="text-muted-foreground text-xs mt-0.5">
                out of 5
              </div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i <= 4 ? "star-filled fill-current" : "star-empty"}`}
                  />
                ))}
              </div>
              <div className="text-muted-foreground text-xs">
                Based on Google Reviews
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayReviews.slice(0, 5).map((review, idx) => (
            <motion.div
              // biome-ignore lint/suspicious/noArrayIndexKey: reviews are positional
              key={idx}
              data-ocid={markerIds[idx]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-card rounded-2xl p-5 border border-border shadow-card flex flex-col gap-3"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-shop-blue flex items-center justify-center text-white font-bold font-display text-sm flex-shrink-0">
                    {review.reviewerName[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {review.reviewerName}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {review.date}
                    </div>
                  </div>
                </div>
                {/* Google G logo approximation */}
                <div className="w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center text-xs font-bold text-shop-blue shadow-sm">
                  G
                </div>
              </div>

              <StarRating rating={review.rating} />
              <p className="text-foreground/80 text-sm leading-relaxed">
                {review.reviewText}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ───────────────────────────────────────────── */

function ContactSection({
  shopInfo,
  loading,
}: { shopInfo: ShopInfo; loading: boolean }) {
  const phone = shopInfo.phone || FALLBACK_SHOP.phone;
  const whatsapp = shopInfo.whatsapp || FALLBACK_SHOP.whatsapp;
  const address = shopInfo.address || FALLBACK_SHOP.address;
  const timings = shopInfo.timings || FALLBACK_SHOP.timings;

  const callHref = `tel:${phone.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${whatsapp}`;

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-20 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-shop-blue-light text-shop-blue text-sm font-semibold mb-3">
            Find Us
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Location & Contact
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We're located in Sachiyay, Vadodara. Come visit us or reach out
            directly!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-card border border-border h-72 sm:h-96"
            data-ocid="contact.map_marker"
          >
            <iframe
              src="https://maps.google.com/maps?q=Sachiyay,Vadodara,Gujarat&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hari Om Stationary Store - Sachiyay, Vadodara"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            {/* Address */}
            <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-shop-blue-light flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-shop-blue" />
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">
                  Our Address
                </div>
                {loading ? (
                  <Skeleton className="h-4 w-48" />
                ) : (
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    Hari Om Stationary Store
                    <br />
                    {address}
                  </div>
                )}
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-shop-orange-light flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-shop-orange" />
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">
                  Store Timings
                </div>
                {loading ? (
                  <Skeleton className="h-4 w-56" />
                ) : (
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    {timings.split("|").map((line, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: timing lines are positional
                      <div key={i}>{line.trim()}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={callHref}
                data-ocid="contact.primary_button"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-shop-blue text-white rounded-2xl font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {loading ? "Call Now" : phone}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.secondary_button"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 whatsapp-btn rounded-2xl font-bold text-base active:scale-95 transition-all shadow-lg"
              >
                <SiWhatsapp className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>

            {/* Phone display */}
            {!loading && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MessageCircle className="w-4 h-4" />
                <span>Also available on WhatsApp for quick queries!</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────── */

function Footer({ shopInfo }: { shopInfo: ShopInfo }) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-white/80 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-shop-blue flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                Hari Om Stationary
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-5">
              {shopInfo.tagline || FALLBACK_SHOP.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href={`tel:${shopInfo.phone || FALLBACK_SHOP.phone}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a
                href={`https://wa.me/${shopInfo.whatsapp || FALLBACK_SHOP.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm text-white transition-colors"
              >
                <SiWhatsapp className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="nav.link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">
              Contact Info
            </h4>
            <div className="space-y-3 text-white/60 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-shop-orange" />
                <span>{shopInfo.address || FALLBACK_SHOP.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-shop-blue" />
                <span>{shopInfo.phone || FALLBACK_SHOP.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-shop-yellow" />
                <div>
                  {(shopInfo.timings || FALLBACK_SHOP.timings)
                    .split("|")
                    .map((t, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: timing lines are positional
                      <div key={i}>{t.trim()}</div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-sm">
          <p>© {year} Hari Om Stationary Store. All rights reserved.</p>
          <p>
            Built with <Heart className="w-3.5 h-3.5 inline text-shop-orange" />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 underline underline-offset-2 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── App Root ──────────────────────────────────────────────────── */

export default function App() {
  useMetaTags();

  const { actor, isFetching } = useActor();
  const [shopInfo, setShopInfo] = useState<ShopInfo>(FALLBACK_SHOP);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFetching) return;
    if (!actor) {
      setLoading(false);
      return;
    }
    const fetchAll = async () => {
      try {
        const [info, cats, revs, gallery] = await Promise.all([
          actor.getShopInfo(),
          actor.getProductCategories(),
          actor.getReviews(),
          actor.getGalleryItems(),
        ]);
        setShopInfo(info);
        setCategories(cats);
        setReviews(revs);
        setGalleryItems(gallery);
      } catch (err) {
        console.warn("Backend unavailable, using fallback data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [actor, isFetching]);

  return (
    <div className="min-h-screen font-body">
      <Navbar shopName={shopInfo.name} />
      <main>
        <HeroSection shopInfo={shopInfo} loading={loading} />
        <ProductsSection categories={categories} loading={loading} />
        <GallerySection items={galleryItems} loading={loading} />
        <AboutSection />
        <ReviewsSection reviews={reviews} loading={loading} />
        <ContactSection shopInfo={shopInfo} loading={loading} />
      </main>
      <Footer shopInfo={shopInfo} />
    </div>
  );
}
