import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import NavBar from "../components/NavBar.tsx";

const ChapterPage = () => {
    const {bookID} = useParams();
    const {id} = useParams(); // chapter number
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchChapter = async () => {
            const bookID = sessionStorage.getItem("currentBookID");

            if (!bookID || !id) {
                setError("Chapter not found.");
                return;
            }

            try {
                const resList = await fetch(`/${bookID}/chapters.json`);
                if (!resList.ok) {
                    setError("Missing chapter list.");
                    return;
                }

                const chapters = await resList.json();
                const chapter = chapters.find((ch: any) => String(ch.chapter) === id);

                if (!chapter) {
                    setError("Chapter not found in list.");
                    return;
                }

                const resFile = await fetch(`/${bookID}/${chapter.file}`);
                if (resFile.ok) {
                    const text = await resFile.text();
                    setContent(text);
                } else {
                    setError("Chapter file not found.");
                }
            } catch (e) {
                setError("Failed to load chapter.");
            }
        };

        fetchChapter();
    }, [id]);

    return (
        <>
            <NavBar links={[{label: "Home", href: "/"}, {label: "Back", href: `/${bookID}`}]}/>
            <div className="container-fluid p-5">
                <div className="row gap-5">
                    <div
                        className="position-sticky d-flex justify-content-center align-content-center bg-body-secondary text-black col-lg-3"
                        style={{
                            height: "calc(100vh - 150px)",
                            top: "7.5rem"
                        }}
                    >
                        Advertisement
                    </div>
                    <div className="backgroundCustom1 text-white col p-5">
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            <ReactMarkdown>{content}</ReactMarkdown>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChapterPage;
