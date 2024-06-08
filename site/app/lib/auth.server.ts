import { type ActionFunctionArgs, createCookie, redirect } from "@remix-run/cloudflare";

let secret = globalThis.COOKIE_SECRET;

let cookie = createCookie("auth", {
    secrets: secret,
    // 120 days
    maxAge: 60 * 60 * 24 * 120,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
});

export async function get_auth_from_request(request: Request): Promise<string | null> {
    let userId = await cookie.parse(request.headers.get("Cookie"));
    return userId ?? null;
}

export async function set_auth_on_response(response: Response, userId: string): Promise<Response> {
    let header = await cookie.serialize(userId);
    response.headers.append("Set-Cookie", header);
    return response;
}

export async function require_auth_cookie(request: Request) {
    let userId = await get_auth_from_request(request);
    if (!userId) {
        throw redirect("/login", {
            headers: {
                "Set-Cookie": await cookie.serialize("", {
                    maxAge: 0,
                }),
            },
        });
    }
    return userId;
}

export async function redirect_if_logged_in_loader({ request }: ActionFunctionArgs) {
    let userId = await get_auth_from_request(request);
    if (userId) {
        throw redirect("/admin/");
    }
    return null;
}

export async function redirect_with_cleared_cookie(): Promise<Response> {
    return redirect("/", {
        headers: {
            "Set-Cookie": await cookie.serialize(null, {
                expires: new Date(0),
            }),
        },
    });
}
