import { createCookieSessionStorage } from "@remix-run/node";

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "_session",
		sameSite: "lax", // this helps with CSRF
		path: "/", // to work in all routes
		httpOnly: true, // for security reasons, http only
		secrets: [`5yoyEF1DVkWpKCiO25vAKQ==`], // should be different on each env
		secure: process.env.NODE_ENV === "production", // enable this in prod only
	},
});
export const { getSession, commitSession, destroySession } = sessionStorage;
