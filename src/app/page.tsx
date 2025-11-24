"use client";

import styled from "styled-components";
import Image from "next/image";
import { homeContent } from "@/content/home";

const Container = styled.main`
  min-height: 100vh;
  /* background-color: #ffffff;
  color: #111111; */
  font-family: var(--font-plus-jakarta-sans);
`;

const MaxWidthWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

// --- Header / Hero Section ---

const Header = styled.header`
  padding: 2rem 0 2rem;

  @media (min-width: 768px) {
    padding: 2rem 0 4rem;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 20px 20px 60px #e0e0e0, -20px -20px 60px #ffffff;
  margin: 2rem auto 0;
  margin-top: 16px;

  @media (min-width: 768px) {
    /* margin: 4rem 0 0 0; */
    width: 320px;
  }

  img {
    object-fit: cover;
  }
`;

const HeroText = styled.div`
  max-width: 800px;
`;

const Greeting = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  letter-spacing: -0.03em;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }

  span {
    color: var(--accent2);
  }
`;

const Subtitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;

  span {
    position: relative;
    display: inline-block;

    /* &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 30px;
      background-color: #a5b4fc;
      z-index: -1;
    } */
  }

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const IntroText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  max-width: 600px;
  margin-top: 2rem;
`;

const HeroImageContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  height: 400px;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  background-color: #f5f5f5;

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

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SkillItem = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background-color: #a5b4fc;
    border-radius: 50%;
  }
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
  background-color: #f0f0f0;
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
  color: #666;
  line-height: 1.5;
  margin: 0;
`;

const ProjectLink = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #111;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

// --- Footer ---

const Footer = styled.footer`
  padding: 6rem 0;
  background-color: #fafafa;
  margin-top: 4rem;
`;

const FooterTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const FooterText = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #111;
  color: #fff;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

export default function Home() {
  return (
    <Container>
      <MaxWidthWrapper>
        <Header>
          <HeroContent>
            <HeroText>
              <Greeting>
                {homeContent.hero.greeting} <span>{homeContent.hero.name}</span>
              </Greeting>
              <Subtitle>{homeContent.hero.role}</Subtitle>
              <IntroText>{homeContent.hero.intro}</IntroText>
            </HeroText>

            <ProfileImageWrapper>
              <Image src="/Me.jpeg" alt="Stelian" fill priority />
            </ProfileImageWrapper>
          </HeroContent>
        </Header>

        <Section>
          <SectionTitle>{homeContent.skills.title}</SectionTitle>
          <SkillsGrid>
            {homeContent.skills.items.map((skill) => (
              <SkillItem key={skill}>{skill}</SkillItem>
            ))}
          </SkillsGrid>
        </Section>

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
      </MaxWidthWrapper>

      <Footer id="contact">
        <MaxWidthWrapper>
          <FooterTitle>{homeContent.footer.title}</FooterTitle>
          <FooterText>{homeContent.footer.text}</FooterText>
          <ContactButton href={homeContent.footer.email}>
            {homeContent.footer.cta}
          </ContactButton>
        </MaxWidthWrapper>
      </Footer>
    </Container>
  );
}
