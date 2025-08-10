import NavBar from "../components/NavBar.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function StoryPage() {
    const { bookID } = useParams();
    console.log(bookID);
    const [chapters, setChapters] = useState<{ chapter: number; title: string; date: string }[]>([]);

    const ChapterRow = ({ chapter, title, date, url }: { chapter: number; title: string; date: string; url: string }) => {
        return (
            <div
                className="container-fluid w-100 p-4 d-flex row border-bottom hoverCustom1"
                onClick={() => window.open(url, "_blank")}
                style={{ cursor: "pointer" }}
            >
                <div className="col-sm-9">Chapter {chapter} - {title}</div>
                <div className="col text-end">{date}</div>
            </div>
        );
    };

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const res = await fetch(`/${bookID}.txt`);
                if (!res.ok) throw new Error("No chapter list");
                const text = await res.text();

                const parsed = text
                    .split("\n")
                    .map(line => line.trim())
                    .filter(line => line && !line.startsWith("#")) // skip empty or commented lines
                    .map(line => {
                        const [chapter, title, date, url] = line.split("|");
                        return { chapter: Number(chapter), title, date, url };
                    });

                setChapters(parsed);
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
                                url={""}                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default StoryPage;