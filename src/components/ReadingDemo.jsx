"use client";

import { useNavigate } from "react-router-dom";

export default function ReadingDemo() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8"
      >
        ← Back
      </button>
      <p className="py-20 text-center text-muted-foreground">Reading layout works.</p>
    </div>
  );
}