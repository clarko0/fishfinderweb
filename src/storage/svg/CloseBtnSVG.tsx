const CloseBtnSVG = () => {
    return (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 7L11 23.24" stroke="#2D2D2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 7L27 23.24" stroke="#2D2D2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <g filter="url(#filter0_d_28_288)">
                <rect x="4.5" y="0.5" width="29" height="29" rx="14.5" stroke="white" shape-rendering="crispEdges"/>
            </g>
            <defs>
                <filter id="filter0_d_28_288" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_28_288"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_28_288" result="shape"/>
                </filter>
            </defs>
        </svg>
    )
}

export default CloseBtnSVG;