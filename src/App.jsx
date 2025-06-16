import React, { useRef, useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Link, 
  Avatar, 
  IconButton,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NeonCursor from './NeonCursor';
import WbSunnyIcon from '@mui/icons-material/WbSunnyOutlined';
import NightlightIcon from '@mui/icons-material/NightlightOutlined';

const StyledContainer = styled(Box)(({ themeMode }) => ({
  minHeight: '100vh',
  backgroundColor: themeMode === 'light' ? '#fff' : '#121212',
  color: themeMode === 'light' ? '#000' : '#fff',
  display: 'flex',
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  transition: 'background 0.3s, color 0.3s',
}));

const Sidebar = styled(Box)(({ themeMode }) => ({
  width: '352px',
  backgroundColor: themeMode === 'light' ? '#fff' : '#121212',
  padding: '128px 0 0 128px',
  position: 'fixed',
  height: '100vh',
  top: 0,
  left: 0,
  zIndex: 1000,
  boxSizing: 'border-box',
  transition: 'background 0.3s',
}));

const ContentArea = styled(Box)({
  marginLeft: '480px',
  flex: 1,
  padding: '128px 128px 32px 0',
  minHeight: '100vh',
  overflowY: 'auto',
  width: 'calc(100vw - 480px)',
  boxSizing: 'border-box',
});

const NavLink = styled(Link)(({ active, themeMode }) => ({
  color: active
    ? (themeMode === 'light' ? '#000' : '#fff')
    : (themeMode === 'light' ? '#888' : '#9ca3af'),
  textDecoration: 'none',
  display: 'block',
  fontSize: '16px',
  fontWeight: active ? 700 : 400,
  transition: 'color 0.2s, font-weight 0.2s',
  cursor: 'pointer',
  '&:hover': {
    color: themeMode === 'light' ? '#222' : '#d1d5db',
  },
}));

const SectionTitle = styled(Typography)(({ themeMode }) => ({
  color: themeMode === 'light' ? '#888' : '#9ca3af',
  fontSize: '14px',
  fontStyle: 'italic',
  marginBottom: '16px',
}));

const CompanyName = styled('span')({
  fontWeight: 500,
});

const UnderlinedLink = styled('a')({
  textDecoration: 'underline',
  color: 'inherit',
  '&:hover': {
    color: 'inherit',
  },
});

const YearLabel = styled(Typography)(({ themeMode }) => ({
  color: themeMode === 'light' ? '#888' : '#9ca3af',
  fontSize: '14px',
  width: '64px',
  flexShrink: 0,
}));

const ToolsText = styled(Typography)(({ themeMode }) => ({
  color: themeMode === 'light' ? '#888' : '#9ca3af',
  fontSize: '14px',
}));

const DescriptionText = styled(Typography)(({ themeMode }) => ({
  color: themeMode === 'light' ? '#222' : '#d1d5db',
  fontSize: '14px',
  lineHeight: 1.6,
  marginBottom: '12px',
  maxWidth: '600px',
  width: '100%',
}));

const MobileMessage = styled(Box)({
  minHeight: '100vh',
  backgroundColor: '#121212',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  textAlign: 'center',
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
});

export default function App() {
  const diveDeeperRef = useRef(null);
  const contentTopRef = useRef(null);
  const [activeSection, setActiveSection] = useState('work');
  const [themeMode, setThemeMode] = useState('dark');
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    const handleScroll = () => {
      if (!diveDeeperRef.current || !contentTopRef.current) return;
      const aboutRect = diveDeeperRef.current.getBoundingClientRect();
      const workRect = contentTopRef.current.getBoundingClientRect();
      // If the top of the about section is above the middle of the viewport, set to about
      if (aboutRect.top < window.innerHeight / 2) {
        setActiveSection('about');
      } else {
        setActiveSection('work');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) {
    return (
      <MobileMessage>
        <Typography variant="h5" sx={{ maxWidth: '400px' }}>
          This website is best viewed on desktop. Please visit on a larger screen for the full experience :)
        </Typography>
      </MobileMessage>
    );
  }

  return (
    <StyledContainer themeMode={themeMode}>
      <NeonCursor />
      {/* Left Sidebar - Fixed */}
      <Sidebar themeMode={themeMode}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', justifyContent: 'flex-start', position: 'relative' }}>
          <NavLink 
            href="#" 
            active={activeSection === 'work'}
            themeMode={themeMode}
            onClick={e => {
              e.preventDefault();
              setActiveSection('work');
              if (contentTopRef.current) {
                contentTopRef.current.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            work
          </NavLink>
          <NavLink 
            href="#" 
            active={activeSection === 'about'}
            themeMode={themeMode}
            onClick={e => {
              e.preventDefault();
              setActiveSection('about');
              diveDeeperRef.current.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            about me
          </NavLink>
          <Box sx={{ width: '40%', borderBottom: '1px solid #333', my: '20px' }} />
          <Box sx={{ paddingTop: '0px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <NavLink href="mailto:exin@uwaterloo.ca" themeMode={themeMode}>email</NavLink>
              <NavLink
                href="https://www.linkedin.com/in/estherxin/"
                themeMode={themeMode}
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </NavLink>
              <NavLink
                href="https://docs.google.com/document/d/1lkplaoVr1k8Wa-CkWiBfiWhBnmbmePw5w2vDIAOkBC8/edit?usp=sharing"
                themeMode={themeMode}
                target="_blank"
                rel="noopener noreferrer"
              >
                resume
              </NavLink>
            </Box>
          </Box>
          <Box sx={{
            position: 'absolute',
            left: 0,
            bottom: 32,
            width: '100%',
            paddingLeft: '0',
            color: themeMode === 'light' ? '#888' : '#888',
            fontSize: '13px',
            lineHeight: 1.5,
            textAlign: 'left',
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            <div style={{ paddingLeft: 0 }}>
              © 2025 Esther Xin.<br />All rights reserved.
            </div>
          </Box>
        </Box>
      </Sidebar>

      {/* Right Content - Scrollable */}
      <ContentArea>
        {/* Sun/Moon IconButton in top right */}
        <Box sx={{ position: 'fixed', top: 32, right: 48, zIndex: 1200 }}>
          <IconButton
            aria-label="toggle theme"
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
            sx={{
              color: themeMode === 'light' ? '#222' : '#fff',
              background: 'none',
            }}
          >
            {themeMode === 'light' ? <NightlightIcon /> : <WbSunnyIcon />}
          </IconButton>
        </Box>
        <div ref={contentTopRef} />
        {/* Header */}
        <Box sx={{ marginBottom: '60px' }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: '36px', 
              fontWeight: 400, 
              marginBottom: '16px',
              color: themeMode === 'light' ? '#000' : '#fff',
              marginLeft: '0',
              fontWeight: 700,
            }}
          >
            Esther Xin
          </Typography>
          <Typography 
            sx={{ 
              fontSize: '18px', 
              color: themeMode === 'light' ? '#222' : '#d1d5db', 
              lineHeight: 1.6, 
              maxWidth: '600px',
              marginLeft: '0',
            }}
          >
            a <CompanyName>backend engineer</CompanyName> based in New York City focusing on <CompanyName>infrastructure and systems thinking</CompanyName> to create efficient, scalable solutions
          </Typography>
        </Box>

        {/* Current Position  */}
        <Box sx={{ marginBottom: '60px' }}>
          <SectionTitle themeMode={themeMode}>current</SectionTitle>
          <Typography sx={{ fontSize: '18px', color: themeMode === 'light' ? '#000' : '#fff' }}>
            Site Reliability Engineer at <UnderlinedLink href="https://www.citadelsecurities.com/">Citadel Securities</UnderlinedLink>
          </Typography>
        </Box>

        {/* Past Experience */}
        <Box sx={{ marginBottom: '100px' }}>
          <SectionTitle themeMode={themeMode}>past</SectionTitle>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* Rippling */}
            <Box sx={{ display: 'flex' }}>
              <YearLabel themeMode={themeMode}>2024</YearLabel>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '18px', marginBottom: '12px', color: themeMode === 'light' ? '#000' : '#fff' }}>
                  Software Engineer at <UnderlinedLink href="https://www.rippling.com/">Rippling</UnderlinedLink>
                </Typography>
                <DescriptionText themeMode={themeMode}>
                Led the re-architecture of Cloud Developer Environments to launch in under 3 minutes 
                (down from 30+), reducing error rates by over 80% and enabling 5x scalability, 
                while strengthening security and supporting 1,000+ engineers.
                </DescriptionText>
                <ToolsText themeMode={themeMode}>
                  Tools: Python, Terraform, AWS, Bash, CI/CD, CLI, Datadog
                </ToolsText>
              </Box>
            </Box>

            {/* ODAIA Inc */}
            <Box sx={{ display: 'flex' }}>
              <YearLabel themeMode={themeMode}>2023</YearLabel>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '18px', marginBottom: '12px', color: themeMode === 'light' ? '#000' : '#fff' }}>
                  Software Engineer at <UnderlinedLink href="https://www.odaia.ai/">ODAIA Inc.</UnderlinedLink>
                </Typography>
                <DescriptionText themeMode={themeMode}>
                Improved performance and developer experience by transitioning to a FastAPI-based architecture, 
                reducing application load times by 20%, simplifying deployments, and enabling local debugging.
                </DescriptionText>
                <ToolsText themeMode={themeMode}>
                  Tools: Python, React, MySQL, AWS, FASTAPI
                </ToolsText>
              </Box>
            </Box>

            {/* League */}
            <Box sx={{ display: 'flex' }}>
              <YearLabel themeMode={themeMode}>2023</YearLabel>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '18px', marginBottom: '12px', color: themeMode === 'light' ? '#000' : '#fff' }}>
                  Software Engineer at <UnderlinedLink href="https://www.league.com/">League</UnderlinedLink>
                </Typography>
                <DescriptionText themeMode={themeMode}>
                Cut $5K monthly infrastructure costs by optimizing resources and removing duplicate backups. 
                Boosted logging efficiency by 30% and managed Kubernetes clusters with CI/CD pipelines 
                for large-scale deployments.
                </DescriptionText>
                <ToolsText themeMode={themeMode}>
                  Tools: GoLang, Kubernetes, Terraform, Docker, CI/CD, Ansible, Prometheus/Grafana, Redis
                </ToolsText>
              </Box>
            </Box>

            {/* 1Password */}
            <Box sx={{ display: 'flex' }}>
              <YearLabel themeMode={themeMode}>2021-2022</YearLabel>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '18px', marginBottom: '12px', color: themeMode === 'light' ? '#000' : '#fff' }}>
                  Software Engineer at <UnderlinedLink href="https://www.1password.com/">1Password</UnderlinedLink>
                </Typography>
                <DescriptionText themeMode={themeMode}>
                Led development of a single sign-on admin tool that boosted data visibility for 400+ 
                developers and increased user adoption by 20%. Designed a new localization workflow 
                and implemented an automated CI/CD pipeline with a Slack release bot, 
                cutting localization time by over 50%.
                </DescriptionText>
                <ToolsText themeMode={themeMode}>
                  Tools: GoLang, React, Typescript, MySQL, CI/CD, REST API
                </ToolsText>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Dive Deeper Section */}
        <Box ref={diveDeeperRef} sx={{ marginBottom: '128px' }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontSize: '24px', 
              fontWeight: 300, 
              marginBottom: '48px',
              color: themeMode === 'light' ? '#000' : '#fff',
              marginLeft: '0',
              fontWeight: 700,
            }}
          >
            dive deeper
          </Typography>
          
          <Box sx={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            {/* Profile Image */}
            <Avatar 
              sx={{ 
                width: 150, 
                height: 150,
                backgroundColor: '#374151'
              }}
              src="/profilepic.png"
              alt="Profile"
            />

            {/* Content */}
            <Box sx={{ flex: 1, minWidth: 0, width: '100%', maxWidth: '600px' }}>
              {/* Personal */}
              <Box>
                <SectionTitle themeMode={themeMode}>synopsis</SectionTitle>
                <Typography sx={{ fontSize: '14px', color: themeMode === 'light' ? '#222' : '#d1d5db', lineHeight: 1.6 }}>
                Esther Xin is a recent graduate from the University of Waterloo with a Bachelor's degree in Systems Design Engineering, 
                where she developed a strong foundation in the intersection of engineering, product, and design. 
                <br/>
                <br/>
                She is particularly interested in infrastructure, backend systems, and building internal tools that 
                enhance developer experience and operational efficiency. 
                <br/>
                <br/>
                Originally from Toronto, Canada, Esther recently relocated to New York City. 
                Outside of work, she enjoys following European football, exploring film, 
                building Legos, solving puzzles, and is currently getting into running.
                <br/>
                <br/>
                Feel free to reach out via email or LinkedIn to connect.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </ContentArea>
    </StyledContainer>
  );
}