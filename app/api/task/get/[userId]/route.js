import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()



export async function GET(req, { params }) {

  const { userId } = await params

  console.log(userId)

  try {

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    console.log(user)
    if (!user) {
      return new Response(JSON.stringify({ message: "Erreur server" }), { status: 403 });
    }



    const tasks = await prisma.task.findMany({
      where: {
        userid: user.id
      },
    })




    return new Response(JSON.stringify({ message: 'Taches recuperées avec success', tasks }));
  } catch (error) {

    return new Response(JSON.stringify({ message: "Erreur server" + error }), { status: 500 });
  }

}

