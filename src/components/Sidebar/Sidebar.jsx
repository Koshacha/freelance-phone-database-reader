import cn from "classnames";
import SortForm from "./forms/SortForm";
import FilterForm from "./forms/FilterForm";
import GlobalFilterForm from "./forms/GlobalFilterForm";
import SaveForm from "./forms/SaveForm";
import SettingsForm from "./forms/SettingsForm";
import { useState } from "react";

const Sidebar = (props) => {
  const { activeTab, blocklistIgnore, setBlocklistIgnore, dublicatesIgnore, setDublicatesIgnore, tableMode, setTableMode } = props;
  const [currentTab, setCurrentTab] = useState('filter');

  return (
    <nav className={cn("col-md-2 d-none d-md-block bg-light sidebar px-1", {
      "sidebar-hidden": !props.sidebarVisible
    })}>
      <div className="sidebar-sticky px-1">
        <div className="btn-toolbar mb-2 px-1">
          <div className="btn-group">
            <button type="button" className={cn("btn btn-sm px-1", {
              "btn-outline-primary": currentTab !== 'filter',
              "btn-primary": currentTab === 'filter'
            })} onClick={(e) => {
              e.preventDefault();
              setCurrentTab('filter');
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>
            </button>
            <button type="button" className={cn("btn btn-sm px-1", {
              "btn-outline-success": currentTab !== 'glob-filter',
              "btn-success": currentTab === 'glob-filter'
            })} onClick={(e) => {
              e.preventDefault();
              setCurrentTab('glob-filter');
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>
            </button>
            <button type="button" className={cn("btn btn-sm px-1", {
              "btn-outline-primary": currentTab !== 'sort',
              "btn-primary": currentTab === 'sort'
            })} onClick={(e) => {
              e.preventDefault();
              setCurrentTab('sort');
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path fill="currentColor" d="M16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.78 160 16 160zm400 128H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 446.37V464a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 321.63V304a16 16 0 0 0-16-16zm31.06-85.38l-59.27-160A16 16 0 0 0 372.72 32h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 224h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 224H432a16 16 0 0 0 15.06-21.38zM335.61 144L352 96l16.39 48z" className=""></path></svg>
            </button>
            <button type="button" className={cn("btn btn-sm px-1", {
              "btn-outline-primary": currentTab !== 'save',
              "btn-primary": currentTab === 'save'
            })} onClick={(e) => {
              e.preventDefault();
              setCurrentTab('save');
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z" className=""></path></svg>
            </button>
            <button type="button" className={cn("btn btn-sm px-1", {
              "btn-outline-primary": currentTab !== 'settings',
              "btn-primary": currentTab === 'settings'
            })} onClick={(e) => {
              e.preventDefault();
              setCurrentTab('settings');
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z"></path></svg>
            </button>
          </div>
          <div className="btn-group ml-auto">
            <button type="button"
              className={cn("btn btn-sm px-1", {
                "btn-outline-danger": !blocklistIgnore,
                "btn-danger": blocklistIgnore
              })}
              title="Скрыть номера из ЧС"
              onClick={(e) => {
                setBlocklistIgnore(!blocklistIgnore);
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"></path></svg>
            </button>
            <button type="button"
              className={cn("btn btn-sm px-1", {
                "btn-outline-danger": !dublicatesIgnore,
                "btn-danger": dublicatesIgnore
              })}
              title="Скрыть дубликаты"
              onClick={(e) => {
                setDublicatesIgnore(!dublicatesIgnore);
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 0c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48H176c-26.51 0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h288M176 416c-44.112 0-80-35.888-80-80V128H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-48H176z"></path></svg>
            </button>
          </div>
        </div>
        <ul className="nav flex-column">
          {currentTab === 'filter' && (
            <li>
              <div className="card mx-0">
                <div className="card-body px-2">
                  <h6>Фильтрация</h6>
                  <FilterForm
                    activeTab={activeTab}
                    filters={props.filters}
                    headers={props.headers}
                    setFilters={props.setFilters}
                  />
                </div>
              </div>
            </li>
          )}
          {currentTab === 'glob-filter' && (
            <li>
              <div className="card mx-0">
                <div className="card-body px-2">
                  <h6>Глобальная фильтрация</h6>
                  <GlobalFilterForm
                    globalFilters={props.globalFilters}
                    setGlobalFilters={props.setGlobalFilters}
                    headers={props.headers}
                  />
                </div>
              </div>
            </li>
          )}
          {currentTab === 'sort' && (
            <li>
              <div className="card mx-0">
                <div className="card-body px-2">
                  <h6>Сортировка</h6>
                  <SortForm
                    activeTab={activeTab}
                    sorts={props.sorts}
                    headers={props.headers}
                    setSorts={props.setSorts} />
                </div>
              </div>
            </li>
          )}
          {currentTab === 'save' && (
            <li>
              <div className="card mx-0">
                <div className="card-body px-2">
                  <h6>Обновление данных</h6>
                  <SaveForm
                    activeTab={activeTab}
                    selectedItems={props.selectedItems}
                    setSelectedItems={props.setSelectedItems}
                  />
                </div>
              </div>
            </li>
          )}
          {currentTab === 'settings' && (
            <li>
              <div className="card mx-0">
                <div className="card-body px-2">
                  <SettingsForm
                    activeTab={activeTab}
                    headers={props.headers}
                    perPage={props.perPage}
                    setPerPage={props.setPerPage}
                    setHiddenHeaders={props.setHiddenHeaders}
                    hiddenHeaders={props.hiddenHeaders}
                    blocklistIgnore={blocklistIgnore}
                    setBlocklistIgnore={setBlocklistIgnore}
                    dublicatesIgnore={dublicatesIgnore}
                    setDublicatesIgnore={setDublicatesIgnore}
                    tableMode={tableMode}
                    setTableMode={setTableMode}
                  />
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;