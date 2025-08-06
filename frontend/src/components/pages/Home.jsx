import React from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
/**
 * Home page for ChatApp
 * - Tailwind CSS classes used throughout
 * - "Get Started" button navigates to /register (replace or integrate with router)
 * - Plenty of small comments showing where to customize
 */

function Home() {
    const navigate = useNavigate(); 
  // If you use react-router, replace the window.location line with a router navigate or <Link />


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: headline + CTA */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Fast, secure messaging — <span className="text-indigo-600 dark:text-indigo-400">built for real conversations.</span>
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl">
              Chatly brings instant messaging, groups, and media sharing together in one sleek app.
              Lightweight, privacy-focused, and designed to be simple for users and easy to integrate for developers.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow"
              >
                Get Started
              </button>

              <Link
                to="/how"
                className="px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Learn how it works
              </Link>
            </div>

            {/* Quick bullets */}
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Real-time messaging (WebSocket support)</li>
              <li>• End-to-end encryption (configurable)</li>
              <li>• File and image sharing with previews</li>
              <li>• Lightweight REST API & scalable backend</li>
            </ul>
          </div>

          {/* Right: mock chat card / showcase */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border dark:border-gray-700">
              {/* Header of chat card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">C</div>
                  <div>
                    <div className="text-sm font-semibold">Group Chat</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">5 members · Active now</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">• • •</div>
              </div>

              {/* Mock messages */}
              <div className="mt-4 space-y-3 max-h-64 overflow-auto">
                <div className="text-sm bg-gray-100 dark:bg-gray-700 inline-block p-2 rounded-xl">
                  Hey, welcome to Chatly 👋
                </div>

                <div className="flex justify-end">
                  <div className="text-sm bg-indigo-600 text-white inline-block p-2 rounded-xl">
                    Great to be here! How do we set up channels?
                  </div>
                </div>

                <div className="text-sm bg-gray-100 dark:bg-gray-700 inline-block p-2 rounded-xl">
                  You can create channels for topics — works like rooms.
                </div>

                <div className="flex justify-end">
                  <div className="text-xs text-gray-400">Seen · 2:15 PM</div>
                </div>
              </div>

              {/* Input area (mock) */}
              <div className="mt-4 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Message #general"
                  className="flex-1 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none"
                />
                <button className="px-3 py-2 rounded-full bg-indigo-600 text-white">
                  Send
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-16">
          <h3 className="text-2xl font-semibold">What makes Chatly different</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
            Designed for speed, privacy, and developer-friendly integration.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature card */}
            <FeatureCard
              title="Real-time"
              desc="WebSocket-based messaging with low latency and presence indicators."
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
              )}
            />

            <FeatureCard
              title="Media sharing"
              desc="Images, files, and voice notes with previews and progress."
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0122 9.618v6.764a2 2 0 01-1.447 1.894L15 20M4 6v12" />
                </svg>
              )}
            />

            <FeatureCard
              title="Secure"
              desc="Built-in encryption hooks and token-based auth for safe messaging."
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z" />
                </svg>
              )}
            />

            <FeatureCard
              title="Extensible"
              desc="Webhooks, bots, and easy APIs so you can add features quickly."
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3v6h6v-6c0-1.657-1.343-3-3-3z" />
                </svg>
              )}
            />
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold">How it works</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Basic flow: user signs up → connects to WebSocket → joins or creates rooms → sends and receives messages. The backend exposes REST endpoints for auth and file uploads, plus a WebSocket endpoint for real-time events.
            </p>

            <ol className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <strong>1. Signup & auth:</strong> JWT tokens after signup/login. Store tokens securely.
              </li>
              <li>
                <strong>2. WebSocket connection:</strong> Connect to the socket server with the auth token, subscribe to channels.
              </li>
              <li>
                <strong>3. Messages & persistence:</strong> Messages are emitted in real-time and saved via backend APIs for history.
              </li>
            </ol>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
            <h4 className="font-semibold">Quick dev notes</h4>
            <ul className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Use socket.io or native ws for real-time comms.</li>
              <li>• Break UI into MessageList, Composer, ChannelList components.</li>
              <li>• Store minimal state locally; fetch history from server on join.</li>
            </ul>
          </div>
        </section>

        {/* CTA strip */}
        <section className="mt-16 bg-indigo-600 rounded-2xl p-6 text-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold">Ready to start building conversations?</h4>
              <p className="text-sm opacity-90">Create your free account and spin up a dev server in minutes.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/register')}
                className="px-5 py-2 rounded-full bg-white text-indigo-600 font-medium"
              >
                Get Started — It’s free
              </button>

              <Link to="/features" className="text-sm underline opacity-90">
                View features
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Chatly — Built with ❤️ for real-time apps.
            </div>
            <div className="space-x-4">
              <Link to="/terms" className="hover:underline">
                Terms
              </Link>
              <Link to="/privacy" className="hover:underline">
                Privacy
              </Link>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/**
 * Small presentational component for feature cards.
 * Keeps the main component tidy.
 */
function FeatureCard({ title, desc, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-md bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
