import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useState, useEffect } from 'react';

export default function Welcome({ auth }) {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900">
            <Head title="Welcome" />

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-24 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="text-center mb-16">
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 mb-6">
                                Peer Tutoring & Mentorship Platform
                            </h1>
                            <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Connect with mentors, collaborate with peers, and grow your skills in a supportive student-driven environment.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-16">
                            <Link
                                href={route('register')}
                                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition shadow-lg transform hover:scale-105 duration-200 flex items-center gap-2"
                            >
                                <span>Get Started</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link
                                href={route('login')}
                                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition shadow-md transform hover:scale-105 duration-200"
                            >
                                Log In
                            </Link>
                        </div>
                        
                        <div className="flex justify-center mb-16">
                            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 max-w-3xl">
                                <div className="flex justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-3">
                                    Join a Community of Learners
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-center">
                                    Our platform brings together students and mentors from across Kenya, creating a vibrant community focused on academic excellence and personal growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Our Platform?</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Our platform offers unique features designed to enhance your learning experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                ),
                                title: "Personalized Learning",
                                description: "Get matched with mentors based on your learning style and goals for a truly personalized experience."
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                                title: "Community Driven",
                                description: "Join a vibrant community of students and mentors who are passionate about learning and helping others."
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                title: "Safe & Supportive",
                                description: "Our platform ensures a safe, respectful environment where you can learn and grow with confidence."
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-blue-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-6 bg-blue-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Hear from students and mentors who have transformed their learning experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "This platform completely changed how I approach my studies. The mentors are amazing!",
                                name: "Alex Johnson",
                                role: "Computer Science Student"
                            },
                            {
                                quote: "Being able to help other students while reinforcing my own knowledge has been incredibly rewarding.",
                                name: "Sarah Chen",
                                role: "Mathematics Mentor"
                            },
                            {
                                quote: "I've made connections that will last beyond my college years. The community here is supportive and inspiring.",
                                name: "Miguel Rodriguez",
                                role: "Engineering Student"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
                                <div className="flex flex-col h-full">
                                    <div className="mb-4">
                                        <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 32 32">
                                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{testimonial.quote}</p>
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                                        <p className="text-blue-600 dark:text-blue-400 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-8 py-16 sm:p-16 md:p-20 text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to transform your learning experience?</h2>
                            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                                Join our community today and connect with mentors, tutors and peers who will help you achieve your academic goals.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    href={route('register')}
                                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg transform hover:scale-105 duration-200"
                                >
                                    Join Now
                                </Link>
                                <Link
                                    href="#"
                                    className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition shadow-lg transform hover:scale-105 duration-200"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 dark:bg-gray-900 py-16 px-6 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Peer Tutoring & Mentorship</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
                                Our mission is to create a supportive learning environment where students can connect, collaborate, and excel together.
                            </p>
                            <div className="flex space-x-5">
                                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors duration-300">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors duration-300">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                        How It Works
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        Become a Mentor
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    support@peermentoring.com
                                </li>
                                <li className="flex items-center text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    +254 712 345 678
                                </li>
                                <li className="flex items-center text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Nairobi, Kenya
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-gray-500 dark:text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Peer Tutoring & Mentorship Platform. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
