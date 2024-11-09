// components/sidebar/UserList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserItem from "./UserItem";
import { useSession } from "next-auth/react";
import { Image as ImageType, User } from "@prisma/client";

interface UserListProps {
  onSelectConversation: (conversationId: string | null, recipientId: string) => void;
  addRecipientId: (id: string) => void;
}
const UserList: React.FC<UserListProps> = ({
  onSelectConversation,
  addRecipientId,
}) => {
  const [users, setUsers] = useState<(User & { image: ImageType })[]>([]);
  const currentUserId = useSession().data?.user.id;
  const [loading, setLoading] = useState(false);

  const onConversationSelect = (
    conversationId: string| null,
    recipientId: string
  ) => {
    onSelectConversation(conversationId, recipientId);
  };

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(
          response.data.users.filter((user: User) => user.id !== currentUserId)
        );
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentUserId]);
  if (loading)
    return (
     <div>loading</div>

    );
  return (
    <div className="w-full">
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onSelectConversation={onConversationSelect}
          addRecipientId={addRecipientId}
        />
      ))}
    </div>
  );
};

export default UserList;
