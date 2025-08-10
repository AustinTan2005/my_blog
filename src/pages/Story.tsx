import NavBar from "../components/NavBar.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Updated interface to match your data structure
interface Chapter {
    chapter: number;
    title: string;
    date: string;
    link: string;
}

function StoryPage() {
    const { bookID } = useParams();
    console.log(bookID);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchChapters = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await fetch(`/${bookID}.txt`);
                if (!res.ok) throw new Error("No chapter list");

                const text = await res.text();
                console.log("Raw text:", text); // Debug log

                // Parse the text file
                const parsed = text
                    .split("\n")
                    .map(line => line.trim())
                    .filter(Boolean)
                    .map(line => {
                        const [chapter, title, date, link] = line.split("|");
                        return {
                            chapter: Number(chapter),
                            title,
                            date,
                            link
                        };
                    });

                console.log("Parsed chapters:", parsed); // Debug log
                setChapters(parsed);
            } catch (err) {
                console.error("Failed to load chapter list:", err);
                setError("Failed to load chapters");
            } finally {
                setLoading(false);
            }
        };

        if (bookID) fetchChapters();
    }, [bookID]);

    const ChapterRow = ({ chapter, title, date, link }: Chapter) => {
        return (
            <div
                className="container-fluid w-100 p-4 d-flex row border-bottom hoverCustom1"
                onClick={() => {
                    window.open(link, "_blank");
                }}
                style={{ cursor: "pointer" }}
            >
                <div className="col-sm-9">Chapter {chapter} - {title}</div>
                <div className="col text-end">{date}</div>
            </div>
        );
    };

    return (
        <>
            <NavBar links={[{label: "Home", href: "/"}]}/>
            <div className="container-fluid p-5">
                <div className="row gap-5">
                    <div className="d-flex justify-content-center align-content-center bg-body-secondary text-black col-lg-3">
                        Advertisement
                    </div>
                    <div
                        className="backgroundCustom1 text-black col p-4"
                        style={{height: "calc(100vh - 175px)", overflowY: "auto"}}
                    >
                        {loading ? (
                            <div className="text-center p-4">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-2">Loading chapters...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center p-4 text-danger">
                                <p>{error}</p>
                                <small>Make sure {bookID}.txt exists in the public folder</small>
                            </div>
                        ) : chapters.length === 0 ? (
                            <div className="text-center p-4">
                                <p>No chapters found</p>
                            </div>
                        ) : (
                            chapters.map((chapterData) => (
                                <ChapterRow
                                    key={chapterData.chapter}
                                    chapter={chapterData.chapter}
                                    title={chapterData.title}
                                    date={chapterData.date}
                                    link={chapterData.link}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default StoryPage;