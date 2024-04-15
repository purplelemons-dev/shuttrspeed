import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async (request) => {
    const UID = request.params.uid as string;
    return await fetch(atob(UID));
}
