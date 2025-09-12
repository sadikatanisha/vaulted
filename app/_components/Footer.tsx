"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" px-6 md:px-12 pb-8 pt-[-8px] bg-stone-50">
      {/* outer rounded card */}
      <div className="max-w-7xl bg-stone-900 mx-auto rounded-2xl border md:py-12 py-8 px-6 md:px-12  shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Vaulted
              </span>
            </div>

            <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
              Feel free to reach out if you want to collaborate with us, or
              simply have a chat.
            </p>

            <div>
              <a
                href="mailto:hello@thirdweb.studio"
                className="inline-flex items-center gap-3 text-white text-lg md:text-xl font-medium hover:underline"
                aria-label="Email hello at thirdweb studio"
              >
                <span>hello@thirdweb.studio</span>
                <svg
                  className="w-5 h-5 transform transition-transform duration-150 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Our projects */}
            <nav aria-label="Our projects" className="md:col-span-1">
              <h4 className="text-lg font-semibold text-gray-300 mb-4">
                Our projects
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white">
                    Project1
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Project2
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Project3
                  </Link>
                </li>
              </ul>
            </nav>
            {/* Follow us */}
            <nav aria-label="Follow us" className="md:col-span-1">
              <h4 className="text-lg font-semibold text-gray-300 mb-4">
                Follow us
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Dribbble
                  </Link>
                </li>
              </ul>
            </nav>
            {/* Quick Links */}
            <nav aria-label="Quick links" className=" md:col-span-1">
              <h4 className="text-lg font-semibold text-gray-300 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* bottom small copyright row */}
        <div className="mt-10 border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2025 Sadika Rahman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
