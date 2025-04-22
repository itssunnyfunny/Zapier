
import { PrismaClient } from "./generated/prisma";


const client = new PrismaClient();

async function main() {
    while (true) {
        const pendingRows = await client.zapRunOutbox.findMany({
            where:{},
            take: 10,
    })
}

}
main()