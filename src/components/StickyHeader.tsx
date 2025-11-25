"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoMenu } from "react-icons/io5";
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
  backdrop-filter: blur(10px);
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
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 102;

  /* svg {
    transform: scaleY(0.8);
  } */
`;

// --- Mobile Overlay ---

const Overlay = styled(motion.div)`
  position: fixed;
  top: 5rem;
  right: 1rem;
  width: auto;
  min-width: 200px;
  background: color-mix(in srgb, var(--background), transparent 5%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(12px);
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
            {isOpen ? <IoClose /> : <IoMenu />}
          </MenuButton>
        </MobileActions>
      </FloatingBar>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <Overlay
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
