# 🍗 Crunchy Bite - Modern Food Ordering Platform

A premium, fully interactive restaurant ordering website built with **Next.js 16**, **React 19**, **Tailwind CSS**, and **Framer Motion**. This is a complete transformation from a static UI to a production-ready food ordering platform similar to Uber Eats.

## 🚀 Features Implemented

### 1. **Global Layout & Navigation**

- ✅ Navbar on all pages with sticky positioning
- ✅ Footer on all pages
- ✅ Animated logo with hover effects
- ✅ **Live cart icon with animated badge** showing item count
- ✅ Responsive mobile menu with smooth animations
- ✅ Navigation links to all pages (Home, Menu, Offers, Gallery, About, Contact)

### 2. **Complete Cart System** (`context/CartContext.jsx`)

A fully-featured React Context cart management system with:

- ✅ Add items to cart (with duplicate detection and quantity increment)
- ✅ Remove items from cart
- ✅ Update quantities in real-time
- ✅ Calculate total price and item count
- ✅ **Persistent storage** using localStorage (cart survives page refresh)
- ✅ Error handling and validation

**Key Functions:**

```javascript
- addToCart(item) - Adds item or increments quantity
- removeFromCart(itemId) - Removes item completely
- updateQuantity(itemId, quantity) - Updates quantity
- getTotalPrice() - Calculates total
- getTotalItems() - Gets item count
- clearCart() - Empties entire cart
```

### 3. **Enhanced Food Cards** (`components/FoodCard.jsx`)

- ✅ Framer Motion animations on scroll
- ✅ Hover zoom effects (110% scale)
- ✅ Quick-add button on hover (floating circle with + icon)
- ✅ Add to cart functionality with immediate feedback
- ✅ "Added to cart!" floating notification
- ✅ Smooth transitions and color changes
- ✅ Price display and description

### 4. **Cart Page** (`app/cart/page.jsx`)

A complete shopping cart interface with:

- ✅ List of all cart items with images
- ✅ Quantity controls (+ / - buttons)
- ✅ Remove item functionality
- ✅ Item subtotals
- ✅ **Order Summary** sidebar with:
  - Subtotal calculation
  - Delivery fee ($2.99)
  - Tax calculation (8%)
  - **Final total price**
- ✅ "Proceed to Checkout" button
- ✅ "Continue Shopping" button
- ✅ "Clear Cart" option
- ✅ Empty cart state with link to menu
- ✅ Smooth Framer Motion animations

### 5. **Checkout Page** (`app/checkout/page.jsx`)

A modern checkout flow featuring:

- ✅ **Personal Information Section:**

  - Full Name
  - Email Address
  - Phone Number

- ✅ **Delivery Address Section:**

  - Street Address
  - City
  - Zip Code

- ✅ **Payment Method Selection:**

  - Credit Card
  - PayPal
  - Cash on Delivery

- ✅ **Form Validation:**

  - Real-time error messages
  - Field highlighting for errors
  - Error clearing on input

- ✅ **Order Summary Sidebar:**

  - Complete order breakdown
  - All charges itemized
  - Sticky positioning

- ✅ **Success Confirmation:**
  - Animated checkmark
  - Delivery time estimate (30-45 minutes)
  - Order total display
  - Link back to menu

### 6. **Cinematic Hero Section** (`components/Hero.jsx`)

Framer Motion animations that create a "WOW" effect:

- ✅ **Floating food emojis** (chicken 🍗 and burger 🍔)
  - Slide in from sides with rotation
  - Continuous floating animation
  - Parallax effect on scroll
- ✅ **Staggered title reveal:**
  - Badge animates in first
  - Main title fades in
  - Subtitle appears
  - Buttons animate in sequence
- ✅ **Smooth button interactions** with scale effects
- ✅ **Bouncing scroll indicator**
- ✅ All animations use ease-out for premium feel

### 7. **Menu Page** (`app/menu/page.jsx`)

- ✅ Category filter buttons with smooth transitions
- ✅ Sticky category filter bar (top-16 z-index)
- ✅ Category header with gradient underline
- ✅ Staggered grid animation on category change
- ✅ Food cards with all interactions
- ✅ Call-to-action section linking to cart
- ✅ Red/yellow brand color scheme

### 8. **Scroll Animations Throughout**

Using Framer Motion's `whileInView`:

- ✅ Food cards fade in when scrolling into view
- ✅ Section headers animate on scroll
- ✅ Smooth scale/opacity transitions
- ✅ Staggered children animations
- ✅ One-time animations with `once: true`

### 9. **Brand Styling**

- ✅ **Colors:**
  - Primary: Red (#dc2626)
  - Secondary: Yellow (#fbbf24)
  - Accent: Black (#000000)
- ✅ **Typography:** Bold, black font weights (font-black)
- ✅ **Shadows:** Premium shadow effects
- ✅ **Gradients:** Red-to-orange gradients throughout
- ✅ **Rounded corners:** Modern 2xl border radius

### 10. **Responsive Design**

- ✅ Mobile-first approach
- ✅ Responsive grids (1 col → 2 col → 3 col)
- ✅ Touch-friendly buttons
- ✅ Adaptive images
- ✅ Mobile menu with hamburger icon
- ✅ Sticky headers on mobile

---

## 📁 Project Structure

```
crunchy-bite/
├── app/
│   ├── layout.js                 # Root layout with CartProvider
│   ├── page.js                   # Homepage
│   ├── globals.css               # Global styles
│   ├── cart/
│   │   └── page.jsx              # Shopping cart page
│   ├── checkout/
│   │   └── page.jsx              # Checkout page
│   ├── menu/
│   │   └── page.jsx              # Menu page with categories
│   ├── offers/
│   │   └── page.jsx              # Promotions page
│   ├── gallery/
│   │   └── page.jsx              # Photo gallery
│   ├── about/
│   │   └── page.jsx              # About us page
│   └── contact/
│       └── page.jsx              # Contact page
├── components/
│   ├── Navbar.jsx                # Navigation bar
│   ├── Hero.jsx                  # Hero section with animations
│   ├── FoodCard.jsx              # Food card component
│   ├── Footer.jsx                # Footer
│   ├── BestSellers.jsx           # Best sellers section
│   ├── WhyChooseUs.jsx           # Why choose us section
│   ├── SpecialOffer.jsx          # Special offer section
│   └── CustomerReviews.jsx       # Reviews section
├── context/
│   └── CartContext.jsx           # Cart state management
├── data/
│   └── menu.js                   # Menu data (24 items, 4 categories)
└── package.json                  # Dependencies

```

---

## 🛠️ Tech Stack

| Technology        | Version | Purpose                         |
| ----------------- | ------- | ------------------------------- |
| **Next.js**       | 16.1.6  | React framework with App Router |
| **React**         | 19.2.3  | UI library                      |
| **Tailwind CSS**  | 4       | Utility-first CSS               |
| **Framer Motion** | 12.35.1 | Advanced animations             |
| **JavaScript**    | ES2020+ | Modern syntax                   |

---

## 🔄 Cart System Flow

### 1. **Adding Items**

```
User clicks "Add" button on food card
  ↓
FoodCard calls addToCart(item)
  ↓
CartContext checks if item exists
  ├─ If YES: increment quantity
  └─ If NO: add with quantity 1
  ↓
Cart saved to localStorage
  ↓
Navbar badge updates (animated)
  ↓
Floating "Added to cart!" notification
```

### 2. **Viewing Cart**

```
User clicks cart icon
  ↓
Navigate to /cart
  ↓
Page loads items from CartContext
  ↓
Display with quantities, prices, subtotals
  ↓
Calculate totals (subtotal + delivery + tax)
```

### 3. **Checkout**

```
User clicks "Proceed to Checkout"
  ↓
Navigate to /checkout
  ↓
Display order summary and form
  ↓
User fills delivery details
  ↓
User selects payment method
  ↓
User clicks "Place Order"
  ↓
Form validation
  ↓
Success screen with confirmation
  ↓
Cart cleared (localStorage wiped)
```

---

## 🎨 Animations Implemented

### Hero Section

```javascript
// Food items slide in from sides
initial={{ x: -300, rotate: -45, opacity: 0 }}
animate={{ x: 0, rotate: 0, opacity: 1 }}
transition={{ duration: 1.2, ease: "easeOut" }}

// Continuous floating motion
animate={{ y: [0, -20, 0] }}
transition={{ duration: 4, repeat: Infinity }}

// Title appears with stagger
variants={containerVariants}
transition={{ staggerChildren: 0.3 }}
```

### Food Cards

```javascript
// Fade in on scroll
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}

// Hover zoom
whileHover={{ scale: 1.1 }}

// Add button float up
animate={{ opacity: 1, y: -60, scale: 1 }}
```

### Navbar Badge

```javascript
// Scale up when item added
initial={{ scale: 0 }}
animate={{ scale: 1 }}
```

---

## 📊 Menu Data Structure

The app includes **24 food items** across **4 categories**:

1. **Fried Chicken** (6 items)

   - 2 Pieces, 4 Pieces, 6 Pieces Buckets
   - Spicy Wings, Honey Butter Wings
   - Crispy Tenders

2. **Burgers** (6 items)

   - Classic Fried Chicken Burger
   - Spicy Crunch Burger
   - Double Crunchy Burger
   - Buffalo, Honey Mustard, Garlic Parmesan

3. **Sides** (6 items)

   - Fries (Golden, Cajun)
   - Mac & Cheese
   - Coleslaw
   - Cornbread
   - Gravy & Biscuit

4. **Drinks** (6 items)
   - Soft Drinks
   - Fresh Lemonade
   - Iced Tea
   - Milkshakes (3 flavors)

Each item has:

- Unique ID
- Name
- Description
- Price
- High-quality image URL

---

## 🚀 Getting Started

### 1. **Install Dependencies**

```bash
npm install
```

### 2. **Run Development Server**

```bash
npm run dev
```

### 3. **Open in Browser**

```
http://localhost:3000
```

### 4. **Build for Production**

```bash
npm run build
npm start
```

---

## 💡 How to Use the Cart

### For Users:

1. **Browse Menu** - Click "Menu" in navbar
2. **Add Items** - Click "Add" button on any food card
3. **View Cart** - Click cart icon (top right) or bottom-right badge
4. **Modify Quantities** - Use +/- buttons on cart page
5. **Checkout** - Click "Proceed to Checkout"
6. **Fill Details** - Enter delivery address and payment info
7. **Confirm** - Click "Place Order"

### For Developers:

```javascript
// Import and use the cart
import { useCart } from "@/context/CartContext";

const MyComponent = () => {
  const {
    cart, // Array of items
    addToCart, // Add item function
    removeFromCart, // Remove item function
    updateQuantity, // Update quantity function
    getTotalPrice, // Get total price
    getTotalItems, // Get item count
    clearCart, // Clear entire cart
  } = useCart();

  return (
    <div>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
      <p>Items: {getTotalItems()}</p>
      <p>Total: ${getTotalPrice().toFixed(2)}</p>
    </div>
  );
};
```

---

## 🎯 Key Improvements Made

| Feature         | Before          | After                                    |
| --------------- | --------------- | ---------------------------------------- |
| Cart Management | Basic           | Full Context with localStorage           |
| Animations      | Minimal CSS     | Framer Motion throughout                 |
| Food Cards      | Static          | Interactive with hover effects           |
| Navigation      | Links only      | Links + cart badge counter               |
| Menu            | Category filter | Smooth transitions + stagger animations  |
| Checkout        | None            | Complete form with validation            |
| Brand Colors    | Orange          | Red/Yellow/Black premium theme           |
| Mobile Support  | Basic           | Fully responsive with touch optimization |
| Persistence     | None            | Cart saved across sessions               |
| User Feedback   | Basic alerts    | Floating notifications + animations      |

---

## 🔐 Features & Security

- ✅ Form validation on checkout
- ✅ Error messages for invalid inputs
- ✅ localStorage for cart persistence (client-side only)
- ✅ No payment processing (simulation only)
- ✅ Responsive to all screen sizes
- ✅ Accessible buttons and forms

---

## 🎬 Animation Libraries

**Framer Motion:**

- `motion.div` - Animated containers
- `whileHover` - Hover animations
- `whileTap` - Tap/click animations
- `whileInView` - Scroll animations
- `initial` / `animate` / `exit` - State animations
- `variants` - Reusable animation patterns
- `transition` - Control timing and easing

---

## 📱 Responsive Breakpoints

- **Mobile:** 0px - 640px (1 column)
- **Tablet:** 641px - 1024px (2 columns)
- **Desktop:** 1025px+ (3 columns)

---

## 🌈 Color Scheme

```css
Primary Red:      #dc2626 (red-600)
Dark Red:         #991b1b (red-900)
Light Red:        #fee2e2 (red-50)
Yellow Accent:    #fbbf24 (yellow-400)
Black:            #000000
White:            #ffffff
Gray:             #6b7280 (gray-500)
```

---

## 📝 Form Validation

**Checkout form validates:**

- ✅ Name (required, non-empty)
- ✅ Email (required, valid format)
- ✅ Phone (required, valid format)
- ✅ Address (required, non-empty)
- ✅ City (required, non-empty)
- ✅ Zip Code (required, non-empty)
- ✅ Payment Method (required selection)

---

## 🎁 Future Enhancement Ideas

- [ ] User authentication/accounts
- [ ] Order history tracking
- [ ] Ratings and reviews system
- [ ] Loyalty/rewards program
- [ ] Real payment gateway integration
- [ ] Admin dashboard
- [ ] Real-time order tracking
- [ ] Push notifications
- [ ] Multiple restaurant locations
- [ ] Dark mode theme
- [ ] Wishlist/favorites
- [ ] Coupon codes
- [ ] Dietary filters
- [ ] Search functionality
- [ ] Advanced filtering (price, rating, etc.)

---

## 📞 Support

For issues or questions:

1. Check component documentation in code comments
2. Review Framer Motion docs: https://www.framer.com/motion/
3. Check Next.js docs: https://nextjs.org/docs
4. Review Tailwind docs: https://tailwindcss.com/docs

---

## 📄 License

This project is ready for commercial use. Built for restaurant owners and businesses.

---

## 🏆 Project Status

**Status:** ✅ **PRODUCTION READY**

All core features implemented and tested:

- ✅ Cart system fully functional
- ✅ Checkout flow complete
- ✅ Animations smooth and performant
- ✅ Responsive on all devices
- ✅ Form validation working
- ✅ Data persistence enabled
- ✅ Navigation complete
- ✅ Brand styling applied

---

**Built with ❤️ for Crunchy Bite - Premium Fried Chicken Restaurant**

_Transform your restaurant with a modern, interactive ordering platform!_
