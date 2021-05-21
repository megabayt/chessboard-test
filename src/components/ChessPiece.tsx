import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { ChessColor, ChessFigureType } from '../types';

interface ChessPieceProps {
  type: ChessFigureType
}

interface FigureProps {
  color: ChessColor;
  stroke: ChessColor;
}

export const ChessPiece = ({
  type,
  color,
  stroke,
}: ChessPieceProps & FigureProps) => {
  let Figure = Pawn;
  switch (type) {
    case 'knight':
      Figure = Knight; break;
    case 'bishop':
      Figure = Bishop; break;
    case 'rook':
      Figure = Rook; break;
    case 'queen':
      Figure = Queen; break;
    case 'king':
      Figure = King; break;
    default:
    case 'pawn':
      Figure = Pawn; break;
  }

  return <Figure color={color} stroke={stroke} />;
};

const Pawn = ({ color, stroke }: FigureProps) => (
  <Svg height="15" width="15" viewBox="0 0 50 50">
    <Path stroke-linejoin="miter" d="m25,1.1719c-3.4531,0-6.25,2.7969-6.25,6.25,0,1.3906,0.45312,2.6719,1.2188,3.7188-3.0469,1.75-5.125,5.0156-5.125,8.7812,0,3.1719,1.4688,6,3.7656,7.8594-4.688,1.657-11.579,8.672-11.579,21.047h35.938c0-12.375-6.8906-19.391-11.578-21.047,2.2969-1.8594,3.7656-4.6875,3.7656-7.8594,0-3.7656-2.0781-7.0312-5.125-8.7812,0.765-1.047,1.218-2.3285,1.218-3.7191,0-3.4531-2.7969-6.25-6.25-6.25z" fill-rule="nonzero" stroke={stroke} stroke-linecap="round" stroke-miterlimit="4" stroke-dasharray="none" stroke-width="2.34375" fill={color} />
  </Svg>
);
const Knight = ({ color, stroke }: FigureProps) => (
  <Svg height="15" width="15" viewBox="0 0 50 50">
    <G stroke-linejoin="round" fill-rule="evenodd" transform="matrix(1.4912192,0,0,1.4925373,-7.8284143,-9.3283579)" stroke={stroke} stroke-linecap="round" stroke-dasharray="none" stroke-miterlimit="4">
      <Path d="m22,10c10.5,1,16.5,8,16,29h-23c0-9,10-6.5,8-21" stroke-width="1.5" fill={color} />
      <Path d="m24,18c0.38,2.91-5.55,7.37-8,9-3,2-2.82,4.34-5,4-1.042-0.94,1.41-3.04,0-3-1,0,0.19,1.23-1,2-1,0-4.003,1-4-4,0-2,6-12,6-12s1.89-1.9,2-3.5c-0.73-0.994-0.5-2-0.5-3,1-1,3,2.5,3,2.5h2s0.78-1.992,2.5-3c1,0,1,3,1,3" stroke-width="1.5" fill={color} />
      <Path d="m9.5,25.5a0.5,0.5,0,0,1,-1,0,0.5,0.5,0,1,1,1,0z" stroke-width="1.5" fill="#000" />
      <Path d="m14.933,15.75a0.49999,1.5,30.001,0,1,-0.866,-0.5,0.49999,1.5,30.001,0,1,0.866,0.5z" stroke-width="1.49996698" fill="#000" />
    </G>
  </Svg>
);
const Bishop = ({ color, stroke }: FigureProps) => (
  <Svg height="15" width="15" viewBox="0 0 50 50">
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
const Rook = ({ color, stroke }: FigureProps) => (
  <Svg height="15" width="15" viewBox="0 0 50 50">
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
const Queen = ({ color, stroke }: FigureProps) => (
  <Svg height="15" width="15" viewBox="0 0 50 50">
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
const King = ({ color, stroke }: FigureProps) => (
  <Svg height="15" width="15" viewBox="0 0 50 50">
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