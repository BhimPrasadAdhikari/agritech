export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb'; // Adjust the import based on your Prisma setup

export async function POST(request: Request) {
  const { userId, friendId } = await request.json();

  try {
    // Ensure the user is not already friends
    const user = await prismadb.user.findUnique({
      where: { id: userId },
      select: { friendIds: true }, // Select only friendIds to check if the user is already a friend
    });

    const isAlreadyFriend = user?.friendIds.includes(friendId);
    if (isAlreadyFriend) {
      return NextResponse.json({ error: 'Already friends' }, { status: 400 });
    }

    // Add friend to user's friend list
    await prismadb.user.update({
      where: { id: userId },
      data: {
        friendIds: { push: friendId }, // Use push to add friendId to the array
      },
    });

    // Optionally, add this user to the friend's friendOfIds
    await prismadb.user.update({
      where: { id: friendId },
      data: {
        friendOfIds: { push: userId }, // Use push to add userId to the friend's friendOfIds array
      },
    });

    return NextResponse.json({ message: 'Friend added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding friend:', error);
    return NextResponse.json({ error: 'Failed to add friend' }, { status: 500 });
  }
}
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId'); // Assuming you're passing userId as a query parameter
  
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
  
    try {
      // Fetch the user's friend IDs
      const user = await prismadb.user.findUnique({
        where: { id: userId },
        select: { friendIds: true }, // Select only friendIds
      });
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      // Fetch friends' details using the friend IDs
      const friends = await prismadb.user.findMany({
        where: {
          id: { in: user.friendIds },
        },
        select: {
          id: true,
          name: true,
          image: true,
          // Add other fields you want to return
        },
      });
  
      return NextResponse.json({ friends }, { status: 200 });
    } catch (error) {
      console.error('Error fetching friends:', error);
      return NextResponse.json({ error: 'Failed to fetch friends' }, { status: 500 });
    }
  }
  