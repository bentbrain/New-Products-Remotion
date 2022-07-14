import styled from 'styled-components';
import { FC } from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import '../../assets/fonts.css'

const ProductBox = styled.div`

padding: 1rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
gap: 1rem;
border-radius: 2rem;
color: white;
font-family: 'BNG S';
font-weight: 900;
font-size: 4.5rem;
width: 100%;
`

const Heading = styled.h1`
width: 100%; 
overflow: hidden;
margin: unset;
margin-bottom: 0.7em;
`


const TextCont = styled.p`
margin: unset;
padding: unset;
`


export const FirstText: FC<{ title: string, translateY: number }> = ({ title, translateY }) => {

    const frame = useCurrentFrame()
    const newYPosition = interpolate(frame, [0, 30], [100, 0], { extrapolateRight: 'clamp', easing: Easing.bezier(0.395, -0.105, 0.295, 1.200) })


    return (
        <>
            <ProductBox>
                <Heading style={{ transform: `translateY(${translateY}em)` }}><TextCont style={{ transform: `translateY(${newYPosition}%)` }}>{title}</TextCont></Heading>
            </ProductBox>

        </>
    )



}