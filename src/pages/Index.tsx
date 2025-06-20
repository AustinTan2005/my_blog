import {lazy, Suspense} from "react";

function IndexPage() {
    const FlipCard = lazy(() => import("../components/FlipCard.tsx"));
    const ImageTooltip = lazy(() => import("../components/ImageTooltip.tsx"));

    return (
        <>
            <nav id="navbar-example2" className="navbar fixed-top bg-body-secondary bg-opacity-75 backdrop-blur px-3">
                <a className="navbar-brand" href="/">
                    <img
                        src="/jake.svg"
                        alt="Logo"
                        width="50"
                        height="48"
                        className="d-inline-block align-content-center"
                    />
                </a>
                <ul className="nav nav-pills ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#scrollspyHeading1">My Work</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#scrollspyHeading2">About Me</a>
                    </li>
                    {/*<li className="nav-item">*/}
                    {/*    <a className="nav-link" href="/support">Support Me</a>*/}
                    {/*</li>*/}
                </ul>
            </nav>
            <div
                data-bs-spy="scroll"
                data-bs-target="#navbar-example2"
                data-bs-root-margin="0px 0px -40%"
                data-bs-smooth-scroll="true"
                className="scrollspy-example p-5"
                style={{background: "transparent"}}
                tabIndex={0}
            >
                <h1 className="mb-4" id="scrollspyHeading1">My Work</h1>
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <Suspense fallback={<div>Loading...</div>}>
                        <FlipCard
                            title="Jake - The Amalgam Hero"
                            series="Series #1"
                            frontImage="/jake.svg"
                            description={`Jake has always felt invisible — bullied, orphaned, and left in darkness. On the edge of giving up, he climbs a skyscraper, to see the sunset one last time before ending it all.
                            But as he steps off, time halts.
                            He awakens in a sunlit field — silent, surreal, and still.
                            From that moment on, he's given a chance to change everything.`}
                            link="/Book1"
                            buttonText="Read"
                        />
                    </Suspense>
                </div>
                <h1 className="mt-5 mb-4" id="scrollspyHeading2">About Me</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <ImageTooltip/>
                </Suspense>
            </div>
            <footer className="bg-white text-black container-fluid py-3">
                <div className="d-flex flex-row align-items-center justify-content-center gap-3">
                    <span
                        className="m-0">©Copyright {new Date().getFullYear()} - AmalgamVerse. All Rights Reserved.</span>
                    {/*<a href="#" className="text-decoration-none">Privacy Policy</a>*/}
                    {/*<span>|</span>*/}
                    {/*<a href="#" className="text-decoration-none">Terms & Conditions</a>*/}
                    {/*<span>|</span>*/}
                    <a href="mailto:jakettm6799@gmail.com" className="text-decoration-none">Contact Me</a>
                </div>
            </footer>
        </>
    );
}

export default IndexPage;
