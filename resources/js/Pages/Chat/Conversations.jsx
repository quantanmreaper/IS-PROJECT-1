import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Conversations({ conversations, auth }) {
    const [chats, setChats] = useState(conversations || []);
    const { user } = usePage().props.auth;
    
    // Listen for new messages
    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.private(`chat.${user.id}`);
            
            channel.listen('.MessageSent', (data) => {
                console.log('New message received in conversations:', data);
                
                // Update the unread count for the sender
                setChats(prevChats => {
                    const existingChatIndex = prevChats.findIndex(chat => chat.id === data.user.id);
                    
                    if (existingChatIndex >= 0) {
                        // Update existing chat
                        const updatedChats = [...prevChats];
                        updatedChats[existingChatIndex] = {
                            ...updatedChats[existingChatIndex],
                            unread_count: (updatedChats[existingChatIndex].unread_count || 0) + 1
                        };
                        return updatedChats;
                    } else {
                        // Add new chat
                        return [...prevChats, {
                            id: data.user.id,
                            name: data.user.name,
                            pfp: data.user.pfp,
                            unread_count: 1
                        }];
                    }
                });
            });
            
            return () => {
                channel.stopListening('.MessageSent');
            };
        }
    }, []);
    
    return (
        <AuthenticatedLayout>
            <Head title="My Conversations" />
            
            <div className="py-6">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
                            <h2 className="text-xl font-semibold">My Conversations</h2>
                        </div>
                        
                        <div className="p-6 bg-white">
                            {chats.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">
                                    <svg 
                                        className="mx-auto h-12 w-12 text-gray-400" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={1.5} 
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                                        />
                                    </svg>
                                    <p className="mt-2 text-sm font-medium">No conversations yet</p>
                                    <p className="mt-1 text-xs text-gray-500">Start chatting with tutors and mentors!</p>
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {chats.map((chat) => (
                                        <li key={chat.id} className="py-4">
                                            <Link 
                                                href={route('chat.show', chat.id)} 
                                                className="flex items-center hover:bg-gray-50 p-3 rounded-lg transition"
                                            >
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                                    {chat.pfp ? (
                                                        <img src={chat.pfp} alt={chat.name} className="h-10 w-10 object-cover" />
                                                    ) : (
                                                        <span className="text-lg font-medium text-gray-700">
                                                            {chat.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-gray-900">{chat.name}</p>
                                                        {chat.unread_count > 0 && (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                {chat.unread_count}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {chat.last_message && (
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {chat.last_message}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
