import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Clock, LayoutDashboard, ArrowRight, Check, Phone, Mail, Smartphone, Users, Zap, Shield } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 flex justify-between items-center px-8 py-4 shadow-sm">
                <div className="text-2xl font-bold text-emerald-600 flex items-center gap-2">
                    <MessageSquare className="w-8 h-8" />
                    QueueCare
                </div>
                <div className="flex items-center gap-6">
                    <a href="#features" className="text-slate-600 hover:text-emerald-600 transition font-medium hidden md:block">Features</a>
                    <a href="#pricing" className="text-slate-600 hover:text-emerald-600 transition font-medium hidden md:block">Pricing</a>
                    <a href="#contact" className="text-slate-600 hover:text-emerald-600 transition font-medium hidden md:block">Contact</a>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="max-w-7xl mx-auto px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Zap className="w-4 h-4" />
                        No apps. No hardware. Just WhatsApp.
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                        Stop making patients <span className="text-emerald-600">wait in lines.</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-700">
                        Manage your clinic queue on WhatsApp.
                    </h2>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                        QueueCare helps clinics manage patient queues, tokens, and wait times using WhatsApp — so patients wait at home, not outside your clinic.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white text-lg rounded-full hover:bg-emerald-700 transition shadow-xl shadow-emerald-200 hover:shadow-2xl transform hover:-translate-y-1">
                            Get Free Demo <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <div className="relative w-full">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                        <img
                            src="/QueueCare.png"
                            alt="QueueCare Dashboard"
                            className="relative w-full rounded-2xl shadow-2xl border border-slate-200"
                        />
                    </div>
                </div>
            </header>

            {/* How It Works */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">How It Works</h2>
                    <p className="text-xl text-slate-500 text-center mb-16 max-w-2xl mx-auto">Simple, fast, and effective queue management</p>

                    <div className="grid md:grid-cols-4 gap-8">
                        <StepCard number="1" title="Patients Join via WhatsApp" description="Scan QR code or message your clinic to join the queue instantly" />
                        <StepCard number="2" title="Automatic Token Numbers" description="Each patient receives a unique token number automatically" />
                        <StepCard number="3" title="Live Updates Sent" description="Patients get real-time updates on their turn via WhatsApp" />
                        <StepCard number="4" title="You Control Everything" description="Manage the entire queue from a simple, beautiful dashboard" />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="bg-gradient-to-b from-slate-50 to-white py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">Why Clinics Love QueueCare</h2>
                    <p className="text-xl text-slate-500 text-center mb-16 max-w-2xl mx-auto">Everything you need to manage patient flow efficiently</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<MessageSquare className="w-10 h-10 text-emerald-500" />}
                            title="WhatsApp Integration"
                            description="Patients join by scanning a QR code or sending a message. No app download required."
                        />
                        <FeatureCard
                            icon={<Clock className="w-10 h-10 text-emerald-500" />}
                            title="Real-time Updates"
                            description="Automatic notifications for turns, delays, and missed calls sent directly to patients."
                        />
                        <FeatureCard
                            icon={<LayoutDashboard className="w-10 h-10 text-emerald-500" />}
                            title="Simple Dashboard"
                            description="Designed for anyone to use. Big buttons, clear lists, zero clutter."
                        />
                        <FeatureCard
                            icon={<Smartphone className="w-10 h-10 text-emerald-500" />}
                            title="Works on Any Phone"
                            description="No special hardware needed. Manage from any device with a browser."
                        />
                        <FeatureCard
                            icon={<Users className="w-10 h-10 text-emerald-500" />}
                            title="Designed for Local Clinics"
                            description="Built specifically for Indian clinics. Simple, affordable, and effective."
                        />
                        <FeatureCard
                            icon={<Shield className="w-10 h-10 text-emerald-500" />}
                            title="No Complicated Setup"
                            description="Get started in minutes. No IT team required. We help you set up."
                        />
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">Simple pricing for busy clinics</h2>
                    <p className="text-xl text-slate-500 text-center mb-4 max-w-2xl mx-auto">Start free, upgrade when you're ready</p>
                    <p className="text-center text-emerald-600 font-medium mb-16">No setup fee · No hardware · Patients only need WhatsApp</p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Basic Plan */}
                        <div className="relative p-8 bg-gradient-to-b from-blue-50 to-white rounded-3xl border-2 border-blue-100 hover:border-blue-300 transition shadow-lg hover:shadow-xl">
                            <div className="text-blue-600 font-bold text-lg mb-2">🟦 Basic</div>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-4xl font-extrabold text-slate-900">₹500</span>
                                <span className="text-slate-500">/ month</span>
                            </div>
                            <p className="text-slate-600 mb-6">For small & medium clinics</p>

                            <ul className="space-y-4 mb-8">
                                <PricingFeature>WhatsApp queue management</PricingFeature>
                                <PricingFeature>Unlimited patients</PricingFeature>
                                <PricingFeature>Real-time token updates</PricingFeature>
                                <PricingFeature>Manual open / close clinic</PricingFeature>
                                <PricingFeature>Basic support</PricingFeature>
                            </ul>

                            <a href="#contact" className="block w-full py-4 bg-blue-600 text-white text-center rounded-xl font-bold hover:bg-blue-700 transition">
                                Start Free Trial
                            </a>
                        </div>

                        {/* Pro Plan */}
                        <div className="relative p-8 bg-gradient-to-b from-purple-50 to-white rounded-3xl border-2 border-purple-300 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                                Most Popular
                            </div>
                            <div className="text-purple-600 font-bold text-lg mb-2">🟪 Pro</div>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-4xl font-extrabold text-slate-900">₹1000</span>
                                <span className="text-slate-500">/ month</span>
                            </div>
                            <p className="text-slate-600 mb-6">For growing clinics</p>

                            <ul className="space-y-4 mb-8">
                                <PricingFeature>Everything in Basic</PricingFeature>
                                <PricingFeature>Multiple doctors / queues</PricingFeature>
                                <PricingFeature>Skip & no-show handling</PricingFeature>
                                <PricingFeature>Queue analytics</PricingFeature>
                                <PricingFeature>Priority support</PricingFeature>
                            </ul>

                            <a href="#contact" className="block w-full py-4 bg-purple-600 text-white text-center rounded-xl font-bold hover:bg-purple-700 transition">
                                Start Free Trial
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="bg-gradient-to-b from-slate-50 to-emerald-50 py-20">
                <div className="max-w-4xl mx-auto px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Get a Demo or Start Free Trial</h2>
                    <p className="text-xl text-slate-600 mb-4">Contact us to see QueueCare in action for your clinic</p>
                    <p className="text-emerald-600 font-medium mb-12 bg-emerald-50 inline-block px-6 py-2 rounded-full">🚀 Currently onboarding clinics manually</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-8 mb-12">
                        <a href="tel:8928405218" className="flex items-center justify-center gap-3 bg-white px-8 py-5 rounded-2xl shadow-lg hover:shadow-xl transition border border-slate-100">
                            <Phone className="w-6 h-6 text-emerald-600" />
                            <div className="text-left">
                                <p className="text-sm text-slate-500">Call us</p>
                                <p className="text-lg font-bold text-slate-900">8928405218</p>
                            </div>
                        </a>
                        <a href="mailto:khurshidsk7304@gmail.com" className="flex items-center justify-center gap-3 bg-white px-8 py-5 rounded-2xl shadow-lg hover:shadow-xl transition border border-slate-100">
                            <Mail className="w-6 h-6 text-emerald-600" />
                            <div className="text-left">
                                <p className="text-sm text-slate-500">Email us</p>
                                <p className="text-lg font-bold text-slate-900">khurshidsk7304@gmail.com</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-emerald-600 py-16">
                <div className="max-w-4xl mx-auto px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Give your patients a better waiting experience.</h2>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-2xl font-bold text-white flex items-center gap-2">
                            <MessageSquare className="w-8 h-8 text-emerald-500" />
                            QueueCare
                        </div>
                        <p className="text-center md:text-left">© 2025 QueueCare. Built for Indian Clinics</p>
                        <div className="flex gap-6">
                            <a href="#features" className="hover:text-white transition">Features</a>
                            <a href="#pricing" className="hover:text-white transition">Pricing</a>
                            <a href="#contact" className="hover:text-white transition">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/918928405218?text=Hi%2C%20I%20would%20like%20to%20request%20a%20demo%20for%20QueueCare."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 flex items-center gap-3 group"
            >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="hidden group-hover:block whitespace-nowrap bg-slate-900 text-white text-sm px-3 py-1 rounded-lg absolute right-full mr-3">
                    Chat with us!
                </span>
            </a>
        </div>
    );
};

// Step Card Component
const StepCard = ({ number, title, description }) => (
    <div className="text-center p-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            {number}
        </div>
        <h3 className="text-lg font-bold mb-2 text-slate-900">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
    <div className="p-8 bg-white rounded-2xl hover:bg-emerald-50 transition duration-300 border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-lg">
        <div className="mb-6 p-3 bg-emerald-100 rounded-xl inline-block">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
);

// Pricing Feature Component
const PricingFeature = ({ children }) => (
    <li className="flex items-center gap-3">
        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
        <span className="text-slate-700">{children}</span>
    </li>
);

export default LandingPage;
