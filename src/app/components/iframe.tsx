import { useEffect, useState } from 'react';

export default function IFrame() {
    const [key, setKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setKey(prev => prev + 1);
        }, 60000); // Refresh every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fullBleed noOverflow zIndex:behind">
            <iframe 
                key={key}
                src="https://june7internal.netlify.app" 
                className="noBorder fullBleed" 
            />
        </div>
    )
}
