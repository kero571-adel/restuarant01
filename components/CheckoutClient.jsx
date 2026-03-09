"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

export default function CheckoutClient() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "card",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
    setSelectedPaymentMethod(null);
  };

  const handlePaymentSubmit = async (paymentData) => {
    // Update form data with payment method
    setFormData((prev) => ({
      ...prev,
      paymentMethod: paymentData.paymentMethod,
    }));

    // Here you can handle the payment data
    console.log("Payment submitted:", paymentData);

    // Close modal
    handlePaymentModalClose();

    // Show success or process payment
    // For now, just show a toast or message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      setIsSubmitting(false);
    }, 2000);
  };

  const subtotal = getTotalPrice();
  const deliveryFee = 2.99;
  const tax = (subtotal + deliveryFee) * 0.08;
  const total = subtotal + deliveryFee + tax;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md bg-white rounded-2xl shadow-xl p-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6 }}
            className="text-7xl mb-6"
          >
            ✓
          </motion.div>
          <h1 className="text-3xl font-black text-green-600 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Your delicious order has been confirmed. It will be delivered in
            30-45 minutes.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">Order Total:</p>
            <p className="text-2xl font-black text-red-600">
              ${total.toFixed(2)}
            </p>
          </div>
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Back to Menu
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-black text-gray-800 mb-4">
            No Items in Cart
          </h1>
          <p className="text-gray-600 mb-8">
            Add items to your cart before checking out.
          </p>
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg"
            >
              Browse Menu
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-black mb-2">
            Checkout
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Complete your order
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Personal Information */}
              <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 md:mb-6">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm md:text-base text-black font-bold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base ${
                        errors.name
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-xs md:text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm md:text-base text-black font-bold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base ${
                          errors.email
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs md:text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm md:text-base text-black font-bold mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base ${
                          errors.phone
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-xs md:text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 md:mb-6">
                  Delivery Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm md:text-base text-black font-bold mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base ${
                        errors.address
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-600 text-xs md:text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm md:text-base text-black font-bold mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York"
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base ${
                          errors.city
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-600 text-xs md:text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm md:text-base text-black font-bold mb-2">
                        Zip Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="10001"
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base ${
                          errors.zipCode
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="text-red-600 text-xs md:text-sm mt-1">
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 md:mb-6">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { value: "card", label: "Card", clickable: true },
                    { value: "paypal", label: "PayPal", clickable: true },
                    {
                      value: "cash",
                      label: "Cash on Delivery",
                      clickable: false,
                    },
                  ].map((method) => (
                    <motion.div
                      key={method.value}
                      whileHover={
                        method.clickable ? { scale: 1.02 } : undefined
                      }
                      whileTap={method.clickable ? { scale: 0.98 } : undefined}
                      onClick={() => {
                        if (method.clickable) {
                          handlePaymentMethodClick(method.value);
                        }
                        setFormData((prev) => ({
                          ...prev,
                          paymentMethod: method.value,
                        }));
                      }}
                      className={`flex items-center p-3 md:p-4 border-2 rounded-lg transition-colors text-sm md:text-base ${
                        method.clickable
                          ? "cursor-pointer hover:border-red-600"
                          : "cursor-default"
                      } ${
                        formData.paymentMethod === method.value
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={() => {}}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-semibold text-black">
                        {method.label}
                      </span>
                      {method.clickable && (
                        <span className="ml-auto text-xs text-gray-500">
                          Click to add details →
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                type="submit"
                className="w-full py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm md:text-lg rounded-lg transition-all duration-300 shadow-lg disabled:opacity-50 text-center"
              >
                {isSubmitting
                  ? "Processing..."
                  : `Place Order - $${total.toFixed(2)}`}
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-20 bg-white rounded-lg md:rounded-2xl shadow-lg md:shadow-xl p-6 md:p-8">
              <h2 className="text-lg md:text-2xl font-black text-black mb-4 md:mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="max-h-96 overflow-y-auto mb-4 md:mb-6 pb-4 md:pb-6 border-b-2 border-gray-200 space-y-2 md:space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start gap-2 text-sm md:text-base"
                  >
                    <div>
                      <p className="font-bold text-black">{item.name}</p>
                      <p className="text-xs md:text-sm text-gray-600">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <p className="font-bold text-red-600 flex-shrink-0">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 md:space-y-3 mb-6">
                <div className="flex justify-between text-gray-700 text-sm md:text-base">
                  <span>Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 text-sm md:text-base">
                  <span>Delivery</span>
                  <span className="font-bold">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 text-sm md:text-base">
                  <span>Tax</span>
                  <span className="font-bold">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-3 md:p-4">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm md:text-lg font-black text-black">
                    Total
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-red-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handlePaymentModalClose}
        paymentMethod={selectedPaymentMethod}
        onSubmit={handlePaymentSubmit}
      />
    </div>
  );
}
