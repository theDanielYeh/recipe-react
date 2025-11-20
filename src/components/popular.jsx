import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";
import ShimmerCard from "./ShimmerCard";

function Popular() {

  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopular();
  },[]);


  const getPopular = async () => {
    setLoading(true);

    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check))
      setLoading(false);
    } else {
      try {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
        const data = await api.json();

        localStorage.setItem("popular", JSON.stringify(data.recipes));
        console.log(data);
        setPopular(data.recipes || []);
      } catch (error) {
        console.error('Error fetching popular recipes:', error);
        setPopular([]);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <Wrapper>
        <SectionTitle>Popular Picks</SectionTitle>
        <Splide
          options={{
            type: 'slide',
            perPage: 4,
            perMove: 4,
            arrows: true,
            pagination: true,
            drag: true,
            wheel: false,
            autoplay: !loading,
            interval: 4000,
            pauseOnHover: true,
            pauseOnFocus: true,
            resetProgress: false,
            gap: "1.5rem",
            speed: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            breakpoints: {
              1300: {
                perPage: 3,
                perMove: 3,
              },
              900: {
                perPage: 2,
                perMove: 2,
                gap: "1rem",
                arrows: false,
              },
              600: {
                perPage: 1,
                perMove: 1,
                arrows: false,
              },
            },
          }}
        >
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SplideSlide className="popularSlide" key={`shimmer-${index}`}>
                <ShimmerCard />
              </SplideSlide>
            ))
          ) : (
            popular.map((recipe) => {
              return (
                <SplideSlide className="popularSlide" key={recipe.id}>
                  <Card>
                    <CardLink to={"/recipe/" + recipe.id}>
                      <ImageWrapper>
                        <img src={recipe.image} alt={recipe.title} />
                        <Gradient />
                      </ImageWrapper>
                      <CardContent>
                        <CardTitle>{recipe.title}</CardTitle>
                      </CardContent>
                    </CardLink>
                  </Card>
                </SplideSlide>
              )
            })
          )}
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: var(--spacing-2xl) 0;
  position: relative;
  padding: 0 var(--spacing-sm);
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  /* Subtle fade hint for scrollability */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    pointer-events: none;
    z-index: 2;
    transition: opacity var(--transition-base);
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, var(--color-background), transparent);
    opacity: 0;
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, var(--color-background), transparent);
  }

  @media screen and (max-width: 900px) {
    margin: var(--spacing-xl) 0;
    padding: 0;

    &::before,
    &::after {
      display: none;
    }
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: left;

  @media screen and (max-width: 900px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const Card = styled.div`
  border-radius: var(--radius-xl);
  overflow: hidden;
  position: relative;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px var(--color-shadow-hover);
    border-color: transparent;
  }
`;

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75%;
  overflow: hidden;
  background: var(--color-surface);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: var(--spacing-md);
  background: var(--color-background);
  flex: 1;
  display: flex;
  align-items: center;
`;

const CardTitle = styled.p`
  color: var(--color-text-primary);
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 900px) {
    font-size: 0.875rem;
  }
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
  z-index: 1;
  pointer-events: none;

  ${Card}:hover & {
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
  }
`

export default Popular
