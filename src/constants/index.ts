export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as "Male" | "Female" | "Other",
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National ID Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Dr. John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Dr. Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Dr. David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Dr. Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Dr. Jane Powell",
  },
  {
    image: "/assets/images/dr-adams.png",
    name: "Dr. Jason Adams",
  },
  {
    image: "/assets/images/dr-smith.png",
    name: "Dr. Jacob Smith",
  },
  {
    image: "/assets/images/dr-murphy.png",
    name: "Dr. Ruth Murphy",
  },
  {
    image: "/assets/images/dr-jordan.png",
    name: "Dr. Mike Jordan",
  },
]; 