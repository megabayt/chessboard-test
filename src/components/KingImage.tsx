import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { pieceHeight, pieceWidth } from '../constants';
import { ChessFigureImageProps } from '../types';

export const KingImage = ({ color }: ChessFigureImageProps) => {
  const stroke = color === 'white' ? 'black' : 'white';

  return (
    <Svg height={pieceHeight} width={pieceWidth} viewBox="0 0 50 50">
      <G transform="matrix(1.4373857,0,0,1.4231916,-7.2974204,-7.4665584)" stroke={stroke} stroke-miterlimit="4" stroke-dasharray="none" stroke-width="1.5">
        <Path stroke-linejoin="miter" d="M22.5,11.63,22.5,6" stroke-linecap="round" fill="none" />
        <Path stroke-linejoin="miter" d="m20,8,5,0" stroke-linecap="round" fill="none" />
        <Path stroke-linejoin="miter" d="m22.5,25s4.5-7.5,3-10.5c0,0-1-2.5-3-2.5s-3,2.5-3,2.5c-1.5,3,3,10.5,3,10.5" fill-rule="evenodd" stroke-linecap="butt" fill={color} />
        <Path stroke-linejoin="round" d="m11.5,37c5.5,3.5,15.5,3.5,21,0v-7s9-4.5,6-10.5c-4-6.5-13.5-3.5-16,4v3.5-3.5c-3.5-7.5-13-10.5-16-4-3,6,5,10,5,10v7.5z" fill-rule="evenodd" stroke-linecap="round" fill={color} />
        <Path stroke-linejoin="round" d="M11.5,30c5.5-3,15.5-3,21,0" stroke-linecap="round" fill="none" />
        <Path stroke-linejoin="round" d="m11.5,33.5c5.5-3,15.5-3,21,0" stroke-linecap="round" fill="none" />
        <Path stroke-linejoin="round" d="M11.5,37c5.5-3,15.5-3,21,0" stroke-linecap="round" fill="none" />
      </G>
    </Svg>
  );
};
