/**
 * Twitter ブランドガイドラインに従って使用すること
 * @see https://about.twitter.com/en/who-we-are/brand-toolkit
 */
export function TwitterIcon(props: {
  className?: string;
  usePrimaryColor?: "fill" | "background";
}) {
  return (
    <svg
      className={props.className}
      style={{
        backgroundColor:
          props.usePrimaryColor === "background" ? "#1d9bf0" : undefined,
      }}
      viewBox="0 0 248 204"
    >
      <g>
        <path
          fill={props.usePrimaryColor === "fill" ? "#1d9bf0" : "currentColor"}
          d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z"
        />
      </g>
    </svg>
  );
}

export function LineIcon(props: { square?: boolean; className?: string }) {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 320"
    >
      <rect
        fill="#06c755"
        width="320"
        height="320"
        rx={props.square ? "0" : "72.1"}
      />
      <path
        fill="#fff"
        d="M266.7,144.9c0-47.7-47.9-86.6-106.7-86.6S53.3,97.2,53.3,144.9c0,42.8,37.9,78.7,89.2,85.4,3.5.8,8.2,2.3,9.4,5.3s.7,6.9.3,9.7c0,0-1.2,7.5-1.5,9.1s-2.1,10.5,9.3,5.7,61.4-36.1,83.8-61.9h0C259.2,181.2,266.7,164,266.7,144.9Z"
      />
      <path
        fill="#06c755"
        d="M231.2,172.5h-30a2,2,0,0,1-2-2h0V123.9h0a2,2,0,0,1,2-2h30a2,2,0,0,1,2,2v7.6a2,2,0,0,1-2,2H210.8v7.9h20.4a2,2,0,0,1,2,2V151a2,2,0,0,1-2,2H210.8v7.9h20.4a2,2,0,0,1,2,2v7.6A2,2,0,0,1,231.2,172.5Z"
      />
      <path
        fill="#06c755"
        d="M120.3,172.5a2,2,0,0,0,2-2v-7.6a2,2,0,0,0-2-2H99.9v-37a2,2,0,0,0-2-2H90.3a2,2,0,0,0-2,2v46.5h0a2,2,0,0,0,2,2h30Z"
      />
      <rect
        fill="#06c755"
        x="128.7"
        y="121.9"
        width="11.6"
        height="50.64"
        rx="2"
      />
      <path
        fill="#06c755"
        d="M189.8,121.9h-7.5a2.1,2.1,0,0,0-2.1,2v27.6l-21.3-28.7v-.2h0l-.2-.2h-8.9a2.1,2.1,0,0,0-2.1,2v46.6a2.1,2.1,0,0,0,2.1,2h7.5a2,2,0,0,0,2.1-2V142.8l21.3,28.8.5.5h8.7a2,2,0,0,0,2.1-2V123.9A2,2,0,0,0,189.8,121.9Z"
      />
    </svg>
  );
}
