import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {GiKnifeFork} from "react-icons/gi"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="topDiv">
          <Nav>
            <LogoLink to={"/recipe-react"}>
              <IconWrapper>
                <GiKnifeFork />
              </IconWrapper>
              <Logo>Yummies</Logo>
            </LogoLink>
          </Nav>
          <Search />
          <Category />
        </div>

        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-lg) 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--spacing-md);
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  transition: transform var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-accent) 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  svg {
    font-size: 1.5rem;
  }
`

const Logo = styled.span`
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

export default App;
