import { currentUser } from "@clerk/nextjs/server";

export default async function ServerComponent() {
  const user = await currentUser();
  console.log(user);

  return <div>ServerComponent</div>;
}
