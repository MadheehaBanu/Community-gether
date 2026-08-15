// app/search/page.tsx
import React, { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function Page({ searchParams }: { searchParams?: { q?: string } }) {
  const initialQ = searchParams?.q ?? "";

  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">Loading search...</div>}>
      <SearchClient initialQ={initialQ} />
    </Suspense>
  );
}
