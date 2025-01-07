import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/helper';

const prisma = new PrismaClient()

const categoriesWithSubcategories = [
  {
    name: 'Fiction',
    subcategories: [
      { name: 'Adventure', shortDescription: 'Adventure' },
      { name: 'Classic Literature', shortDescription: 'Classic Literature' },
      { name: 'Contemporary Fiction', shortDescription: 'Contemporary Fiction' },
      { name: 'Fantasy', shortDescription: 'Fantasy' },
      { name: 'Historical Fiction', shortDescription: 'Historical Fiction' },
      { name: 'Horror', shortDescription: 'Horror' },
      { name: 'Mystery & Thriller', shortDescription: 'Mystery & Thriller' },
      { name: 'Romance', shortDescription: 'Romance' },
      { name: 'Science Fiction', shortDescription: 'Science Fiction' },
      { name: 'Young Adult (YA)', shortDescription: 'Young Adult (YA)' },
    ]
  },
  {
    name: 'Non-Fiction',
    subcategories: [
      { name: 'Biographies & Memoirs', shortDescription: 'Biographies & Memoirs' },
      { name: 'Essays & Criticism', shortDescription: 'Essays & Criticism' },
      { name: 'History', shortDescription: 'History' },
      { name: 'Self-Help', shortDescription: 'Self-Help' },
      { name: 'Science & Nature', shortDescription: 'Science & Nature' },
      { name: 'Social & Cultural Studies', shortDescription: 'Social & Cultural Studies' },
      { name: 'Travel & Adventure', shortDescription: 'Travel & Adventure' },
      { name: 'True Crime', shortDescription: 'True Crime' },
      { name: 'Politics & Current Affairs', shortDescription: 'Politics & Current Affairs' },
    ]
  },
  {
    name: 'Academic & Educational',
    subcategories: [
      { name: 'Competitive Exams (BCS, bank jobs, GRE, etc.)', shortDescription: 'Competitive Exams (BCS, bank jobs, GRE, etc.)' },
      { name: 'Engineering & Technology', shortDescription: 'Engineering & Technology' },
      { name: 'Medical & Health Sciences', shortDescription: 'Medical & Health Sciences' },
      { name: 'Language Learning (English, Bangla, etc.)', shortDescription: 'Language Learning (English, Bangla, etc.)' },
      { name: 'Law & Social Sciences', shortDescription: 'Law & Social Sciences' },
      { name: 'Business & Economics', shortDescription: 'Business & Economics' },
      { name: 'Art & Humanities', shortDescription: 'Art & Humanities' },
      { name: 'Science & Mathematics', shortDescription: 'Science & Mathematics' },
    ]
  },
  {
    name: 'Professional & Skill Development',
    subcategories: [
      { name: 'Business & Entrepreneurship', shortDescription: 'Business & Entrepreneurship' },
      { name: 'Personal Finance', shortDescription: 'Personal Finance' },
      { name: 'Communication & Leadership', shortDescription: 'Communication & Leadership' },
      { name: 'Marketing & Sales', shortDescription: 'Marketing & Sales' },
      { name: 'Software & Programming', shortDescription: 'Software & Programming' },
      { name: 'Digital Marketing', shortDescription: 'Digital Marketing' },
      { name: 'Design & Creativity', shortDescription: 'Design & Creativity' },
      { name: 'Mindfulness & Mental Health', shortDescription: 'Mindfulness & Mental Health' },
    ]
  },
  {
    name: 'Religious & Spiritual',
    subcategories: [
      { name: 'Islamic Studies', shortDescription: 'Islamic Studies' },
      { name: 'Christianity', shortDescription: 'Christianity' },
      { name: 'Hinduism', shortDescription: 'Hinduism' },
      { name: 'Buddhism', shortDescription: 'Buddhism' },
      { name: 'Spiritual Philosophy', shortDescription: 'Spiritual Philosophy' },
      { name: 'Comparative Religion', shortDescription: 'Comparative Religion' },
    ]
  },
  {
    name: 'Local Culture & Literature',
    subcategories: [
      { name: 'Bangladeshi Literature', shortDescription: 'Bangladeshi Literature' },
      { name: 'Folk Stories & Myths', shortDescription: 'Folk Stories & Myths' },
      { name: 'Political History of Bangladesh', shortDescription: 'Political History of Bangladesh' },
      { name: 'Bangladeshi Authors', shortDescription: 'Bangladeshi Authors' },
    ]
  }
]

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {}, // Explicitly not updating anything
    create: {
      email: 'test@test.com',
      firstName: 'Test User',
      lastName: 'Test User last name',
      role: 'admin',
      accountType: 'all',
	    password: await hashPassword('123456Ma#'),
      phoneNumber: '0191111111'
    },
  })
  console.log({ user })

   // create book categories
   const existingCategories = await prisma.bookGeneres.findMany()
   if (existingCategories.length === 0) {
     const categories = await prisma.bookGeneres.createMany({
       data: [
         { name: 'Academic & Educational', shortDescription: 'Textbooks, reference books, exam preparation guides, and research materials.' },
         { name: 'Fiction', shortDescription: 'Fiction' },
         { name: 'Non-Fiction', shortDescription: 'Non-Fiction' },
         { name: 'Children\'s Books', shortDescription: 'Children\'s Books' },
         { name: 'Comics & Graphic Novels', shortDescription: 'Comics & Graphic Novels' },
         { name: 'Religious & Spiritual', shortDescription: 'Religious & Spiritual' },
         { name: 'Professional & Skill Development', shortDescription: 'Professional & Skill Development:' },
         { name: 'Local Culture & Literature', shortDescription: 'Local Culture & Literature' },
       ],
     })
   
     console.log('Categories created:', categories)
   } else { console.log('Categories existed, count: ', existingCategories.length) }

   // create book subcategories
   for (const category of categoriesWithSubcategories) {
     const existingCategory = await prisma.bookGeneres.findFirst({
       where: { name: category.name },
       include: {
        subGeneres: true,  // Include the related subGeneres
      }
     })
     if (existingCategory && existingCategory?.subGeneres?.length === 0) {
       const subcategories = await prisma.bookGeneres.createMany({
         data: category.subcategories.map((subcategory) => ({
           name: subcategory.name,
           shortDescription: subcategory.shortDescription,
           parentId: existingCategory.id,
         })),
       })
       console.log(`${category.name} subcategories created:`, subcategories)
     } else { console.log(`${category.name} subcategories existed, count: `, existingCategory?.subGeneres?.length) }
   }
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
