"use client";

import styled from "styled-components";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

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
  transition: background-color 0.2s ease, transform 0.2s ease;

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

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      {isLight ? <IoSunnyOutline size={20} /> : <IoMoonOutline size={20} />}
    </ToggleButton>
  );
}
