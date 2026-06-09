"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Themed, accessible single-select dropdown that replaces the native
 * <select> so the trigger AND the open popover match the iWOMAN theme
 * (iw-purple / iw-gold) instead of the browser's native control.
 */
export function ThemeSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  tone = "light",
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  label?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(() =>
    Math.max(0, options.indexOf(value)),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted option in sync when opening, and move focus to the
  // listbox so it can receive keyboard navigation.
  useEffect(() => {
    if (open) {
      setActiveIndex(Math.max(0, options.indexOf(value)));
      listRef.current?.focus();
    }
  }, [open, options, value]);

  function commit(index: number) {
    const next = options[index];
    if (next != null) onChange(next);
    setOpen(false);
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(activeIndex);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  const hasValue = Boolean(value);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={`flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-left font-sans transition-colors focus:border-iw-gold focus:outline-none focus:ring-1 focus:ring-iw-gold data-[open=true]:border-iw-gold data-[open=true]:ring-1 data-[open=true]:ring-iw-gold ${
          dark
            ? "border-iw-white/20 bg-iw-white/10 text-iw-white backdrop-blur-sm"
            : "border-iw-purple/15 bg-iw-mist/40 text-iw-purple"
        }`}
        data-open={open}
      >
        <span
          className={
            hasValue
              ? dark
                ? "text-iw-white"
                : "text-iw-purple"
              : dark
                ? "text-iw-white/45"
                : "text-iw-purple/35"
          }
        >
          {hasValue ? value : placeholder}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          className={`ml-2 size-4 shrink-0 transition-transform ${dark ? "text-iw-white/60" : "text-iw-purple/55"} ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          aria-activedescendant={`${listId}-opt-${activeIndex}`}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-iw-purple/15 bg-iw-white p-1.5 shadow-[0_12px_40px_rgb(75_36_106/0.35)] focus:outline-none"
        >
          {options.map((option, index) => {
            const selected = option === value;
            const active = index === activeIndex;
            return (
              <li
                key={option}
                id={`${listId}-opt-${index}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(index)}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3.5 py-2.5 font-sans text-sm transition-colors ${
                  active
                    ? "bg-iw-gold/15 text-iw-purple"
                    : "text-iw-purple/85"
                } ${selected ? "font-semibold" : "font-normal"}`}
              >
                <span>{option}</span>
                {selected ? (
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    fill="none"
                    className="size-4 text-iw-gold"
                  >
                    <path
                      d="m4.5 10.5 3.5 3.5 7.5-7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
