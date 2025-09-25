type PageNavigatorProps = {
    currentPage: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
}

const PageNavigator = ({ currentPage, totalPages, onPageChange }: PageNavigatorProps) => {

    const handlePrevClick = () => {
        if (currentPage > 1) return onPageChange(currentPage - 1);
        return onPageChange(currentPage);
    }

    const handleNextClick = () => {
        if (totalPages && currentPage < totalPages) {
            return onPageChange(currentPage + 1);
        }
        return onPageChange(currentPage);
    }

    return (
        <>
        <div className="flex justify-center items-center gap-4 my-8">
            {currentPage !==1 && (
                <button type="button" onClick={handlePrevClick}>이전</button>
            )}
            <div>{currentPage}</div>
            <button type="button" onClick={handleNextClick}>다음</button>
        </div>
        </>
    )
}

export default PageNavigator;