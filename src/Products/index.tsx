import { FC, useEffect, useCallback, useState, } from 'react';
import { staticFile, continueRender, delayRender, Sequence, Audio } from 'remotion';
import styled from 'styled-components';
import { ProductContainer } from './ProductContainer';
import brandJson from '../assets/brands.json'
import collectionJson from '../assets/collection.json'
import { FirstText } from './FirstText/text';
import { BrandContainer } from './Brands';
import audio from '../assets/audio.mp3'

let url = 'http://localhost:8010/proxy/api/v1/products/?collection=new-products-7-days&store=au&page=1&order_by=featured'

const brands = brandJson

// const collection = collectionJson.objects

const brandImagesTwo: any = [];

const brandImages: string[][] = []
brands.forEach((a) => {
    const title = a.title
    const image = a.image
    brandImages.push([title, image])
    brandImagesTwo.push({ title: title, image: image })
})


const Container = styled.div`
position: relative;
width: 100%;
height: 100%;
background-color: #ed193a;
font-size: 10rem;
font-family: 'Boing';
font-weight: 200;
gap: 2rem;
padding: 2rem;
display: flex;
justify-content: center;
align-items: center;
`

interface collection {
    Meta: object;
    Objects: [];
    Search: boolean;
    Department_filters: [];
    Department_filters_redirect: object
    Canonical_url: string
    Collection: object
    Display: object
    Meta_title: string
    Meta_generated: string
    Keywords: []
    Meta_description: string
    Blurb: string
    Extra: string
    Accordion_enabled: boolean
    Breadcrumbs: []
    Is_filtered: boolean
    experimentVariantId: any
    experimentId: any
    optimiseId: any
    optimiseVariantId: any
    searchIdParamName: string
    Ssid: string

}


export const Products: React.FC<{ collectionData: string }> = ({ collectionData }) => {

    // const [handle] = useState(() => delayRender())

    // const [Messages, setMEssages] = useState<any | null>(
    //     null
    // )

    // const fetchProduct = useCallback(async () => {
    //     const messages = await fetch(url)
    //     const json = await messages.json()
    //     setMEssages(json.objects)
    //     continueRender(handle)
    // }, [url])

    // useEffect(() => {
    //     fetchProduct()
    // }, [])


    // if (!Messages) {
    //     return null
    // }






    // const collectionJson = JSON.stringify(collectionData)



    const collection = collectionJson.objects



    const brandMap: string[] = []
    for (const [k, v] of Object.entries(collection)) {
        const brand = v.brand

        if (Object.values(brandMap).indexOf(brand) > -1) {
            continue
        } else {
            brandMap.push(brand)
        }
    }

    const brandsAndImages: any = [];

    brandMap.forEach((a) => {
        for (const [k, v] of Object.entries(brandImagesTwo)) {
            const title = v.title
            const image = v.image
            if (a === title && !image.includes('placeholdit')) {
                brandsAndImages.push({ title: title, image: image })
            }
        }
    })



    const firstTextTitle = "New Products"

    return (
        <Container>
            <Audio startFrom={10} src={audio} />
            <Sequence from={0} durationInFrames={180}>
                <FirstText translateY={-1} title="This Week's" />
            </Sequence>
            <Sequence from={5} durationInFrames={180}>
                <FirstText translateY={0} title={firstTextTitle} />
            </Sequence>
            {/* <Sequence from={211}  durationInFrames={Infinity}>
                <FirstText translateY={0}  title="Now Online" />
            </Sequence> */}
            <Sequence from={195} durationInFrames={Infinity}>
                <BrandContainer brands={brandsAndImages} />
            </Sequence>
            <Sequence from={0}>
                <ProductContainer product={collection} />
            </Sequence>


        </Container>
    )
}