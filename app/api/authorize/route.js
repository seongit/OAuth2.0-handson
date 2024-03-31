import { redirect } from "next/navigation";

import { nanoid } from "nanoid";

import { getSession } from "@/app/api-utils/get-session"

export const GET = async (request) => {

    const session = await getSession();
    const randomValue = nanoid();
    session.state = randomValue; 

    const url = 'https://github.com/login/oauth/authorize' 
    + `?client_id=${process.env.CLIENT_ID}`
    + `&redirect_uri=${process.env.REDIRECT_URI}`
    + `&scope=read:user`
    + `&state=${randomValue}`;

    redirect(url); // status 307 

};