import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import IndexPage from "./pages/Index.tsx"
import SupportPage from "./pages/Support.tsx"
import StoriesPage from "./pages/Story.tsx"
import ChapterPage from "./pages/Chapter.tsx"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/support" element={<SupportPage/>}/>
                <Route path="/:bookID" element={<StoriesPage/>}/>
                <Route path="/:bookID/:id" element={<ChapterPage />} />
            </Routes>
        </Router>
    );
}

export default App;