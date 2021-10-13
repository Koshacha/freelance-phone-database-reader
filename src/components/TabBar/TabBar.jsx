import cn from "classnames";

const TabBar = (props) => {
    const { tabs, activeTab, newTabHandle, closeTabHandle, selectTabHandle } = props;

    return (
        <nav className="navbar navbar-light bg-light px-1 pt-1 pb-0">
            <ul className="nav nav-tabs tab-item">
                {tabs.map(({ id, title }, index) => (
                    <li class="nav-item">
                        <span
                            key={id}
                            className={cn("nav-link", {
                                "active": activeTab === index
                            })}
                            onClick={selectTabHandle(index)}
                        >
                            {title}
                            <span
                                className="badge badge-danger close-badge"
                                onClick={closeTabHandle(index)}>
                                &times;
                            </span>
                        </span>
                    </li>
                ))}
                <li class="nav-item new-tab mx-2">
                    <span className="nav-link" onClick={newTabHandle}>+</span>
                </li>
            </ul>
        </nav>
    );
};

export default TabBar;