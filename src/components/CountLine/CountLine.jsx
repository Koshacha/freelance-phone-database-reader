const CountLine = (props) => {
    const { pageItems, selectedItems, allItems } = props;
    return (
        <figure className="text-right">
            <blockquote className="blockquote">
                <p>Элементов на странице: {pageItems}, выбрано элементов: {selectedItems}</p>
            </blockquote>
            <figcaption className="blockquote-footer mb-0">
                Всего элементов: {allItems}
            </figcaption>
        </figure>
    );
}

export default CountLine;