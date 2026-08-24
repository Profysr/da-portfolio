"use client";

import React, { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { IconX, IconLoader2, IconMap } from "@tabler/icons-react";

const emptySubscribe = () => () => {};

interface ViewOnMapProps {
  mapUrl?: string;
  mapImageUrl?: string;
  className?: string;
}

export const ViewOnMap: React.FC<ViewOnMapProps> = ({
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109823.40662155364!2d73.01233496364853!3d30.662650656349822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b62cd8405a6d%3A0x6cce79c0f78cbfb7!2sSahiwal%2C%20Pakistan!5e0!3m2!1sen!2s!4v1787560818402!5m2!1sen!2s",
  mapImageUrl = "/world.svg",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) setIsMapLoaded(false);
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Permanent Trigger Button */}
      <button
        type="button"
        onClick={toggleOpen}
        className="group relative flex items-center gap-2 px-4 py-2.5 rounded-md border border-border bg-surface-muted hover:bg-surface hover:border-primary/40 text-foreground font-medium text-xs sm:text-sm transition-all active:scale-95 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-15 grayscale transition-opacity group-hover:opacity-25"
          style={{
            backgroundImage: `url(${mapImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <IconMap
          className="relative z-10 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
          strokeWidth={1.5}
        />
        <span className="relative z-10">Location</span>
      </button>

      {/* Overlay & Modal — portaled to body (escapes transformed ancestors) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                onClick={toggleOpen}
              >
            <motion.div
              key="modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative border border-border bg-surface shadow-e5 aspect-square w-full max-w-2xl overflow-hidden rounded-lg"
            >
              <iframe
                title="Map Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setIsMapLoaded(true)}
                className={`transition-opacity duration-500 ${
                  isMapLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {!isMapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-surface">
                    <IconLoader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              )}

              <button
                type="button"
                onClick={toggleOpen}
                aria-label="Close Map"
                className="absolute top-3 right-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-surface/80 border border-border text-foreground hover:bg-surface transition-colors shadow-sm"
              >
                <IconX className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
