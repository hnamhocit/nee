'use client'

import styled, { keyframes } from 'styled-components'

export const Loading = () => {
	return (
		<LoaderWrapper>
			<Loader>
				<Box $variant='1'>
					<SideLeft />
					<SideRight />
					<SideTop />
				</Box>
				<Box $variant='2'>
					<SideLeft />
					<SideRight />
					<SideTop />
				</Box>
				<Box $variant='3'>
					<SideLeft />
					<SideRight />
					<SideTop />
				</Box>
				<Box $variant='4'>
					<SideLeft />
					<SideRight />
					<SideTop />
				</Box>
			</Loader>
		</LoaderWrapper>
	)
}

// --- Keyframes Definition ---
const fromLeft = keyframes`
  0% {
    z-index: 20;
    opacity: 0;
    translate: -20px -6px;
  }
  20% {
    z-index: 10;
    opacity: 1;
    translate: 0px 0px;
  }
  40% {
    z-index: 9;
    translate: 0px 4px;
  }
  60% {
    z-index: 8;
    translate: 0px 8px;
  }
  80% {
    z-index: 7;
    opacity: 1;
    translate: 0px 12px;
  }
  100% {
    z-index: 5;
    translate: 0px 30px;
    opacity: 0;
  }
`

const fromRight = keyframes`
  0% {
    z-index: 20;
    opacity: 0;
    translate: 20px -6px;
  }
  20% {
    z-index: 10;
    opacity: 1;
    translate: 0px 0px;
  }
  40% {
    z-index: 9;
    translate: 0px 4px;
  }
  60% {
    z-index: 8;
    translate: 0px 8px;
  }
  80% {
    z-index: 7;
    opacity: 1;
    translate: 0px 12px;
  }
  100% {
    z-index: 5;
    translate: 0px 30px;
    opacity: 0;
  }
`

// --- Styled Components ---

const LoaderWrapper = styled.div`
	position: absolute;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`

const Loader = styled.div`
	scale: 3;
	height: 50px;
	width: 40px;
`

// Các cạnh (Sides) dùng chung cho mọi Box
const SideLeft = styled.div`
	position: absolute;
	background-color: oklch(50.5% 0.213 27.518);
	width: 19px;
	height: 5px;
	transform: skew(0deg, -25deg);
	top: 14px;
	left: 10px;
`

const SideRight = styled.div`
	position: absolute;
	background-color: oklch(57.7% 0.245 27.325);
	width: 19px;
	height: 5px;
	transform: skew(0deg, 25deg);
	top: 14px;
	left: -9px;
`

const SideTop = styled.div`
	position: absolute;
	background-color: oklch(63.7% 0.237 25.331);
	width: 20px;
	height: 20px;
	rotate: 45deg;
	transform: skew(-20deg, -20deg);
`

// Box Component xử lý logic animation dựa trên prop $variant
const Box = styled.div<{ $variant: '1' | '2' | '3' | '4' }>`
	position: relative;
	opacity: 0;
	left: 10px;

	/* Logic Animation */
	animation: ${(props) => {
			switch (props.$variant) {
				case '1':
				case '3':
					return fromLeft
				case '2':
				case '4':
					return fromRight
				default:
					return fromLeft
			}
		}}
		4s infinite;

	/* Logic Delay */
	animation-delay: ${(props) => {
		switch (props.$variant) {
			case '1':
				return '0s'
			case '2':
				return '1s'
			case '3':
				return '2s'
			case '4':
				return '3s'
			default:
				return '0s'
		}
	}};
`
