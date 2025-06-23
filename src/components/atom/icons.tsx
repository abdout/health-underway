import { cn } from "@/lib/utils"

interface IconProps {
  className?: string
  width?: number | string
  height?: number | string
}

export function Logo({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M12 1.75a2.63 2.63 0 0 0-1.32.355l-6.61 3.8l-.002.002A2.65 2.65 0 0 0 2.75 8.198v7.603a2.64 2.64 0 0 0 1.318 2.292l.003.002l6.608 3.799h.002a2.63 2.63 0 0 0 2.639 0h.001l6.608-3.8h.003A2.65 2.65 0 0 0 21.25 15.8V8.2a2.65 2.65 0 0 0-1.318-2.292l-6.61-3.8l-.002-.002A2.63 2.63 0 0 0 12 1.75"
      />
    </svg>
  )
}

export function Patreon({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M7.462 3.1c2.615-1.268 6.226-1.446 9.063-.503c2.568.853 4.471 3.175 4.475 5.81c.004 3.061-1.942 5.492-4.896 6.243c-1.693.43-2.338.75-2.942 1.582c-.238.328-.45.745-.796 1.533l-.22.5C11 20.866 9.99 22.027 7.91 22c-2.232-.03-3.603-1.742-4.313-4.48c-.458-1.768-.617-3.808-.594-5.876c.044-3.993 1.42-7.072 4.46-8.545z"
      />
    </svg>
  )
}

export function Coffee({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="-2 -6 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M0 0h17a3 3 0 0 1 0 6h-1.252A8 8 0 0 1 0 4zm16 4h1a1 1 0 0 0 0-2h-1z"
      />
    </svg>
  )
}

export function StarterKit({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      width={width} 
      height={height} 
      className={cn("fill-current", className)}
    >
      <path d="m12.807 10.906l5.865-8.505C19.787.802 21.214 0 22.974 0q2.148.001 3.719 1.526c1.047 1.021 1.568 2.234 1.568 3.651c0 1.042-.276 1.969-.833 2.771l-5.286 7.693l6.469 8.203c.646.818.969 1.776.969 2.865c0 1.448-.505 2.693-1.526 3.734Q26.531 31.998 24.361 32q-2.382 0-3.63-1.547l-7.922-9.891v5.453q0 2.335-.813 3.63c-.979 1.568-2.401 2.354-4.281 2.354c-1.708 0-3.036-.583-3.974-1.734q-1.319-1.596-1.318-4.229V5.817c0-1.656.448-3.031 1.339-4.109C4.694.573 5.986 0 7.637 0c1.573 0 2.88.573 3.927 1.708c.583.635.953 1.271 1.109 1.922c.094.401.141 1.141.141 2.24v5.036z" />
    </svg>
  )
}

export function Onboarding({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={width} 
      height={height} 
      className={cn("fill-current", className)}
    >
      <path d="M13 4a1 1 0 0 1 .993.883L14 5a1 1 0 0 0 1.993.117L16 5a1 1 0 0 1 1-1h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2a1 1 0 0 1-.993-.883L16 19a1 1 0 0 0-1.993-.117L14 19a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm2 9a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-1a1 1 0 0 0-1-1m0-5a1 1 0 0 0-.993.883L14 9v1a1 1 0 0 0 1.993.117L16 10V9a1 1 0 0 0-1-1" />
    </svg>
  )
}

export function Notification({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        d="M28.707 19.293L26 16.586V13a10.014 10.014 0 0 0-9-9.95V1h-2v2.05A10.014 10.014 0 0 0 6 13v3.586l-2.707 2.707A1 1 0 0 0 3 20v3a1 1 0 0 0 1 1h7v1a5 5 0 0 0 10 0v-1h7a1 1 0 0 0 1-1v-3a1 1 0 0 0-.293-.707M19 25a3 3 0 0 1-6 0v-1h6Z"
      />
    </svg>
  )
}

export function Contentlayer({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        stroke="currentColor"
        strokeWidth="2.146"
        d="M-2.482.404A1.93 1.93 0 0 1-.16.427l6.967 5.356a1.93 1.93 0 0 1 0 3.058L4.15 10.883l2.7 2.171c.983.79.956 2.294-.053 3.048l-7.152 5.344a1.93 1.93 0 0 1-2.439-.106l-5.596-4.996l-.782-.672c-3.492-3-3.062-8.526.845-10.951zm5.6 9.65L-.13 7.444a1.93 1.93 0 0 0-2.384-.026l-2.403 1.848a1.93 1.93 0 0 0 0 3.058l2.42 1.86a1.93 1.93 0 0 0 2.352 0l3.246-2.494l2.944 2.366a.643.643 0 0 1-.018 1.016l-7.152 5.344a.64.64 0 0 1-.813-.035l-5.6-5l-.796-.684c-2.839-2.439-2.482-6.935.705-8.896l.023-.014l5.888-4.349a.64.64 0 0 1 .774.008l6.967 5.356a.643.643 0 0 1 0 1.02zm-1.049.807l-2.998 2.304a.64.64 0 0 1-.783 0l-2.421-1.86a.643.643 0 0 1 0-1.02l2.403-1.848a.64.64 0 0 1 .795.009z"
        clipRule="evenodd"
        transform="matrix(.5949 0 0 .61208 9.182 1.311)"
      />
    </svg>
  )
}

export function Authentication({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      width={width}
      height={height}
      className={cn("fill-current", className)}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  )
}

export function Subscription({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={width} 
      height={height} 
      className={cn("fill-current", className)}
    >
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
    </svg>
  )
}

// Micros Icons
export function Math({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M3 8h10M5 8v8m6-8v6.03A1.97 1.97 0 0 0 12.97 16H13"
      />
    </svg>
  )
}

export function Flow({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 256 256"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        d="M256 128a8 8 0 0 1-8 8h-39.58a80 80 0 0 1-158.84 0H8a8 8 0 0 1 0-16h39.58a80 80 0 0 1 158.84 0H248a8 8 0 0 1 8 8"
      />
    </svg>
  )
}

export function Docs({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <g fill="none" fillRule="evenodd">
        <path d="m10.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M1.255 3.667A1.01 1.01 0 0 1 2.022 2H14.5a4.5 4.5 0 1 1 0 9H2.022a1.01 1.01 0 0 1-.767-1.667l.754-.88a3 3 0 0 0 0-3.905l-.754-.88ZM1 16.5A4.5 4.5 0 0 1 5.5 12h12.478a1.01 1.01 0 0 1 .767 1.667l-.755.88a3 3 0 0 0 0 3.905l.755.88A1.01 1.01 0 0 1 17.978 21H5.5A4.5 4.5 0 0 1 1 16.5"
        />
      </g>
    </svg>
  )
}

export function Report({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      className={cn("fill-current", className)}
    >
      <path fill="currentColor" d="M10 17q.425 0 .713-.288T11 16t-.288-.712T10 15t-.712.288T9 16t.288.713T10 17m0-4q.425 0 .713-.288T11 12V8q0-.425-.288-.712T10 7t-.712.288T9 8v4q0 .425.288.713T10 13m-2.925 8q-.4 0-.762-.15t-.638-.425l-4.1-4.1q-.275-.275-.425-.638T1 14.926v-5.85q0-.4.15-.762t.425-.638l4.1-4.1q.275-.275.638-.425T7.075 3h5.85q.4 0 .763.15t.637.425l4.1 4.1q.275.275.425.638t.15.762v5.85q0 .4-.15.763t-.425.637l-4.1 4.1q-.275.275-.638.425t-.762.15z"/>
    </svg>
  )
}

export function PDF({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 16 16" 
      className={cn("fill-current", className)}
    >
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M2.8 14.34c1.81-1.25 3.02-3.16 3.91-5.5c.9-2.33 1.86-4.33 1.44-6.63c-.06-.36-.57-.73-.83-.7c-1.02.06-.95 1.21-.85 1.9c.24 1.71 1.56 3.7 2.84 5.56c1.27 1.87 2.32 2.16 3.78 2.26c.5.03 1.25-.14 1.37-.58c.77-2.8-9.02-.54-12.28 2.08c-.4.33-.86 1-.6 1.46c.2.36.87.4 1.23.15h0Z" strokeWidth="2"/>
    </svg>
  )
}

export function Chatbot({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A1 1 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1 1 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632M7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2s-.672 2-1.5 2S7 13.104 7 12m8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2s1.5.896 1.5 2s-.672 2-1.5 2"
      />
    </svg>
  )
}

export function Invoice({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        d="m21 22l-3-2l-3 2l-3-2l-3 2l-3-2l-3 2V3h18z"
      />
    </svg>
  )
}

export function Salary({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        d="M9.997 15.48q-.668 0-1.14-.475t-.472-1.143t.475-1.14t1.144-.472t1.14.476t.472 1.143t-.476 1.14t-1.143.472M6.375 7.75h7.25L14.9 5.161q.212-.403-.018-.782T14.192 4H5.808q-.46 0-.69.379t-.018.783zM6.631 20h6.738q1.93 0 3.28-1.351Q18 17.298 18 15.363q0-.808-.277-1.574t-.8-1.395L13.881 8.75H6.119l-3.042 3.644q-.523.629-.8 1.395Q2 14.554 2 15.363q0 1.935 1.351 3.286T6.631 20"
      />
    </svg>
  )
}

export function Timesheet({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10S4.477 0 10 0m-.93 5.581a.7.7 0 0 0-.698.698v5.581c0 .386.312.698.698.698h5.581a.698.698 0 1 0 0-1.395H9.767V6.279a.7.7 0 0 0-.697-.698"
      />
    </svg>
  )
}

export function Leads({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <g fill="none">
        <path d="M0 0h24v24H0z" />
        <path
          fill="currentColor"
          d="M10.5 2a8.5 8.5 0 0 1 6.676 13.762l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 1 1 10.5 2m0 2a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13m0 1a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11"
        />
      </g>
    </svg>
  )
}

export function Proposal({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15 15"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        d="M2.5 0A1.5 1.5 0 0 0 1 1.5v12A1.5 1.5 0 0 0 2.5 15h10a1.5 1.5 0 0 0 1.5-1.5V3.293L10.707 0z"
      />
    </svg>
  )
}

export function Dashboard({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        d="M12 3a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 0a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm0 10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1zM3 14a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"
      />
    </svg>
  )
}

export function Logbook({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18.75 16.714a1 1 0 0 1-.014.143a.75.75 0 0 1-.736.893H4a1.25 1.25 0 1 0 0 2.5h14a.75.75 0 0 1 0 1.5H4A2.75 2.75 0 0 1 1.25 19V5A2.75 2.75 0 0 1 4 2.25h13.4c.746 0 1.35.604 1.35 1.35zM7 6.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

// Vibes Icons
export function Rules({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 32 32" 
      className={cn("fill-current", className)}
    >
      <path fill="none" d="M9 16h14v2H9zm0-6h14v2H9z"/>
      <path fill="currentColor" d="M26 2H6a2 2 0 0 0-2 2v13a10.98 10.98 0 0 0 5.824 9.707L16 30l6.176-3.293A10.98 10.98 0 0 0 28 17V4a2 2 0 0 0-2-2m-3 16H9v-2h14Zm0-6H9v-2h14Z"/>
    </svg>
  )
}

export function Prompts({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      className={cn("fill-current", className)}
    >
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="m5 7l5 5l-5 5m8 0h6"/>
    </svg>
  )
}

export function Tweets({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      className={cn("", className)}
    >
      <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.2 4.2 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.52 8.52 0 0 1-5.33 1.84q-.51 0-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23"/>
    </svg>
  )
}

export function MCP({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={width}
      height={height}
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="4"
        d="M111.5 21L121.5 23L133 31.5Q139.6 39.2 139 53Q157.1 52.6 165 63.5Q171.4 70.6 171 84.5Q169.3 93.8 164 99.5L104 160.5L118 175.5L118 178.5L115.5 182L110.5 182L96 167.5Q92.8 164.2 94 156.5L96 152.5L158 90.5L161 80.5L158 71.5L152.5 66L142.5 63L133.5 66L82.5 117L78.5 118L75 115.5L74 111.5L126 58.5L129 48.5L126 39.5L120.5 34Q115.8 30.7 106.5 32L99.5 36L34.5 101L31.5 102L28 99.5L27 94.5L94.5 27L101.5 23L111.5 21Z"
      />
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="4"
        d="M109.5 44Q115 43 116 46.5L116 51.5L66 101.5Q62.1 105.6 63 114.5Q64.9 122.1 70.5 126Q74.6 129.9 83.5 129L90.5 126L140.5 76L145.5 76Q149 77 148 82.5L95.5 135Q88.6 140.6 74.5 139Q64.9 136.1 59 129.5L53 117.5L53 106.5L57 96.5L109.5 44Z"
      />
    </svg>
  )
}

export function Cursor({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        fillOpacity="0.3"
        d="M3.75 9v14h24.5V9L16 2"
      />
      <path
        fill="currentColor"
        fillOpacity="0.6"
        d="M16 16V2L3.75 9l24.5 14L16 30L3.75 23"
      />
      <path
        fill="currentColor"
        fillOpacity="0.9"
        d="M28.25 9H16v21"
      />
      <path
        fill="currentColor"
        d="M3.75 9h24.5L16 16"
      />
    </svg>
  )
}

export function Extensions({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path
        fill="currentColor"
        d="M8.954 20H5q-.421 0-.71-.29Q4 19.422 4 19v-3.954q.854-.25 1.427-.945T6 12.5t-.573-1.601T4 9.954V6q0-.421.29-.71Q4.579 5 5 5h4q.27-.858.946-1.371q.677-.514 1.554-.514t1.554.514T14 5h4q.421 0 .71.29q.29.289.29.71v4q.858.27 1.371.946q.514.677.514 1.554t-.514 1.554T19 15v4q0 .421-.29.71q-.289.29-.71.29h-3.954q-.269-.904-.97-1.452T11.5 18t-1.576.548T8.954 20"
      />
    </svg>
  )
}

export function GitHub({ className, width = 32, height = 32 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        fillRule="evenodd" 
        d="M12.006 2a9.85 9.85 0 0 0-6.484 2.44a10.32 10.32 0 0 0-3.393 6.17a10.48 10.48 0 0 0 1.317 6.955a10.05 10.05 0 0 0 5.4 4.418c.504.095.683-.223.683-.494c0-.245-.01-1.052-.014-1.908c-2.78.62-3.366-1.21-3.366-1.21a2.7 2.7 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621c.317.044.62.163.885.346c.266.183.487.426.647.71c.135.253.318.476.538.655a2.08 2.08 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37c-2.219-.259-4.554-1.138-4.554-5.07a4.02 4.02 0 0 1 1.031-2.75a3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05c.37.858.406 1.828.101 2.713a4.02 4.02 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.47 2.47 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814c0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421a10.47 10.47 0 0 0 1.313-6.948a10.32 10.32 0 0 0-3.39-6.165A9.85 9.85 0 0 0 12.007 2Z" 
        clipRule="evenodd" 
      />
    </svg>
  )
}

export function Discord({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M19.303 5.337A17.3 17.3 0 0 0 14.963 4c-.191.329-.403.775-.552 1.125a16.6 16.6 0 0 0-4.808 0C9.454 4.775 9.23 4.329 9.05 4a17 17 0 0 0-4.342 1.337C1.961 9.391 1.218 13.35 1.59 17.255a17.7 17.7 0 0 0 5.318 2.664a13 13 0 0 0 1.136-1.836c-.627-.234-1.22-.52-1.794-.86c.149-.106.297-.223.435-.34c3.46 1.582 7.207 1.582 10.624 0c.149.117.287.234.435.34c-.573.34-1.167.626-1.793.86a13 13 0 0 0 1.135 1.836a17.6 17.6 0 0 0 5.318-2.664c.457-4.52-.722-8.448-3.1-11.918M8.52 14.846c-1.04 0-1.889-.945-1.889-2.101s.828-2.102 1.89-2.102c1.05 0 1.91.945 1.888 2.102c0 1.156-.838 2.1-1.889 2.1m6.974 0c-1.04 0-1.89-.945-1.89-2.101s.828-2.102 1.89-2.102c1.05 0 1.91.945 1.889 2.102c0 1.156-.828 2.1-1.89 2.1"
      />
    </svg>
  )
}

// Rating Icons for Pricing Comparison
export function ExcellentIcon({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M12.954 1.7a1 1 0 0 0-1.908-.001l-2.184 6.92l-6.861-.005a1 1 0 0 0-.566 1.826l5.498 3.762l-2.067 6.545A1 1 0 0 0 6.4 21.86l5.6-4.006l5.594 4.007a1 1 0 0 0 1.536-1.114l-2.067-6.545l5.502-3.762a1 1 0 0 0-.566-1.826l-6.866.005z"
      />
    </svg>
  )
}

export function GoodIcon({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M4 18a2 2 0 1 1 0 4a2 2 0 0 1 0-4m5.5-3a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5M12 2a5.414 5.414 0 0 1 5.33 4.47h.082a3.765 3.765 0 1 1 0 7.53H6.588a3.765 3.765 0 1 1 0-7.53h.082A5.414 5.414 0 0 1 12 2"
      />
    </svg>
  )
}

export function AverageIcon({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <g fill="none">
        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/>
        <path 
          fill="currentColor" 
          d="M5 16c.748 0 1.463.226 2.014.64c.552.413.986 1.06.986 1.86s-.434 1.447-.986 1.86c-.55.414-1.266.64-2.014.64s-1.463-.226-2.014-.64C2.434 19.948 2 19.3 2 18.5s.434-1.447.986-1.86C3.536 16.225 4.252 16 5 16m7.923-13.115c1.487 0 2.803.727 3.613 1.844a4.462 4.462 0 0 1 4.309 7.344a4.462 4.462 0 0 1-6.296 3.956a4.462 4.462 0 0 1-6.87-1.707A4.462 4.462 0 0 1 8.725 5.83a4.46 4.46 0 0 1 4.197-2.945Z"
        />
      </g>
    </svg>
  )
}

export function PoorIcon({ className, width = 20, height = 20 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 512 512"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M254.4 6.6c3.5-4.3 9-6.5 14.5-5.7C315.8 7.2 352 47.4 352 96c0 11.2-1.9 22-5.5 32h5.5c35.3 0 64 28.7 64 64c0 19.1-8.4 36.3-21.7 48H408c39.8 0 72 32.2 72 72c0 23.2-11 43.8-28 57c34.1 5.7 60 35.3 60 71c0 39.8-32.2 72-72 72H72c-39.8 0-72-32.2-72-72c0-35.7 25.9-65.3 60-71c-17-13.2-28-33.8-28-57c0-39.8 32.2-72 72-72h13.7C104.4 228.3 96 211.1 96 192c0-35.3 28.7-64 64-64h16.2c44.1-.1 79.8-35.9 79.8-80c0-9.2-1.5-17.9-4.3-26.1c-1.8-5.2-.8-11.1 2.8-15.4z" 
        strokeWidth="13" 
        stroke="currentColor"
      />
    </svg>
  )
}

// Medical/Healthcare Icons
export function Emergency({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M5 20v-2h1.6l1.975-6.575q.2-.65.738-1.037T10.5 10h3q.65 0 1.188.388t.737 1.037L17.4 18H19v2zm6-12V3h2v5zm5.95 2.475L15.525 9.05l3.55-3.525l1.4 1.4zM18 15v-2h5v2zM7.05 10.475l-3.525-3.55l1.4-1.4l3.55 3.525zM1 15v-2h5v2z"
      />
    </svg>
  )
}

export function HeartMedical({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137"
      />
    </svg>
    
  )
}

export function BrainMedical({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M14.25 20.192q-.575 0-.964-.177q-.39-.178-.786-.534V4.46q.396-.355.786-.523q.389-.169.964-.169q1.127 0 1.93.789q.803.788.82 1.91v.173q0 .076-.02.153q1.322.143 2.229 1.123t.907 2.352q0 .57-.176 1.098q-.176.53-.51.96q.237.392.365.838t.128.912q0 1.32-.83 2.288t-2.099 1.168q-.048 1.115-.835 1.887q-.788.772-1.909.772m-4.5 0q-1.121 0-1.921-.772t-.848-1.887q-1.25-.22-2.077-1.19q-.827-.972-.827-2.266q0-.467.118-.913q.119-.445.355-.837q-.333-.43-.499-.96q-.166-.529-.166-1.098q0-1.352.894-2.34T6.994 6.8q-.019-.077-.019-.154v-.173q.017-1.14.823-1.922t1.952-.782q.556 0 .955.172q.399.17.795.526V19.5q-.396.356-.786.524q-.389.168-.964.168"
      />
    </svg>
    
  )
}

export function LungsMedical({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 576 512"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M153.7 144.8c6.9 16.3 20.6 31.2 38.3 31.2h192c17.7 0 31.4-14.9 38.3-31.2C434.4 116.1 462.9 96 496 96c44.2 0 80 35.8 80 80c0 30.4-17 56.9-42 70.4c-3.6 1.9-6 5.5-6 9.6s2.4 7.7 6 9.6c25 13.5 42 40 42 70.4c0 44.2-35.8 80-80 80c-33.1 0-61.6-20.1-73.7-48.8c-6.9-16.3-20.6-31.2-38.3-31.2H192c-17.7 0-31.4 14.9-38.3 31.2C141.6 395.9 113.1 416 80 416c-44.2 0-80-35.8-80-80c0-30.4 17-56.9 42-70.4c3.6-1.9 6-5.5 6-9.6s-2.4-7.7-6-9.6c-25-13.5-42-40-42-70.4c0-44.2 35.8-80 80-80c33.1 0 61.6 20.1 73.7 48.8" 
        strokeWidth="13" 
        stroke="currentColor"
      />
    </svg>
    
  )
}

export function MedicationBottle({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M8 7q-.425 0-.712-.288T7 6t.288-.712T8 5h3V3q0-.425.288-.712T12 2t.713.288T13 3v2h3q.425 0 .713.288T17 6t-.288.713T16 7zm1 15q-.825 0-1.412-.587T7 20v-2h4q.425 0 .713-.288T12 17t-.288-.712T11 16H7v-2h4q.425 0 .713-.288T12 13t-.288-.712T11 12H7v-1q0-1.25.875-2.125T10 8h4q1.25 0 2.125.875T17 11v9q0 .825-.587 1.413T15 22z"
      />
    </svg>
  )
}

export function Stethoscope({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M16.5 19.596q-1.304 0-2.21-.905q-.905-.906-.905-2.21t.905-2.21q.906-.906 2.21-.906t2.21.906t.905 2.21q0 .536-.179 1.02q-.178.484-.492.876l2.081 2.08q.14.141.13.345q-.009.204-.15.344t-.334.14t-.334-.14l-2.1-2.08q-.373.255-.806.393t-.931.137m0-1q.864 0 1.49-.626t.626-1.49t-.626-1.489t-1.49-.626t-1.49.626q-.625.626-.625 1.49t.626 1.49t1.489.625M4.789 21.5q-.349 0-.579-.23t-.23-.578V16q0-1.038.732-1.77t1.769-.73h2q1.461 0 2.48-1.02t1.02-2.48q0-.617-.441-1.059q-.442-.441-1.06-.441q-.632 0-1.065-.434Q8.98 7.633 8.98 7V3.308q0-.348.23-.578t.577-.23h2.404q.348 0 .578.23t.23.578v.25l.942.942q2.599 0 4.328 1.922T20 11v1.237q-.748-.61-1.629-.933q-.88-.323-1.871-.323q-2.289 0-3.894 1.605T11 16.482q0 .467.097 1.025t.292.994H9.5q-.617 0-1.059.441T8 20v.692q0 .349-.23.578t-.578.23z"
      />
    </svg>
  )
}

export function MedicalChart({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 14 14"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        fillRule="evenodd" 
        d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7m8.833-.5A1.667 1.667 0 1 0 7.32 4.137a1.25 1.25 0 1 0 .385 1.922a1.66 1.66 0 0 0 1.13.441Zm-5.07 2.196a.5.5 0 0 0-.187.04a.625.625 0 0 1-.545-1.126c.167-.08.416-.155.694-.164a1.5 1.5 0 0 1 .965.3c.321.248.472.58.536.857c.063.27.054.53.018.712a.5.5 0 0 0 .01.19c.018.08.049.124.081.149c.033.025.082.043.165.04a.5.5 0 0 0 .186-.039a.625.625 0 1 1 .545 1.125a1.8 1.8 0 0 1-.693.164a1.5 1.5 0 0 1-.966-.3a1.5 1.5 0 0 1-.536-.856a1.8 1.8 0 0 1-.018-.713a.5.5 0 0 0-.01-.19c-.018-.08-.049-.123-.081-.148c-.033-.025-.082-.044-.165-.041ZM8 7.49a.875.875 0 1 0 0 1.75a.875.875 0 0 0 0-1.75M2.664 5.084a.875.875 0 1 1 1.75 0a.875.875 0 0 1-1.75 0m7.586 3.871a.875.875 0 1 0 0 1.75a.875.875 0 0 0 0-1.75" 
        clipRule="evenodd"
      />
    </svg>
  )
}

export function Surgery({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M7.22 11.91c-.33.33-.51.74-.56 1.17l5.51 2.36l8.49-8.48c.78-.79.78-2.05 0-2.83l-1.42-1.42c-.78-.78-2.04-.78-2.83 0zM5 16v5.75l5.81-5.22l-5-2zM17.12 4.83c.38-.39 1.03-.39 1.42 0c.39.4.39 1.03 0 1.42s-1.04.39-1.42 0c-.39-.39-.39-1.02 0-1.42"
      />
    </svg>
  )
}

export function BrainScan({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M19 3H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2m-1.9 10H13v1h4s-.06 3-1.5 3c-1.35 0-1-1.53-2.5-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2c-1.5.47-1.15 2-2.5 2C7.06 17 7 14 7 14h4v-1H6.9c-.05-.31-.06-.65-.1-1H11v-1H6.81c.02-.33.1-.67.19-1h4V9H7.34c.16-.35.31-.69.49-1H11V7c0-.55.45-1 1-1s1 .45 1 1v1h3.17c.18.31.33.65.49 1H13v1h4c.1.33.17.67.19 1H13v1h4.2c-.04.35-.05.69-.1 1"
      />
    </svg>
  )
}

export function Obstetrics({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 48 48"
      className={cn("", className)}
    >
      <g fill="currentColor" strokeWidth="1" stroke="currentColor">
        <path 
          fillRule="evenodd" 
          d="M17.8 26.6a3 3 0 0 1 .6 4.2l-3 4A3 3 0 0 1 13 36H9a3 3 0 1 1 0-6h2.5l2.1-2.8a3 3 0 0 1 4.2-.6" 
          clipRule="evenodd"
        />
        <path d="M39.474 30.393H36.27l-.57-.262c-1.46-1.622-3.824-5.148-5.805-6.359A5.17 5.17 0 0 0 27.159 23H21.5l.586 13h4.729a5.3 5.3 0 0 0 2.273-.516a5.85 5.85 0 0 0 1.911-1.46l.57-.655c.719.799 1.383 2.631 2.45 2.631h5.589c.67 0 1.178-.295 1.652-.821s.74-1.239.74-1.982c0-.744-.266-1.457-.74-1.982c-.474-.526-1.116-.822-1.786-.822M40 15.5a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0"/>
        <path 
          fillRule="evenodd" 
          d="M33.5 20a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9m0 2a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13" 
          clipRule="evenodd"
        />
      </g>
    </svg>
  )
}

export function Orthopedics({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M15 2a4 4 0 0 1 3.881 3.03l.016.072l.08.019a4 4 0 0 1 2.83 2.65l.057.193a4 4 0 0 1-5.847 4.51l-.047-.029l-3.525 3.525l.042.07a4 4 0 0 1 .117 3.696l-.102.197a4 4 0 0 1-4.386 1.969a3.99 3.99 0 0 1-2.982-2.904l-.023-.095l-.138-.033a4 4 0 0 1-2.82-2.783l-.05-.199a4 4 0 0 1 5.865-4.368l.068.04l3.524-3.524l-.036-.061a4 4 0 0 1-.293-3.295l.079-.205a4 4 0 0 1 3.695-2.47l-.139.004l.02-.003z"
      />
    </svg>
  )
}

export function Dermatology({ className, width = 24, height = 24 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24"
      className={cn("", className)}
    >
      <path 
        fill="currentColor" 
        d="M16 12v10H4V12c0-2.97 2.16-5.43 5-5.91V4H7V2h6c1.13 0 2.15.39 3 1l-1.44 1.44C14.1 4.17 13.57 4 13 4h-2v2.09c2.84.48 5 2.94 5 5.91"
      />
    </svg>
  )
}
