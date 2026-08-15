"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import StepIndicator from "@/components/create/StepIndicator";
import DetailsStep, { type DetailsData } from "@/components/create/DetailsStep";
import DateLocationStep, { type DateLocationData } from "@/components/create/DateLocationStep";
import TicketsStep, { type TicketsData } from "@/components/create/TicketsStep";
import PreviewStep from "@/components/create/PreviewStep";
import Confetti from "@/components/ui/Confetti";

const STEP_TITLES = [
  { title: "Event Details", sub: "Tell us about your event" },
  { title: "Date & Location", sub: "When and where is it happening?" },
  { title: "Tickets & Tags", sub: "Set pricing and discoverability" },
  { title: "Preview & Publish", sub: "Review before going live" },
];

export default function CreatePage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [published, setPublished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [details, setDetails] = useState<DetailsData>({
    name: "", category: "", description: "", coverImage: "",
  });
  const [dateLocation, setDateLocation] = useState<DateLocationData>({
    date: "", startTime: "", endTime: "", format: "in-person",
    venue: "", address: "", city: "", onlineLink: "",
  });
  const [tickets, setTickets] = useState<TicketsData>({
    priceType: "free", amount: "", currency: "LKR", capacity: "", tags: [],
  });

  const canNext = [
    !!(details.name && details.category && details.description),
    !!(dateLocation.date && dateLocation.startTime && (dateLocation.city || dateLocation.format === "online")),
    true,
    true,
  ][step];

  const goNext = () => {
    if (step < 3) { setDirection(1); setStep(step + 1); }
  };
  const goBack = () => {
    if (step > 0) { setDirection(-1); setStep(step - 1); }
  };

  const publish = () => {
    setPublished(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative">
      <Confetti active={showConfetti} />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-2">CREATE ✦</p>
          <h1
            className="font-display font-extrabold text-warm-black mb-2"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
          >
            {published ? "You did it! 🎉" : "Create an Event"}
          </h1>
          {!published && (
            <p className="text-warm-gray font-body">Bring your community together</p>
          )}
        </div>

        {/* Step indicator */}
        {!published && (
          <div className="mb-10">
            <StepIndicator current={step} />
          </div>
        )}

        {/* Step card */}
        <div className="bg-white border border-[rgba(26,22,20,0.06)] rounded-3xl shadow-warm-lg overflow-hidden">
          {/* Card header */}
          {!published && (
            <div className="px-6 pt-6 pb-4 border-b border-[rgba(26,22,20,0.06)]">
              <h2 className="font-heading font-bold text-lg text-warm-black">
                {STEP_TITLES[step].title}
              </h2>
              <p className="text-sm text-warm-muted font-body mt-0.5">{STEP_TITLES[step].sub}</p>
            </div>
          )}

          {/* Step content */}
          <div className="p-6 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {step === 0 && <DetailsStep data={details} onChange={setDetails} />}
                {step === 1 && <DateLocationStep data={dateLocation} onChange={setDateLocation} />}
                {step === 2 && <TicketsStep data={tickets} onChange={setTickets} />}
                {step === 3 && (
                  <PreviewStep
                    details={details}
                    dateLocation={dateLocation}
                    tickets={tickets}
                    published={published}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {!published && (
            <div className="px-6 pb-6 flex items-center justify-between gap-3">
              <button
                onClick={goBack}
                disabled={step === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[rgba(26,22,20,0.1)] text-warm-gray font-semibold text-sm disabled:opacity-30 hover:border-warm-black/20 transition-all"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === step ? "w-6 bg-coral" : i < step ? "w-3 bg-forest" : "w-3 bg-cream-darker"
                    }`}
                  />
                ))}
              </div>

              {step < 3 ? (
                <button
                  onClick={goNext}
                  disabled={!canNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-coral to-gold text-white font-semibold text-sm disabled:opacity-40 hover:shadow-glow-coral transition-all"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={publish}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-coral to-gold text-white font-semibold text-sm hover:shadow-glow-coral transition-all"
                >
                  🚀 Publish Event
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
