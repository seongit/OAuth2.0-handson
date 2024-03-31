import axios from "axios";

import { getSession } from '../../../api-utils/get-session'
import { redirect } from "next/navigation"; //next/navigation으로 import 해야함 

export const GET = async (request) => {

    const session = await getSession();
    const code = request.nextUrl.searchParams.get('code');
    const state = request.nextUrl.searchParams.get('state');

    // 인가 코드를 가지고 있는 주체와 인가를 요청한 주체가 같은지 확인 
    if(!state || state !== session.state){
        // deny access
        redirect('/fail?resaon=' + 'state가 달라요');
    }

    const { data } = await axios.post('https://github.com/login/oauth/access_token', {
        client_id : process.env.CLIENT_ID, 
        client_secret: process.env.CLIENT_SECRET, 
        code,
    }, {
        headers: {
            Accept : 'application/json'
        }
    })

    session.accessToken = data.access_token;
    console.log('session: ', session);

    redirect('/');

};