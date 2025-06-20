import {useState} from "react";
import "../assets/CSS/ImageTooltip.css"; // Make sure this CSS file exists

const ImageTooltip = () => {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [visible, setVisible] = useState(false);

    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
        setPosition({
            x: e.clientX + 10,
            y: e.clientY + 10
        });
    };

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <div
                        className="position-relative w-100"
                        style={{height: "100%", minHeight: "100%"}}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        <img
                            src="/pfp.svg"
                            width="100%"
                            height="100%"
                            className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                            alt="Austin Tan"
                            loading="lazy"
                        />
                        {visible && (
                            <div
                                className="image-tooltip"
                                style={{left: `${position.x}px`, top: `${position.y}px`}}
                            >
                                Art by ArtStation (Pinterest)
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card-body">
                        <h1 className="card-title">Austin Tan</h1>
                        <h5 className="card-text">
                            Hello everyone, hope y'all are having a fantastic day
                        </h5>
                        <br/>
                        <h5 className="card-text">
                            I'm Austin — a passionate software engineer and storyteller. With a
                            background in design, front-end development, and creative writing,
                            I love bringing ideas to life — from interactive applications to
                            character-driven narratives.
                        </h5>
                        <br/>
                        <h5 className="card-text">
                            I'm constantly learning, building, and pushing myself to create things that connect with
                            people and spark creativity through innovation.
                        </h5>
                        <br/>
                        {/*<div className="d-flex gap-3">*/}
                        {/*    <a className="btn btn-secondary" href="mailto:jakettm6799@gmail.com"><i*/}
                        {/*        className="fa-solid fa-envelope"></i> Contact Me*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ImageTooltip;
