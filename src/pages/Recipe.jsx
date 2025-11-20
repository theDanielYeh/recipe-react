import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');
  const [loading, setLoading] = useState(true);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
      const detailData = await data.json();
      setDetails(detailData);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setLoading(false);
    }
  }, [params.name]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (loading || !details.title) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading recipe...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <DetailWrapper>
      <ImageSection>
        <RecipeImage src={details.image} alt={details.title} />
        <RecipeTitle>{details.title}</RecipeTitle>
      </ImageSection>
      <ContentSection>
        <TabContainer>
          <TabButton
            active={activeTab === 'instructions'}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </TabButton>
          <TabButton
            active={activeTab === 'ingredients'}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </TabButton>
        </TabContainer>
        <TabContent>
          {activeTab === 'instructions' && (
            <InstructionsContent>
              {details.summary && (
                <SummarySection dangerouslySetInnerHTML={{__html: details.summary}} />
              )}
              {details.instructions && (
                <>
                  <Divider />
                  <SectionTitle>Step-by-Step Instructions</SectionTitle>
                  <InstructionsSection dangerouslySetInnerHTML={{__html: details.instructions}} />
                </>
              )}
            </InstructionsContent>
          )}
          {activeTab === 'ingredients' && (
            <IngredientsList>
              {details.extendedIngredients && details.extendedIngredients.length > 0 ? (
                details.extendedIngredients.map((ingredient) => (
                  <IngredientItem key={ingredient.id}>
                    <IngredientBullet />
                    <IngredientText>{ingredient.original}</IngredientText>
                  </IngredientItem>
                ))
              ) : (
                <EmptyState>No ingredients available</EmptyState>
              )}
            </IngredientsList>
          )}
        </TabContent>
      </ContentSection>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  max-width: 1200px;
  margin: var(--spacing-2xl) auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: var(--spacing-2xl);

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    margin: var(--spacing-xl) auto;
    padding: 0 var(--spacing-md);
  }
`

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  position: sticky;
  top: var(--spacing-lg);
  height: fit-content;

  @media screen and (max-width: 900px) {
    position: relative;
    top: 0;
  }
`

const RecipeImage = styled.img`
  width: 100%;
  border-radius: var(--radius-xl);
  object-fit: cover;
  box-shadow: 0 8px 24px var(--color-shadow);
  aspect-ratio: 1;
`

const RecipeTitle = styled.h2`
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: 1.2;
  margin: 0;

  @media screen and (max-width: 900px) {
    font-size: 1.75rem;
    text-align: center;
  }
`

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`

const TabContainer = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-sm);
`

const TabButton = styled.button`
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: ${props => props.active ? 'var(--color-accent)' : 'var(--color-text-secondary)'};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? 'var(--color-accent)' : 'transparent'};
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  margin-bottom: -1px;

  &:hover {
    color: var(--color-accent);
  }

  @media screen and (max-width: 900px) {
    font-size: 0.9375rem;
    padding: var(--spacing-xs) var(--spacing-md);
  }
`

const TabContent = styled.div`
  min-height: 400px;
`

const InstructionsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`

const SummarySection = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-primary);

  p {
    margin-bottom: var(--spacing-md);
    color: var(--color-text-secondary);
  }

  a {
    color: var(--color-accent);
    text-decoration: underline;
  }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--spacing-md) 0;
`

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-md) 0;
`

const InstructionsSection = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text-primary);

  ol, ul {
    padding-left: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
  }

  li {
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-secondary);
  }

  p {
    margin-bottom: var(--spacing-md);
    color: var(--color-text-secondary);
  }
`

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`

const IngredientItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-background);
    border-color: var(--color-accent);
    transform: translateX(4px);
  }
`

const IngredientBullet = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  margin-top: 0.5rem;
  flex-shrink: 0;
`

const IngredientText = styled.span`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-primary);
  flex: 1;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: var(--spacing-lg);
`

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const LoadingText = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin: 0;
`

const EmptyState = styled.div`
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 1rem;
`

export default Recipe
