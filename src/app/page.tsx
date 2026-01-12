"use client";

import styled from "styled-components";
import Image from "next/image";
import { homeContent } from "@/content/home";
import Link from "next/link";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaReact,
  FaNodeJs,
  FaUniversalAccess,
  FaGitAlt,
  FaArrowDown,
} from "react-icons/fa";
import {
  FiExternalLink,
  FiCode,
  FiCopy,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";
import {
  SiNextdotjs,
  SiTypescript,
  SiStyledcomponents,
  SiRedux,
  SiGraphql,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import React, { JSX, useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

/*
  Definining animation variants
*/

const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const heroChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10, // Reduced from 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }, // Slightly faster
  },
};

const heroImageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10, // Reduced from 16
    scale: 0.98, // Added subtle scale
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function AnimatedRevealSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/** */

const Container = styled.main`
  min-height: 100vh;
  font-family: var(--font-plus-jakarta-sans);
`;

const MaxWidthWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

// --- Header / Hero Section ---

const Header = styled.header`
  /* padding: 2rem 0; */

  @media (min-width: 768px) {
    padding: 2rem 0 4rem;
  }
`;

const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: column-reverse;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 4rem;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 280px;
  max-height: 280px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  margin: 0 auto 2rem;
  transition: transform 200ms ease-in-out;

  @media (min-width: 768px) {
    width: 320px;
  }

  img {
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.03);
  }
`;

const HeroText = styled(motion.div)`
  max-width: 800px;
`;

const Greeting = styled(motion.h1)`
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
  color: var(--text-primary);

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }

  @media (min-width: 1000px) {
    font-size: 4rem;
  }

  span {
    color: var(--accent2);
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  color: var(--text-primary);

  span {
    position: relative;
    display: inline-block;
  }

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }

  @media (min-width: 1000px) {
    font-size: 4rem;
  }
`;

const IntroText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 600px;
  margin-top: 2rem;
`;

const HeroButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: color-mix(in srgb, var(--text-primary), transparent 92%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 2.5rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.1);

  @media (min-width: 1100px) {
    margin-top: 3rem;
  }

  &:hover {
    background: var(--text-primary);
    color: var(--background);
    border-color: var(--text-primary);
    transform: scale(1.02);
    box-shadow: 0 6px 20px -4px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover svg {
    transform: translateY(3px);
  }
`;

const HeroImageContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  height: 400px;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  background-color: var(--bg-secondary);

  @media (min-width: 768px) {
    height: 600px;
  }

  img {
    object-fit: cover;
  }
`;

// --- Skills Section ---

const Section = styled.section`
  padding: 6rem 0;
`;

const SkillsSection = styled.section`
  padding-top: 6rem;
  padding-bottom: 4rem;

  @media (min-width: 768px) {
    padding: 6rem 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SkillItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  transition: transform 0.2s ease;
  cursor: default;

  &:hover {
    background-color: var(--bg-tertiary);
    transform: translateY(-2px);
  }

  @media (min-width: 768px) {
    padding: 0.5rem 1.25rem;
  }
`;

const SkillIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  color: var(--accent2);
`;

// --- Work Section ---

const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

const ProjectCard = styled.a`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:focus-visible {
    outline: 2px solid var(--accent2);
    outline-offset: 4px;
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: var(--bg-secondary);
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: box-shadow 0.3s ease;

  img {
    object-fit: contain;
    transition: transform 0.5s ease;
  }

  ${ProjectCard}:hover & {
    box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.1);
  }

  ${ProjectCard}:hover img {
    transform: scale(1.03);
  }
`;

const ProjectTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
`;

const ProjectDesc = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
`;

const ProjectLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 0.2s;

  &:hover {
    color: var(--accent2);
  }

  svg {
    transition: transform 0.2s ease-in-out;
    text-decoration: none;
    display: inline-block;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

type SkillIconKey =
  | "typescript"
  | "react"
  | "nextjs"
  | "framermotion"
  | "htmlcss"
  | "styledcomponents"
  | "redux"
  | "node"
  | "graphql"
  | "accessibility"
  | "git";

const skillIcons: Record<SkillIconKey, JSX.Element> = {
  typescript: <SiTypescript />,
  react: <FaReact />,
  nextjs: <SiNextdotjs />,
  framermotion: <TbBrandFramerMotion />,
  htmlcss: <FiCode />,
  styledcomponents: <SiStyledcomponents />,
  redux: <SiRedux />,
  node: <FaNodeJs />,
  graphql: <SiGraphql />,
  accessibility: <FaUniversalAccess />,
  git: <FaGitAlt />,
};

type Skill = { label: string; icon: SkillIconKey };

// --- Footer ---

const Footer = styled.footer`
  padding-bottom: 4rem;
  background-color: var(--bg-secondary);
  margin-top: 4rem;
  padding-top: 2rem;
`;

const FooterTitle = styled.h3`
  font-weight: 800;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const FooterText = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 500px;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: var(--button-bg);
  color: var(--button-text);
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--text-secondary);
  }
`;

const FooterEmail = styled(Link)`
  display: block;
  font-size: 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--text-primary);
    text-decoration: underline;
  }
`;

const SocialLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  width: fit-content;
`;

const SocialLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s;

  width: fit-content;

  svg {
    font-size: 1.4rem;
  }

  &:hover {
    color: var(--accent2);
  }

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
`;

const EmailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: fit-content;
`;

const EmailLink = styled(SocialLink)`
  flex: 1;
`;

const CopyButton = styled.button<{ $copied: boolean }>`
  height: 36px;
  width: 36px;
  position: relative;
  border-radius: 999px;
  border: 1px solid
    ${({ $copied }) => ($copied ? "var(--accent2)" : "var(--border-color)")};

  color: ${({ $copied }) =>
    $copied ? "var(--accent2)" : "var(--text-primary)"};
  display: inline-flex;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, border-color 0.2s, background-color 0.2s;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    color: var(--accent2);
    border-color: var(--accent2);
  }

  &:focus-visible {
    outline: 2px solid var(--accent2);
    outline-offset: 2px;
  }

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
`;

const EmailText = styled.span`
  /* color: var(--text-primary);
  transition: color 0.2s;

  ${SocialLink}:hover & {
    color: var(--accent2);
  } */
`;

const SubFooter = styled.div`
  padding-top: 2rem;
  margin-top: 2.5rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

export default function Home() {
  const emailHref = homeContent.footer.email;
  const emailAddress = emailHref.replace(/^mailto:/, "");
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard API is not available in this browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy email address:", error);
    }
  };

  return (
    <Container>
      <MaxWidthWrapper>
        <Header>
          <HeroContent>
            <motion.div
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
            >
              <HeroText>
                <Greeting variants={heroChildVariants}>
                  {homeContent.hero.greeting}{" "}
                  <span>{homeContent.hero.name}</span>
                </Greeting>
                <Subtitle variants={heroChildVariants}>
                  {homeContent.hero.role}
                </Subtitle>
                <IntroText variants={heroChildVariants}>
                  {homeContent.hero.intro}
                </IntroText>
                <motion.div variants={heroChildVariants}>
                  <HeroButton href="#projects">
                    View My Projects
                    <FaArrowDown size={16} />
                  </HeroButton>
                </motion.div>
              </HeroText>
            </motion.div>

            <motion.div
              variants={heroImageVariants}
              initial="hidden"
              animate="visible"
            >
              <ProfileImageWrapper>
                <Image
                  src="/Me.jpeg"
                  alt="Portrait of Stelian Fedorca"
                  height={280}
                  width={280}
                  fetchPriority="high"
                  loading="eager"
                />
              </ProfileImageWrapper>
            </motion.div>
          </HeroContent>
        </Header>

        <AnimatedRevealSection delay={0.1}>
          <SkillsSection>
            <SectionTitle>{homeContent.skills.title}</SectionTitle>
            <SkillsGrid>
              {(homeContent.skills.items as Skill[]).map((skill) => (
                <SkillItem key={skill.label}>
                  <SkillIconWrap aria-hidden="true">
                    {skillIcons[skill.icon] ?? ""}
                  </SkillIconWrap>
                  {skill.label}
                </SkillItem>
              ))}
            </SkillsGrid>
          </SkillsSection>
        </AnimatedRevealSection>

        <AnimatedRevealSection delay={0.2}>
          <Section id="projects">
            <SectionTitle>{homeContent.projects.title}</SectionTitle>
            <WorkGrid>
              {homeContent.projects.items.map((project) => (
                <ProjectCard
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ProjectImage>
                    <Image src={project.image} alt={project.title} fill />
                  </ProjectImage>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDesc>{project.description}</ProjectDesc>
                  <ProjectLink>
                    {project.link}
                    <FiArrowRight size={16} />
                  </ProjectLink>
                </ProjectCard>
              ))}
            </WorkGrid>
          </Section>
        </AnimatedRevealSection>
      </MaxWidthWrapper>

      <Footer id="contact">
        <MaxWidthWrapper>
          <FooterTitle>{homeContent.footer.title}</FooterTitle>

          <SocialLinksWrapper>
            <EmailRow>
              <EmailLink href={emailHref}>
                <FaEnvelope /> <EmailText>{emailAddress}</EmailText>
              </EmailLink>
              <CopyButton
                type="button"
                onClick={handleCopyEmail}
                aria-label={
                  copied ? "Email copied to clipboard" : "Copy email address"
                }
                $copied={copied}
              >
                {copied ? (
                  <FiCheck aria-hidden="true" size={16} />
                ) : (
                  <FiCopy aria-hidden="true" size={16} />
                )}
              </CopyButton>
            </EmailRow>

            <SocialLink
              href={homeContent.footer.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin /> LinkedIn{" "}
              <FiExternalLink style={{ fontSize: "0.9rem", opacity: 0.7 }} />
            </SocialLink>

            <SocialLink
              href={homeContent.footer.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> GitHub{" "}
              <FiExternalLink style={{ fontSize: "0.9rem", opacity: 0.7 }} />
            </SocialLink>
          </SocialLinksWrapper>

          <SubFooter>© 2021-present Stelian Fedorca</SubFooter>
        </MaxWidthWrapper>
      </Footer>
    </Container>
  );
}
