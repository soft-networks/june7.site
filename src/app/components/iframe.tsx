import { useEffect, useState } from 'react';

export default function IFrame() {

    return (
        <div className="fullBleed noOverflow zIndex:behind">
            <iframe 
                src="https://june7internal.netlify.app" 
                className="noBorder fullBleed" 
            />
        </div>
    )
}
