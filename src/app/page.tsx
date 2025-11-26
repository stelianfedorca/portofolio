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
  FaFigma,
  FaArrowDown,
} from "react-icons/fa";
import { FiExternalLink, FiPenTool, FiCode, FiCpu } from "react-icons/fi";
import {
  SiNextdotjs,
  SiTypescript,
  SiStyledcomponents,
  SiRedux,
  SiGraphql,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import React, { JSX, useRef } from "react";
import { inView, motion, useInView, type Variants } from "framer-motion";

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
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const heroImageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0 },
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

  svg {
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background: var(--text-primary);
    color: var(--background);
    border-color: var(--text-primary);
    transform: scale(1.02);
    box-shadow: 0 6px 20px -4px rgba(0, 0, 0, 0.15);
  }

  &:hover svg {
    transform: translateY(3px);
  }

  &:active {
    transform: scale(0.98);
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
  margin-bottom: 1.5rem;
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
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  aspect-ratio: 16/10;
  background-color: var(--bg-tertiary);
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  img {
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${ProjectCard}:hover img {
    transform: scale(1.05);
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
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: underline;
  text-underline-offset: 4px;
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
  gap: 1rem;
  margin-top: 2rem;
  width: fit-content;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s;

  svg {
    font-size: 1.4rem;
  }

  &:hover {
    color: var(--accent2);
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
                <Image src="/Me.jpeg" alt="Stelian" fill priority />
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
                <ProjectCard key={project.title}>
                  <ProjectImage>
                    <Image src={project.image} alt={project.title} fill />
                  </ProjectImage>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDesc>{project.description}</ProjectDesc>
                  <ProjectLink>{project.link}</ProjectLink>
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
            <SocialLink href={homeContent.footer.email}>
              <FaEnvelope /> <EmailText>stelian.fedorca25@gmail.com</EmailText>
            </SocialLink>

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
