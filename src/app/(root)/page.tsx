import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Root() {
  return (
    <div>
      <Link href="/server-component">Server Component</Link>
      <br />
      <Link href="/client-component">Client Component</Link>
      <br />
      <UserButton />
    </div>
  );
}
