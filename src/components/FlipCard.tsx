import { useNavigate } from "react-router-dom";
import "../assets/CSS/flipCard.css";

interface FlipCardProps {
    title: string;
    series: string;
    description: string;
    link: string;
    buttonText: string;
    frontImage: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
                                               title,
                                               series,
                                               description,
                                               link,
                                               buttonText,
                                               frontImage,
                                           }) => {
    const navigate = useNavigate();

    return (
        <div className="flip-card mb-5">
            <div className="flip-card-inner">
                {/* FRONT SIDE */}
                <div className="flip-card-front">
                    {frontImage && <img src={frontImage} alt={title} className="card-img-top mb-3" />}
                    <h5 className="card-title">{title}</h5>
                    <p className="card-subtitle">{series}</p>
                </div>

                {/* BACK SIDE */}
                <div className="flip-card-back">
                    <p className="card-text">{description}</p>
                    <button className="btn btn-primary" onClick={() => navigate(link)}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
