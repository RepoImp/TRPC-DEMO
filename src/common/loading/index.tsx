import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";

function Loader(props: any) {
    const { load } = props

    const styles:any= {
        margin: "auto",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
    };

    if (load) {
        return (
            <div className="loader" >
                {(load) && (
                    <div>
                        <BeatLoader
                            cssOverride={styles}
                            margin={10}
                            color={"#1a76d2"}
                            loading={load}
                        />
                    </div>
                )}
            </div>
        );
    } else {
        return null;
    }
}

export default Loader
