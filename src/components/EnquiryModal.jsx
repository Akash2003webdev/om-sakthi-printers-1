import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, Send, CheckCircle, AlertCircle } from "lucide-react";
import { submitEnquiry } from "../utils/supabase";
import { sendEnquiryEmail } from "../utils/email";
import { WHATSAPP_NUMBER } from "../data";

export default function EnquiryModal({ design, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
    );
    gsap.fromTo(
      panelRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
    );
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const close = () => {
    gsap.to(panelRef.current, { y: 30, opacity: 0, duration: 0.3 });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
  };

  // ── Dynamic WhatsApp Message Logic ──
  const handleWhatsAppOrder = () => {
    const designId = design?.id || "General";
    const designTitle = design?.title || "Printing Service";

    let message = `*New Order Enquiry* \n\n`;
    message += `*Design ID:* ${designId} \n`;
    message += `*Design Name:* ${designTitle} \n`;

    if (form.name) message += `*Customer Name:* ${form.name} \n`;
    if (form.message) message += `*Requirements:* ${form.message} \n`;

    message += `\nHi Om Sakthi Printers, I'm interested in this design. Please provide more details.`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus("loading");
    try {
      const payload = { ...form, designId: design?.id || "General" };
      await submitEnquiry(payload);
      try {
        await sendEnquiryEmail(payload);
      } catch (_) {}
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === backdropRef.current && close()}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-md bg-[var(--nav-bg)] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <div>
            <p className="text-[var(--gold-main)] font-bold text-[10px] tracking-[0.2em] uppercase mb-1">
              {design ? `ORDER DESIGN: ${design.id}` : "SEND AN ENQUIRY"}
            </p>
            <h3 className="text-2xl font-display font-bold text-[var(--text-main)]">
              {design ? design.title : "Custom Printing"}
            </h3>
          </div>
          <button
            onClick={close}
            aria-label="Close"
            className="p-2 rounded-full bg-white/5 text-[var(--text-main)] hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-8 pb-8">
          {status === "success" ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
              <p className="text-sm opacity-60 mb-8">
                We'll get back to you within 24 hours.
              </p>
              <button
                onClick={close}
                className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Fix: Added id, name, and htmlFor for Accessibility */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="modal-name"
                    className="text-[10px] uppercase tracking-widest font-bold opacity-40 px-1"
                  >
                    Your Name *
                  </label>
                  <input
                    id="modal-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--gold-main)] transition-all outline-none text-sm"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="modal-phone"
                    className="text-[10px] uppercase tracking-widest font-bold opacity-40 px-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="modal-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--gold-main)] transition-all outline-none text-sm"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="modal-message"
                    className="text-[10px] uppercase tracking-widest font-bold opacity-40 px-1"
                  >
                    Message / Quantity
                  </label>
                  <textarea
                    id="modal-message"
                    name="message"
                    rows={3}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--gold-main)] transition-all outline-none text-sm resize-none"
                    placeholder="Tell us about your requirements..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    <AlertCircle size={14} />
                    <span>Something went wrong. Please try WhatsApp.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-[var(--gold-main)] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--gold-light)] transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Submit Form"}
                  <Send size={16} />
                </button>
              </form>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-[1px] bg-white/10"></div>
                <span className="text-[9px] font-bold opacity-30 tracking-[0.2em]">
                  OR CHAT DIRECTLY
                </span>
                <div className="flex-1 h-[1px] bg-white/10"></div>
              </div>

              {/* WhatsApp Button with Dynamic Message */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all shadow-lg shadow-green-900/10 active:scale-[0.98]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.107 1.518 5.832L.057 23.743a.5.5 0 00.609.637l6.163-1.615A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.654-.493-5.193-1.358l-.372-.215-3.859 1.011 1.032-3.754-.238-.386A9.951 9.951 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                Chat on WhatsApp
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
