import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";
import { connect } from 'react-redux';

const prisma = new PrismaClient()



export async function POST(req) {

    const {title,description,userId}= await req.json();

    // console.log('req -----',userId,title,description);

    try {

        const user = await prisma.user.findUnique({
            where: {
              id:userId,
            },
          });

        
        if(!user){
            return new Response(JSON.stringify({message:"Erreur server"}),{status:500});
        }


        if(!title){
            return new Response(JSON.stringify({message:"Le titre est obligatoire"}),{status:404});
        }

        if(!description){
            return new Response(JSON.stringify({message:"La desription est obligatoire"}),{status:404});
        }
    
        const task = await prisma.task.create({
            data: {
              titre:title,
              descrption:description,
              user:{connect:{where:{id:user.id}}}
            },
          })


        
    
        return new Response(JSON.stringify({message:'Tache ajoutée avec success',task}));    
    } catch (error) {   
        
        return new Response(JSON.stringify({message:"Erreur server"+error}),{status:500});
    }

}

