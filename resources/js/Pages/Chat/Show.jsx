// resources/js/Pages/Chat/Show.jsx
import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Show({ messages: initialMessages, recipient, auth }) {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    const messagesEndRef = useRef(null);

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    // Fetch messages from the server
    const fetchMessages = async () => {
        try {
            const response = await axios.get(`/messages/${recipient.id}`);
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        scrollToBottom();
        
        // Listen for incoming messages
        const channel = window.Echo.private(`chat.${auth.user.id}`);
        
        // Debug connection status
        window.Echo.connector.pusher.connection.bind('connected', () => {
            setConnectionStatus('connected');
            console.log('Connected to Pusher!');
        });
        
        window.Echo.connector.pusher.connection.bind('error', (error) => {
            setConnectionStatus('error');
            console.error('Pusher connection error:', error);
        });
        
        channel.listen('.MessageSent', (data) => {
            console.log('Message received:', data);
            if (data.message.sender_id === recipient.id) {
                setMessages((prevMessages) => [...prevMessages, data.message]);
            }
        });
        
        // Fallback polling mechanism
        const pollInterval = setInterval(() => {
            fetchMessages();
        }, 10000); // Poll every 10 seconds as fallback

        return () => {
            channel.stopListening('MessageSent');
            clearInterval(pollInterval);
            window.Echo.connector.pusher.connection.unbind('connected');
            window.Echo.connector.pusher.connection.unbind('error');
        };
    }, [recipient.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!newMessage.trim()) return;
        
        setLoading(true);
        
        try {
            const response = await axios.post(`/messages/${recipient.id}`, {
                message: newMessage
            });
            
            setMessages([...messages, response.data.message]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Chat with ${recipient.name}`} />
            
            <div className="py-6">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center overflow-hidden mr-3">
                                    {recipient.pfp ? (
                                        <img 
                                            src={recipient.pfp} 
                                            alt={recipient.name} 
                                            className="h-8 w-8 object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/storage/pfps/defaultpfp.png';
                                            }}
                                        />
                                    ) : (
                                        <span className="text-sm font-medium text-gray-700">
                                            {recipient.name.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-xl font-semibold">
                                    Chat with {recipient.name}
                                </h2>
                            </div>
                        </div>
                        
                        <div className="p-6 bg-gray-50 h-96 overflow-y-auto">
                            {messages.length === 0 ? (
                                <div className="text-center text-gray-500">
                                    No messages yet. Start the conversation!
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <div 
                                        key={message.id} 
                                        className={`mb-4 ${message.sender_id === auth.user.id ? 'text-right' : 'text-left'}`}
                                    >
                                        <div className="flex items-center">
                                            {message.sender_id !== auth.user.id && (
                                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-2">
                                                    {message.sender && message.sender.pfp ? (
                                                        <img 
                                                            src={message.sender.pfp} 
                                                            alt={message.sender.name} 
                                                            className="h-6 w-6 object-cover"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = '/storage/pfps/defaultpfp.png';
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-xs font-medium text-gray-700">
                                                            {message.sender ? message.sender.name.charAt(0).toUpperCase() : '?'}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <div 
                                                className={`inline-block px-4 py-2 rounded-lg ${
                                                    message.sender_id === auth.user.id 
                                                        ? 'bg-blue-500 text-white ml-auto' 
                                                        : 'bg-gray-300 text-gray-800'
                                                }`}
                                            >
                                                {message.message}
                                            </div>
                                            {message.sender_id === auth.user.id && (
                                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ml-2">
                                                    {auth.user.pfp ? (
                                                        <img 
                                                            src={auth.user.pfp} 
                                                            alt={auth.user.name} 
                                                            className="h-6 w-6 object-cover"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = '/storage/pfps/defaultpfp.png';
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-xs font-medium text-gray-700">
                                                            {auth.user.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className={`text-xs text-gray-500 mt-1 ${message.sender_id === auth.user.id ? 'text-right' : 'text-left'}`}>
                                            {new Date(message.created_at).toLocaleTimeString()}
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        
                        <div className="p-4 bg-white border-t">
                            <form onSubmit={handleSubmit} className="flex">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                    placeholder="Type your message..."
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    disabled={loading || !newMessage.trim()}
                                >
                                    {loading ? 'Sending...' : 'Send'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}