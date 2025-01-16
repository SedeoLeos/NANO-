import { jwtDecode } from "jwt-decode";

export const decodeToken=(token)=>{

    if(token){

        const decoded = jwtDecode(token);

        return decoded;
    }else{
        return '';
    }

}