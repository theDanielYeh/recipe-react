import styled from "styled-components";
import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'

function Search() {

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate("/searched/" + input);
    }
  }

  return (
    <FormStyle onSubmit={submitHandler}>
      <SearchWrapper>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
          placeholder="Search for recipes..."
        />
      </SearchWrapper>
    </FormStyle>
  )
}

const FormStyle = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`

const SearchIcon = styled.div`
  position: absolute;
  left: var(--spacing-md);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;

  svg {
    font-size: 1.125rem;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 3rem;
  font-size: 1rem;
  font-weight: var(--font-weight-normal);
  color: var(--color-text-primary);
  background: var(--color-background);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  outline: none;
  transition: all var(--transition-base);

  &::placeholder {
    color: var(--color-text-tertiary);
  }

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
  }

  &:hover {
    border-color: var(--color-text-secondary);
  }

  @media screen and (max-width: 900px) {
    font-size: 0.9375rem;
    padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 2.75rem;
  }
`

export default Search
