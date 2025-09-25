import React, { useState, useRef, useEffect } from "react";
import test_Filter from "../../public/assets/test_Filter.svg";
import test_search from "../../public/assets/test_Search-3.svg";

const data = [];
for (let i = 1; i <= 10000; i++) {
  data.push({
    id: i,
    name: `Customer ${i}`,
    phone: `+917600000${String(i).padStart(3, "0")}`,
    value: Math.floor(Math.random() * 100),
    email: `customer${i}@gmail.com`,
    lastMessage: "27 Dec 2003, 13:18 PM",
    addedBy: "Rahul Sharma",
    avatar: `https://i.pravatar.cc/40?img=70`,
  });
}

const MidSection = ({ onSearch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, onSearch]);

  return (
    <div className="table-header">
      <div className="title">
        <span className="title-text">All Customers</span>
        <span className="count">{data.length}</span>
      </div>

      <div className="actions">
        <div className="search-box">
          <img src={test_search} alt="search" className="search-icon" />
          <input
            type="text"
            placeholder="Search Customers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-container">
          <button className="filter-btn" onClick={toggleDropdown}>
            <img src={test_Filter} alt="filter" className="filter-icon" />
            <span>Add Filters</span>
          </button>

          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>Filter 1</li>
              <li>Filter 2</li>
              <li>Filter 3</li>
              <li>Filter 4</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const CustomersTable = () => {
  const [visibleRows, setVisibleRows] = useState(30);
  const [filteredData, setFilteredData] = useState(data);
  const tableContainerRef = useRef(null);

  const handleScroll = () => {
    const container = tableContainerRef.current;
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 5
    ) {
      setVisibleRows((prev) => Math.min(prev + 30, filteredData.length));
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(data);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredData(
        data.filter(
          (item) =>
            item.name.toLowerCase().includes(lower) ||
            item.email.toLowerCase().includes(lower) ||
            item.phone.includes(lower)
        )
      );
    }
    setVisibleRows(30);
  };

  return (
    <div className="table-container">
      <MidSection onSearch={handleSearch} />

      <div
        style={{ maxHeight: "70vh", overflowY: "auto", overflowX: "clip" }}
        onScroll={handleScroll}
        ref={tableContainerRef}
      >
        <table className="customers-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Customer</th>
              <th></th>
              <th>Email</th>
              <th>Last message sent at</th>
              <th>Added by</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, visibleRows).map((row) => (
              <tr key={row.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td className="customer-info">
                  <img src={row.avatar} alt="avatar" />
                  <div>
                    <div className="name">{row.name}</div>
                    <div className="phone">{row.phone}</div>
                  </div>
                </td>
                <td>{row.value}</td>
                <td>{row.email}</td>
                <td>{row.lastMessage}</td>
                <td>{row.addedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTable;
