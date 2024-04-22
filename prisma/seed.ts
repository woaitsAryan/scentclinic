import prisma from "../lib/prisma.js"
import { faker } from "@faker-js/faker"

async function generateFakeData() {
    const fakeEntries = 100
    const fakedData = []
    for (let i = 0; i < fakeEntries; i++) {
        fakedData.push({
            name: faker.person.fullName(),
            premedication: faker.word.adjective(),
            right_nasal_cavity: faker.word.adjective(),
            inferior_turbinate_and_meatus: faker.word.adjective(),
            uncinate_process: faker.word.adjective(),
            indication: faker.word.adjective(),
        })
    }


    // await prisma.noseReport.createMany({
    //     data: fakedData,
    //     skipDuplicates: true
    // })
    console.log("Faked data created!")
}
generateFakeData()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

export default generateFakeData;