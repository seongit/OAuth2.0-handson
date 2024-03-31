import { getSession } from "../../api-utils/get-session";

import axios from "axios";

export const GET = async () => {

const session = await getSession();

console.log('session: ', session);

    if(!session.accessToken) {
        return Response.json({
            message : "권한이 없습니다.",
        }, {
            status : 401,
        })
    }  

    const { data }  = await axios.get('https://api.github.com/user',{
        headers : {
            Authorization : `Bearer ${session.accessToken}`,
            Accept : 'application/json'
        }
    })

    return Response.json({
        profile : data.avatar_url,
    });

};
