
export default function SettingsForm(props) {
    const { hiddenHeaders, headers, activeTab, perPage, setPerPage, blocklistIgnore, setBlocklistIgnore, tableMode, setTableMode } = props;

    const tables = [
        {
            title: 'phones',
            code: 'first'
        },
        {
            title: 'otherphones',
            code: 'second'
        }
    ];

    return (
        <>
            {/* <div className="form-group">
                <h6>Черный список</h6>
                <div className="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="blocklistIgnoreCheck"
                        checked={blocklistIgnore}
                        onChange={(e) => {
                            setBlocklistIgnore(!blocklistIgnore);
                        }} />
                    <label className="form-check-label" htmlFor="blocklistIgnoreCheck">
                        Скрыть номера из ЧС
                    </label>
                </div>
                <hr />
            </div> */}
            {/* <div className="form-group">
                <h6>Повторяющиеся данные</h6>
                <div className="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="dublicatesIgnoreCheck"
                        checked={dublicatesIgnore}
                        onChange={(e) => {
                            setDublicatesIgnore(!dublicatesIgnore);
                        }} />
                    <label className="form-check-label" htmlFor="dublicatesIgnoreCheck">
                        Скрыть повторяющиеся записи
                    </label>
                </div>
                <hr />
            </div> */}
            <div className="form-group">
                <h6>Список таблиц</h6>
                {tables.map((el, i) => (
                    <div className="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id={`table-check-${i}`}
                            checked={tableMode[el.code]}
                            onChange={(e) => {
                                const state = { ...tableMode, [el.code]: !tableMode[el.code] };
                                if (Object.values(state).some((p) => p))
                                    setTableMode(state);
                            }} />
                        <label className="form-check-label" htmlFor={`table-check-${i}`}>
                            Таблица `{el.title}`
                        </label>
                    </div>
                ))}
                <hr />
            </div>
            <div className="form-group">
                <h6>Скрыть следующие столбцы</h6>
                {
                    headers.map((header) => (
                        <div className="form-check mb-0" key={`${header.code}`}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`${header.code}Field`}
                                checked={hiddenHeaders.includes(header.code)}
                                onChange={(e) => {
                                    if (props.hiddenHeaders.includes(header.code))
                                        props.setHiddenHeaders(hiddenHeaders.filter((code) => code !== header.code));
                                    else
                                        props.setHiddenHeaders([...hiddenHeaders, header.code]);
                                }} />
                            <label className="form-check-label" htmlFor={`${header.code}Field`}>
                                {header.text}
                            </label>
                        </div>
                    ))
                }
            </div>
            <hr />
            <div className="form-group">
                <h6>Кол-во строк на странице</h6>
                <form>
                    <select className="form-select" onChange={(e) => {
                        const val = e.target.value;
                        if (val !== perPage)
                            setPerPage((p) => p.map((el, i) => i === activeTab ? val : el));
                    }}>
                        {
                            [100, 500, 1000, 1500, 3000, 5000, 6000, 7000, 8000, 9000, 10000].map((n) => {
                                return (
                                    <option value={n} selected={n === perPage}>{n}</option>
                                )
                            })
                        }
                    </select>
                    <hr />
                    <label className="mb-1" htmlFor="perPageCustom">Либо, укажите значение самостоятельно:</label>
                    <input type="number" className="form-control" id="perPageCustom" min="1" placeholder={perPage}></input>
                    <button onClick={(e) => {
                        const form = e.currentTarget.closest('form');
                        const perPageCustom = form.elements.perPageCustom.value;
                        if (+perPageCustom && perPageCustom > 0) {
                            setPerPage((p) => p.map((t, i) => i === activeTab ? +perPageCustom : t));
                        }
                    }} type="button" className="btn btn-primary mt-2" style={{ marginLeft: 'auto', marginRight: 'auto' }}>Сохранить</button>
                </form>
            </div>
        </>
    );
};



