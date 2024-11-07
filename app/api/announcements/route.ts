// app/api/announcements/route.ts
import prismadb from '@/lib/prismadb';
import { sendAnnouncementEmail } from '@/utils/email';
import { NextResponse } from 'next/server';

// Create the announcement and send emails to all users
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, startDate, endDate  } = body;

    if (!title || !description) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    // Create the announcement in the database
    const announcement = await prismadb.announcement.create({
        data: {
            title,
            description,
            imageUrl,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
          },
    });

    // Fetch all user emails from the database
    const users = await prismadb.user.findMany({
      select: {
        email: true,
      },
    });

    // Send email to each user
    for (const user of users) {
      await sendAnnouncementEmail(user.email as string,
        announcement.title,announcement.description,announcement.imageUrl || '');
    }

    return NextResponse.json({ success: true, announcement:{announcement}, message: 'Announcement created and emails sent.' });
  } catch (error) {
    console.error('Error creating announcement or sending emails:', error);
    return NextResponse.json({ success: false, error: 'Failed to create announcement or send emails.' }, { status: 500 });
  }
}

export async function GET(){
try{
  const announcement =await prismadb.announcement.findMany();
  return NextResponse.json({ success: true, announcement:announcement, message: '' });
}catch(error){
  console.error('Error Fetching Announcements', error);
  return NextResponse.json({ success: false, error: 'Failed to fetch announcements' }, { status: 500 });

}
}