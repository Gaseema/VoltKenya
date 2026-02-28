import { headers } from "next/headers";

export async function getIsMobile() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  return /mobile|android|iphone|ipad|phone/i.test(userAgent);
}
