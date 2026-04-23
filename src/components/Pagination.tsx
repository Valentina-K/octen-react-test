import {type FC,  useState} from "react";

type PaginationProps = {
    current: number;
    totalPage: number;
    onChange: (page: number) => void;
}
export const Pagination: FC<PaginationProps> = ({current, totalPage, onChange}) => {
    const pages = Array.from({length: totalPage}, (_, i) => i + 1);
    const passedPages = Math.ceil((totalPage - 9) / 2);

    let start1 = current === totalPage ? 1 : current === passedPages + 4 ? 1 : Math.max(current - 2, 1);
    let start2 = Math.min(start1 + 3 + passedPages, totalPage - 3 - passedPages);

    if(start2 === current) {
        start1 = 1;
        start2 = Math.min(current, current-2);
    }

    if(totalPage <= 7) return (
        <div className="flex items-center space-x-2 mt-4 mb-4">
            <button disabled={current === 1}
                    onClick={()=> onChange(1)}
                    className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800">
                {"<<"}
            </button>
            <button
                disabled={current === 1}
                onClick={()=>onChange(current - 1)}
                className="px-3 py-1 disabled:opacity-50 uppercase text-purple-800"
            >{"< previous"}
            </button>
            {pages.slice(0, totalPage).map((page) => (
                <button
                    key={page}
                    onClick={() => onChange(page)}
                    className={`px-3 py-1 border-purple-500 border rounded-full ${
                        page === current ? "bg-purple-500 text-white" : ""
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                disabled={current === totalPage}
                onClick={()=>onChange(current+1)}
                className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800"
            >
                {"next >"}
            </button>
            <button disabled={current === totalPage}
                    onClick={()=>onChange(totalPage)}
                    className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800">
                {">>"}
            </button>
        </div>
    )
    let beg = current === totalPage ? totalPage - 5 : Math.max(current - 2, 1);
    let end = current < totalPage - 3 ? -3 : Math.min(current - totalPage, -1);
    console.log('from pagination:beg,current,totalPage,end, passedPage', beg, current, totalPage, end, passedPages)
    if(totalPage>7 && passedPages < 3) return (
        <div className="flex items-center space-x-2 mt-4 mb-4">
            <button disabled={current === 1}
                    onClick={()=> onChange(1)}
                    className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800">
                {"<<"}
            </button>
            <button
                disabled={current === 1}
                onClick={()=>onChange(current - 1)}
                className="px-3 py-1 disabled:opacity-50 uppercase text-purple-800"
            >{"< previous"}
            </button>
            {pages.slice(beg-1, beg + 2).map((page) => (
                <button
                    key={page}
                    onClick={() => onChange(page)}
                    className={`px-3 py-1 border-purple-500 border rounded-full ${
                        page === current ? "bg-purple-500 text-white" : ""
                    }`}
                >
                    {page}
                </button>
            ))}
            {totalPage - beg > 5 && <span className={'text-purple-800 font-bold'}>...</span>}
            {pages.slice(end).map((page) => (
                <button
                    key={page}
                    onClick={() => onChange(page)}
                    className={`px-3 py-1 border-purple-500 border rounded-full ${
                        page === current ? "bg-purple-500 text-white" : ""
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                disabled={current === totalPage}
                onClick={()=>onChange(current+1)}
                className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800"
            >
                {"next >"}
            </button>
            <button disabled={current === totalPage}
                    onClick={()=>onChange(totalPage)}
                    className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800">
                {">>"}
            </button>
        </div>
    )

    console.log('from pagination:start1,start2,current,totalPage,end', start1, start2, current, totalPage, end)

    return (
        <div className="flex items-center space-x-2 mt-4 mb-4">
            <button disabled={current === 1}
                    onClick={()=> onChange(1)}
                    className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800">
                {"<<"}
            </button>
            <button
                disabled={current === 1}
                onClick={()=>onChange(current - 1)}
                className="px-3 py-1 disabled:opacity-50 uppercase text-purple-800"
            >{"< previous"}
            </button>
            {pages.slice(start1-1, start1 + 2).map((page) => (
                <button
                    key={page}
                    onClick={() => onChange(page)}
                    className={`px-3 py-1 border-purple-500 border rounded-full ${
                        page === current ? "bg-purple-500 text-white" : ""
                    }`}
                >
                    {page}
                </button>
            ))}
            <span className={'text-purple-800 font-bold'}>...</span>
            {pages.slice(start2-1, start2 + 2).map((page) => (
                    <button key={page}
                            onClick={() => onChange(page)}
                            className={`px-3 py-1 border-purple-500 border rounded-full ${
                                page === current ? "bg-purple-500 text-white" : ""
                            }`}>{page}
                    </button>
                ))
            }
            <span className={'text-purple-800 font-bold'}>...</span>
            {pages.slice(end).map((page) => (
                <button
                    key={page}
                    onClick={() => onChange(page)}
                    className={`px-3 py-1 border-purple-500 border rounded-full ${
                        page === current ? "bg-purple-500 text-white" : ""
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                disabled={current === totalPage}
                onClick={()=>onChange(current+1)}
                className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800"
            >
                {"next >"}
            </button>
            <button disabled={current === totalPage}
                    onClick={()=>onChange(totalPage)}
                    className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800">
                {">>"}
            </button>
        </div>
    );
};

