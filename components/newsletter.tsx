"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useIsV0 } from "@/lib/context"
import { Instagram } from "lucide-react"
import { buttonVariants } from "./ui/button"

const DURATION = 0.3
const DELAY = DURATION
const EASE_OUT = "easeOut"
const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const
const SPRING = {
  type: "spring" as const,
  stiffness: 60,
  damping: 10,
  mass: 0.8,
}

const BRANDS = [
  {
    name: "Stitchntime",
    links: [
      {
        type: "instagram",
        url: "https://www.instagram.com/stichentime",
      },
    ],
  },
  {
    name: "Temptations",
    links: [
      {
        type: "instagram",
        url: "https://www.instagram.com/temptations.thebakehouse",
      },
    ],
  },
  {
    name: "Capital Pizza",
    links: [
      {
        type: "instagram",
        url: "https://www.instagram.com/capitalpizza.pk",
      },
    ],
  },
  {
    name: "Bites Islamabad",
    links: [
      {
        type: "instagram",
        url: "https://www.instagram.com/bites.isb",
      },
      {
        type: "google",
        url: "https://www.google.com/maps/place/Bites+Cafe/@33.6682548,72.9983727,17z/data=!4m8!3m7!1s0x38df9528905bc43d:0x2fff4d73c37caaa5!8m2!3d33.6682548!4d72.9983727!9m1!1b1!16s%2Fg%2F11m59nc_zv?hl=en&entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D",
      },
    ],
  },
  {
    name: "Alfusas",
    links: [
      {
        type: "instagram",
        url: "https://www.instagram.com/alfusas.pk",
      },
    ],
  },
]

export const Newsletter = () => {
  const isInitialRender = useRef(true)

  useEffect(() => {
    return () => {
      isInitialRender.current = false
    }
  }, [])

  return (
    <div className="flex overflow-hidden relative flex-col gap-4 justify-center items-center pt-10 w-full h-full short:lg:pt-10 pb-footer-safe-area 2xl:pt-footer-safe-area px-sides short:lg:gap-4 lg:gap-8">
      <motion.div layout="position" transition={{ duration: DURATION, ease: EASE_OUT }}>
        <h1 className="font-serif text-5xl italic short:lg:text-8xl sm:text-8xl lg:text-9xl text-foreground">
          Nust Hackclub
        </h1>
      </motion.div>

      <div className="flex flex-col items-center min-h-0 shrink">
        <AnimatePresenceGuard>
          <motion.div
            key="newsletter"
            initial={isInitialRender.current ? false : "hidden"}
            animate="visible"
            exit="exit"
            variants={{
              visible: {
                scale: 1,
                transition: {
                  delay: DELAY,
                  duration: DURATION,
                  ease: EASE_OUT,
                },
              },
              hidden: {
                scale: 0.9,
                transition: { duration: DURATION, ease: EASE_OUT },
              },
              exit: {
                y: -150,
                scale: 0.9,
                transition: { duration: DURATION, ease: EASE_OUT },
              },
            }}
          >
            <div className="flex flex-col gap-4 w-full max-w-4xl md:gap-6 lg:gap-8">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {BRANDS.map((brand) => (
                  <motion.div
                    key={brand.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: DURATION, ease: EASE_OUT }}
                    className="flex flex-col gap-4 p-4 border border-border/30 rounded-2xl hover:bg-primary/5 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-transparent backdrop-blur-sm w-48"
                  >
                    <h3 className="text-lg font-semibold text-foreground text-center mb-2">{brand.name}</h3>
                    <div className="flex gap-3 justify-center">
                      {brand.links.map((link) => (
                        <a
                          key={`${brand.name}-${link.type}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonVariants({ size: "icon-xl" })}
                          aria-label={`${brand.name} ${link.type}`}
                        >
                          {link.type === "instagram" && <Instagram className="size-6" />}
                          {link.type === "google" && (
                            <svg
                              className="size-6"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={isInitialRender.current ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                }}
                transition={{
                  duration: DURATION,
                  ease: EASE_OUT,
                  delay: DELAY,
                }}
                className="text-base short:lg:text-lg sm:text-lg lg:text-xl !leading-[1.1] font-medium text-center text-foreground text-pretty"
              >
                Explore our partner sponsors and connect with them!
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresenceGuard>
      </div>
    </div>
  )
}

const AnimatePresenceGuard = ({ children }: { children: React.ReactNode }) => {
  const isV0 = useIsV0()

  return isV0 ? (
    <>{children}</>
  ) : (
    <AnimatePresence mode="popLayout" propagate>
      {children}
    </AnimatePresence>
  )
}
