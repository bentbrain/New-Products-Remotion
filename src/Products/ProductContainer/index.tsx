import styled from 'styled-components';
import { Product } from './Product';
import { FC } from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Sequence } from 'remotion';


type product = {
    title: string;
    url: string;
}


const ProductGrid = styled.div`

display: grid;
grid-template-columns: repeat(2, 1fr);
text-align: center;
gap: 2rem;
transform-box: fill-box;
padding: 2rem;
filter: drop-shadow(145px 37px 70px #ed193a);
height: max-content;
place-self: center;
top: 50%;
`

export const ProductContainer: FC<{ product: object }> = ({ product }) => {
    const configDeets = { mass: 100, damping: 50, stiffness: 10 }
    const frame = useCurrentFrame()
    const { fps } = useVideoConfig()
    const pYPosition = spring({ from: 60, to: -40, frame, fps, config: configDeets })
    const newYPosition = interpolate(frame, [15, 270], [100, -100], { extrapolateRight: 'clamp', easing: Easing.bezier(.08, .31, .94, .73) })
    const Ycalc = interpolate(frame, [15, 270], [200, -20], { extrapolateRight: 'clamp', easing: Easing.bezier(.08, .31, .94, .73) })
    const productMap: string[][] = []
    for (const [k, v] of Object.entries(product)) {
        const title = v.title
        const url = v.image
        const price = v.price
        if (parseInt(k) < 10) {
            productMap.push([title, url, price])
        } else {
            continue
        }
    }





    return (
        <>
            <ProductGrid style={{ transform: `scale(1.5) rotateX(60deg) rotateY(0deg) rotateZ(45deg) translateY(calc(${newYPosition}% + ${Ycalc}px))` }}>
                {productMap.map((title, index) => (
                    <Product key={index} title={title[0]} url={title[1]} price={title[2]} index={index} lift={pYPosition} />
                ))}
            </ProductGrid>
        </>
    )

}