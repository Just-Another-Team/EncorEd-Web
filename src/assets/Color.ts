import { FixMeLater } from "../types/FixMeLater"

type ColorType = 'primaryBlue' | 'darkBlue' | 'gold' | 'paleYellow' | 'black' | "white"
type ColorValueType = (shades?: number | undefined) => string

const Color = (colorType: ColorType, shades?: number): string => (
    colorType === "primaryBlue"? primaryBlue(shades) :
    colorType === "darkBlue" ? darkBlue(shades):
    colorType === "gold" ? gold(shades):
    colorType === "paleYellow" ? paleYellow(shades) : 
    colorType === "black" ? black(shades) : 
    colorType === "white" ? white(shades) : "" 
)


const primaryBlue: ColorValueType = (shades: number = 400) => (
    shades === 100 ? "#A2D0FE" :  
    shades === 200 ? "#74B8FD" :
    shades === 300 ? "#45A1FD" : "#1789FC"
)

const darkBlue: ColorValueType = (shades: number = 400) => (
    shades === 100 ? "#A9C5E1" :  
    shades === 200 ? "#7FA8D2" :
    shades === 300 ? "#548BC3" : "#296EB4"
)

const gold: ColorValueType = (shades: number = 400) => (
    shades === 100 ? "#FEE3AD" :  
    shades === 200 ? "#FED485" :
    shades === 300 ? "#FDC65C" : "#FDB833"
)

const paleYellow: ColorValueType = (shades: number = 400) => (
    shades === 100 ? "#FFECCA" :  
    shades === 200 ? "#FFE3B0" :
    shades === 300 ? "#FFD995" : "#FFD07B"
)

const black: ColorValueType = (shades: number = 400) => (
    shades === 100 ? "#a5a5a9" :  
    shades === 200 ? "#79797f" :
    shades === 300 ? "#4c4c54" : "#1F1F29"
)

const white: ColorValueType = (shades: number = 400) => (
    shades === 100 ? "#fefefe" :  
    shades === 200 ? "#fdfdfd" :
    shades === 300 ? "#fcfcfc" : "#fbfbfb"
)

// yellow: {
//     100: "#fff6e5",
//     200: "#ffecca",
//     300: "#ffe3b0",
//     400: "#ffd995",
//     500: "#ffd07b",
//     600: "#cca662",
//     700: "#997d4a",
//     800: "#665331",
//     900: "#332a19"
// },

// white: {
//     100: "#fefefe",
//     200: "#fdfdfd",
//     300: "#fdfdfd",
//     400: "#fcfcfc",
//     500: "#fbfbfb",
//     600: "#c9c9c9",
//     700: "#979797",
//     800: "#646464",
//     900: "#323232"
// },

// indigo: {
//     100: "#d4e2f0",
//     200: "#a9c5e1",
//     300: "#7fa8d2",
//     400: "#548bc3",
//     500: "#296eb4",
//     600: "#215890",
//     700: "#19426c",
//     800: "#102c48",
//     900: "#081624"
// },

// black: {
//     100: "#d2d2d4",
//     200: "#a5a5a9",
//     300: "#79797f",
//     400: "#4c4c54",
//     500: "#1f1f29",
//     600: "#191921",
//     700: "#131319",
//     800: "#0c0c10",
//     900: "#060608"
// },

export default Color