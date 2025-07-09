import { PrismaClient, UserRole, Gender, Status, ApplicationStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const hashedPassword = await hash("admin123", 10);
    const admin = await prisma.user.create({
      data: {
        email: "admin@shifa.com",
        name: "Admin User",
        password: hashedPassword,
        role: UserRole.ADMIN,
        emailVerified: new Date(),
        onboarded: true,
      },
    });

    // Create some regular users
    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: "john@example.com",
          name: "John Doe",
          password: await hash("password123", 10),
          role: UserRole.USER,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "sarah@example.com",
          name: "Sarah Smith",
          password: await hash("password123", 10),
          role: UserRole.USER,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
    ]);

    // Create some articles
    const articles = await Promise.all([
      prisma.article.create({
        data: {
          title: "Understanding Pediatric Care",
          slug: "understanding-pediatric-care",
          description: "A comprehensive guide to modern pediatric care practices and their importance in child development. Learn about the latest approaches and methodologies.",
          image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b",
          body: "Pediatric care is a specialized branch of medicine that focuses on the health and medical care of infants, children, and adolescents. The field has evolved significantly over the years, incorporating new technologies and methodologies to provide better care for young patients...",
          author: "Dr. Sarah Smith",
        },
      }),
      prisma.article.create({
        data: {
          title: "Childhood Vaccination Guide",
          slug: "childhood-vaccination-guide",
          description: "Essential information about childhood vaccinations, their importance, and recommended schedules. Help protect your child's health with proper immunization.",
          image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289",
          body: "Vaccinations are one of the most effective preventive health measures in modern medicine. They protect children from serious diseases and help prevent the spread of infections in communities...",
          author: "Dr. John Doe",
        },
      }),
      prisma.article.create({
        data: {
          title: "Nutrition for Growing Children",
          slug: "nutrition-for-growing-children",
          description: "Learn about proper nutrition for children at different stages of growth. Get expert advice on balanced diets and healthy eating habits.",
          image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af",
          body: "Proper nutrition is crucial for children's growth and development. A balanced diet provides the necessary nutrients for physical growth, cognitive development, and overall health...",
          author: "Dr. Emily Brown",
        },
      }),
    ]);

    // Create some patients
    const patients = await Promise.all([
      prisma.patient.create({
        data: {
          userId: users[0].id,
          name: "Alice Johnson",
          email: "alice@example.com",
          phone: "+1234567890",
          birthDate: new Date("1990-05-15"),
          gender: Gender.Female,
          address: "123 Main St, City",
          occupation: "Teacher",
          emergencyContactName: "Bob Johnson",
          emergencyContactNumber: "+0987654321",
          primaryPhysician: "Dr. Smith",
          insuranceProvider: "Health Plus",
          insurancePolicyNumber: "HP123456",
          allergies: "Peanuts",
          currentMedication: "None",
          privacyConsent: true,
          treatmentConsent: true,
        },
      }),
    ]);

    // Create some appointments
    await prisma.appointment.create({
      data: {
        patientId: patients[0].id,
        userId: users[0].id,
        schedule: new Date("2024-03-20T10:00:00Z"),
        status: Status.scheduled,
        primaryPhysician: "Dr. Smith",
        reason: "Annual checkup",
        note: "Regular health examination",
      },
    });

    // Create a doctor profile
    await prisma.doctor.create({
      data: {
        userId: users[1].id,
        bio: "Experienced pediatrician with 10 years of practice",
        phone: "+1234567890",
        birthDate: new Date("1980-01-01"),
        currentCountry: "United States",
        currentState: "California",
        educationLevel: "PhD",
        institution: "Stanford Medical School",
        yearOfCompletion: 2010,
        major: "Pediatrics",
        skills: ["Pediatric Care", "Vaccination", "Child Development"],
        applicationStatus: ApplicationStatus.APPROVED,
      },
    });

    // Create a paediatric doctor profile
    await prisma.paediatricDoctor.create({
      data: {
        userId: users[0].id,
        fullNameEnglish: "Dr. John Doe",
        fullNameArabic: "د. جون دو",
        namePrefix: "Dr.",
        stageOfCareer: "Senior Consultant",
        personalEmail: "john.doe@medical.com",
        agreeToEmailPublication: true,
        universityOfPrimaryGraduation: "Harvard Medical School",
        countryOfUniversityOfPrimaryGraduation: "United States",
        yearOfGraduationFromMedicine: "2005",
        qualifications: ["MBBS", "MD", "PhD"],
        paediatricsSubspecialty: ["Neonatology", "Pediatric Cardiology"],
        subspecialtyCertified: "Yes",
        currentPosition: "Head of Pediatrics",
        currentInstitution: "Children's Hospital",
        countryOfWork: "United States",
        applicationStatus: ApplicationStatus.APPROVED,
      },
    });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 