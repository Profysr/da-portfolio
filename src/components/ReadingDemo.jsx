"use client";

import { useNavigate } from "react-router-dom";

export default function ReadingDemo() {
  const navigate = useNavigate();
  return (
    <div>
      <p className="py-20 text-center text-muted-foreground">
        Reading layout works. Use the ← back button above to navigate.
      </p>
    </div>
  );
}