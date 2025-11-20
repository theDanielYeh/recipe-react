import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ShimmerCard from '../components/ShimmerCard';

function Searched() {

  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  let params = useParams();

  const getSearched = async (name) => {
    setLoading(true);
    try {
      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
      const recipes = await data.json();
      console.log('this works', recipes);
      setSearchedRecipes(recipes.results || []);
    } catch (error) {
      console.error('Error fetching searched recipes:', error);
      setSearchedRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSearched(params.search)
  }, [params.search]);

  return (
    <Container>
      <PageTitle>Search Results: {params.search}</PageTitle>
      {loading ? (
        <Grid>
          {Array.from({ length: 12 }).map((_, index) => (
            <ShimmerCard key={`shimmer-${index}`} />
          ))}
        </Grid>
      ) : searchedRecipes.length === 0 ? (
        <EmptyState>
          <EmptyStateText>No recipes found. Try a different search term.</EmptyStateText>
        </EmptyState>
      ) : (
        <Grid>
          {searchedRecipes.map((item) => {
            return (
              <Card key={item.id}>
                <CardLink to={'/recipe/' + item.id}>
                  <ImageWrapper>
                    <img src={item.image} alt={item.title} />
                    <Gradient />
                  </ImageWrapper>
                  <CardContent>
                    <CardTitle>{item.title}</CardTitle>
                  </CardContent>
                </CardLink>
              </Card>
            )
          })}
        </Grid>
      )}
    </Container>
  )
}

const Container = styled.div`
  max-width: 1400px;
  margin: var(--spacing-2xl) auto;
  padding: 0 var(--spacing-lg);

  @media screen and (max-width: 900px) {
    padding: 0 var(--spacing-md);
    margin: var(--spacing-xl) auto;
  }
`

const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;

  @media screen and (max-width: 900px) {
    font-size: 1.75rem;
    margin-bottom: var(--spacing-lg);
  }
`

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: var(--spacing-2xl);
`

const EmptyStateText = styled.p`
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-xl);

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-lg);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px var(--color-shadow-hover);
    border-color: transparent;
  }
`

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  height: 100%;
  display: flex;
  flex-direction: column;
`

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
`

const CardContent = styled.div`
  padding: var(--spacing-md);
  background: var(--color-background);
`

const CardTitle = styled.h4`
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 900px) {
    font-size: 0.875rem;
  }
`

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

export default Searched
