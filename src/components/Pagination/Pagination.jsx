import { Pagination as BPagination } from 'react-bootstrap';
import _ from "lodash";

const Pagination = (props) => {
    const { pagesCount, currentPage, pageSelectHandler } = props;

    if (pagesCount < 2 || !pagesCount) return <div></div>;

    return (
        <BPagination>
            <BPagination.Prev
                disabled={currentPage === 0}
                onClick={pageSelectHandler(currentPage - 1)} />
            {
                [...Array(pagesCount).keys()].reduce((acc, p) => {
                    if (p === 0 || p === pagesCount - 1 || Math.abs(p - currentPage) < 7) {
                        return [...acc, (
                            <BPagination.Item onClick={pageSelectHandler(p)} key={p} active={p === currentPage}>
                                {p + 1}
                            </BPagination.Item>
                        )];
                    } else {
                        if (_.isEmpty(acc[acc.length - 1].props)) {
                            return acc;
                        } else {
                            return [...acc, (
                                <BPagination.Ellipsis />
                            )];
                        }
                    }
                }, [])
            }
            <BPagination.Next disabled={currentPage === pagesCount - 1} onClick={pageSelectHandler(currentPage + 1)} />
        </BPagination>
    );
};

export default Pagination;