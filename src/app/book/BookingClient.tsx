"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, Check } from "lucide-react";

/* ─── Availability constants (CT / America/Chicago) ─── */
const AVAILABLE_DAYS = new Set([0, 1, 4, 5, 6]); // Sun=0, Mon=1, Thu=4, Fri=5, Sat=6
const START_HOUR = 9; // 9 AM CT
const END_HOUR = 13; // 1 PM CT (last slot at 12:30)
const SLOT_MINUTES = 30;
const TIMEZONE = "America/Chicago";

function generateSlots(): string[] {
  const slots: string[] = [];
  for (let h = START_HOUR; h < END_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINUTES) {
      const hh = h.toString().padStart(2, "0");
      const mm = m.toString().padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateSlots();

function formatSlot(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH}:${m.toString().padStart(2, "0")} ${suffix}`;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function toCTDate(date: Date) {
  return new Date(date.toLocaleString("en-US", { timeZone: TIMEZONE }));
}

/* ─── Component ─── */
export function BookingClient() {
  const todayCT = toCTDate(new Date());

  const [viewMonth, setViewMonth] = useState(todayCT.getMonth());
  const [viewYear, setViewYear] = useState(todayCT.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  /* form state */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* calendar grid */
  const calendarDays = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(viewYear, viewMonth, d));
    }
    return cells;
  }, [viewMonth, viewYear]);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function isAvailable(date: Date) {
    if (date < new Date(todayCT.getFullYear(), todayCT.getMonth(), todayCT.getDate())) return false;
    return AVAILABLE_DAYS.has(date.getDay());
  }

  function isToday(date: Date) {
    return isSameDay(date, todayCT);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedSlot || !name || !email) return;

    setSubmitting(true);
    setError("");

    try {
      const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

      const response = await fetch("/api/contact-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `Booking request: ${dateStr} at ${formatSlot(selectedSlot)} CT${note ? `\n\nNote: ${note}` : ""}`,
          source: "booking-page",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit booking");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.04] p-8 md:p-12 text-center backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 mb-6">
          <Check className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-semibold text-[#F8FAFC] mb-3">You&apos;re booked!</h3>
        <p className="text-[#94A3B8] max-w-md mx-auto">
          I&apos;ll send you a calendar invite at <strong className="text-[#E2E8F0]">{email}</strong> within a few hours.
          If you don&apos;t see it, check your spam folder or reach out via the{" "}
          <a href="/contact" className="text-[#7C3AED] hover:underline">
            contact page
          </a>
          .
        </p>
        <p className="mt-4 text-sm text-[#94A3B8]/70">
          {selectedDate &&
            `${MONTH_LABELS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`}{" "}
          at {selectedSlot && formatSlot(selectedSlot)} CT
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-8">
      {/* Calendar + time selector */}
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:p-8 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <button
                type="button"
                onClick={prevMonth}
                className="rounded-lg p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-semibold text-[#F8FAFC]">
                {MONTH_LABELS[viewMonth]} {viewYear}
              </h3>
              <button
                type="button"
                onClick={nextMonth}
                className="rounded-lg p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1 text-center">
              {DAY_LABELS.map((d) => (
                <div key={d} className="py-2 text-xs font-medium uppercase tracking-wider text-[#94A3B8]/70">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                if (!day)
                  return <div key={`empty-${i}`} className="h-10 w-full" />;

                const available = isAvailable(day);
                const today = isToday(day);
                const selected = selectedDate && isSameDay(day, selectedDate);

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    disabled={!available}
                    onClick={() => {
                      setSelectedDate(day);
                      setSelectedSlot(null);
                    }}
                    className={`h-10 w-full rounded-lg text-sm font-medium transition-all ${
                      selected
                        ? "bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/25"
                        : available
                          ? "text-[#F8FAFC] hover:bg-white/10 cursor-pointer"
                          : "text-[#475569] cursor-not-allowed"
                    } ${today && !selected ? "ring-1 ring-[#7C3AED]/50" : ""}`}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Availability key */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#F8FAFC]" />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#475569]" />
                Unavailable
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
                Selected
              </span>
            </div>
          </div>

          {/* Time slots */}
          <div className="lg:w-48 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-[#F8FAFC] mb-4">
              <Clock className="h-4 w-4 text-[#7C3AED]" />
              {selectedDate
                ? `${MONTH_LABELS[selectedDate.getMonth()]} ${selectedDate.getDate()}`
                : "Select a date"}
            </h4>

            {selectedDate ? (
              <div className="grid gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      selectedSlot === slot
                        ? "bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/25"
                        : "border border-white/10 text-[#E2E8F0] hover:border-[#7C3AED]/50 hover:bg-white/[0.06]"
                    }`}
                  >
                    {formatSlot(slot)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#94A3B8]/60">
                Pick a highlighted date to see open time slots.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Booking form (shows after slot selected) */}
      {selectedDate && selectedSlot && (
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:p-8 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7C3AED] mb-2">
            Confirm your booking
          </p>
          <p className="text-[#94A3B8] text-sm mb-6">
            {MONTH_LABELS[selectedDate.getMonth()]} {selectedDate.getDate()},{" "}
            {selectedDate.getFullYear()} at {formatSlot(selectedSlot)} CT (Chicago)
          </p>

          <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
            <label className="grid gap-2 text-sm text-[#E2E8F0]">
              Name *
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30"
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#E2E8F0]">
              Email *
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30"
                placeholder="you@company.com"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#E2E8F0]">
              What should we discuss?
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30"
                placeholder="Quick summary of what you need help with (optional)"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-2xl bg-[#7C3AED] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8B5CF6] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Confirm booking"}
            </button>

            {error && (
              <p className="text-sm text-rose-300" aria-live="polite">
                {error}
              </p>
            )}
          </form>
        </div>
      )}

      {/* Info note */}
      <div className="text-center text-xs text-[#94A3B8]/60 space-y-1">
        <p>Available Monday, Thursday, Friday, Saturday &amp; Sunday mornings — 9 AM to 1 PM CT (Chicago).</p>
        <p>Tuesday and Wednesday are reserved for deep-focus client work.</p>
      </div>
    </div>
  );
}
