import { buttonCSSSecondary, modalCSS } from "../cssConstants";

import { buttonCSS } from "../cssConstants";
import useModalIsOpen from "./useModalIsOpen";
import useModalStage from "./useModalStage";

const Explainer = () => {
    const { close } = useModalIsOpen();
    const { incrementStage, setStage } = useModalStage();
    return (
        <div className={modalCSS}>
            <div className="h4">welcome to june7.site</div>
            <p>my name is bhavik, and i love building websites with people. today is june 7, 2025 & i'm building a website from scratch — with you and many (maybe hundreds) of other people.</p>
            <p>help shape what this website will become by submitting a request below. i will try my best to cater to the needs of every single request submitted.</p>
            <div className={buttonCSS} onClick={() => incrementStage(1)}>make a request</div>
            <div className="stack:horizontal fullWidth"><div className={buttonCSSSecondary + " fullWidth"} onClick={() => setStage(2)}>see requests</div><div className={buttonCSSSecondary + " fullWidth"} onClick={close}>explore site</div></div>
        </div>
    )
}

export default Explainer;