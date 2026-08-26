import { PrismaClient, Role, SponsorType } from "@prisma/client";
import * as QRCode from "qrcode";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "emklisbb@gmail.com";

/** Event day used for all schedule dates (defaults to next Saturday). */
const eventDate = process.env.NEXT_PUBLIC_EVENT_DATE
  ? new Date(process.env.NEXT_PUBLIC_EVENT_DATE)
  : (() => {
      const d = new Date();
      d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
      return d;
    })();

function at(hour: number, minute = 0): Date {
  const d = new Date(eventDate);
  d.setHours(hour, minute, 0, 0);
  return d;
}

async function createQrCode(data: {
  name: string;
  value?: number;
  maxUses?: number;
}): Promise<{ id: string }> {
  const id = randomUUID();
  const base64 = await QRCode.toDataURL(id);
  return prisma.qrCode.create({
    data: {
      id,
      name: data.name,
      value: data.value,
      maxUses: data.maxUses ?? 0,
      base64,
      isPublished: true,
    },
  });
}

type SeedUser = {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  position?: string;
  website?: string;
};

const users: SeedUser[] = [
  {
    email: ADMIN_EMAIL,
    firstName: "Mateusz",
    lastName: "Kliś",
    role: Role.ADMIN,
    position: "Organizer",
  },
  // Volunteers (staff page lists VOLUNTEER users)
  {
    email: "ala.nowak@example.com",
    firstName: "Alicja",
    lastName: "Nowak",
    role: Role.VOLUNTEER,
    position: "Registration desk",
  },
  {
    email: "piotr.wisniewski@example.com",
    firstName: "Piotr",
    lastName: "Wiśniewski",
    role: Role.VOLUNTEER,
    position: "QR scanning crew",
  },
  // Lecturers
  {
    email: "katarzyna.kowalska@example.com",
    firstName: "Katarzyna",
    lastName: "Kowalska",
    role: Role.LECTURER,
    position: "Senior Frontend Engineer",
    website: "https://example.com/kowalska",
  },
  {
    email: "michal.zielinski@example.com",
    firstName: "Michał",
    lastName: "Zieliński",
    role: Role.LECTURER,
    position: "DevOps Lead",
  },
  {
    email: "anna.lewandowska@example.com",
    firstName: "Anna",
    lastName: "Lewandowska",
    role: Role.LECTURER,
    position: "UX Researcher",
  },
  // Regular attendees
  {
    email: "jan.kowalski@example.com",
    firstName: "Jan",
    lastName: "Kowalski",
    role: Role.USER,
  },
  {
    email: "maria.kaminska@example.com",
    firstName: "Maria",
    lastName: "Kamińska",
    role: Role.USER,
  },
  {
    email: "tomasz.wójcik@example.com",
    firstName: "Tomasz",
    lastName: "Wójcik",
    role: Role.USER,
  },
  {
    email: "zofia.szymanska@example.com",
    firstName: "Zofia",
    lastName: "Szymańska",
    role: Role.USER,
  },
  {
    email: "krystian.dabrowski@example.com",
    firstName: "Krystian",
    lastName: "Dąbrowski",
    role: Role.USER,
  },
];

async function main() {
  console.log("🌱 Clearing existing data...");
  // FK-safe order
  await prisma.verification.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.lecture.deleteMany();
  await prisma.workshop.deleteMany();
  await prisma.reward.deleteMany();
  await prisma.sponsor.deleteMany();
  await prisma.qrCode.deleteMany();
  await prisma.user.deleteMany();

  console.log("👤 Creating users...");
  const createdUsers: Record<string, { id: string; email: string }> = {};
  for (const u of users) {
    createdUsers[u.email] = await prisma.user.create({
      data: {
        id: randomUUID(),
        name: `${u.firstName} ${u.lastName}`.trim(),
        email: u.email,
        emailVerified: true,
        firstName: u.firstName,
        lastName: u.lastName,
        role: u.role,
        position: u.position,
        website: u.website,
        isPresentAtEvent: u.role === Role.USER ? false : true,
      },
    });
  }
  console.log("🎤 Creating lectures with QR codes...");
  const lecturePoints = Number(process.env.APP_LECTURE_POINTS_VALUE) || 10;
  const lectureSeed = [
    {
      topic: "React Server Components in practice",
      description:
        "Deep dive into RSC architecture, streaming and when to reach for client components.",
      room: "A1",
      lecturer: "katarzyna.kowalska@example.com",
      startHour: 9,
    },
    {
      topic: "Zero-downtime deployments with Docker & Kubernetes",
      description:
        "Rolling updates, readiness probes and rollback strategies that actually work.",
      room: "B2",
      lecturer: "michal.zielinski@example.com",
      startHour: 11,
    },
    {
      topic: "Design systems developers don't hate",
      description:
        "How to build a token-based design system that survives contact with real product teams.",
      room: "A2",
      lecturer: "anna.lewandowska@example.com",
      startHour: 14,
    },
  ];

  for (const l of lectureSeed) {
    const qr = await createQrCode({
      name: l.topic,
      value: lecturePoints,
      maxUses: 50,
    });
    await prisma.lecture.create({
      data: {
        topic: l.topic,
        description: l.description,
        room: l.room,
        isPublished: true,
        startDate: at(l.startHour),
        endDate: at(l.startHour + 1, 30),
        qrCodeId: qr.id,
        lecturers: {
          connect: { id: createdUsers[l.lecturer].id },
        },
      },
    });
  }

  console.log("🛠 Creating workshops with QR codes...");
  const workshopPoints = Number(process.env.APP_WORKSHOP_POINTS_VALUE) || 10;
  const workshopSeed = [
    {
      topic: "Build your own design system with Tailwind",
      description:
        "Hands-on: from color tokens to published component library in 90 minutes.",
      room: "WS-1",
      maxAttenders: Number(process.env.APP_WORKSHOP_MAXIMUM_PARTICIPANTS_VALUE) || 30,
      lecturer: "katarzyna.kowalska@example.com",
      startHour: 10,
      attendee: "jan.kowalski@example.com",
    },
    {
      topic: "Kubernetes 101: ship your first service",
      description:
        "Bring a laptop. Leave with a running deployment, ingress and HPA.",
      room: "WS-2",
      maxAttenders: 20,
      lecturer: "michal.zielinski@example.com",
      startHour: 13,
      attendee: null,
    },
  ];

  for (const w of workshopSeed) {
    const qr = await createQrCode({
      name: w.topic,
      value: workshopPoints,
      maxUses: w.maxAttenders,
    });
    const workshop = await prisma.workshop.create({
      data: {
        topic: w.topic,
        description: w.description,
        room: w.room,
        isPublished: true,
        startDate: at(w.startHour),
        endDate: at(w.startHour + 2),
        maxAttenders: w.maxAttenders,
        qrCodeId: qr.id,
        lecturers: {
          connect: { id: createdUsers[w.lecturer].id },
        },
        attenders: w.attendee
          ? { connect: { id: createdUsers[w.attendee].id } }
          : undefined,
      },
    });

    // Give the connected attendee their workshop seat
    if (w.attendee) {
      await prisma.user.update({
        where: { id: createdUsers[w.attendee].id },
        data: { workshopToAttendId: workshop.id },
      });
    }
  }

  console.log("🤝 Creating sponsors with QR codes...");
  const sponsorPoints = Number(process.env.APP_SPONSOR_PARTNER_POINTS_VALUE) || 10;
  const sponsorSeed: Array<{
    name: string;
    type: SponsorType;
    description: string;
    websiteUrl: string;
  }> = [
    {
      name: "TechCorp",
      type: SponsorType.DIAMOND,
      description: "Platinum-grade cloud platform partner.",
      websiteUrl: "https://techcorp.example.com",
    },
    {
      name: "DevTools.io",
      type: SponsorType.GOLD,
      description: "Developer tooling and CI/CD goodies.",
      websiteUrl: "https://devtools.example.com",
    },
    {
      name: "PixelPerfect Studio",
      type: SponsorType.SILVER,
      description: "Design agency behind our visual identity.",
      websiteUrl: "https://pixelperfect.example.com",
    },
    {
      name: "Coffee4Coders",
      type: SponsorType.PARTNER,
      description: "Fueling the conference since day one.",
      websiteUrl: "https://coffee4coders.example.com",
    },
  ];

  for (const s of sponsorSeed) {
    const qr = await createQrCode({
      name: s.name,
      value: sponsorPoints,
      maxUses: 200,
    });
    await prisma.sponsor.create({
      data: {
        ...s,
        isPublished: true,
        qrCodeId: qr.id,
      },
    });
  }

  console.log("🎁 Creating rewards...");
  await prisma.reward.createMany({
    data: [
      {
        name: "Sticker pack",
        description: "Exclusive event sticker pack.",
        quantity: 100,
        isPublished: true,
      },
      {
        name: "Event t-shirt",
        description: "Limited edition t-shirt for active scanners.",
        quantity: 50,
        isPublished: true,
      },
      {
        name: "Mechanical keyboard",
        description: "Grand prize for the top point scorer.",
        quantity: 1,
        isPublished: true,
      },
    ],
  });

  console.log("📷 Simulating some scans...");
  // Two attendees scanned the TechCorp sponsor QR + first lecture QR
  const sponsorQr = await prisma.qrCode.findFirstOrThrow({
    where: { name: "TechCorp" },
  });
  const lectureQr = await prisma.qrCode.findFirstOrThrow({
    where: { name: lectureSeed[0].topic },
  });

  let bonusPoints = 0;
  for (const email of ["jan.kowalski@example.com", "maria.kaminska@example.com"]) {
    const gained = (sponsorQr.value ?? 0) + (lectureQr.value ?? 0);
    bonusPoints += gained;
    await prisma.user.update({
      where: { id: createdUsers[email].id },
      data: { points: { increment: gained } },
    });
    await prisma.qrCode.update({
      where: { id: sponsorQr.id },
      data: { scannedBy: { connect: { id: createdUsers[email].id } } },
    });
    await prisma.qrCode.update({
      where: { id: lectureQr.id },
      data: { scannedBy: { connect: { id: createdUsers[email].id } } },
    });
    // One attendee already checked in at the event
    if (email === "jan.kowalski@example.com") {
      await prisma.user.update({
        where: { id: createdUsers[email].id },
        data: { isPresentAtEvent: true },
      });
    }
  }

  console.log(`
✅ Seed complete!
   Admin:            ${ADMIN_EMAIL} (role=ADMIN — sign in via Google with this account)
   Volunteers:       2 | Lecturers: 3 | Attendees: 5
   Lectures:         ${lectureSeed.length} | Workshops: ${workshopSeed.length}
   Sponsors:         ${sponsorSeed.length} | Rewards: 3
   Scanned samples:  2 users × 2 QR codes (${bonusPoints} pts total awarded)
`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
