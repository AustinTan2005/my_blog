import NavBar from "../components/NavBar.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StoryPage() {
    const { bookID } = useParams(); // e.g. "Book1"
    console.log(bookID);
    const [chapters, setChapters] = useState<{ chapter: number; title: string; date: string }[]>([]);

    const ChapterRow = ({
                            chapter,
                            title,
                            date,
                        }: {
        chapter: number;
        title: string;
        date: string;
    }) => {
        const navigate = useNavigate();
        return (
            <div
                className="container-fluid w-100 p-4 d-flex row border-bottom hoverCustom1"
                onClick={() => {
                    sessionStorage.setItem("currentBookID", bookID || "");
                    navigate(`/${bookID}/${chapter}`);
                }}
            >
                <div className="col-sm-9">Chapter {chapter} - {title}</div>
                <div className="col text-end">{date}</div>
            </div>
        );
    };

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const res = await fetch(`/${bookID}/chapters.json`);
                if (!res.ok) throw new Error("No chapter list");
                const data = await res.json();
                setChapters(data);
            } catch (err) {
                console.error("Failed to load chapter list:", err);
            }
        };

        if (bookID) fetchChapters();
    }, [bookID]);


    return (
        <>
            <NavBar links={[{label: "Home", href: "/"}]}/>
            <div className="container-fluid p-5">
                <div className="row gap-5">
                    <div
                        className="d-flex justify-content-center align-content-center bg-body-secondary text-black col-lg-3">
                        Advertisement
                    </div>
                    <div
                        className="backgroundCustom1 text-black col p-4"
                        style={{height: "calc(100vh - 175px)", overflowY: "auto"}}
                    >
                        {chapters.map(({ chapter, title, date }) => (
                            <ChapterRow
                                key={chapter}
                                chapter={chapter}
                                title={title}
                                date={date}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default StoryPage;