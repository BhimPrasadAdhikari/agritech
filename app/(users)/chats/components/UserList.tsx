// components/sidebar/UserList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserItem from './UserItem';
import { useSession } from 'next-auth/react';
import { Image, User } from '@prisma/client';
interface UserListProps{
  onSelectConversation: (
    conversationId: string,
    recipientId: string
  ) => void;
  addRecipientId: (id: string) => void;
}
const UserList:React.FC<UserListProps> = ({onSelectConversation,addRecipientId }) => {
  const [users, setUsers] = useState<(User & {image:Image})[]>([]);
  const currentUserId= useSession().data?.user.id

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data.users.filter((user:User) => user.id !== currentUserId));
    };
    fetchUsers();
  }, [currentUserId]);
console.log("users",users)
  return (
    <div className="p-4 bg-green-100">
      {users.map((user) => (
        <UserItem key={user.id} user={user} onSelectConversation={onSelectConversation} addRecipientId={addRecipientId}/>
      ))}
    </div>
  );
};

export default UserList;
