"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import ThemeToggle from "./ThemeToggle";
import { useClickOutside } from "../hooks/useClickOutside";

// --- Styled Components ---

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  pointer-events: none; /* Let clicks pass through around the bar */
`;

const FloatingBar = styled(motion.div)`
  width: 100%;
  background-color: rgb(from var(--background) r g b / 0.8);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  /* border-bottom: 1px solid var(--border-color);
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1); */
  pointer-events: auto; /* Re-enable clicks on the bar */

  transition: background-color var(--theme-duration) var(--theme-ease),
    border-color var(--theme-duration) var(--theme-ease);

  will-change: transform;
`;

const InnerContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const Backdrop = styled.div`
  height: 200%;
  -webkit-mask-image: linear-gradient(
    to bottom,
    black 0% 50%,
    transparent 50% 100%
  );
  mask-image: linear-gradient(to bottom, black 0% 50%, transparent 50% 100%);

  height: 100%;
  inset: 0;
  -webkit-mask-image: linear-gradient(
    to bottom,
    black 0,
    black var(--thickness),
    transparent var(--thickness)
  );
  mask-image: linear-gradient(
    to bottom,
    black 0,
    black var(--thickness),
    transparent var(--thickness)
  );
`;

const BrandName = styled(Link)`
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 102; /* Above mobile menu overlay */
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: 1.25rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  transition: all 0.2s ease;

  &:hover {
    color: var(--text-primary);
    background: rgb(from var(--text-primary) r g b / 0.06);
  }
`;

const MobileNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    --click-target-minimum: 44px;
    --inset-by: min(0px, calc((100% - var(--click-target-minimum)) / 2));

    position: absolute;
    content: "";
    top: var(--inset-by);
    left: var(--inset-by);
    right: var(--inset-by);
    bottom: var(--inset-by);
  }
`;

// --- Mobile Overlay ---

const Overlay = styled(motion.div)`
  position: fixed;
  top: 4.5rem;
  right: 1rem;
  width: auto;
  min-width: 200px;
  background: rgb(from var(--background) r g b / 0.8);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  z-index: 101;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  pointer-events: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

  @media (min-width: 768px) {
    right: 2rem;
  }
`;

const MobileLink = styled(motion.a)`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  text-decoration: none;
  letter-spacing: -0.01em;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background: color-mix(in srgb, var(--text-primary), transparent 90%);
    color: var(--text-primary);
  }
`;

export default function StickyHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useClickOutside(menuRef, (event) => {
    // Don't close if clicking the menu button (it has its own toggle)
    if (menuButtonRef.current?.contains(event.target as Node)) {
      return;
    }
    setIsOpen(false);
  });

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", window.location.pathname);
    closeMenu();
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 50 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <HeaderContainer>
      <FloatingBar
      // initial={{ y: -20, opacity: 0 }}
      // animate={{ y: 0, opacity: 1 }}
      // transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        {/* <Backdrop /> */}
        <InnerContainer>
          <BrandName href="/" onClick={scrollToTop}>
            Stelian Fedorca
          </BrandName>

          {/* Desktop Navigation */}
          <DesktopNav>
            <div>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
            <ThemeToggle />
          </DesktopNav>

          {/* Mobile Actions */}
          <MobileNav>
            <ThemeToggle />
            <MenuButton
              ref={menuButtonRef}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <IoCloseOutline size={30} />
              ) : (
                <IoMenuOutline size={30} />
              )}
            </MenuButton>
          </MobileNav>
        </InnerContainer>
      </FloatingBar>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <Overlay
            ref={menuRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <MobileLink href="#projects" onClick={closeMenu}>
              Projects
            </MobileLink>
            <MobileLink href="#contact" onClick={closeMenu}>
              Contact
            </MobileLink>
          </Overlay>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
}
