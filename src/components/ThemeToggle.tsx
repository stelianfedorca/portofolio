"use client";

import styled from "styled-components";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { PiSunBold, PiMoonBold } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";

import { useTheme } from "./ThemeProvider";

const ToggleButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  /* border: 1px solid var(--border-color); */
  border: 0;
  background: none;
  color: var(--text-primary);
  cursor: pointer;
  transition: transform 0.2s ease;

  &::after {
    --click-target-minimum: 44px;
    --inset-by: min(0px, calc((100% - var(--click-target-minimum)) / 2));

    content: "";
    position: absolute;
    top: var(--inset-by);
    left: var(--inset-by);
    right: var(--inset-by);
    bottom: var(--inset-by);
  }

  &:hover {
    /* background: var(--bg-tertiary); */
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    font-size: 1.1rem;
  }
`;

const ToggleLabel = styled.span`
  font-size: 0.9rem;
`;

const IconWrap = styled(motion.span)`
  display: inline-flex;
  font-size: 22px;
  @media (min-width: 768px) {
    font-size: 26px;
  }

  svg {
    font-size: 1.1rem;
  }
`;

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <ToggleButton onClick={toggleTheme}>
      <AnimatePresence mode="wait" initial={false}>
        <IconWrap
          key={isLight ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -20, scale: 0.9 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 20, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {isLight ? <PiSunBold /> : <PiMoonBold />}
        </IconWrap>
      </AnimatePresence>
    </ToggleButton>
  );
}
