import { useEffect, useState } from "react";
import { buttonCSS, buttonCSSSecondary } from "../cssConstants";
import useModalIsOpen from "./useModalIsOpen";
import { RequestMaker } from "./requestMaker";
import { syncRequestCount } from "../lib/requests";
import RequestList from "./requestList";
import useModalStage from "./useModalStage";

export default function Guide() {
    const { isOpen } = useModalIsOpen();
    const { stage } = useModalStage();

    return <>
        {!isOpen && <GuideOpener />}
        {isOpen && stage === 0 && <Explainer />}
        {isOpen && stage === 1 && <RequestMaker />}
        {isOpen && stage === 2 && <RequestList />}
    </>
}


const GuideOpener = () => {
    const { open } = useModalIsOpen();
    const [requestCount, setRequestCount] = useState<RequestCount>({ pending: 0, completed: 0, rejected: 0, total: 0 });
    const { setStage } = useModalStage();
    useEffect(() => {
        syncRequestCount((requestCount) => setRequestCount(requestCount));
    }, []);
    return <div className="padded:s-2 fullWidth position:fixed fill:black color:white center:text">help build this website today by <span className="underline cursor:pointer" onClick={open}>submitting a request</span> or <span className="underline cursor:pointer" onClick={() => { setStage(2); open() }}>viewing {requestCount.total} requests</span></div>
}
const Explainer = () => {
    const { close } = useModalIsOpen();
    const { incrementStage, setStage } = useModalStage();
    return (
        <div className="position:absolute:topcenter padded fill:white border:black textWidth zIndex:higher stack">
            <p>welcome to june7.site. we are making this website together, today. you can help us by submitting a request below!</p>
            <div className={buttonCSS} onClick={() => incrementStage(1)}>make a request</div>
            <div className="stack:horizontal fullWidth"><div className={buttonCSSSecondary + " fullWidth"} onClick={() => setStage(2)}>view requests</div><div className={buttonCSSSecondary + " fullWidth"} onClick={close}>explore site</div></div>
        </div>
    )
}
