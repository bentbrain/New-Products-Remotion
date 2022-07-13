import { Composition } from 'remotion';
import { MyComposition } from './Composition';
import { Products } from './Products';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Empty"
				component={Products}
				durationInFrames={330}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					collectionData: ''
				}}
			/>

		</>
	);
};
