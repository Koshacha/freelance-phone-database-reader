import _ from 'lodash';
import cn from 'classnames';
import { useState, useRef } from 'react';

export default function SortForm(props) {
    const { sorts, headers, setSorts } = props;

    const [isEditMode, setIsEditMode] = useState(false);

    const selectFieldValue = useRef(null);
    const selectOrderValue = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const id = sorts.length ? Math.max(...sorts.map(({ id }) => id)) + 1 : 0;
        const form = e.currentTarget;
        const code = form.elements.field.value;
        const order = form.elements.order.value;

        const sort = {
            id,
            code,
            order,
            tab: props.activeTab
        };


        if (isEditMode !== false) {
            setSorts(sorts.map((el) => el.id !== isEditMode.id ? el : sort));
            setIsEditMode(false);
        } else {
            setSorts([...sorts, sort]);
        }

        form.reset();
    };

    const onRemove = (index) => (e) => {
        e.preventDefault();
        setSorts(sorts.filter((a, i) => i !== index));
    }

    const onEdit = (item) => (e) => {
        setIsEditMode(item);
        selectFieldValue.current.value = item.code;
        selectOrderValue.current.value = item.order;
    };

    const onToggle = (id) => (e) => {
        props.setFilters(sorts.map((a) => a.id !== id ? a : { ...a, active: !a.active }));
    };

    return (
        <>
            {sorts && (
                <ul className="list-group mb-3">
                    {sorts.filter(({ tab }) => tab === props.activeTab).map((item, i) => (
                        <li className={cn("sort-item list-group-item list-group-item-action px-2", {
                            "list-group-item-editable": isEditMode !== false && isEditMode.id === item.id
                        })}>
                            <div className="d-flex w-100 justify-content-between sort-item-title">
                                <h6 className="mb-1">{_.find(headers, { code: item.code }).text}</h6>
                                <span className="sort-item-links">
                                    <small className="edit-sort" onClick={onEdit(item)}>Изменить</small>
                                    <small className="remove-sort" onClick={onRemove(i)}>Удалить</small>
                                </span>
                            </div>
                            <small>{item.order === 'ASC' ? 'По-возрастанию' : 'По-убыванию'}</small>
                        </li>
                    ))}
                </ul>
            )}
            <div className="form-group">
                <form onSubmit={onSubmit}>
                    <label className="mb-1" htmlFor="sortField">Поле для сортировки</label>
                    <select ref={selectFieldValue} className="form-select" id="field" required>
                        {headers.map((header) => (
                            <option selected={isEditMode?.code === header.code} key={`sort-${header.code}`} value={header.code}>{header.text}</option>
                        ))}
                    </select>
                    <label className="mb-1" htmlFor="order">Порядок</label>
                    <select ref={selectOrderValue} className="form-select" id="order" required>
                        <option selected={isEditMode?.order === 'ASC'} value={'ASC'}>По-возрастанию</option>
                        <option selected={isEditMode?.order === 'DESC'} value={'DESC'}>По-убыванию</option>
                    </select>
                    <button type="submit" className="btn btn-primary mt-3">{isEditMode === false ? 'Добавить' : 'Сохранить изменения'}</button>
                </form>
            </div>
        </>
    );
};