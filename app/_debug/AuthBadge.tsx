// app/_debug/AuthBadge.tsx (Server Component)
import { auth } from "@/auth"; // NextAuth v5 ならこういう形が多い（環境で違う）

export default async function AuthBadge() {
    const session = await auth();
    const isLoggedIn = !!session?.user;

    return (
        <div
            style={{
                position: "fixed",
                bottom: 12,
                right: 12,
                padding: 8,
                border: "1px solid #ccc",
                background: "#fff",
                zIndex: 50,
            }}
        >
            {isLoggedIn ? `Logged in: ${session.user?.name ?? "user"}` : "Logged out"}
        </div>
    );
}
