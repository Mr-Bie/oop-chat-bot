import { Message } from "@/models/message";

interface MessageComponent {
    message: Message
}

export default function MessageComponent({ message }: MessageComponent) {
    return (
        <div className={`w-full flex ${message.role === 'bot' ? 'justify-end' : 'justify-start'}`}>
            <span className={`w-fit block p-2 rounded ${message.role === 'bot' ? 'bg-blue-100 text-left' : 'bg-green-100 text-right'}`}>
                {message.content}
            </span>
        </div>
    )
}