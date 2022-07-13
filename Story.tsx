import { useCallback, useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender } from "remotion";
import { Background } from "./Background";

export const Story: React.FC<{ productIDs: string[] }> = ({ productIDs }) => {

	const [handle] = useState(() => delayRender())

	const [Messages, setMEssages] = useState<any | null>(
		null
	)

	const fetchProduct = useCallback(async () => {
		const messages = await Promise.all(productIDs.map(async (p) => {
			const response = await fetch(
				`http://localhost:8010/proxy/api/v2/products/${p}`
			)
			const json = await response.json()
			return json
		}))
		console.log(messages)
		setMEssages(messages)
		continueRender(handle)
	}, [productIDs])

	useEffect(() => {
		fetchProduct()
	}, [fetchProduct])

	if (!Messages) {
		return null
	}

	return (
		<AbsoluteFill>

			<div style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				textAlign: "center",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "5rem",
				color: "black",
				zIndex: 999
			}}>
				{Messages.map(m => {
					return (
						<>
							<img width="70%" src={m.image}></img>
							<p>{m.brand}</p>
						</>
					)
				})}
			</div>
			<Background />
		</AbsoluteFill>

	)
};
