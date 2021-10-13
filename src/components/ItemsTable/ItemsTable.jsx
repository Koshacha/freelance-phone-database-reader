import cn from "classnames";

export function ItemsTable(props) {
    const { items, headers, hiddenHeaders, selectedItems, selectItemHandler } = props;
    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th></th>
                        {headers.map(({ code, text }) => {
                            return !hiddenHeaders.includes(code) ? <th key={code}><div>{text}</div></th> : false;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, i) => (
                            <tr id={item.id} key={item.id} className={cn({
                                selected: selectedItems.includes(item.id),
                                "row-mts": item.operator.includes('МТС'),
                                "row-life": item.operator.includes('Life'),
                                "row-kievstar": item.operator.includes('Киевстар'),
                                "row-city": item.operator.includes('Город'),
                            })} data-operator={item.operator}>
                                <td key={`${item.id}-selected`}>
                                    <input className="form-check-input" type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={selectItemHandler(item.id, item.phonesms, i)} />
                                </td>
                                {headers.map(({ code }) => {
                                    return !hiddenHeaders.includes(code) ? <td key={`${item.id}-${code}`}>{item[code]}</td> : false;
                                })}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ItemsTable;