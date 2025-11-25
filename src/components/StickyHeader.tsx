"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

// --- Styled Components ---

const HeaderContainer = styled.header`
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 1rem;
  pointer-events: none; /* Let clicks pass through around the bar */

  @media (min-width: 768px) {
    top: 1.5rem;
    padding: 0 2rem;
  }
`;

const FloatingBar = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  background: color-mix(in srgb, var(--background), transparent 20%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1);
  pointer-events: auto; /* Re-enable clicks on the bar */
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
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-primary);
  }
`;

const MobileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 102;
`;

// --- Mobile Overlay ---

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--background);
  z-index: 101;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  pointer-events: auto;
`;

const MobileLink = styled(motion.a)`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 1rem 0;
  text-decoration: none;
  letter-spacing: -0.02em;

  &:hover {
    color: var(--accent2);
  }
`;

export default function StickyHeader() {
  const [isOpen, setIsOpen] = useState(false);

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
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
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
      // initial={{ y: -100, opacity: 0 }}
      // animate={{ y: 0, opacity: 1 }}
      // transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <BrandName href="/" onClick={scrollToTop}>
          Stelian Fedorca
        </BrandName>

        {/* Desktop Navigation */}
        <DesktopNav>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <ThemeToggle />
        </DesktopNav>

        {/* Mobile Actions */}
        <MobileActions>
          <ThemeToggle />
          <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <FaTimes /> : <FaBars />}
          </MenuButton>
        </MobileActions>
      </FloatingBar>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <Overlay
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <MobileLink
              href="#projects"
              onClick={closeMenu}
              custom={0}
              variants={linkVariants}
            >
              Projects
            </MobileLink>
            <MobileLink
              href="#contact"
              onClick={closeMenu}
              custom={1}
              variants={linkVariants}
            >
              Contact
            </MobileLink>
          </Overlay>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
}
