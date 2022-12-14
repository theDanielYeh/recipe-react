import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData);
  }

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === 'instructions' ? 'active' : ''}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === 'ingredients' ? 'active' : ''}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === 'instructions' && (
          <div>
          <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
          <h3>Step-by-Step</h3>
          <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
          {details.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  h3 {
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white
  }
  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
    margin-left: 1.25rem;
  }
  ul{
    margin-top: 2rem;
  }
  @media screen and (max-width: 1300px) {
    h3,
    li {
      font-size: 1rem;
      line-height: 1.5rem;
      margin-left: 1.25rem;
    }
    img {
      max-width: 25rem;
    }
  }
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0;
    h3,
    li {
      font-size: 1rem;
      line-height: 1.5rem;
    }
    li {
      margin-left: 1.25rem;
    }
    img {
      max-width: 23rem;
    }
    h2 {
      text-align: center;
    }
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  @media screen and (max-width: 900px) {
    margin: 0 1rem;
  }
`

const Info = styled.div`
  margin-left: 5rem;
  @media screen and (max-width: 900px) {
    margin-left: 0;
    margin-top: 1.5rem;
  }
`

export default Recipe
