import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { toast } from "@/hooks/use-toast";

interface BookingForm {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const Booking = () => {
  // State to manage form data for booking
  const [formData, setFormData] = useState<BookingForm>({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  // State to track whether the form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // List of available services with their details
  const services = [
    { value: "classic-cut", label: "Classic Cut - GHS500", duration: "30 min" },
    {
      value: "signature-cut",
      label: "Signature Cut & Style - GHS50",
      duration: "45 min",
    },
    { value: "beard-trim", label: "Beard Trim - 635", duration: "20 min" },
    {
      value: "full-service",
      label: "Full Service (Cut + Beard) - 885",
      duration: "60 min",
    },
    { value: "hot-towel", label: "Hot Towel Shave - 755", duration: "40 min" },
  ];

  // List of available time slots for booking
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ];

  // Function to handle changes in form inputs
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation to ensure all required fields are filled
    if (
      !formData.name ||
      !formData.phone ||
      !formData.service ||
      !formData.date ||
      !formData.time
    ) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);// Reset submitting state
      return;
    }

    try {
      // TODO: Replace with actual Django API endpoint
      // const response = await fetch('/api/bookings/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-CSRFToken': getCsrfToken(), // Add CSRF protection
      //   },
      //   body: JSON.stringify({
      //     customer_name: formData.name,
      //     phone_number: formData.phone,
      //     service_type: formData.service,
      //     appointment_date: formData.date,
      //     appointment_time: formData.time,
      //     notes: formData.notes
      //   })
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log the payload for debugging purposes
      console.log("Booking submission payload:", {
        customer_name: formData.name,
        phone_number: formData.phone,
        service_type: formData.service,
        appointment_date: formData.date,
        appointment_time: formData.time,
        notes: formData.notes,
        // Add metadata for backend processing
        timestamp: new Date().toISOString(),
        source: "web_booking_form",
      });
      
      // Show success toast notification
      toast({
        title: "Booking Request Submitted!",
        description:
          "We'll confirm your appointment within 2 hours via phone or text.",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        notes: "",
      });
    } catch (error) {
      console.error("Booking submission error:", error);
      toast({
        title: "Booking Failed",
        description: "Please try again or call us directly at 0507678878",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-barbershop-gray-50">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-space font-light text-barbershop-black mb-4">
              Book Your Appointment
            </h1>
            <p className="text-lg text-barbershop-gray-600 max-w-lg mx-auto">
              Reserve your time with our master barbers. We'll confirm your
              appointment within 2 hours.
            </p>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-space font-light text-barbershop-black">
                  Personal Information
                </h2>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-barbershop-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="premium-input"
                    placeholder="Maame Esi"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-barbershop-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="premium-input"
                    placeholder="(233) 543-4567"
                    required
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-6">
                <h2 className="text-2xl font-space font-light text-barbershop-black">
                  Service Selection
                </h2>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-barbershop-gray-700 mb-2"
                  >
                    Choose Your Service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="premium-input"
                    required
                  >
                    <option value="">Select a service...</option>
                    {services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label} ({service.duration})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-6">
                <h2 className="text-2xl font-space font-light text-barbershop-black">
                  Preferred Date & Time
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-barbershop-gray-700 mb-2"
                    >
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={today}
                      className="premium-input"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-barbershop-gray-700 mb-2"
                    >
                      Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="premium-input"
                      required
                    >
                      <option value="">Select time...</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-barbershop-gray-700 mb-2"
                >
                  Special Requests or Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="premium-input resize-none"
                  placeholder="Any specific styling requests, allergies, or preferences..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`premium-button flex-1 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Book Appointment"}
                </button>

                <Link
                  to="/"
                  className="premium-button-outline flex-1 text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-barbershop-gray-200 text-center">
              <p className="text-barbershop-gray-600 mb-2">
                Need immediate assistance?
              </p>
              <a
                href="tel:0507678878"
                className="text-barbershop-black font-medium hover:text-barbershop-gray-700 transition-colors"
              >
                Call us on 0507678878
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
