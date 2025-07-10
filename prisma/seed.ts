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
          body: `Pediatric care is a specialized branch of medicine that focuses on the health and medical care of infants, children, and adolescents. Over the decades, pediatricians have played a crucial role in reducing child mortality, improving vaccination rates, and promoting healthy development.

Modern pediatric care involves a multidisciplinary approach, including preventive care, early diagnosis, and family education. Pediatricians work closely with parents and caregivers to ensure children receive the best possible start in life. The field has evolved significantly, incorporating new technologies, evidence-based practices, and a holistic view of child health.

From routine checkups to managing complex medical conditions, pediatricians are dedicated to supporting the physical, emotional, and social well-being of children. Their work is vital in shaping healthier generations and building stronger communities.`,
          author: "Dr. Sarah Smith",
        },
      }),
      prisma.article.create({
        data: {
          title: "Childhood Vaccination Guide",
          slug: "childhood-vaccination-guide",
          description: "Essential information about childhood vaccinations, their importance, and recommended schedules. Help protect your child's health with proper immunization.",
          image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289",
          body: `Vaccinations are one of the most effective preventive health measures in modern medicine. They protect children from serious diseases such as measles, polio, and whooping cough, and help prevent the spread of infections in communities.

The recommended vaccination schedule is designed to provide immunity at the right age, ensuring maximum protection. Pediatricians and public health experts continually review and update these schedules based on the latest scientific evidence.

Parents play a vital role in keeping vaccination records up to date and ensuring their children receive all recommended immunizations. By doing so, they contribute to the health of their families and the broader community.`,
          author: "Dr. John Doe",
        },
      }),
      prisma.article.create({
        data: {
          title: "Nutrition for Growing Children",
          slug: "nutrition-for-growing-children",
          description: "Learn about proper nutrition for children at different stages of growth. Get expert advice on balanced diets and healthy eating habits.",
          image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af",
          body: `Proper nutrition is crucial for children's growth and development. A balanced diet provides the necessary nutrients for physical growth, cognitive development, and overall health. Pediatricians recommend a variety of foods, including fruits, vegetables, whole grains, lean proteins, and healthy fats.

Nutritional needs change as children grow. Infants require breast milk or formula, while toddlers and older children benefit from a diverse diet that supports their active lifestyles. It's important to limit sugary snacks and beverages, and to encourage regular meal times.

Healthy eating habits established in childhood often last a lifetime. Parents and caregivers can foster these habits by modeling good choices and involving children in meal planning and preparation.`,
          author: "Dr. Emily Brown",
        },
      }),
      // --- New Sudanese Paediatric Doctors Articles ---
      prisma.article.create({
        data: {
          title: "Sudanese Paediatric Doctors: Who Are We?",
          slug: "sudanese-paediatric-doctors-who-are-we",
          description: "An introduction to the Sudanese Paediatric Doctors group, their mission, and vision.",
          image: "https://images.unsplash.com/photo-1503437313881-503a91226419", // new Unsplash image
          body: `The Sudanese Paediatric Doctors group is a collective of dedicated professionals committed to advancing child health in Sudan and beyond. Our mission is to provide the highest standard of care, promote research and education, and support the next generation of pediatricians.

We believe in collaboration, compassion, and continuous learning. Our members are involved in clinical practice, academic research, and community outreach. Together, we strive to address the unique health challenges facing Sudanese children and to advocate for policies that improve pediatric care nationwide.

Whether you are a parent, a healthcare provider, or a fellow pediatrician, we invite you to connect with us and join our efforts to make a lasting impact.`,
          author: "Sudanese Paediatric Doctors Team",
        },
      }),
      prisma.article.create({
        data: {
          title: "Contact Details for Sudanese Paediatricians",
          slug: "contact-details-sudanese-paediatricians",
          description: "How to reach Sudanese Paediatric Doctors and access their database.",
          image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb",
          body: `For inquiries, collaborations, or support, you can reach the Sudanese Paediatric Doctors group through our official channels. We maintain an up-to-date database of pediatricians, making it easy for families and professionals to find the right expertise.

Our contact details are available on our website, and we encourage you to connect with us for information about services, events, and opportunities. The Pediatrician’s Database is a valuable resource for networking and professional development.

We are committed to transparency and accessibility, ensuring that every child in Sudan has access to quality pediatric care.`,
          author: "Sudanese Paediatric Doctors Team",
        },
      }),
      prisma.article.create({
        data: {
          title: "Pediatricians’ Database: Sudanese Paediatricians",
          slug: "pediatricians-database-sudanese-paediatricians",
          description: "Access the alphabetical list of all Sudanese Paediatricians, with links to photos and CVs.",
          image: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
          body: `The Pediatricians’ Database is an extensive, regularly updated list of Sudanese paediatricians. Each entry includes the doctor’s name, qualifications, and contact information, with links to professional photos and CVs where available.

This resource is designed to foster collaboration, mentorship, and knowledge sharing within the pediatric community. It also helps families and institutions find specialists for consultations, referrals, and second opinions.

We invite all Sudanese paediatricians to contribute to the database and keep their profiles current, ensuring the highest level of service and connectivity.`,
          author: "Sudanese Paediatric Doctors Team",
        },
      }),
      prisma.article.create({
        data: {
          title: "History of Paediatrics in Sudan",
          slug: "history-of-paediatrics-in-sudan",
          description: "Explore the history of paediatrics in Sudan, from its origins to the present day.",
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
          body: `The history of paediatrics in Sudan is rich and inspiring. From the early days of medical practice to the establishment of specialized pediatric departments, Sudanese doctors have made significant contributions to child health.

Key milestones include the founding of the first pediatric clinics, the introduction of vaccination programs, and the training of local specialists. Over the years, Sudan has produced renowned pediatricians who have shaped the field both nationally and internationally.

This article highlights the achievements, challenges, and ongoing efforts to improve pediatric care in Sudan, celebrating the legacy of those who paved the way.`,
          author: "Sudanese Paediatric Doctors Team",
        },
      }),
      prisma.article.create({
        data: {
          title: "The First Pioneers before Sudan Independence",
          slug: "first-pioneers-before-sudan-independence",
          description: "Meet the first pioneers of paediatrics in Sudan before independence, with links to photos and biographies.",
          image: "https://images.unsplash.com/photo-1465101178521-c1a9136a1408", // new Unsplash image
          body: `Before Sudan gained independence, a group of visionary doctors laid the foundation for pediatric medicine in the country. These pioneers were dedicated to serving children and families, often working in challenging conditions with limited resources.

Their commitment to education, research, and patient care set the standard for future generations. Many of their stories are documented in biographies and archives, with photos and personal accounts that inspire today’s practitioners.

We honor their legacy and encourage readers to explore the lives and achievements of these remarkable individuals.`,
          author: "Sudanese Paediatric Doctors Team",
        },
      }),
      prisma.article.create({
        data: {
          title: "Sudanese Doctors in the World",
          slug: "sudanese-doctors-in-the-world",
          description: "Discover Sudanese paediatric doctors making an impact around the globe, with links to their stories and achievements.",
          image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
          body: `Sudanese paediatric doctors have made a significant impact around the world, contributing to healthcare systems in Africa, the Middle East, Europe, North America, and beyond. Many have taken on leadership roles, conducted groundbreaking research, and provided care to diverse populations.

This global network of Sudanese doctors is a source of pride and inspiration. Their achievements demonstrate the strength of Sudan’s medical education and the resilience of its people.

Through international collaborations and knowledge exchange, Sudanese paediatricians continue to advance the field and support their colleagues at home and abroad.`,
          author: "Sudanese Paediatric Doctors Team",
        },
      }),
      prisma.article.create({
        data: {
          title: "Sudan Association of Paediatrics (SAP)",
          slug: "sudan-association-of-paediatrics-sap",
          description: "Learn about the Sudan Association of Paediatrics, its mission, and activities.",
          image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
          body: `The Sudan Association of Paediatrics (SAP) is the leading professional organization for pediatricians in Sudan. SAP is dedicated to promoting excellence in pediatric care, supporting research and education, and advocating for the health and well-being of children.

SAP organizes conferences, workshops, and training programs, bringing together experts from across the country and around the world. The association also works closely with government agencies and international partners to improve healthcare policies and access.

Membership in SAP is open to all pediatricians and those interested in child health. Together, we are building a brighter future for Sudan’s children.`,
          author: "Sudanese Paediatric Doctors Team",
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

    // Create 10 paediatric doctors
    const paediatricDoctorUsers = await Promise.all([
      prisma.user.create({
        data: {
          email: "paed1@example.com",
          name: "Dr. Amina Elhassan",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed2@example.com",
          name: "Dr. Mohamed Osman",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed3@example.com",
          name: "Dr. Sara Khalid",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed4@example.com",
          name: "Dr. Huda Ahmed",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed5@example.com",
          name: "Dr. Khalid Idris",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed6@example.com",
          name: "Dr. Fatima Musa",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed7@example.com",
          name: "Dr. Yousif Abdelrahman",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed8@example.com",
          name: "Dr. Lina Hassan",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed9@example.com",
          name: "Dr. Ahmed Babiker",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed10@example.com",
          name: "Dr. Salma Abdelaziz",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
    ]);

    await Promise.all([
      prisma.paediatricDoctor.create({
        data: {
          userId: paediatricDoctorUsers[0].id,
          fullNameEnglish: "Dr. Amina Elhassan",
          fullNameArabic: "د. أمينة الحسن",
          namePrefix: "Dr.",
          stageOfCareer: "Consultant",
          personalEmail: "amina.elhassan@hospital.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2002",
          qualifications: ["MBBS", "MD"],
          paediatricsSubspecialty: ["Neonatology"],
          subspecialtyCertified: "Yes",
          currentPosition: "Consultant Neonatologist",
          currentInstitution: "Khartoum Teaching Hospital",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: paediatricDoctorUsers[1].id,
          fullNameEnglish: "Dr. Mohamed Osman",
          fullNameArabic: "د. محمد عثمان",
          namePrefix: "Dr.",
          stageOfCareer: "Senior Registrar",
          personalEmail: "mohamed.osman@hospital.com",
          agreeToEmailPublication: false,
          universityOfPrimaryGraduation: "University of Gezira",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2010",
          qualifications: ["MBBS", "MRCPCH"],
          paediatricsSubspecialty: ["Pediatric Cardiology"],
          subspecialtyCertified: "No",
          currentPosition: "Senior Registrar in Pediatric Cardiology",
          currentInstitution: "Gezira Heart Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.PENDING,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: paediatricDoctorUsers[2].id,
          fullNameEnglish: "Dr. Sara Khalid",
          fullNameArabic: "د. سارة خالد",
          namePrefix: "Dr.",
          stageOfCareer: "Lecturer",
          personalEmail: "sara.khalid@university.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2015",
          qualifications: ["MBBS"],
          paediatricsSubspecialty: ["Pediatric Neurology"],
          subspecialtyCertified: "Yes",
          currentPosition: "Lecturer in Pediatrics",
          currentInstitution: "University of Khartoum",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: paediatricDoctorUsers[3].id,
          fullNameEnglish: "Dr. Huda Ahmed",
          fullNameArabic: "د. هدى أحمد",
          namePrefix: "Dr.",
          stageOfCareer: "Consultant",
          personalEmail: "huda.ahmed@hospital.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Gezira",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2008",
          qualifications: ["MBBS", "MD"],
          paediatricsSubspecialty: ["Pediatric Endocrinology"],
          subspecialtyCertified: "Yes",
          currentPosition: "Consultant Pediatric Endocrinologist",
          currentInstitution: "Gezira Pediatric Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: paediatricDoctorUsers[4].id,
          fullNameEnglish: "Dr. Khalid Idris",
          fullNameArabic: "د. خالد إدريس",
          namePrefix: "Dr.",
          stageOfCareer: "Registrar",
          personalEmail: "khalid.idris@hospital.com",
          agreeToEmailPublication: false,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2012",
          qualifications: ["MBBS"],
          paediatricsSubspecialty: ["Pediatric Gastroenterology"],
          subspecialtyCertified: "No",
          currentPosition: "Registrar in Pediatric Gastroenterology",
          currentInstitution: "Khartoum Children's Hospital",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.PENDING,
        },
      }),
      prisma.paediatricDoctor.create({
      data: {
          userId: paediatricDoctorUsers[5].id,
          fullNameEnglish: "Dr. Fatima Musa",
          fullNameArabic: "د. فاطمة موسى",
        namePrefix: "Dr.",
          stageOfCareer: "Consultant",
          personalEmail: "fatima.musa@hospital.com",
        agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
        yearOfGraduationFromMedicine: "2005",
          qualifications: ["MBBS", "MD"],
          paediatricsSubspecialty: ["Pediatric Oncology"],
          subspecialtyCertified: "Yes",
          currentPosition: "Consultant Pediatric Oncologist",
          currentInstitution: "Khartoum Oncology Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: paediatricDoctorUsers[6].id,
          fullNameEnglish: "Dr. Yousif Abdelrahman",
          fullNameArabic: "د. يوسف عبد الرحمن",
          namePrefix: "Dr.",
          stageOfCareer: "Senior Registrar",
          personalEmail: "yousif.abdelrahman@hospital.com",
          agreeToEmailPublication: false,
          universityOfPrimaryGraduation: "University of Gezira",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2011",
          qualifications: ["MBBS", "MRCPCH"],
          paediatricsSubspecialty: ["Pediatric Pulmonology"],
          subspecialtyCertified: "No",
          currentPosition: "Senior Registrar in Pediatric Pulmonology",
          currentInstitution: "Gezira Pediatric Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.PENDING,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: paediatricDoctorUsers[7].id,
          fullNameEnglish: "Dr. Lina Hassan",
          fullNameArabic: "د. لينا حسن",
          namePrefix: "Dr.",
          stageOfCareer: "Consultant",
          personalEmail: "lina.hassan@hospital.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2007",
          qualifications: ["MBBS", "MD"],
          paediatricsSubspecialty: ["Pediatric Infectious Diseases"],
          subspecialtyCertified: "Yes",
          currentPosition: "Consultant Pediatric Infectious Diseases",
          currentInstitution: "Khartoum Infectious Diseases Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: paediatricDoctorUsers[8].id,
          fullNameEnglish: "Dr. Ahmed Babiker",
          fullNameArabic: "د. أحمد بابكر",
          namePrefix: "Dr.",
          stageOfCareer: "Registrar",
          personalEmail: "ahmed.babiker@hospital.com",
          agreeToEmailPublication: false,
          universityOfPrimaryGraduation: "University of Gezira",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2013",
          qualifications: ["MBBS"],
          paediatricsSubspecialty: ["Pediatric Rheumatology"],
          subspecialtyCertified: "No",
          currentPosition: "Registrar in Pediatric Rheumatology",
          currentInstitution: "Gezira Pediatric Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.PENDING,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: paediatricDoctorUsers[9].id,
          fullNameEnglish: "Dr. Salma Abdelaziz",
          fullNameArabic: "د. سلمى عبد العزيز",
          namePrefix: "Dr.",
          stageOfCareer: "Consultant",
          personalEmail: "salma.abdelaziz@hospital.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2006",
          qualifications: ["MBBS", "MD"],
          paediatricsSubspecialty: ["Pediatric Hematology"],
        subspecialtyCertified: "Yes",
          currentPosition: "Consultant Pediatric Hematologist",
          currentInstitution: "Khartoum Hematology Center",
          countryOfWork: "Sudan",
        applicationStatus: ApplicationStatus.APPROVED,
      },
      }),
    ]);

    // Create 10 more paediatric doctors (for a total of 20)
    const morePaediatricDoctorUsers = await Promise.all([
      prisma.user.create({
        data: {
          email: "paed11@example.com",
          name: "Dr. Samir Abdelrahim",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed12@example.com",
          name: "Dr. Rania Hassan",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed13@example.com",
          name: "Dr. Bashir Elamin",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed14@example.com",
          name: "Dr. Hiba Abdelgadir",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed15@example.com",
          name: "Dr. Tarek Mohamed",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed16@example.com",
          name: "Dr. Eman Fadl",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed17@example.com",
          name: "Dr. Khalifa Adam",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed18@example.com",
          name: "Dr. Salwa Osman",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed19@example.com",
          name: "Dr. Mazin Abdelaziz",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
      prisma.user.create({
        data: {
          email: "paed20@example.com",
          name: "Dr. Rasha Elhadi",
          password: await hash("password123", 10),
          role: UserRole.PAEDIATRIC_DOCTOR,
          emailVerified: new Date(),
          onboarded: true,
        },
      }),
    ]);

    await Promise.all([
      prisma.paediatricDoctor.create({
        data: {
          userId: morePaediatricDoctorUsers[0].id,
          fullNameEnglish: "Dr. Samir Abdelrahim",
          fullNameArabic: "د. سمير عبد الرحيم",
          namePrefix: "Dr.",
          stageOfCareer: "Consultant",
          personalEmail: "samir.abdelrahim@hospital.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2001",
          qualifications: ["MBBS", "MD"],
          paediatricsSubspecialty: ["Pediatric Nephrology"],
          subspecialtyCertified: "Yes",
          currentPosition: "Consultant Pediatric Nephrologist",
          currentInstitution: "Khartoum Renal Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: morePaediatricDoctorUsers[1].id,
          fullNameEnglish: "Dr. Rania Hassan",
          fullNameArabic: "د. رانيا حسن",
          namePrefix: "Dr.",
          stageOfCareer: "Senior Registrar",
          personalEmail: "rania.hassan@hospital.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Gezira",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2009",
          qualifications: ["MBBS", "MRCPCH"],
          paediatricsSubspecialty: ["Pediatric Emergency Medicine"],
          subspecialtyCertified: "No",
          currentPosition: "Senior Registrar in Pediatric Emergency",
          currentInstitution: "Gezira Emergency Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: morePaediatricDoctorUsers[2].id,
          fullNameEnglish: "Dr. Bashir Elamin",
          fullNameArabic: "د. بشير الأمين",
          namePrefix: "Dr.",
          stageOfCareer: "Lecturer",
          personalEmail: "bashir.elamin@university.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2014",
          qualifications: ["MBBS"],
          paediatricsSubspecialty: ["Pediatric Infectious Diseases"],
          subspecialtyCertified: "Yes",
          currentPosition: "Lecturer in Pediatrics",
          currentInstitution: "University of Khartoum",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: morePaediatricDoctorUsers[3].id,
          fullNameEnglish: "Dr. Hiba Abdelgadir",
          fullNameArabic: "د. هبة عبد القادر",
          namePrefix: "Dr.",
          stageOfCareer: "Consultant",
          personalEmail: "hiba.abdelgadir@hospital.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Gezira",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2007",
          qualifications: ["MBBS", "MD"],
          paediatricsSubspecialty: ["Pediatric Cardiology"],
          subspecialtyCertified: "Yes",
          currentPosition: "Consultant Pediatric Cardiologist",
          currentInstitution: "Gezira Heart Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: morePaediatricDoctorUsers[4].id,
          fullNameEnglish: "Dr. Tarek Mohamed",
          fullNameArabic: "د. طارق محمد",
          namePrefix: "Dr.",
          stageOfCareer: "Registrar",
          personalEmail: "tarek.mohamed@hospital.com",
          agreeToEmailPublication: false,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2016",
          qualifications: ["MBBS"],
          paediatricsSubspecialty: ["Pediatric Neurology"],
          subspecialtyCertified: "No",
          currentPosition: "Registrar in Pediatric Neurology",
          currentInstitution: "Khartoum Children's Hospital",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: morePaediatricDoctorUsers[5].id,
          fullNameEnglish: "Dr. Eman Fadl",
          fullNameArabic: "د. إيمان فضل",
          namePrefix: "Dr.",
          stageOfCareer: "Consultant",
          personalEmail: "eman.fadl@hospital.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2003",
          qualifications: ["MBBS", "MD"],
          paediatricsSubspecialty: ["Pediatric Oncology"],
          subspecialtyCertified: "Yes",
          currentPosition: "Consultant Pediatric Oncologist",
          currentInstitution: "Khartoum Oncology Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: morePaediatricDoctorUsers[6].id,
          fullNameEnglish: "Dr. Khalifa Adam",
          fullNameArabic: "د. خليفة آدم",
          namePrefix: "Dr.",
          stageOfCareer: "Senior Registrar",
          personalEmail: "khalifa.adam@hospital.com",
          agreeToEmailPublication: false,
          universityOfPrimaryGraduation: "University of Gezira",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2010",
          qualifications: ["MBBS", "MRCPCH"],
          paediatricsSubspecialty: ["Pediatric Pulmonology"],
          subspecialtyCertified: "No",
          currentPosition: "Senior Registrar in Pediatric Pulmonology",
          currentInstitution: "Gezira Pediatric Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: morePaediatricDoctorUsers[7].id,
          fullNameEnglish: "Dr. Salwa Osman",
          fullNameArabic: "د. سلوى عثمان",
          namePrefix: "Dr.",
          stageOfCareer: "Consultant",
          personalEmail: "salwa.osman@hospital.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2004",
          qualifications: ["MBBS", "MD"],
          paediatricsSubspecialty: ["Pediatric Endocrinology"],
          subspecialtyCertified: "Yes",
          currentPosition: "Consultant Pediatric Endocrinologist",
          currentInstitution: "Khartoum Endocrine Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: morePaediatricDoctorUsers[8].id,
          fullNameEnglish: "Dr. Mazin Abdelaziz",
          fullNameArabic: "د. مازن عبد العزيز",
          namePrefix: "Dr.",
          stageOfCareer: "Registrar",
          personalEmail: "mazin.abdelaziz@hospital.com",
          agreeToEmailPublication: false,
          universityOfPrimaryGraduation: "University of Gezira",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2017",
          qualifications: ["MBBS"],
          paediatricsSubspecialty: ["Pediatric Rheumatology"],
          subspecialtyCertified: "No",
          currentPosition: "Registrar in Pediatric Rheumatology",
          currentInstitution: "Gezira Pediatric Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
      prisma.paediatricDoctor.create({
        data: {
          userId: morePaediatricDoctorUsers[9].id,
          fullNameEnglish: "Dr. Rasha Elhadi",
          fullNameArabic: "د. رشا الهادي",
          namePrefix: "Dr.",
          stageOfCareer: "Consultant",
          personalEmail: "rasha.elhadi@hospital.com",
          agreeToEmailPublication: true,
          universityOfPrimaryGraduation: "University of Khartoum",
          countryOfUniversityOfPrimaryGraduation: "Sudan",
          yearOfGraduationFromMedicine: "2000",
          qualifications: ["MBBS", "MD"],
          paediatricsSubspecialty: ["Pediatric Hematology"],
          subspecialtyCertified: "Yes",
          currentPosition: "Consultant Pediatric Hematologist",
          currentInstitution: "Khartoum Hematology Center",
          countryOfWork: "Sudan",
          applicationStatus: ApplicationStatus.APPROVED,
        },
      }),
    ]);

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