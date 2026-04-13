"use client";

import dynamic from "next/dynamic";

const Cursor = dynamic(() => import("./cursor"), {
    ssr: false,
});

const CursorWrapper: React.FC = () => {
    return <Cursor />;
};

export default CursorWrapper;