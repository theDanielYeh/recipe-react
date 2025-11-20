import {FaPizzaSlice, FaHamburger} from 'react-icons/fa';
import {GiNoodles, GiChopsticks} from 'react-icons/gi';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

import React from 'react'

function Category() {
  return (
    <List>
      <CategoryLink to={'/cuisine/Italian'}>
        <IconWrapper>
          <FaPizzaSlice />
        </IconWrapper>
        <Label>Italian</Label>
      </CategoryLink>
      <CategoryLink to={'/cuisine/American'}>
        <IconWrapper>
          <FaHamburger />
        </IconWrapper>
        <Label>American</Label>
      </CategoryLink>
      <CategoryLink to={'/cuisine/Thai'}>
        <IconWrapper>
          <GiNoodles />
        </IconWrapper>
        <Label>Thai</Label>
      </CategoryLink>
      <CategoryLink to={'/cuisine/Japanese'}>
        <IconWrapper>
          <GiChopsticks />
        </IconWrapper>
        <Label>Japanese</Label>
      </CategoryLink>
    </List>
  )
}

const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  margin: var(--spacing-lg) 0;

  @media screen and (max-width: 900px) {
    gap: var(--spacing-md);
    margin: var(--spacing-md) 0;
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);

  svg {
    font-size: 2rem;
  }
`

const Label = styled.h4`
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin: 0;
  transition: color var(--transition-fast);
`

const CategoryLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  text-decoration: none;
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  background: var(--color-background);
  border: 1.5px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-base);
  min-width: 100px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px var(--color-shadow);
    border-color: var(--color-accent);

    ${IconWrapper} {
      color: var(--color-accent);
    }

    ${Label} {
      color: var(--color-accent);
    }
  }

  &.active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    box-shadow: 0 4px 16px rgba(0, 112, 243, 0.3);

    ${IconWrapper} {
      color: white;
    }

    ${Label} {
      color: white;
    }
  }
`

export default Category
