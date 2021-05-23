import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { pieceHeight, pieceWidth } from '../constants';
import { ChessFigureImageProps } from '../types';

export const RookImage = ({ color }: ChessFigureImageProps) => {
  const stroke = color === 'white' ? 'black' : 'white';

  return (
    <Svg height={pieceHeight} width={pieceWidth} viewBox="0 0 50 50">
      <G transform="matrix(1.5873016,0,0,1.5873016,-10.714286,-13.095238)" stroke={stroke} stroke-miterlimit="4" stroke-dasharray="none" stroke-width="1.5">
        <Path stroke-linejoin="round" d="m9,39,27,0,0-3-27,0,0,3z" fill-rule="evenodd" stroke-linecap="butt" fill={color} />
        <Path stroke-linejoin="round" d="m12,36,0-4,21,0,0,4-21,0z" fill-rule="evenodd" stroke-linecap="butt" fill={color} />
        <Path stroke-linejoin="round" d="m11,14,0-5,4,0,0,2,5,0,0-2,5,0,0,2,5,0,0-2,4,0,0,5" fill-rule="evenodd" stroke-linecap="butt" fill={color} />
        <Path stroke-linejoin="round" d="m34,14-3,3-17,0-3-3" fill-rule="evenodd" stroke-linecap="round" fill={color} />
        <Path stroke-linejoin="miter" d="m31,17,0,12.5-17,0,0-12.5" fill-rule="evenodd" stroke-linecap="butt" fill={color} />
        <Path stroke-linejoin="round" d="m31,29.5,1.5,2.5-20,0,1.5-2.5" fill-rule="evenodd" stroke-linecap="round" fill={color} />
        <Path stroke-linejoin="miter" d="m11,14,23,0" stroke-linecap="round" fill="none" />
      </G>
    </Svg>
  );
};
