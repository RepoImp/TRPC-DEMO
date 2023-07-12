import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function Toster() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                draggable
            />
        </>
    )
}

export default Toster
