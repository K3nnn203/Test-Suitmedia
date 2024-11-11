import React from "react"

const SectionWrapper = (Component, idName) =>
function HOC(){
    return (
        <section
            className={` max-w-7xl mx-auto relative z-0`}
        > 
            <span className="hash-span" id={idName}>
                &nbsp;
            </span>
            <Component />
        </section>
    )
}
    
export default SectionWrapper