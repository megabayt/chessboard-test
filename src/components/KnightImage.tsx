import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

import { pieceHeight, pieceWidth } from '../constants';
import { ChessFigureImageProps } from '../types';

export const KnightImage = ({ color }: ChessFigureImageProps) => {
  const stroke = color === 'white' ? 'black' : 'white';

  return (
    <Svg height={pieceHeight} width={pieceWidth} viewBox="0 0 50 50">
      <G stroke-linejoin="round" fill-rule="evenodd" transform="matrix(1.4912192,0,0,1.4925373,-7.8284143,-9.3283579)" stroke={stroke} stroke-linecap="round" stroke-dasharray="none" stroke-miterlimit="4">
        <Path d="m22,10c10.5,1,16.5,8,16,29h-23c0-9,10-6.5,8-21" stroke-width="1.5" fill={color} />
        <Path d="m24,18c0.38,2.91-5.55,7.37-8,9-3,2-2.82,4.34-5,4-1.042-0.94,1.41-3.04,0-3-1,0,0.19,1.23-1,2-1,0-4.003,1-4-4,0-2,6-12,6-12s1.89-1.9,2-3.5c-0.73-0.994-0.5-2-0.5-3,1-1,3,2.5,3,2.5h2s0.78-1.992,2.5-3c1,0,1,3,1,3" stroke-width="1.5" fill={color} />
        <Path d="m9.5,25.5a0.5,0.5,0,0,1,-1,0,0.5,0.5,0,1,1,1,0z" stroke-width="1.5" fill="#000" />
        <Path d="m14.933,15.75a0.49999,1.5,30.001,0,1,-0.866,-0.5,0.49999,1.5,30.001,0,1,0.866,0.5z" stroke-width="1.49996698" fill="#000" />
      </G>
    </Svg>
  );
};
