import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

import { pieceHeight, pieceWidth } from '../constants';
import { ChessFigureImageProps } from '../types';

export const BishopImage = ({ color }: ChessFigureImageProps) => {
  const stroke = color === 'white' ? 'black' : 'white';

  return (
    <Svg height={pieceHeight} width={pieceWidth} viewBox="0 0 50 50">
      <G transform="matrix(1.4492754,0,0,1.4358729,-7.6086965,-6.815488)" stroke={stroke} stroke-miterlimit="4" stroke-dasharray="none" stroke-width="1.5">
        <G stroke-linejoin="round" fill-rule="evenodd" stroke-linecap="butt" fill={color}>
          <Path d="m9,36c3.39-0.97,10.11,0.43,13.5-2,3.39,2.43,10.11,1.03,13.5,2,0,0,1.65,0.54,3,2-0.68,0.97-1.65,0.99-3,0.5-3.39-0.97-10.11,0.46-13.5-1-3.39,1.46-10.11,0.03-13.5,1-1.354,0.49-2.323,0.47-3-0.5,1.354-1.94,3-2,3-2z" />
          <Path d="m15,32c2.5,2.5,12.5,2.5,15,0,0.5-1.5,0-2,0-2,0-2.5-2.5-4-2.5-4,5.5-1.5,6-11.5-5-15.5-11,4-10.5,14-5,15.5,0,0-2.5,1.5-2.5,4,0,0-0.5,0.5,0,2z" />
          <Path d="m25,8a2.5,2.5,0,1,1,-5,0,2.5,2.5,0,1,1,5,0z" />
        </G>

        <Path stroke-linejoin="miter" d="m17.5,26,10,0m-12.5,4,15,0m-7.5-14.5,0,5m-2.5-2.5h5" stroke-linecap="round" fill="none" />
      </G>
    </Svg>
  );
};
