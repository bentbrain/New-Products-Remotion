import styled from 'styled-components';
import { FC } from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

const ProductBox = styled.div`

padding: 2rem;
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
gap: 3rem;
border-radius: 2rem;
color: #c0c0c0;
font-size: 2rem;
width: 30rem;
overflow: hidden;
`

const PricePill = styled.p`
background-color: #ed193a ;
border-radius: 100vw;
padding: 0.5em;
font-family: 'Boing';
font-weight: 900;
color: white;
align-self: flex-end;
letter-spacing: 2px;
margin: unset;
box-shadow: 25px 20px 30px #0000001f ;
`


export const Product: FC<{title: string, url: string, lift: number, index:number, price:string}> =  ({title, url, lift, index, price}) => {

    let translateY = 0
    if (index % 2 == 0) {
        translateY = 0
    } else {
         translateY = 10
    }

    return (
        <>
        <ProductBox style={{transform: `translateY(-${translateY}rem)`}}   > 
        <img style={{maxWidth: "min(500rem, 100%)", minWidth: "26rem"}} src={url} alt="" />
        {/* <p>{title}</p> */}
        {/* <PricePill>${price}</PricePill> */}
        </ProductBox>

        </>
    )

    

}