import { IncomingMessage, ServerResponse } from "http";
import {adapter as mongoDBadapter}  from "./db";
import { DatabaseUser, Lucia, TimeSpan } from "lucia";

const adapter = mongoDBadapter;

export const lucia = new Lucia(adapter, {
    getSessionAttributes: (attributes : {}) => {
		return {
			
		};
	},
	sessionExpiresIn: new TimeSpan(30, "d"), // no more active/idle
	sessionCookie: {
		name: "session",
		expires: false, // session cookies have very long lifespan (2 years)
		attributes: {
			secure: true,
			sameSite: "strict",
			domain: "example.com"
		}
	}
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: Omit<DatabaseUser,"id">
	}
}

export async function validateRequest(req: IncomingMessage,res : ServerResponse) {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
    if (!sessionId) {
        return {
            user: null,
            session: null
        };
    }
    const result = await lucia.validateSession(sessionId);
    if (result.session && result.session.fresh){
        res.appendHeader("Set-Cookie",lucia.createSessionCookie(result.session.id).serialize());
    } 

    if (!result.session) {
        res.appendHeader("Set-Cookie",lucia.createBlankSessionCookie().serialize());
    }

    return result;
}
