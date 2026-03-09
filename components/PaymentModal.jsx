"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader } from "lucide-react";

export default function PaymentModal({
  isOpen,
  onClose,
  paymentMethod,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    // Card fields
    fullName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
    // PayPal fields
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const firstInputRef = useRef(null);

  // Handle ESC key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Focus the first input when modal opens
    setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }
    }, 100);

    document.addEventListener("keydown", handleEscKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpirationDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expirationDate") {
      formattedValue = formatExpirationDate(value);
    } else if (name === "cvv") {
      formattedValue = value.replace(/[^0-9]/gi, "").slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateCardForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, "").length < 13) {
      newErrors.cardNumber = "Invalid card number";
    }

    if (!formData.expirationDate.trim()) {
      newErrors.expirationDate = "Expiration date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expirationDate)) {
      newErrors.expirationDate = "Invalid format (MM/YY)";
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV (3-4 digits)";
    }

    return newErrors;
  };

  const validatePayPalForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors =
      paymentMethod === "card" ? validateCardForm() : validatePayPalForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit({
        paymentMethod,
        ...formData,
      });
      setIsSubmitting(false);
      setFormData({
        fullName: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: "",
        email: "",
        password: "",
      });
      setErrors({});
    }, 1500);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 md:px-8 py-4 md:py-6 flex items-center justify-between">
                <h2
                  id="modal-title"
                  className="text-xl md:text-2xl font-black text-black capitalize"
                >
                  {paymentMethod} Payment
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              {/* Form Content */}
              <form
                onSubmit={handleSubmit}
                className="px-6 md:px-8 py-6 md:py-8 space-y-4"
              >
                {paymentMethod === "card" ? (
                  <>
                    {/* Card Payment Form */}

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm md:text-base text-black font-bold mb-2">
                        Full Name *
                      </label>
                      <input
                        ref={firstInputRef}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 ${
                          errors.fullName
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      />
                      {errors.fullName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 text-xs md:text-sm mt-1"
                        >
                          {errors.fullName}
                        </motion.p>
                      )}
                    </div>

                    {/* Card Number */}
                    <div>
                      <label className="block text-sm md:text-base text-black font-bold mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 font-mono ${
                          errors.cardNumber
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      />
                      {errors.cardNumber && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 text-xs md:text-sm mt-1"
                        >
                          {errors.cardNumber}
                        </motion.p>
                      )}
                    </div>

                    {/* Expiration Date and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm md:text-base text-black font-bold mb-2">
                          Expiration Date *
                        </label>
                        <input
                          type="text"
                          name="expirationDate"
                          value={formData.expirationDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 font-mono ${
                            errors.expirationDate
                              ? "border-red-600 bg-red-50"
                              : "border-gray-300 bg-gray-50"
                          }`}
                        />
                        {errors.expirationDate && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-xs md:text-sm mt-1"
                          >
                            {errors.expirationDate}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm md:text-base text-black font-bold mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="4"
                          className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 font-mono ${
                            errors.cvv
                              ? "border-red-600 bg-red-50"
                              : "border-gray-300 bg-gray-50"
                          }`}
                        />
                        {errors.cvv && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-xs md:text-sm mt-1"
                          >
                            {errors.cvv}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Billing Address (Optional) */}
                    <div>
                      <label className="block text-sm md:text-base text-black font-bold mb-2">
                        Billing Address (Optional)
                      </label>
                      <input
                        type="text"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        placeholder="123 Main Street, City, State"
                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-sm md:text-base transition-all focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* PayPal Payment Form */}

                    {/* Email */}
                    <div>
                      <label className="block text-sm md:text-base text-black font-bold mb-2">
                        PayPal Email Address *
                      </label>
                      <input
                        ref={firstInputRef}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 ${
                          errors.email
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 text-xs md:text-sm mt-1"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm md:text-base text-black font-bold mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your password"
                          className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 transition-all text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 pr-10 ${
                            errors.password
                              ? "border-red-600 bg-red-50"
                              : "border-gray-300 bg-gray-50"
                          }`}
                        />
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? "👁️" : "👁️‍🗨️"}
                        </motion.button>
                      </div>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 text-xs md:text-sm mt-1"
                        >
                          {errors.password}
                        </motion.p>
                      )}
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm md:text-base rounded-lg transition-all duration-300 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Loader className="w-4 h-4 md:w-5 md:h-5" />
                      </motion.div>
                      Processing...
                    </>
                  ) : (
                    `Confirm ${
                      paymentMethod === "card" ? "Card" : "PayPal"
                    } Payment`
                  )}
                </motion.button>

                {/* Footer note */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  Press ESC to close this modal
                </p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
