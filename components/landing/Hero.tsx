import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { ThreeBackground } from "@/components/ThreeBackground";
import { EncryptedText } from "@/components/ui/encrypted-text";
import Image from "next/image";

export function Hero() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f4f4f510_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-0 lg:py-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            {/* Minimal Badge with Microanimation */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition-all duration-300 hover:border-zinc-300 hover:shadow-sm hover:scale-105">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-500"></span>
              </span>
              Welcome to VibeCodeee
            </div>

            {/* Main Heading - Encrypted Animation */}
            <h1 className="mb-8 text-6xl font-black leading-[1.2] tracking-tight sm:text-7xl lg:text-8xl min-h-[80px] sm:min-h-[95px] lg:min-h-[110px]">
              <EncryptedText
                text="Connect. Learn. Grow."
                encryptedClassName="text-zinc-400"
                revealedClassName="text-zinc-900"
                revealDelayMs={30}
              />
            </h1>

            {/* Subheading */}
            <p className="mb-12 max-w-2xl text-xl leading-relaxed text-zinc-600 sm:text-2xl">
              A minimalist community for creators, learners, and innovators.
              <span className="block mt-2 text-zinc-500">
                Premium resources. Expert insights. Zero noise.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
              {user ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => router.push("/resources")}
                  className="group relative overflow-hidden px-8 py-4 text-lg font-semibold bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-zinc-900/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Go to Dashboard
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => router.push("/login")}
                    className="group relative overflow-hidden px-8 py-4 text-lg font-semibold bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-zinc-900/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Journey
                      <svg
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      document
                        .getElementById("features")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-8 py-4 text-lg font-medium border-zinc-300 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 transition-all duration-300"
                  >
                    Explore Features
                  </Button>
                </>
              )}
            </div>

            {/* Minimal Stats */}
            <div className="mt-16 flex items-center gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold text-zinc-900">Quality</div>
                <div className="text-zinc-500">Active Members</div>
              </div>
              <div className="h-8 w-px bg-zinc-200"></div>
              <div>
                <div className="text-2xl font-bold text-zinc-900">50+</div>
                <div className="text-zinc-500">Resources</div>
              </div>
              <div className="h-8 w-px bg-zinc-200"></div>
              <div>
                <div className="text-2xl font-bold text-zinc-900">24/7</div>
                <div className="text-zinc-500">Support</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left - Large */}
              <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team collaboration"
                  width={800}
                  height={450}
                  className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>

              {/* Bottom Left */}
              <div className="aspect-square overflow-hidden rounded-2xl bg-zinc-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80"
                  alt="Learning"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>

              {/* Bottom Right */}
              <div className="aspect-square overflow-hidden rounded-2xl bg-zinc-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80"
                  alt="Innovation"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-4 top-8 rounded-full bg-white border border-zinc-200 px-4 py-2 shadow-lg text-sm font-semibold text-zinc-900 animate-float">
              ✨ Trusted Community
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
