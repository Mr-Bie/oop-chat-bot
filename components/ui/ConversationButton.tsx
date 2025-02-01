import { useState } from "react";
import { Conversation } from "@/models/conversation";
import { Button } from "../common/button";

interface ConversationProps {
    conversation: Conversation;
    active: boolean;
    onClick: (id: Conversation["id"]) => void;
    onDeleteConversation: (id: Conversation["id"]) => void
}

export default function ConversationButton({ conversation, active, onClick, onDeleteConversation }: ConversationProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [title, setTitle] = useState(conversation.title || "مکالمه جدید");
    const [isEditing, setIsEditing] = useState(false);

    const handleRightClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setMenuPosition({ x: event.pageX, y: event.pageY });
        setMenuVisible(true);
    };

    const handleCloseMenu = () => {
        setMenuVisible(false);
    };

    const handleEditTitleClick = () => {
        setMenuVisible(false);
        setIsEditing(true);
    };

    const updateConversationTitle = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsEditing(false);
        const res = await fetch(`/api/conversations/${conversation.id}`, {
            body: JSON.stringify({ title }),
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });
        const newConversation = await res.json();
        setTitle(newConversation.title);

        return newConversation;
    }

    const deleteConversation = async () => {
        await fetch(`/api/conversations/${conversation.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        onDeleteConversation(conversation.id);
    }

    return (
        <>
            <div
                className={`p-2 cursor-pointer ${active ? 'bg-blue-200' : 'bg-gray-100'}`}
                onClick={() => onClick(conversation.id)}
                onContextMenu={handleRightClick}
            >
                {isEditing ? (
                    <form onSubmit={updateConversationTitle}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                            className="border rounded px-2 py-1"
                            onBlur={() => setIsEditing(false)}
                        />
                    </form>
                ) : (
                    title
                )}
            </div>

            {menuVisible && (
                <div
                    className="absolute bg-white shadow-lg border rounded-md p-4 z-50 flex flex-col gap-4"
                    style={{ top: menuPosition.y, left: menuPosition.x }}
                    onMouseLeave={handleCloseMenu}
                >
                    <Button variant="ghost" onClick={handleEditTitleClick}>
                        تغییر نام
                    </Button>
                    <Button variant="destructive" onClick={deleteConversation}>
                        حذف
                    </Button>
                </div>
            )}
        </>
    );
}
