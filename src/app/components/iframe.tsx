import { useEffect, useState } from 'react';

export default function IFrame() {

    return (
        <div className="fullScreen noOverflow zIndex:behind">
            <iframe 
                src="https://june7internal.netlify.app" 
                className="noBorder fullScreen" 
            />
        </div>
    )
}
