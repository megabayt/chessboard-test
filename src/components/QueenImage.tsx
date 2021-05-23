import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

import { pieceHeight, pieceWidth } from '../constants';
import { ChessFigureImageProps } from '../types';

export const QueenImage = ({ color }: ChessFigureImageProps) => {
  const stroke = color === 'white' ? 'black' : 'white';

  return (
    <Svg height={pieceHeight} width={pieceWidth} viewBox="0 0 50 50">
      <G stroke-linejoin="round" transform="matrix(1.2987013,0,0,1.2987013,-4.2207793,-4.0584416)" stroke={stroke} stroke-miterlimit="4" stroke-dasharray="none" stroke-width="1.5">
        <Path d="m8,12a2,2,0,0,1,-4,0,2,2,0,1,1,4,0z" fill-rule="evenodd" stroke-linecap="round" fill={color} />
        <Path d="m24.5,7.5a2,2,0,0,1,-4,0,2,2,0,1,1,4,0z" fill-rule="evenodd" stroke-linecap="round" fill={color} />
        <Path d="m41,12a2,2,0,0,1,-4,0,2,2,0,1,1,4,0z" fill-rule="evenodd" stroke-linecap="round" fill={color} />
        <Path d="m16,8.5a2,2,0,0,1,-4,0,2,2,0,1,1,4,0z" fill-rule="evenodd" stroke-linecap="round" fill={color} />
        <Path d="m33,9a2,2,0,0,1,-4,0,2,2,0,1,1,4,0z" fill-rule="evenodd" stroke-linecap="round" fill={color} />
        <Path d="m9,26c8.5-1.5,21-1.5,27,0l2-12-7,11v-14l-5.5,13.5-3-15-3,15-5.5-14v14.5l-7-11,2,12z" fill-rule="evenodd" stroke-linecap="butt" fill={color} />
        <Path d="m9,26c0,2,1.5,2,2.5,4,1,1.5,1,1,0.5,3.5-1.5,1-1.5,2.5-1.5,2.5-1.5,1.5,0.5,2.5,0.5,2.5,6.5,1,16.5,1,23,0,0,0,1.5-1,0-2.5,0,0,0.5-1.5-1-2.5-0.5-2.5-0.5-2,0.5-3.5,1-2,2.5-2,2.5-4-8.5-1.5-18.5-1.5-27,0z" fill-rule="evenodd" stroke-linecap="butt" fill={color} />
        <Path d="M11.5,30c3.5-1,18.5-1,22,0" stroke-linecap="round" fill="none" />
        <Path d="m12,33.5c6-1,15-1,21,0" stroke-linecap="round" fill="none" />
      </G>
    </Svg>
  );
};
