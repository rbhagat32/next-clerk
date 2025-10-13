"use client";

import { useUser } from "@clerk/nextjs";

export default function ClientComponent() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in</div>;

  console.log(user);

  return <div>ClientComponent</div>;
}
