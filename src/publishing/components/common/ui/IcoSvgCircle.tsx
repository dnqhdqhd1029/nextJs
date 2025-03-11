/**
 * @file IcoSvgCircle.tsx
 * @description ico svg 컴포넌트
 */

interface DataCircleType {
  [key: string]: { path: string[]; circle: string[][] }
}

const IcoSvgCircle = ({ data }: DataCircleType) => {
  return (
    <span className="ico-svg">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {data.path.map((d: string, i: number) => (
          <path
            d={d}
            stroke="currentColor"
            strokeLinecap="round"
            key={i}
          />
        ))}

        {data.circle.map((d: string[], i: number) => (
          <circle
            cx={d[0]}
            cy={d[1]}
            r={d[2]}
            transform={d[3]}
            stroke="currentColor"
            strokeLinecap="round"
            key={i}
          />
        ))}
      </svg>
    </span>
  )
}

export default IcoSvgCircle
