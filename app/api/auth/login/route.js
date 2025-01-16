import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";

import jsonwebtoken from "jsonwebtoken";


const prisma = new PrismaClient()



export async function POST(req) {

    const {email,password}= await req.json();

    try {
        if(!email){
            return new Response(JSON.stringify({message:"L'adresse email est obligatoire"}),{status:404});
        }

        if(!password){
            return new Response(JSON.stringify({message:"Le mot de passe est obligatoire"}),{status:404});
        }
    
        console.log('Donnees recus',email,password);
    
        const user = await prisma.user.findUnique({
            where: {
              email,
              password
            },
          });
    
        console.log('------Le fameux user----',user);
    
        if(!user){
            return new Response(JSON.stringify({message:"Identifiants incorrects"}),{status:404});
        }
       
        const token = jsonwebtoken.sign(
            { userId: user.id,userName: user.name, userEmail: user.email },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '7d' }
        );
       
        const response = new NextResponse(JSON.stringify({ message: 'connexion réussie',token }), { status: 200 });
        
        response.cookies.set('userToken', token, { httpOnly: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
    
        return response;    
    } catch (error) {
        
    }

    

    return new Response(JSON.stringify({message:'connexion reussie',status:'200'}))
}
