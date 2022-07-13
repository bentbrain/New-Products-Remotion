import styled from 'styled-components';
import { FC } from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FirstText } from '../FirstText/text';
import logo from '../../assets/logo-white.svg'

const BrandGrid = styled.div`
text-align: center;
width: calc(100% - 5rem);
grid-template-columns: repeat(3, 1fr);
height: min-content;
background: white;
padding: 4rem 2rem;
place-items: center;
gap: 3rem;
border-radius: 2rem;
margin: 0 auto;
align-self: flex-end;
justify-content: center;
align-items: center;
`

const Flex = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-end;
width: 100%;
position: absolute;
bottom: 0;
transform: translateY(50%);
`

const RelativeCont = styled.div`
position: relative;
height: 100%;
width: 100%;
`


export const BrandContainer: FC<{ brands: object }> = ({ brands }) => {
    const configDeets = { mass: 100, damping: 50, stiffness: 10 }
    const frame = useCurrentFrame()
    const { fps } = useVideoConfig()
    const pYPosition = spring({ from: 60, to: -40, frame, fps, config: configDeets })
    const newYPosition = interpolate(frame, [0, 50], [150, 0], { extrapolateRight: 'clamp', easing: Easing.bezier(.09, .46, .23, .95) })
    const newBPosition = interpolate(frame, [0, 50], [0, 50], { extrapolateRight: 'clamp', easing: Easing.bezier(.09, .46, .23, .95) })
    const opacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: 'clamp', })


    const brandMap: string[][] = []
    for (const [k, v] of Object.entries(brands)) {
        const title = v.title
        const url = v.image
        brandMap.push([title, url])
    }


    if (brandMap.length > 2) {
        while (brandMap.length % 3 != 0) {
            brandMap.pop()
        }
    }



    const GridLayout = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)'
    }

    const FlexLayout = {
        display: 'flex',
    }


    console.log(brandMap.length)

    return (
        <>
            <AbsoluteFill>
                <RelativeCont>
                    <Flex style={{ bottom: `${newBPosition}%` }}>
                        <img style={{ maxWidth: "40rem", marginBottom: "2rem", marginTop: "auto", opacity: opacity }} src={logo} alt="" />
                        <FirstText title="Now Online" translateY={0.7} />
                        <BrandGrid style={{ display: brandMap.length > 3 ? 'grid' : 'flex', transform: `translateY(0%)` }} >
                            {brandMap.map((title, index) => (
                                <img key={index} src={title[1]} alt="" />
                            ))}
                        </BrandGrid>
                    </Flex>
                </RelativeCont>
            </AbsoluteFill>
        </>
    )

}