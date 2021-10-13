import cn from "classnames";
import _ from "lodash";
import { useRef } from "react";

const NavBar = (props) => {
  const { activeTab, menuShown, menuToggleHandle, selectAllHandle, deselectAllHandle, haveSelectedItems, filters, toggleOperatorHandle, copyPhonesHandle, blocklistModalHandle, perPage, setPerPage } = props;

  const perPageInput = useRef(null);

  const operators = [
    ['mts', 'МТС', 'danger'],
    ['kievstar', 'Киевстар', 'primary'],
    ['life', 'Life', 'warning'],
    ['city', 'Город', 'info'],
    ['empty', 'Пустые', 'dark'],
  ]

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <button className="btn btn-primary btn-sm" type="button" onClick={menuToggleHandle}>
        {menuShown ? 'Скрыть меню' : 'Показать меню'}
      </button>
      <div className="btn-group mx-2">
        <button type="button" className="btn btn-sm btn-outline-primary" onClick={selectAllHandle}>Выделить все</button>
        <button type="button" className={cn("btn btn-sm btn-outline-primary", {
          disabled: !haveSelectedItems
        })} onClick={deselectAllHandle}>Снять выделение</button>
      </div>
      <div className="input-group mx-2 header-perpage">
        <input type="number" className="form-control py-0 px-0" ref={perPageInput} min="1" placeholder={perPage} />
        <button className="btn btn-primary btn-sm" type="button" onClick={(e) => {
          const perPageCustom = perPageInput.current.value;
          if (+perPageCustom && perPageCustom > 0) {
            setPerPage((p) => p.map((t, i) => i === activeTab ? +perPageCustom : t));
            perPageInput.current.value = "";
          }
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512">
            <path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"></path>
          </svg>
        </button>
      </div>
      <div className="btn-group mx-2">
        {operators.map(([code, text, color]) => (
          <button type="button" className={cn("btn btn-sm", {
            [`btn-outline-${color}`]: !_.some(filters, { button: code, tab: activeTab }),
            [`btn-${color}`]: _.some(filters, { button: code, tab: activeTab })
          })} onClick={toggleOperatorHandle(code, text)} data-operator={code}>{text}</button>
        ))}
      </div>
      <div className="btn-group ml-auto">
        <button type="button" className="btn btn-sm btn-primary" onClick={copyPhonesHandle}>Скопировать в буфер обмена</button>
      </div>
      <div className="btn-group mx-2">
        <button type="button" className="btn btn-sm btn-dark" onClick={blocklistModalHandle}>В черный список</button>
      </div>
    </nav>
  );
};

export default NavBar;