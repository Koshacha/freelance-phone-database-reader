import NavBar from '../NavBar/NavBar';
import TabBar from '../TabBar/TabBar';
import Sidebar from '../Sidebar/Sidebar';
import Pagination from '../Pagination/Pagination';
import CountLine from '../CountLine/CountLine';
import ItemsTable from '../ItemsTable/ItemsTable';
import BlocklistModal from '../BlocklistModal/BlocklistModal';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import cn from 'classnames';
import _ from 'lodash';
import { useLocalStorage } from '../../useLocalStorage.js';

function App() {
  // ui state
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useLocalStorage("kyubey-app-tabs-test-3", [{ id: 0, title: 'Вкладка', active: true }]);
  const [currentPage, setCurrentPage] = useState(tabs.map(() => 0));
  const [perPage, setPerPage] = useState(tabs.map(() => 100));
  const [pagesCount, setPagesCount] = useState(0);
  const [lastClick, setLastClick] = useState({ from: false });
  const [headersLoaded, setHeadersLoaded] = useState(false);
  const [menuShown, setMenuShown] = useState(true);
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [blocklistShown, setBlocklistShown] = useState(false);

  // sql state
  const [sorts, setSorts] = useLocalStorage("kyubey-app-sorts-test-3", []);
  const [filters, setFilters] = useLocalStorage("kyubey-app-filters-test-3", []);
  const [globalFilters, setGlobalFilters] = useLocalStorage("kyubey-app-glob-filters-test-3", []);
  const [tableMode, setTableMode] = useLocalStorage("kyubey-app-which-table-test-3", {
    first: true,
    second: false
  });
  const [blocklistIgnore, setBlocklistIgnore] = useState(true);
  const [dublicatesIgnore, setDublicatesIgnore] = useState(true);

  // data state
  const [items, setItems] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [hiddenHeaders, setHiddenHeaders] = useLocalStorage("kyubey-app-hidden-headers-test-3", []);

  // work state
  const [selectedItems, setSelectedItems] = useState(tabs.map(() => []));
  const [selectedPhones, setSelectedPhones] = useState({});

  // refs
  const blocklistForm = useRef(null);
  const copyTextarea = useRef(null);

  // cancer

  const getOrder = ({ code, order }) => {
    if (['id', 'id_orig', 'price'].includes(code)) {
      return `CAST(${code} AS SIGNED) ${order}`;
    } else {
      return `${code} ${order}`;
    }
  }

  const getSort = (sorts) => {
    return _
      .chain(sorts)
      .filter({ 'tab': activeTab })
      .map(getOrder)
      .join(', ');
  }

  const getCondition = ({ rule, code, str }) => {
    let today = new Date();
    let monthAgo = new Date(today);
    monthAgo.setDate(today.getDate() + 1);
    monthAgo.setMonth(today.getMonth() - 1);
    monthAgo = monthAgo.toISOString().substring(0, 10);

    switch (rule) {
      case 'include': return `${code} LIKE '%${str}%'`;
      case 'not-include': return `${code} NOT LIKE '%${str}%'`;
      case 'empty': return `(${code} IS NULL OR ${code} = '')`;
      case 'not-empty': return `(${code} IS NOT NULL AND ${code} <> '')`;
      case 'starts': return `${code} LIKE '${str}%'`;
      case 'not-starts': return `${code} NOT LIKE '${str}%'`;
      case 'ends': return `${code} LIKE '%${str}'`;
      case 'not-ends': return `${code} NOT LIKE '%${str}'`;
      case 'before': return `${code} < '${str}'`;
      case 'after': return `${code} > '${str}'`;
      case 'less': return `CAST(${code} AS SIGNED) <= '${str}'`;
      case 'more': return `CAST(${code} AS SIGNED) >= '${str}'`;
      case 'before-today': return `${code} >= '${monthAgo}'`;
      default: return '';
    }
  }

  const getWhere = (filters, which) => {
    return _
      .chain(filters)
      .filter(which)
      .groupBy('code')
      .values()
      .map((o) => {
        return _
          .chain(o)
          .groupBy('rule')
          .values()
          .map((o) => {
            const isAnd = _.some(o, ['rule', 'not-include']);
            return '(' + _
              .chain(o)
              .map(getCondition)
              .join(isAnd ? ' AND ' : ' OR ') + ')'
          })
          .join(' OR ')
      })
      .join(' AND ');
  }

  useEffect(() => {
    axios.post('/headers.php').then(response => {
      setHeaders(response.data);
      setHeadersLoaded(true);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setLastClick({ from: false });

    const order = getSort(sorts);
    const filter = getWhere(filters, { 'tab': activeTab, 'active': true });
    const globalFilter = getWhere(globalFilters, { 'active': true });

    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: '/get.php',
      data: {
        per_page: perPage[activeTab],
        page: currentPage[activeTab],
        filter,
        globalFilter,
        blocklistIgnore,
        dublicatesIgnore,
        tableMode,
        order
      }
    }).then(response => {
      setItems(response.data.items);
      setPagesCount(Math.ceil(response.data.count / perPage[activeTab]));
      if (currentPage[activeTab] > Math.ceil(response.data.count / perPage[activeTab]))
        setCurrentPage(currentPage.map((tab, i) => i !== activeTab ? tab : pagesCount - 1));
      setCount(response.data.count);
      setLoading(false);
    });
  }, [sorts, currentPage, filters, globalFilters, perPage, activeTab, blocklistIgnore, dublicatesIgnore, blocklistShown, tableMode]);

  useEffect(() => {
    if (selectedItems[activeTab].length > 0) return;
    setLastClick({ from: false });
    setLoading(true);

    const order = getSort(sorts);
    const filter = getWhere(filters, { 'tab': activeTab, 'active': true });
    const globalFilter = getWhere(globalFilters, { 'active': true });

    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: '/get.php',
      data: {
        per_page: perPage[activeTab],
        page: currentPage[activeTab],
        filter,
        globalFilter,
        blocklistIgnore,
        dublicatesIgnore,
        tableMode,
        order
      }
    }).then(response => {
      setItems(response.data.items);
      setPagesCount(Math.ceil(response.data.count / perPage[activeTab]));
      setCount(response.data.count);
      setLoading(false);
    });
  }, [selectedItems]);

  useEffect(() => {
    if (!lastClick.hasOwnProperty('to')) return;

    const from = Math.min(lastClick.from, lastClick.to);
    const to = Math.max(lastClick.from, lastClick.to);
    const range = [];
    const rangePhones = {};

    items.forEach((el, i) => {
      if (i >= from && i <= to) {
        range.push(el.id);
        rangePhones[el.id] = el.phonesms;
      }
    });

    setSelectedItems(selectedItems.map((tab, i) => i !== activeTab ? tab : [...tab, ...range]));
    setSelectedPhones({ ...selectedPhones, ...rangePhones });
  }, [lastClick]);

  if (!headersLoaded)
    return <div>Загрузка</div>;
  else
    return (
      <div className={cn({ loading: loading })}>
        <NavBar
          filters={filters}
          activeTab={activeTab}
          perPage={perPage[activeTab]}
          setPerPage={setPerPage}
          haveSelectedItems={!!selectedItems[activeTab].length}
          menuShown={menuShown}
          menuToggleHandle={(e) => {
            setMenuShown(!menuShown);
          }}
          copyPhonesHandle={(e) => {
            const str = _.uniq(selectedItems[activeTab])
              .map((id) => selectedPhones[id])
              .filter((str) => str)
              .join("\n");

            const textarea = copyTextarea.current;
            textarea.innerHTML = str;

            textarea.select();
            console.log(document.execCommand('copy'));
            alert('Номера скопированы!');
            // navigator.clipboard.writeText(str)
            //   .then(() => {
            //     alert('Номера скопированы.');
            //   })
            //   .catch(err => {
            //     alert('Ошибка копирования.');
            //   });
          }}
          blocklistModalHandle={(e) => {
            setBlocklistShown(true);
          }}
          toggleOperatorHandle={(field, text) => (e) => {
            if (_.some(filters, { button: field, tab: activeTab })) {
              setFilters(filters.filter((el) => el.button !== field || el.tab !== activeTab));
            } else {
              setFilters([...filters, {
                id: filters.length ? Math.max(...filters.map(({ id }) => id)) + 1 : 0,
                tab: activeTab,
                button: field,
                code: 'operator',
                rule: field !== 'empty' ? 'include' : 'empty',
                comment: `Поле содержит ${text}`,
                str: text,
                active: true
              }]);
            }
          }}
          selectAllHandle={(e) => {
            const pageIds = items.map(({ id }) => id);
            const pageNumbers = items.map(({ id, phonesms }) => [id, phonesms]);
            setSelectedItems(selectedItems.map((tab, i) => i !== activeTab ? tab : [...tab, ...pageIds]));
            setSelectedPhones({ ...selectedPhones, ...Object.fromEntries(pageNumbers) });
          }}
          deselectAllHandle={(e) => {
            // const pageIds = items.map(({ id }) => id);
            // setSelectedItems(selectedItems.map((tab, i) => i !== activeTab ? tab : tab.filter((id) => !pageIds.includes(id))));
            setSelectedItems(selectedItems.map((tab, i) => i !== activeTab ? tab : []));
          }}
        />
        <div className="container-fluid">
          <div className="row">
            <Sidebar
              activeTab={activeTab}
              perPage={perPage[activeTab]}
              setPerPage={setPerPage}
              headers={headers}
              sorts={sorts}
              filters={filters}
              selectedItems={selectedItems[activeTab]}
              setSorts={setSorts}
              setFilters={setFilters}
              setSelectedItems={setSelectedItems}
              sidebarVisible={menuShown}
              setHiddenHeaders={setHiddenHeaders}
              hiddenHeaders={hiddenHeaders}
              blocklistIgnore={blocklistIgnore}
              setBlocklistIgnore={setBlocklistIgnore}
              dublicatesIgnore={dublicatesIgnore}
              setDublicatesIgnore={setDublicatesIgnore}
              globalFilters={globalFilters}
              setGlobalFilters={setGlobalFilters}
              tableMode={tableMode}
              setTableMode={setTableMode}
            />
            <main role="main" className={cn("ml-sm-auto px-0", {
              "col-md-9 col-lg-10": menuShown,
              "col-md-12": !menuShown
            })}>
              <TabBar
                tabs={tabs}
                activeTab={activeTab}
                newTabHandle={(e) => {
                  const id = Math.max(...tabs.map(({ id }) => id)) + 1;
                  const title = prompt('Введите название новой вкладки', 'Вкладка');

                  if (title) {
                    setTabs([...tabs, {
                      id, title
                    }]);
                    setCurrentPage((d) => [...d, 0]);
                    setPerPage((d) => [...d, 100]);
                    setSelectedItems((d) => [...d, []]);
                  } else {
                    console.log('last tab.');
                  }
                }}
                selectTabHandle={(index) => (e) => {
                  e.preventDefault();
                  setActiveTab(index);
                }}
                closeTabHandle={(index) => (e) => {
                  e.preventDefault();
                  e.stopPropagation()
                  if (tabs.length === 1)
                    return;

                  setActiveTab(0);

                  setTabs(tabs.filter((el, i) => i !== index));
                  setCurrentPage(currentPage.filter((t, i) => i !== index));
                  setPerPage(perPage.filter((t, i) => i !== index));

                  setSorts(sorts
                    .filter((t) => t.tab !== index)
                    .map((t) => t.tab > index ? { ...t, tab: t.tab - 1 } : t)
                  );
                  setFilters(
                    filters
                      .filter((t) => t.tab !== index)
                      .map((t) => t.tab > index ? { ...t, tab: t.tab - 1 } : t)
                  );
                  setSelectedItems((d) => d.filter((t, i) => i !== index));

                  // setSorts((d) => d.map((t) => t.tab > index ? { ...t, tab: t.tab - 1 } : t));
                  // setFilters((d) => d.map((t) => t.tab > index ? { ...t, tab: t.tab - 1 } : t));
                }}
              />
              <div className="pt-1 px-2">
                <ItemsTable
                  items={items}
                  headers={headers}
                  hiddenHeaders={hiddenHeaders}
                  selectedItems={selectedItems[activeTab]}
                  selectItemHandler={(id, phonesms, index) => (e) => {
                    if (e.nativeEvent.shiftKey && lastClick.from !== false)
                      setLastClick({ from: lastClick.from, to: index });
                    else
                      setLastClick({ from: index });
                    if (selectedItems[activeTab].includes(id))
                      setSelectedItems(selectedItems.map((t, i) => i === activeTab ? t.filter((_id) => _id !== id) : t));
                    else {
                      setSelectedItems(selectedItems.map((t, i) => i === activeTab ? [...t, id] : t));
                      setSelectedPhones({ ...selectedPhones, [id]: phonesms });
                    }
                  }}
                />
                <div className="pagination-block pb-0 pt-1">
                  <Pagination
                    pagesCount={pagesCount}
                    currentPage={currentPage[activeTab] ?? 0}
                    pageSelectHandler={(index) => (e) => {
                      setCurrentPage(currentPage.map((t, i) => i === activeTab ? index : t))
                    }}
                  />
                  <CountLine
                    pageItems={items.length}
                    selectedItems={_.uniq(selectedItems[activeTab]).length}
                    allItems={count}
                  />
                </div>
                <textarea className="copy-fix-block" ref={copyTextarea}></textarea>
              </div>
            </main>
          </div>
        </div>
        <BlocklistModal
          shown={blocklistShown}
          title={"Добавить номера в черный список"}
          closeHandle={(e) => {
            setBlocklistShown(false);
          }}
          submitHandle={(e) => {
            const form = blocklistForm.current;
            const phonesRawData = form.blocklistEntries.value;
            const phones = phonesRawData
              .split('\n')
              .map((p) => p.replace(/(^\+38)|(\D)/gm, ''))
              .map((p) => `('${p}')`)
              .join(', ');

            axios({
              method: 'post',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              url: '/set-blocklist.php',
              data: {
                phones
              }
            }).then(response => {
              console.log(phones);
              setBlocklistShown(false);
            });

            form.reset();
          }}
        >
          <form ref={blocklistForm}>
            <div className="mb-3">
              <label htmlFor="blocklistEntries" className="col-form-label">Список номеров, каждый с новой строки:</label>
              <textarea className="form-control" id="blocklistEntries" rows="15"></textarea>
            </div>
          </form>
        </BlocklistModal>
      </div>
    );
}

export default App;
