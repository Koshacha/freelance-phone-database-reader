import _ from 'lodash';
import { useState, useRef } from 'react';
import cn from 'classnames';

/*
{
    id:
    code:,
    rule:,
    comment:
    tab!@
}
*/
export default function FilterForm(props) {
    const [isDate, setIsDate] = useState(false);
    const [isBool, setIsBool] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const { filters, headers } = props;

    const inputElement = useRef(null);
    const selectFieldValue = useRef(null);
    const selectRuleValue = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const id = filters.length ? Math.max(...filters.map(({ id }) => id)) + 1 : 0;
        const form = e.currentTarget;
        const code = form.elements.field.value;
        const rule = form.elements.rule.value;
        const type = isBool ? 'bool' : isDate ? 'date' : 'str';

        let filter;

        if (!isBool) {
            const str = form.elements.str.value;
            const comment = form.elements.rule.options[form.elements.rule.selectedIndex].text.replace('...', str);

            filter = {
                id,
                code,
                rule,
                str,
                comment,
                type,
                active: true,
                tab: props.activeTab
            };
        } else {
            const comment = form.elements.rule.options[form.elements.rule.selectedIndex].text;
            filter = {
                id,
                code,
                rule,
                comment,
                type,
                active: true,
                tab: props.activeTab
            };
        }

        if (isEditMode !== false) {
            props.setFilters(filters.map((el) => el.id !== isEditMode.id ? el : filter));
            setIsEditMode(false);
        } else {
            props.setFilters([...filters, filter]);
        }

        setIsDate(false);
        setIsBool(false);
        form.reset();
    };

    const onRemove = (index) => (e) => {
        e.preventDefault();
        setIsEditMode(false);
        props.setFilters(filters.filter((a, i) => a.id !== index));
    };

    const onEdit = (item) => (e) => {
        setIsEditMode(item);
        if (item.type === 'bool')
            setIsBool(true);
        else if (item.type === 'date')
            setIsDate(true);
        inputElement.current.value = item.str;
        selectFieldValue.current.value = item.code;
        selectRuleValue.current.value = item.rule;
    };

    const onToggle = (id) => (e) => {
        props.setFilters(filters.map((a) => a.id !== id ? a : { ...a, active: !a.active }));
    };

    return (
        <>
            {filters && (
                <ul className="list-group mb-3">
                    {filters.filter(({ tab, button }) => tab === props.activeTab && !button).map((item, i) => (
                        <li className={cn("filter-item list-group-item list-group-item-action px-2", {
                            "list-group-item-editable": isEditMode !== false && isEditMode.id === item.id
                        })}>
                            <div className="d-flex w-100 justify-content-between filter-item-title">
                                <h6 className="mb-1">
                                    <span className="me-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={item.active}
                                            onChange={onToggle(item.id)}
                                        />
                                    </span>
                                    {_.find(headers, { code: item.code })?.text}
                                </h6>
                                <span className="filter-item-links">
                                    <small className="edit-sort" onClick={onEdit(item)}>Изменить</small>
                                    <small className="remove-sort" onClick={onRemove(item.id)}>Удалить</small>
                                </span>
                            </div>
                            <small>{item.comment}</small>
                        </li>
                    ))}
                </ul>
            )}
            <div className="form-group">
                <form onSubmit={onSubmit}>
                    <div className="form-group mb-1">
                        <label htmlFor="field" className="form-label">Поле</label>
                        <select ref={selectFieldValue} className="form-select" id="field" required onChange={(e) => {
                            const code = e.target.value;
                            const type = _.find(headers, { code }).type;
                            setIsDate(type === 'date');
                        }}>
                            {headers.map((header) => (
                                <option
                                    key={`sort-${header.code}`}
                                    value={header.code}
                                    selected={isEditMode?.code === header.code}>{header.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor="rule" className="form-label">Тип фильтрации</label>
                        <select ref={selectRuleValue} className="form-select" id="rule" required onChange={(e) => {
                            const code = e.target.value;
                            setIsBool(code === 'empty' || code === 'not-empty' || code === 'before-today');
                        }}>
                            {
                                !isDate && (
                                    <>
                                        <option value="include">Поле содержит ...</option>
                                        <option value="not-include">Поле НЕ содержит ...</option>
                                        <option value="empty">Поле пустое</option>
                                        <option value="not-empty">Поле НЕ пустое</option>
                                        <option value="starts">Поле начинается с ...</option>
                                        <option value="not-starts">Поле НЕ начинается с ...</option>
                                        <option value="ends">Поле заканчивается на ...</option>
                                        <option value="not-ends">Поле НЕ заканчивается на ...</option>
                                        <option value="more">Поле БОЛЬШЕ или равно ...</option>
                                        <option value="less">Поле МЕНЬШЕ или равно ...</option>
                                    </>
                                )
                            }
                            {
                                isDate && (
                                    <>
                                        <option value="before">Дата до ...</option>
                                        <option value="after">Дата после ...</option>
                                        <option value="before-today">За последний месяц</option>
                                    </>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-group mb-1" style={{
                        display: !isBool ? 'block' : 'none'
                    }}>
                        {
                            isDate && (
                                <input ref={inputElement} type="date" className="form-control" id="str" />
                            )
                        }
                        {
                            isDate || (
                                <input ref={inputElement} type="text" className="form-control" id="str" />
                            )
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">{isEditMode === false ? 'Добавить' : 'Сохранить изменения'}</button>
                </form>
            </div>
        </>
    );
};