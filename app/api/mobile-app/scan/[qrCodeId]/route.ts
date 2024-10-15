import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";
import { corsHeaders } from "../../options";
import { Role } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { qrCodeId: string } }
) {
  const { qrCodeId } = params;

  const token = req.headers.get("Authorization")?.split(" ")[1] as string;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Access denied." },
      { headers: corsHeaders, status: 401 }
    );
  }

  let decoded = jwt.decode(token, { complete: true });

  const userId = decoded?.payload.sub as string;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      workshopToAttend: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Access denied." },
      { headers: corsHeaders, status: 404 }
    );
  }

  if (user.role !== Role.USER) {
    return NextResponse.json(
      {
        success: false,
        message: "You shouldn't scan this QR code. It's for users only.",
      },
      { headers: corsHeaders, status: 404 }
    );
  }

  const qrCode = await prisma.qrCode.findUnique({
    where: {
      id: qrCodeId,
    },
    include: {
      scannedBy: true,
      workshop: true,
      lecture: true,
    },
  }); //qr scanned by user

  if (!qrCode || qrCode.isPublished === false) {
    return NextResponse.json(
      { success: false, message: "This QR code doesn't exist." },
      { headers: corsHeaders, status: 404 }
    );
  }

  if (user.isPresentAtEvent === false) {
    return NextResponse.json(
      {
        name: qrCode.name,
        value: qrCode.value,
        success: false,
        message: "You need to be present at event to scan QR codes.",
      },
      { headers: corsHeaders, status: 404 }
    );
  }

  //Checking if user scanned this qr already
  const alreadyScanned = qrCode.scannedBy.find(
    (scannedBy) => scannedBy.id === userId
  );

  if (alreadyScanned) {
    return NextResponse.json(
      {
        name: qrCode.name,
        value: qrCode.value,
        success: false,
        message: "You already scanned this QR code.",
      },
      { headers: corsHeaders, status: 400 }
    );
  }
  //Checking if the scanning limit has not been exceeded
  const scannedCount = qrCode.scannedBy.length;
  if (qrCode.maxUses > 0 && scannedCount >= qrCode.maxUses) {
    return NextResponse.json(
      {
        name: qrCode.name,
        value: qrCode.value,
        success: false,
        message: "This QR code was scanned too many times.",
      },
      { headers: corsHeaders, status: 400 }
    );
  }

  //Can't scan other workshops qr codes if user is already in a different workshop
  if (
    qrCode.workshop?.id !== null &&
    qrCode.workshop?.id !== user?.workshopToAttendId
  ) {
    return NextResponse.json(
      {
        name: qrCode.name,
        value: qrCode.value,
        success: false,
        message: "This code is not for your workshop.",
      },
      { headers: corsHeaders, status: 400 }
    );
  }
  //Cant scan qr code for workshop if user is not present at workshop
  if (
    qrCode.workshop?.id === user?.workshopToAttendId &&
    user?.isPresentAtWorkshop === false
  ) {
    return NextResponse.json(
      {
        name: qrCode.name,
        value: qrCode.value,
        success: false,
        message: "You can't scan this because you're not present at workshop.",
      },
      { headers: corsHeaders, status: 400 }
    );
  }

  const currentTime = new Date().toLocaleDateString("pl-PL");

  const startDate = user.workshopToAttend?.startDate
    ? new Date(user.workshopToAttend.startDate).toLocaleDateString("pl-PL")
    : "No start date available"; //it wont happen but typescript ;-)

  const endDate = user.workshopToAttend?.endDate
    ? new Date(user.workshopToAttend.endDate).toLocaleDateString("pl-PL")
    : "No end date available"; //it wont happen but typescript ;-)

  //Can't scan other qr codes if user is at workshop during workshop time
  if (
    user.workshopToAttendId !== null &&
    user.workshopToAttendId === qrCode.workshop?.id
  ) {
    if (
      currentTime >= startDate &&
      currentTime <= endDate &&
      qrCode.workshop.id !== user.workshopToAttendId
    ) {
      return NextResponse.json(
        {
          name: qrCode.name,
          value: qrCode.value,
          success: false,
          message: "You can't scan other codes during workshop time.",
        },
        { headers: corsHeaders, status: 400 }
      );
    }
  }
  const workshopStartDate = qrCode.workshop?.startDate
    ? new Date(qrCode.workshop.startDate).toLocaleDateString("pl-PL")
    : "No start date available"; //it wont happen but typescript ;-)

  const workshopEndDate = qrCode.workshop?.endDate
    ? new Date(qrCode.workshop.endDate).toLocaleDateString("pl-PL")
    : "No end date available"; //it wont happen but typescript ;-)

  //Can't scan qr code for workshop  before workshop start date or after workshop end date
  if (qrCode.workshop !== null) {
    if (currentTime <= startDate) {
      return NextResponse.json(
        {
          name: qrCode.name,
          value: qrCode.value,
          success: false,
          message: "This workshop didn`t start yet. Wait please.",
        },
        { headers: corsHeaders, status: 400 }
      );
    }
    if (currentTime >= endDate) {
      return NextResponse.json(
        {
          name: qrCode.name,
          value: qrCode.value,
          success: false,
          message: "Too late. This workshop ended.",
        },
        { headers: corsHeaders, status: 400 }
      );
    }
  }

  await prisma.qrCode.update({
    where: {
      id: qrCodeId,
    },
    data: {
      scannedBy: {
        connect: {
          id: userId,
        },
      },
    },
  });
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      points: {
        increment: qrCode.value as number,
      },
    },
  });
  return NextResponse.json(
    {
      name: qrCode.name,
      value: qrCode.value,
      success: true,
      message: "Scanned successfully!",
    },
    { headers: corsHeaders, status: 200 }
  );
}
