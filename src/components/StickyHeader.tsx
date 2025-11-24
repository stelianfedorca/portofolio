"use client";

import styled from "styled-components";
import Link from "next/link";

const StickyHeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  background: color-mix(in srgb, var(--background), transparent 30%);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
`;

const MaxWidthWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const TopNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const BrandName = styled(Link)`
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: -1px;

  color: var(--accent2);
`;

const NavigationLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    text-transform: uppercase;
    font-weight: 600;
    position: relative;
    letter-spacing: 0.05em;

    &:hover {
      color: var(--accent2);
    }

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background-color: var(--accent2);
      transition: width 0.3s;
    }

    &:hover::before {
      width: 100%;
    }
  }
`;

export default function StickyHeader() {
  function scrollToTop(event: React.MouseEvent) {
    event.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <StickyHeaderWrapper>
      <MaxWidthWrapper>
        <TopNav>
          <BrandName href="/" onClick={scrollToTop}>
            Stelian Fedorca
          </BrandName>
          <NavigationLinks>
            <a href="/#projects">Projects</a>
            <a href="/#contact">Contact</a>
          </NavigationLinks>
        </TopNav>
      </MaxWidthWrapper>
    </StickyHeaderWrapper>
  );
}
